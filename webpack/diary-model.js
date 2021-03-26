import jsPDF from 'jspdf';

const emojiRegex = require('emoji-regex/RGI_Emoji.js');
const emojiRegexText = require('emoji-regex/text.js');

/**
 * Serve as the store for the Diary Assembler.
 * @author Luis Carvalho
 */
const DiaryModel = () => {

    let colors = [
        '#007a7d',
        '#008000',
        '#5a781d',
        '#113321',
        '#315131',
        '#2a7ab0',
        '#406098',
        '#0000e0',
        '#34385e',
        '#0a3055',
        '#004055',
        '#004055',
        '#7659b6',
        '#886288',
        '#a74165',
        '#591d77',
        '#3c1362',
        '#8d6708',
        '#554800',
        '#2a2400',
        '#d43900',
        '#aa5d00',
        '#aa5535',
        '#aa2e00',
        '#5c0819',
        '#b11030'
    ];

    let whatsAppChat;

    let topics = [];

    let who;

    let title;

    let diaryDocument;

    let participate;

    /**
     * Stores the parsed data from the Whatapp files and atributes a color to each user.
     * @param {WhatsAppChat} tempWhatsAppChat object containg messages, users and files outputed by the parser. 
     */
    const setWhatsAppChat = (tempWhatsAppChat) => {
        whatsAppChat = tempWhatsAppChat;

        for(let user in whatsAppChat.users) {
            if( user != 'numbers') {

                if(colors.length === 0) {
                    colors = [
                        '#007a7d',
                        '#008000',
                        '#5a781d',
                        '#113321',
                        '#315131',
                        '#2a7ab0',
                        '#406098',
                        '#0000e0',
                        '#34385e',
                        '#0a3055',
                        '#004055',
                        '#004055',
                        '#7659b6',
                        '#886288',
                        '#a74165',
                        '#591d77',
                        '#3c1362',
                        '#8d6708',
                        '#554800',
                        '#2a2400',
                        '#d43900',
                        '#aa5d00',
                        '#aa5535',
                        '#aa2e00',
                        '#5c0819',
                        '#b11030'
                    ];
                }

                let color = colors[Math.floor(Math.random() * colors.length)];
                colors = colors.filter(item => item != color);
                whatsAppChat.users[user].color = color;
                whatsAppChat.users[user].visible = true;

                if(whatsAppChat.users[user].name.length > 17) 
                    whatsAppChat.users[user].name = whatsAppChat.users[user].name.substring(0, 17);

            }
        }
    }
 
    /**
     * Removes emojis from messages and deletes messages at contain only emojis. 
     */
    const removeEmojiOnlyMessages = () => {

        const regex = emojiRegex();
        const regexText = emojiRegexText();
        const messagesToBeRemoved = [];

        whatsAppChat.messageMap.forEach( (message, hash) => {
       
            const textLinesToBeRemoved = [];

            for(let [index, textLine] of message.text.entries()) {

                let match;
                let noEmojis = textLine;
                while (match = regex.exec(textLine)) {
                        noEmojis = noEmojis.replace(match[0], '');
                }
                
                message.text[index] = noEmojis;
                if(message.rawText.length > message.text.length) {
                    message.rawText[index + 1] = noEmojis;
                } else {
                    message.rawText[index] = noEmojis;
                }
            

                if(noEmojis === '' && message.files.length === 0)
                        textLinesToBeRemoved.push(index);
                
                //Secound try to get all the emojis
                //CAUTION IT ALSO TRIES TO GET NUMBERS AND SYMBOLS ??RANDOMLY??
                while (match = regexText.exec(noEmojis)) {
                    if(Number.isNaN(Number(match[0]))) {
                        noEmojis = noEmojis.replace(match[0], '');
                    }
                }
                message.text[index] = noEmojis;
                if(message.rawText.length > message.text.length) {
                    message.rawText[index + 1] = noEmojis;
                } else {
                    message.rawText[index] = noEmojis;
                }
            }

            for(const index of textLinesToBeRemoved)
                message.text.splice(index, 1);

            if(message.text.length === 0 && message.files.length === 0)
                messagesToBeRemoved.push(hash);
            
        });

        for(const hash of messagesToBeRemoved)
            whatsAppChat.messageMap.delete(hash);

    }

    /**
     * Finds topics in the messages through the presence of links to the website.
     * @returns {[Topic]} The list of found topics.
     */
    const findTopics = () => {

        const topicRegex = RegExp('https:\/\/togather\.me\/(?:[a-z]+\/)?topics\/[0-9]+');

        const tempTopics = [];
        let startDay = -1;

        whatsAppChat.messageMap.forEach( (message, hash) => {

            if(whatsAppChat.users[message.user].visible) {

                if(message.rawText.length > 0) {
                    const regexResult = topicRegex.exec(message.rawText[0]);

                    if(regexResult != null) {
                   
                        //Remove topic word
                        const splittedText = message.text[1].split(':');
                        splittedText.shift();
                        message.text[1] = splittedText.join(':');
               
                        message.text.shift();

                        if(startDay === -1) {
                            const tempDate = new Date(message.fulltimestamp.fulltimestamp);
                            const startDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 0,0,0,0);
                            startDay = startDate.getTime();
                        }
                        let day = Math.floor(((message.fulltimestamp - startDay) / (24 * 60 * 60 * 1000)));            
                        day = day === 0 ? 1 : day + 1;  

                        tempTopics.push({
                            day,
                            hash,
                            color: colors[Math.floor(Math.random() * colors.length)],
                            selectedMessages: [],
                        });

                    }
                }

            }
        });

        sortTopicsByTimestamp(tempTopics);
        setTopicsDay(tempTopics);
        topics = setTopicsPart(tempTopics);
        return tempTopics;
    }

    /**
     * Sorts by ascending order of the timestamps whe topics.
     * @param {[Topic]} topics the topics to be the sorted.
     * @returns {[Topic]}  the topics sorted.
     */
    const sortTopicsByTimestamp = (topics) => topics.sort((a, b) => whatsAppChat.messageMap.get(a.hash).fulltimestamp - whatsAppChat.messageMap.get(b.hash).fulltimestamp);
    
    /**
     * Sets the relative day of the topic starting from the oldest topic.
     * @param {[Topic]} topics list of topics to have the day set.
     */
    const setTopicsDay = (topics) => {

        let startDay = -1;
        for(const topic of topics) {

            if(startDay === -1) {
                const tempDate = new Date( whatsAppChat.messageMap.get(topic.hash).fulltimestamp);
                const startDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 0,0,0,0);
                startDay = startDate.getTime();
            }
            const day = Math.floor(((whatsAppChat.messageMap.get(topic.hash).fulltimestamp - startDay) / (24 * 60 * 60 * 1000)));            
            topic.day = day === 0 ? 1 : day + 1;

        }
      
    }

    /**
     * Sets the part field in a topic, if there are more than one topic in a day.
     * @param {[Topic]} topics topics to have the part field set.
     * @returns {[Topic]} list of topics with the part field set.
     */
    const setTopicsPart = (topics) => {

        const dayMap = new Map();

        for(const topic of topics) {
            if(dayMap.has(topic.day)) {
                dayMap.get(topic.day).push(topic);
            } else {
                dayMap.set(topic.day, [topic]);
            }
        }

        const resultTopics = [];

        for(const [day, dayTopics] of dayMap.entries()) {
            if(dayTopics.length === 1) {
                dayTopics[0].part = 0;
                resultTopics.push(dayTopics[0]);
            } else {
                let part = 1;
                for(const topic of dayTopics) {
                    topic.part = part;
                    resultTopics.push(topic);
                    part++;
                }
            }

        }
    
        return resultTopics;
 
    }

    /**
     * Gets a topic given its unique index.
     * @param {number} index index of the topic
     * @returns {Topic} topic with the given index.
     */
    const getTopic = (index) => {

        const topic = topics[index];

        const files = [];
        for(let file of whatsAppChat.messageMap.get(topic.hash).files) {
            files.push(whatsAppChat.files.get(file));
        }

        return {
                day: topic.day, 
                part: topic.part,
                hash: topic.hash,
                color: topic.color,
                timestamp: whatsAppChat.messageMap.get(topic.hash).fulltimestamp,
                text: whatsAppChat.messageMap.get(topic.hash).text,
                files,
            };
    }

    /**
     * Get a topic with the messages given a index,
     * @param {number} index Unique index of the topic.
     * @returns {TopicWithMessages} object with the topic data and messages.
     */
    const getTopicWithMessages = (index) => {

        const topic = getTopic(index);

        const selectedMessages = [];

        for(let messageHash of topics[index].selectedMessages) {
            selectedMessages.push(getMessage(messageHash));
        }

        selectedMessages.sort((a,b) => (a.fulltimestamp + a.index) - (b.fulltimestamp + b.index));

        topic.index = index;
        topic.totalOfTopics = topics.length,
        topic.selectedMessages = selectedMessages;

        return topic;
    }

    /**
     * Gets a list of all topics.
     * @returns {[Topic]} list of topics.
     */
    const getTopics = () => {

        const resultTopics = [];

        for(let i = 0; i < topics.length; i++)
            resultTopics.push(getTopic(i));
        
            return resultTopics;
    }

    /**
     * Gets a list of all topics with all the messages associated.
     * @returns {[TopicWithMessages]} List of topics with messages.
     */
    const getTopicsWithMessages = () => {
        const fullTopics = [];
        for(let i = 0; i < topics.length; i++)
            fullTopics.push(getTopicWithMessages(i));
        return fullTopics;
    }

    /**
     * Upated the content of a topic.
     * @param {object} param0 contains the hash, text, timestamp and files to update the topic. 
     */
    const updateTopic = ({hash, text, timestamp, tempFiles}) => {
        
        const splittedText = text.split('\n'); 
        whatsAppChat.messageMap.get(hash).text = splittedText;
        whatsAppChat.messageMap.get(hash).rawText = splittedText;
        whatsAppChat.messageMap.get(hash).datetimestamp = timestamp;
        whatsAppChat.messageMap.get(hash).fulltimestamp = timestamp;

        if(tempFiles != undefined) {
            const files = [];
            for(let file of tempFiles) {
                const fileHashCode = hashCode(file.data);
                files.push(fileHashCode);
                if(!whatsAppChat.files.has(fileHashCode)) {
                    whatsAppChat.files.set(fileHashCode, {
                        type: file.type,
                        name: file.name,
                        data: file.data,
                    });
                } 
            }
            whatsAppChat.messageMap.get(hash).files = files;
        }

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
      
    }

    /**
     * Deletes a topic given its day.
     * @param {number} day day of the topic to be deleted.
     */
    const deleteTopic = (day) => {
        topics.splice(day, 1);
    
        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
    }
    
    /**
     * Get a message given a hash.
     * @param {number} hash  hash of the message to be get.
     * @returns {Message} message with the given hash. 
     */
    const getMessage = (hash) => {
        const messageObj = {...whatsAppChat.messageMap.get(hash)};
        const hashUser = messageObj.user;

        messageObj.user  = messageObj.user != '' ? whatsAppChat.users[hashUser].name : '';
        messageObj.color = messageObj.user != '' ? whatsAppChat.users[hashUser].color: colors[0];
        
        const files = [];
        for(let file of messageObj.files) {
            files.push(whatsAppChat.files.get(file));
        }
        messageObj.files = files;

        return messageObj;
    }

    /**
     * Gets all messages in ascending order.
     * @returns {[Message]} all messages.
     */
    const getMessages = () => {

        const messages = [];

        whatsAppChat.messageMap.forEach((value, key) => {
            if(value.user === "" || whatsAppChat.users[value.user].visible) {
                if(!topics.some(topic => topic.hash === key))
                    messages.push(getMessage(key));
            }
        });
        
        messages.sort((a,b) => (a.fulltimestamp + a.index) - (b.fulltimestamp + b.index));
        
        return messages;
    
    }

    /**
     * Given a string creates a hash.
     * @param {string} s string to be ashed.
     * @returns {number} hash of the string.
     */
    const hashCode = (s) => {
        let h;
        for(let i = 0; i < s.length; i++) 
              h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    
        return h;
    }

    /**
     * Given a list of hashes it creates topics.
     * @param {[number]} hashList list of number hashes.
     */
    const createTopicsFromHashes = (hashList) => {
        for(let hash of hashList) {
            topics.push({
                hash,
                color: colors[Math.floor(Math.random() * colors.length)],
                selectedMessages: [],
            });
        }

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
    }

    /**
     * Creates a new topic.
     * @param {object} param0 contains the text, timestamp and files to be associated to the new topic. 
     */
    const createTopic = ({text, timestamp, tempFiles}) => {

        const hash = hashCode(`topic${timestamp}${text}`);

        const files = [];
        for(let tempFile of tempFiles) {

            const fileHashCode = hashCode(tempFile.data);
            files.push(fileHashCode);
            if(!whatsAppChat.files.has(fileHashCode)) {
                whatsAppChat.files.set(fileHashCode, {
                    type: tempFile.type,
                    name: tempFile.name,
                    data: tempFile.data,
                });
            }
           
        }

        const splittedText = text.split('\n'); 

        const message = {
            index: '',
            fulltimestamp: timestamp,
            user: '',
            text: splittedText,
            files: files,
            linns: [],
            hash,
            rawText: splittedText,
            atUser: [],
        }

        let index = -1;
        const arrayFromMap = Array.from(whatsAppChat.messageMap);
        for(let i = 0; i < arrayFromMap.length && index === -1; i++) {
            if(arrayFromMap[i][1].fulltimestamp >= timestamp) index = i;
        }
        if(index == -1) index = arrayFromMap.length;

        arrayFromMap.splice(index, 0, [hash, message]);
        
        whatsAppChat.messageMap = new Map(arrayFromMap);

        const topic = {
            hash,
            color: colors[Math.floor(Math.random() * colors.length)],
            selectedMessages: [],
        }

        topics.push(topic);

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);

    }

    /**
     * Sorts all messages by ascending order.
     * @param {[number]} hashList list of message hashes.
     * @returns {[number]} list of hashes sorted.
     */
    const sortMessagesByTimestamp = (hashList) => hashList.sort((a, b) => whatsAppChat.messageMap.get(a).fulltimestamp - whatsAppChat.messageMap.get(b).fulltimestamp);

    /**
     * Associates a message to a topic.
     * @param {number} topicIndex index identifier of the topic.
     * @param {number} messageHash hash identifier of the message.
     */
    const saveSelectedTopicMesssage = (topicIndex, messageHash) => {
        topics[topicIndex].selectedMessages.push(messageHash);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
    }

    /**
     * Removes a message from a topic.
     * @param {number} topicIndex index identifier of the topic.
     * @param {number} messageHash hash identifier of the message.
     */
    const removeSelectedTopicMessage = (topicIndex, messageHash) => {
        const indexToBeRemoved = topics[topicIndex].selectedMessages.indexOf(messageHash);
        topics[topicIndex].selectedMessages.splice(indexToBeRemoved, 1);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
    }

    /**
     * Gets name of who the diary is for.
     * @returns {string} name of who the diary is for.
     */
    const getWhoDiaryIsFor = () => who;

    /**
     * Sets who the diary is for.
     * @param {string} newWho new name to be associated. 
     */
    const setWhoDiaryIsFor = (newWho) => {
        who = newWho;
    }

    /**
     * Gets the title of the diary
     * @returns {string} title of the diary.
     */
    const getDiaryTitle = () => title;

    /**
     * Sets the diary's title.
     * @param {string} newTitle the new diary title. 
     */
    const setDiaryTitle = (newTitle) => {
        title = newTitle;
    }

    /**
     * Gets an object with the users.
     * @returns {Users}
     */
    const getUsers = () => {
        const result = {...whatsAppChat.users};
        if(result.numbers != undefined)
            delete result.numbers
        return result;
    };

    /**
     * Updates the name of a user.
     * @param {number} hash identifier of the user. 
     * @param {string} name new name of the user.
     */
    const updateUsername = (hash, name) => {
        whatsAppChat.users[hash].name = name;
    }

    /**
     * Gets a map of all message hashes associated with topics.
     * @returns {Map<string, object>} map with the hash as the key and the message as the value.
     */
    const getSelectedMessagesHashes = () => {

        const result = new Map();

        for(const topic of topics) {

            for(const selectedMessage of topic.selectedMessages)
                result.set(selectedMessage, {day: topic.day, part: topic.part, timestamp: whatsAppChat.messageMap.get(topic.hash).fulltimestamp});

        }

        return result;
    }

    /**
     * Gets all data of a diary.
     * @returns {object}  object containing all diary data.
     */
    const getDiary = () => {
        const topics = getTopicsWithMessages();
        let startDate = undefined;
        let endDate = undefined;
        if(topics.length > 0) {
            startDate = topics[0].timestamp;
            endDate = topics[topics.length-1].timestamp;
        }

        return {
            title,
            who,
            users: getUsers(),
            startDate,
            endDate,
            topics
        }
    }
    
    /**
     * Changes the visibility of all messages associated to a user.
     * @param {string} userHash the user unique hash.
     */
    const changeUserMessagesVisibility = (userHash) => {
        whatsAppChat.users[userHash].visible = !whatsAppChat.users[userHash].visible;
    }

    /**
     * Stores the pdf document.
     * @param {jsPDF} doc pdf document.
     */
    const setDiaryDocument = (doc) => { diaryDocument = doc };

    /**
     * Gets the pdf document.
     * @returns {jsPDF} pdf document.
     */
    const getDiaryDocument = () => diaryDocument; 

    /**
     * Set if the users wants to participant in the study.
     * @param {string} tempParticipate "yes" if the user wants to participate in the study.
     */    
    const setParticipate = (tempParticipate) => {participate = tempParticipate};

    /**
     * Get if the user wants to participate in the study.
     * @returns {string} represents the intend of participating in the study.
     */
    const getParticipate = () => participate; 


    /**
     * Loads the metadata in pdf into a new diary assembly process. 
     */
    const loadSave = async () => {

        whatsAppChat.files.forEach( async(value, key, map) => {

            if(value.type.includes('pdf')) {

                fetch(value.data)
                .then(res => res.blob())
                .then( r => {
                    
                    const e = new FileReader();
                    e.readAsArrayBuffer(r);
        
                    e.onload = () => {
                  
                       pdfjsLib.GlobalWorkerOptions.workerSrc = "{{ '/assets/scripts/pdf.worker.js' | prepend: site.baseurl_root }}";
               
                        // Asynchronous download of PDF
                        var loadingTask = pdfjsLib.getDocument(e.result);
                        loadingTask.promise.then(function(pdf) {
                            
                            let pdfDoc = pdf;
                            pdfDoc.getMetadata().then(function(stuff) {
                                const saved = JSON.parse(stuff.info.Keywords);

                                title = saved.title;
                                who = saved.who;
                                loadUsers(saved.users); 
                                loadTopics(saved.topics);                              

                            }).catch(function(err) {
                            console.log('Error getting meta data');
                            console.log(err);
                            });
                        }, function (reason) {
                        // PDF loading error
                        console.error(reason);
                        });
                    };
                });
            }
        });
    }

    /**
     * Sets the users from the pdf metadata.
     * @param {object} savedData metadata from the pdf.
     */
    const loadUsers = (savedData) => {

        for (let hash in savedData) {
            if(whatsAppChat.users[hash] != undefined) {
                whatsAppChat.users[hash].name = savedData[hash].name;
                whatsAppChat.users[hash].color = savedData[hash].color;
                whatsAppChat.users[hash].visible = savedData[hash].visible;
            }
        }

    }
/*
    topics
    0:
        color: "#406098"
        day: 1
        hash: -1494631525
        part: 0
        selectedMessages:
            0: 1969578367
            1: 803672663
        

    saved topics

    0:
        color: "#34385e"
        day: 1
        files: []
        hash: -1494631525
        index: 0
        part: 0
        selectedMessages: Array(2)
            0:
                atUser: []
                color: "#aa2e00"
                files: []
                fulltimestamp: 1588253160000
                hash: 1337773772
                index: 87
                links: []
                rawText: ["looks great"]
                text: ["looks great"]
                user: "Jayne Wallace"
*/

    /**
     * Loads topics from the pdf metadata.
     * @param {object} savedData metadata from the pdf.
     */
    const loadTopics = (savedData) => {
        for (let i = 0; i < savedData.length; i++) {

            const topicIndex = topics.findIndex((elem) => elem.hash === savedData[i].hash);
            if(topicIndex != -1) {
                topics[topicIndex].day = savedData[i].day;
                topics[topicIndex].part = savedData[i].part;
                topics[topicIndex].color = savedData[i].color;
                for(let m of savedData[i].selectedMessages) {
                    topics[topicIndex].selectedMessages.push(m.hash);
                }
            }   
        }
    }

    /**
     * Deletes all data stored.
     */
    const deleteAll = () => {
        whatsAppChat = undefined;
        topics = [];
        who = undefined;
        title = undefined;
        diaryDocument = undefined;
        participate = undefined;
    }

    return {
        setWhatsAppChat,
        setWhoDiaryIsFor,
        getWhoDiaryIsFor,
        getDiaryTitle,
        setDiaryTitle,
        findTopics,
        getTopic,
        getTopicWithMessages,
        getTopics,
        getTopicsWithMessages,
        updateTopic,
        deleteTopic,
        createTopic,
        createTopicsFromHashes,
        saveSelectedTopicMesssage,
        removeSelectedTopicMessage,
        getMessages,
        getMessage,
        getUsers,
        updateUsername,
        getSelectedMessagesHashes,
        removeEmojiOnlyMessages,
        getDiary,
        changeUserMessagesVisibility,
        setDiaryDocument,
        getDiaryDocument,
        setParticipate,
        getParticipate,


        loadSave,

        deleteAll,
    };
}

export default DiaryModel;