const WhatsAppChatParser = () => {

    const start =  async (filesInput) => {
        const tempFiles = await readFiles(filesInput);
        const files = {}; 

        for(file of tempFiles) {
            if(file.file.type != 'text/plain') {
                files[`${file.file.name}`] = {type: file.file.type, data: file.fileContent};
            }
        }

        let messages;
        let users;
        for(file of tempFiles) {
            if(file.file.type === 'text/plain') {
                const parsedResult = parseMessages(file.fileContent);
                messages = parsedResult.messages;
                users = parsedResult.users;
            }
        }
    
        return { messages, files, users }
    }

    const readFiles = async(fileInput) => {

        let files = [];

        const readFile = (file) => {
            const fileReader = new FileReader();

            return new Promise((resolve, reject) => {
                fileReader.onerror = () => {
                    fileReader.abort();
                    reject(new DOMException("Problem parsing input file."));
                };

                fileReader.onload = () => {
                    resolve({file, fileContent: fileReader.result});
                };

                if(file.type === 'text/plain') {
                    fileReader.readAsText(file);
                } else {
                    fileReader.readAsDataURL(file); 
                }
                
            });
        }

        for(let i = 0; i < fileInput.files.length; i++) {
            let result = await readFile(fileInput.files[i]);
            files.push(result);
        }

        return files;
    }

    /*
        Message structure
        {
            id: int
            date: string
            time: string 
            timestamp: long
            user: string
            text: string
            files: []
        }
    */

    const parseMessages = (messages) => {

        const result = [];
        const users = [];

        const messageStartRegex = RegExp('(([0-9]{2})\/([0-9]{2})\/([0-9]{2,4}))\, (([0-9]{2})\:([0-9]{2})) - ([^:]+)\: (.*)');

        const fileRegex = RegExp('(([A-Z]{3}\-[0-9]{8}\-[A-Z]{2}[0-9]{4}\..[^ ]*) \(.*\))');

        const parseMessageBody = (text) => {

            const fileRegexResult = fileRegex.exec(text);
            if(fileRegexResult != null) {
                const [ fullLine, fullFilename, filename] = fileRegexResult;
                console.log(filename);
                return {text: text.replace(fullFilename, ''), filename};
            }
            return {text};
        
        };

        const parseDateToTimestamp = (day, month, year, time) => {
            const formattedYear = year.length === 2 ? `20${year}` : year;
            return new Date(`${formattedYear}/${month}/${day} ${time}:00`).getTime();
        };

        const parseUser = (name) => {

            let foundUser = false;

            const getRandomColor = () => {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            for(user of users) {
                if(user.name === name) {
                    foundUser = true;
                    break;
                }
            }
            if(foundUser == false)
                users.push({name, color: getRandomColor()});

        }

        const rawMessages = messages.split('\n');

        let currentMessage = null;

        for([index, rawMessage] of rawMessages.entries()) {

            const messageStart = messageStartRegex.exec(rawMessage);
            if(messageStart != null) {

                const [fullLine, fullDate, day, month, year, fullTime, hours, minutes, username, body] = messageStart;

                if(currentMessage != null)
                    result.push({...currentMessage});
                
                currentMessage = {};
                currentMessage.id = index;
                currentMessage.date = fullDate;
                currentMessage.time = fullTime;
                currentMessage.timestamp = parseDateToTimestamp(day, month, year, fullTime);
                currentMessage.user = username;
                parseUser(username);

                const {text, filename} = parseMessageBody(body);
                currentMessage.text = text;
                currentMessage.files = filename != undefined ? [filename] : [];

            } else {
                if(currentMessage != null) {
                    const {text, filename} = parseMessageBody(rawMessage);
                    currentMessage.text += currentMessage.text === '' ? text : ` ${text}`;
                    if( filename != undefined )
                        currentMessage.files.push(filename);
                }
            }
        
        }

        if(currentMessage != null) {
            result.push({...currentMessage});
            currentMessage = null;
        }

        return ({messages: result, users});

    };

    return ({ start });
}