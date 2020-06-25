import mime from 'mime-types';
import JSZip from 'jszip';

const WhatsAppChatParser = () => {

    /**
     * Starts the parsing of files of a given input
     * @param {Element Node} filesInput Input from which the files are going to be parsed
     * @returns { {Map, Map, object} }
     */
    const start =  async (filesInput) => {

        const tempFiles = await readFiles(filesInput);

        const files = new Map(); 

        for(let {file, file:{name}, file:{type}, fileContent} of tempFiles) {
            if(type != 'text/plain')
                files.set(hashCode(fileContent), { name, type, data: fileContent});
        }

        let messageMap;
        let users;

        const textFiles = tempFiles.filter(file => file.file.type === 'text/plain');

        if(textFiles.length === 0) throw 'No chat file found';

        let found = false;
        for (let i = 0; i < textFiles.length && !found; i++) {
            const parsedResult = parseMessages(textFiles[i].fileContent, files);
            messageMap = parsedResult.messageMap;
            users = parsedResult.users;
            found = messageMap.size != 0;
        }

        if(!found) throw 'No chat file found';

        return { messageMap, files, users }
    }

    const readFiles = async(fileInput) => {

        let files = [];

        const readFile = (file) => {
            const fileReader = new FileReader();

            return new Promise( async(resolve, reject) => {
                fileReader.onerror = () => {
                    fileReader.abort();
                    reject(new DOMException("Problem parsing input file."));
                };

                fileReader.onload = () => {
                    console.log(fileReader.result);
                    resolve([{file, fileContent: fileReader.result}]);
                };

                if(file.type === 'text/plain') {
                    fileReader.readAsText(file);
                } else if(file.type === 'application/zip') {

                    const jsZip = new JSZip();
                    const zip = await jsZip.loadAsync(file); 
                    const files = Object.keys(zip.files);

                    const result = [];

                    for(const filename of files) {
                        const file = zip.files[filename];
                        if(!file.dir && !filename.includes('__MACOSX/', 0)) {

                            const ext = filename.split('.').pop();
                            const type = mime.lookup(ext);

                            const fileObject = {
                                file: {
                                    name: filename,
                                    size: file._data.uncompressedSize,
                                    type
                                },
                                fileContent: {},
                            };

                            if(type === 'text/plain') {
                                fileObject.fileContent = await file.async('text');
                            } else {
                                let blob = await file.async('blob');
                                blob = blob.slice(0, blob.size, type);
                                const fileReader2 = new FileReader();
                                fileReader2.readAsDataURL(blob); 
                                const result = await new Promise( async(resolve, reject) => {
                                    fileReader2.onerror = () => {
                                        fileReader2.abort();
                                        reject(new DOMException("Problem parsing input file."));
                                    };
                                    fileReader2.onload = () => {
                                        resolve(fileReader2.result);
                                    };
                                });
                                fileObject.fileContent = result;
                            }
                            result.push(fileObject);        
                        }
                    }
                    resolve(result);      
                } else {
                    fileReader.readAsDataURL(file); 
                }
                
            });
        }

        for(let i = 0; i < fileInput.length; i++) {
            let result = await readFile(fileInput[i]);
            console.log(result);
            files = files.concat(result);
        }
    
        return files;
    }

    /*
        Message structure
        {
            index: int
            fulltimestamp: long
            user: string
            text: string
            file: string 
            links: [
                { 
                    url: !!!!!!!!!!!!!!!
                    type:!!!!!!!!!!!!!!!!!!!!!!!
                }
            ]
            hash: string
            rawText: string
            atUser: []
        }
    */

    const parseMessages = (messages, files) => {

        const users = {
            numbers: [],
        };
        const messageMap = new Map();

        const messageStartRegex = RegExp('[\[]?([0-9]{2})\/([0-9]{2})\/([0-9]{2,4})\, ([0-9]{2}\:[0-9]{2}(?:\:[0-9]{2})?)\]? (?:- )?([^:]+)\: (.*)');

        const fileRegex = RegExp('(([A-Z]{3}\-[0-9]{8}\-[A-Z]{2}[0-9]{4}\..[^ ]*) \(.*\))');

        const fileRegexIOS = RegExp('(([0-9]{8}-[^-]*-[0-9]{4}(?:-[0-9]{2}){5}\..[^ ]*)(?: \(.*\))?)');

        const parseMessageBody = (body) => {

            let filename = [];
            let text = body;

            let fileRegexResult = fileRegex.exec(text);
            if(fileRegexResult == null) 
                fileRegexResult = fileRegexIOS.exec(text);

            if(fileRegexResult != null) {
                const [fullLine, fullFilename, tempFilename] = fileRegexResult;

                let hash;
                files.forEach((value, key) => {
                    if(value.name === tempFilename) hash = key;
                });

                if(hash != undefined) {
                    text = text.replace(fullFilename, '');
                    filename.push(hash);
                }

            } 

            const linkRegexResult = text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
            let links = linkRegexResult != null ? linkRegexResult : [];
            
            //youtube regex
            //(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be|youtube-nocookie.com)\/(watch|embed)?(\?v=|\/)?(\S+)?

            const atRegexresult = text.match(/(@[0-9]+)/g);
            let atUser = atRegexresult != null ? atRegexresult : []

            text = text.replace(String.fromCharCode(8206), '');
            return {text, filename, links, atUser}
        };

        const parseDateToTimestamp = (day, month, year, time) => {
            const formattedYear = year.length === 2 ? `20${year}` : year;
            const formattedTime = time.length === 5 ? `${time}:00`: time
            return new Date(`${formattedYear}/${month}/${day} ${formattedTime}`).getTime();
        };

        const rawMessages = messages.split('\n');

        let currentMessage = null;
        for(let [index, rawMessage] of rawMessages.entries()) {

            const messageStart = messageStartRegex.exec(rawMessage);
            if(messageStart != null) {

                const [fullLine, day, month, year, fullTime, username, body] = messageStart;

                if(currentMessage != null) 
                    messageMap.set(currentMessage.hash, {...currentMessage});
                
                currentMessage = {};
                currentMessage.index = index;
                currentMessage.hash = hashCode(rawMessage);
                
                currentMessage.fulltimestamp = parseDateToTimestamp(day, month, year, fullTime);

                const hashUser = hashCode(username);
                if(!users.hasOwnProperty(hashUser)) {
                    users[hashUser] = {
                        name: username,
                    }
                }                
                currentMessage.user = hashUser;
                currentMessage.rawText = [body];

                const {text, filename, links, atUser} = parseMessageBody(body);
        
                currentMessage.text = [];
                if(text != '')
                    currentMessage.text.push(text);
                currentMessage.files = filename;
                currentMessage.links = links;
                currentMessage.atUser = atUser;

                for(let number of atUser) {
                    if(!users.numbers.includes(number)) users.numbers.push(number);
                }

            } else {

                if(currentMessage != null) {
                    const {text, filename, links, atUser} = parseMessageBody(rawMessage);
                    if(text != '') 
                        currentMessage.text.push(text);  
                    if(rawMessage != '') 
                        currentMessage.rawText.push(rawMessage); //+= `\n${rawMessage}`;
                    currentMessage.files.concat(filename);
                    currentMessage.links = currentMessage.links.concat(links);
                    currentMessage.atUser = currentMessage.atUser.concat(atUser);
                    for(let number of atUser) {
                        if(!users.numbers.includes(number)) users.numbers.push(number);
                    }
                }
                
            }
        
        }

        if(currentMessage != null) {
            messageMap.set(currentMessage.hash, {...currentMessage});
            currentMessage = null;
        }
 
        return ({messageMap, users});

    };

    const hashCode = (s) => {
        let h;
        for(let i = 0; i < s.length; i++) 
              h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    
        return h;
    }
 
    return ({ start });
}

export default WhatsAppChatParser;