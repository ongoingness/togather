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

    const setWhatsAppChat = (tempWhatsAppChat) => {
        whatsAppChat = tempWhatsAppChat;

        const colorsPicked = []
    
        for(let user in whatsAppChat.users) {
            if( user != 'numbers') {
                let color = colors[Math.floor(Math.random() * (colors.length -1 - 0 + 1) + 0)];
                while(colorsPicked.includes(color)) {
                    color = colors[Math.floor(Math.random() * (colors.length -1 - 0 + 1) + 0)];
                }
                whatsAppChat.users[user].color = color;
            }
        }
    }
    /*
    //Topic structure
    {
        hash: string or text: string 
        messages: [hash]
        selectedMessages: [hash]
    }
    */

    const findTopics = () => {

        const topicRegex = RegExp('https://lapc1995.github.io/while-you-were-fighting/challenges/[0-9]*');

        const tempTopics = [];

        whatsAppChat.messageMap.forEach( (message, hash) => {

            for(let link of message.links) {
                if(topicRegex.exec(link) != null) {
                    tempTopics.push({
                        hash,
                        messages: [],
                        selectedMessages: [],
                    });
                    break;
                }
            }

        });

        topics = tempTopics;

        sortTopicsByTimestamp();
        findTopicMessages();

        return tempTopics;
    }

    const sortTopicsByTimestamp = () => topics.sort((a, b) => whatsAppChat.messageMap.get(a.hash).fulltimestamp - whatsAppChat.messageMap.get(b.hash).fulltimestamp);
    
    const findTopicMessages = () => {

        if(topics.length == 0) return

        const messages = Array.from(whatsAppChat.messageMap.values());
        let topicMessageIndex = 0;
    
        for(let i = 0; i < topics.length; i++) {

            topics[i].messages = [];
            topics[i].selectedMessages = [];

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
                hash: topic.hash,
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

    const updateTopic = ({hash, text, timestamp}) => {
        
        whatsAppChat.messageMap.get(hash).text = text;
        whatsAppChat.messageMap.get(hash).rawText = text;
        whatsAppChat.messageMap.get(hash).datetimestamp = timestamp;
        whatsAppChat.messageMap.get(hash).fulltimestamp = timestamp;

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
            whatsAppChat.files.set(fileHashCode, {
                type: tempFile.type,
                name: tempFile.name,
                data: tempFile.data,
            });
            files.push(fileHashCode);

        }

        const message = {
            index: '',
            fulltimestamp: timestamp,
            user: '',
            text,
            files: files,
            linns: [],
            hash,
            rawText: text,
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
            messages: [],
            selectedMessages: [],
        }

        topics.push(topic);

        sortTopicsByTimestamp();
        findTopicMessages();

    }

    const saveSelectedTopicMesssage = (topicIndex, messageHash) => {
        topics[topicIndex].selectedMessages.push(messageHash);
        console.log(topics[topicIndex].selectedMessages);
    }

    const removeSelectedTopicMessage = (topicIndex, messageHash) => {
        const indexToBeRemoved = topics[topicIndex].selectedMessages.indexOf(messageHash);
        topics[topicIndex].selectedMessages.splice(indexToBeRemoved, 1);
        console.log(topics[topicIndex].selectedMessages);
    }


    return {

        setWhatsAppChat,
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
 
    };
}

export default DiaryModel;