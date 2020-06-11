const DiaryModel = () => {

    const colors = [
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

    const setWhatsAppChat = (tempWhatsAppChat) => {
        whatsAppChat = tempWhatsAppChat;

        const colorsPicked = []
    
        for(let user in whatsAppChat.users) {
            if( user != 'numbers') {
                let color = colors[Math.floor(Math.random() * colors.length)];
                while(colorsPicked.includes(color)) {
                    color = colors[Math.floor(Math.random() * colors.length)];
                }
                whatsAppChat.users[user].color = color;
            }
        }
    }
    /*
    //Topic structure
    {
        day:
        hash: string or text: string 
        messages: [hash]
        selectedMessages: [hash]
    }
    */

    const findTopics = () => {

        const topicRegex = RegExp('https://lapc1995.github.io/while-you-were-fighting/topics/[0-9]+');

        const tempTopics = [];
        let startDay = -1;

        whatsAppChat.messageMap.forEach( (message, hash) => {

            if(message.rawText.length > 0) {
                const regexResult = topicRegex.exec(message.rawText[0]);

                if(regexResult != null) {

                    message.text[1] = message.text[1].slice(7);
                    message.text.shift();

                    if( startDay === -1)
                        startDay = message.fulltimestamp;

                    let day = Math.floor(((message.fulltimestamp - startDay) / (24 * 60 * 60 * 1000)) + 1);

                    tempTopics.push({
                        day,
                        hash,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        messages: [],
                        selectedMessages: [],
                    });

                }
            }

        });

        topics = tempTopics;

        console.log(topics);

        sortTopicsByTimestamp();
        findTopicMessages();

        return tempTopics;
    }

    const sortTopicsByTimestamp = () => topics.sort((a, b) => whatsAppChat.messageMap.get(a.hash).fulltimestamp - whatsAppChat.messageMap.get(b.hash).fulltimestamp);
    
    const findTopicMessages = () => {

        if(topics.length == 0) return

        const messages = Array.from(whatsAppChat.messageMap.values());
        let topicMessageIndex = 0;
    
        let startDay = -1;

        for(let i = 0; i < topics.length; i++) {

            topics[i].messages = [];
            topics[i].selectedMessages = [];

            if(startDay === -1) startDay = whatsAppChat.messageMap.get(topics[i].hash).fulltimestamp;
            topics[i].day = Math.floor(((whatsAppChat.messageMap.get(topics[i].hash).fulltimestamp- startDay) / (24 * 60 * 60 * 1000)) + 1);

            const topic = whatsAppChat.messageMap.get(topics[i].hash);

            if(i + 1 == topics.length) {
        
                for(let j = topicMessageIndex; j < messages.length; j++) {
                    const message = messages[j];
                    if(message.hash != topic.hash && message.fulltimestamp >= topic.fulltimestamp) {
                        topics[i].messages.push(message.hash);
                    }
                }

            } else {

                const nextTopic = whatsAppChat.messageMap.get(topics[i+1].hash);
                const nextTopicTimestampPlusDay = new Date(nextTopic.fulltimestamp);
                nextTopicTimestampPlusDay.setDate(nextTopicTimestampPlusDay.getDate() + 1);
                let nextTopicMessageIndexFound = false;

                for(let j = topicMessageIndex; j < messages.length; j++) {
                   
                    if(messages[j].hash != topic.hash) {

                        if(messages[j].fulltimestamp >= topic.fulltimestamp) {
                            
                            if(messages[j].fulltimestamp >= nextTopic.fulltimestamp && !nextTopicMessageIndexFound) {
                                nextTopicMessageIndexFound = true;
                                topicMessageIndex = j;
                            }

                            if(messages[j].fulltimestamp <= nextTopicTimestampPlusDay.getTime()) {
                                topics[i].messages.push(messages[j].hash);
                            } 

                        } 
                    }
                }
            }
        }
    }

    const getTopic = (index) => {

        const topic = topics[index];

        const files = [];
        for(let file of whatsAppChat.messageMap.get(topic.hash).files) {
            files.push(whatsAppChat.files.get(file));
        }

        return {
                day: topic.day, 
                hash: topic.hash,
                color: topic.color,
                timestamp: whatsAppChat.messageMap.get(topic.hash).fulltimestamp,
                text: whatsAppChat.messageMap.get(topic.hash).text,
                files,
            };
    }

    const getTopicWithMessages = (index) => {

        const topic = getTopic(index);

        const messages = [];
        const selectedMessages = [];

        for(let messageHash of topics[index].messages) {
            messages.push(getMessage(messageHash));
        }

        for(let messageHash of topics[index].selectedMessages) {
            selectedMessages.push(getMessage(messageHash));
        }

        topic.index = index;
        topic.totalOfTopics = topics.length,
        topic.messages = messages;
        topic.selectedMessages = selectedMessages; 

        console.log(topic);

        return topic;
    }

    const getTopics = () => {

        const resultTopics = [];

        for(let i = 0; i < topics.length; i++)
            resultTopics.push(getTopic(i));
        
            return resultTopics;
    }

    const getTopicsWithMessages = () => {
        const fullTopics = [];
        for(let i = 0; i < topics.length; i++)
            fullTopics.push(getTopicWithMessages(i));
        return fullTopics;
    }

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
   
    }

    const deleteTopic = (day) => topics.splice(day, 1);
    
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

    const getMessages = () => {

        const messages = [];

        whatsAppChat.messageMap.forEach((value, key) => {
            messages.push(getMessage(key));
        });

        return messages;
    
    }

    const hashCode = (s) => {
        let h;
        for(let i = 0; i < s.length; i++) 
              h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    
        return h;
    }

    const createTopicsFromHashes = (hashList) => {
        for(let hash of hashList) {
            topics.push({
                hash,
                color: colors[Math.floor(Math.random() * colors.length)],
                messages: [],
                selectedMessages: [],
            });
        }
        sortTopicsByTimestamp();
        findTopicMessages();
    }

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
            messages: [],
            selectedMessages: [],
        }

        topics.push(topic);

        sortTopicsByTimestamp();
        findTopicMessages();

    }

    const sortMessagesByTimestamp = (hashList) => hashList.sort((a, b) => whatsAppChat.messageMap.get(a).fulltimestamp - whatsAppChat.messageMap.get(b).fulltimestamp);

    const saveSelectedTopicMesssage = (topicIndex, messageHash) => {
        topics[topicIndex].selectedMessages.push(messageHash);
        console.log( topics[topicIndex].selectedMessages);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
        console.log(topics[topicIndex].selectedMessages);
    }

    const removeSelectedTopicMessage = (topicIndex, messageHash) => {
        const indexToBeRemoved = topics[topicIndex].selectedMessages.indexOf(messageHash);
        topics[topicIndex].selectedMessages.splice(indexToBeRemoved, 1);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
        console.log(topics[topicIndex].selectedMessages);
    }

    const getWhoDiaryIsFor = () => who;

    const setWhoDiaryIsFor = (newWho) => {
        who = newWho;
    }

    const getUsers = () => {
        const result = {...whatsAppChat.users};
        if(result.numbers != undefined)
            delete result.numbers
        return result;
    };

    const updateUsername = (hash, name) => {
        whatsAppChat.users[hash].name = name;
    }
    

    return {
        setWhatsAppChat,
        setWhoDiaryIsFor,
        getWhoDiaryIsFor,
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
 
    };
}

export default DiaryModel;