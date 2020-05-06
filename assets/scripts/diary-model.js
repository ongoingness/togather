const DiaryModel = () => {

    let whatsAppChat;

    let topics = [];

    const setWhatsAppChat = (tempWhatsAppChat) => whatsAppChat = tempWhatsAppChat;

    /*
    //Topic structure
    {
        timestamp: long
        hash: string or text: string 
        messages: [hash]
        selectedMessages: [hash]
    }
    */
    const findTopics = () => {

        const topicRegex = RegExp('https://lapc1995.github.io/while-you-were-fighting/challenges/[0-9]*');

        const tempTopics = [];

        for(let hash of whatsAppChat.orderedMessages) {

            let message = whatsAppChat.messageMap[hash];
            for(let link of message.links) {
                if(topicRegex.exec(link) != null) {
                    tempTopics.push({
                        timestamp: message.datetimestamp,
                        hash,
                        messages: [],
                        selectedMessages: [],
                    });
                    break;
                }
            }
        }

        topics = tempTopics;

        sortTopicsByTimestamp();
        findTopicMessages();

        console.log(whatsAppChat.orderedMessages.length);

        return tempTopics;
    }

    const addTopic = (text, timestamp) => {
        topics.push(({
            timestamp,
            text,
            messages: [],
            selectedMessages: []
        }));
    }

    const getTopics = () => {

        const resultTopics = [];

        for(let topic of topics) {
            console.log(topic);
            resultTopics.push({
                hash: topic.hash,
                timestamp: whatsAppChat.messageMap[topic.hash].fulltimestamp,
                text: whatsAppChat.messageMap[topic.hash].text,
            });
        }
        return resultTopics;
    }

    const getFullTopic = (index) => {
        
        const topic = topics[index];
        const messages = [];
        for(let messageHash of topic.messages) {
            messages.push(whatsAppChat.messageMap[messageHash]);
        }

       return {
           index,
           totalOfTopics: topics.length,
           hash: topic.hash,
           timestamp: whatsAppChat.messageMap[topic.hash].fulltimestamp,
           text: whatsAppChat.messageMap[topic.hash].text,
           messages
       }

    }

    const getFullMessagesInOrder = () => {

        const messages = [];

        for(let hash of whatsAppChat.orderedMessages) {
            messages.push(whatsAppChat.messageMap[hash]);
        }

        return messages;
    }

    const getFullMessage = (hash) => {
        return whatsAppChat.messageMap[hash];
    }

    const updateTopic = ({hash, text, timestamp}) => {
        
        whatsAppChat.messageMap[hash].text = text;
        whatsAppChat.messageMap[hash].rawText = text;
        whatsAppChat.messageMap[hash].datetimestamp = timestamp;
        whatsAppChat.messageMap[hash].fulltimestamp = timestamp;

    }

    const deleteTopic = (day) => {
        topics.splice(day, 1);
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
                timestamp: 0,
                hash,
                messages: [],
                selectedMessages: [],
            });
        }
        sortTopicsByTimestamp();
        findTopicMessages();
    }

    const createTopic = ({text, timestamp}) => {

        const hash = hashCode(`topic${timestamp}${text}`);

        const message = {
            id: '00',
            date: '00',
            time: '00',
            datetimestamp: timestamp,
            fulltimestamp: timestamp,
            user: 'topic',
            text,
            file: '',
            links: [],
            hash,
            rawText: text
        }

        whatsAppChat.messageMap[hash] = message;

        const topic = {
            timestamp,
            hash,
            messages: [],
            selectedMessages: [],
        }

        topics.push(topic);
        sortTopicsByTimestamp();

        findTopicMessages();

    }

    const sortTopicsByTimestamp = () => topics.sort((a, b) => whatsAppChat.messageMap[a.hash].fulltimestamp - whatsAppChat.messageMap[b.hash].fulltimestamp);
    
    const findTopicMessages = () => {

        if(topics.length == 0) return

        for(let t of topics) {
            t.messages = []
        }

        console.log(whatsAppChat.orderedMessages);
        let topicMessageIndex = 0;

        for(let i = 0; i < topics.length; i++) {

            const topic = whatsAppChat.messageMap[topics[i].hash];

            if(i + 1 == topics.length) {
                console.log(topicMessageIndex);
                for(let j = topicMessageIndex; j < whatsAppChat.orderedMessages.length; j++) {
                    const message = getOrderedMessage(j);
                    if(message.hash != topic.hash && message.fulltimestamp >= topic.fulltimestamp) {
                        topics[i].messages.push(message.hash);
                    }
                }
            } else {

                const nextTopic = whatsAppChat.messageMap[topics[i+1].hash];
                const nextTopicTimestampPlusDay = new Date(nextTopic.fulltimestamp);
                nextTopicTimestampPlusDay.setDate(nextTopicTimestampPlusDay.getDate() + 1);
                let nextTopicMessageIndexFound = false;

                for(let j = topicMessageIndex; j < whatsAppChat.orderedMessages.length; j++) {
                   
                    const message = getOrderedMessage(j);

                    if(message.hash != topic.hash) {

                        if(message.fulltimestamp >= topic.fulltimestamp) {
                            
                            if(message.fulltimestamp >= nextTopic.fulltimestamp && !nextTopicMessageIndexFound) {
                                nextTopicMessageIndexFound = true;
                                topicMessageIndex = j;
                            }

                            if(message.fulltimestamp <= nextTopicTimestampPlusDay.getTime()) {
                                topics[i].messages.push(message.hash);
                            } 

                        } 
                    }
                }

            }
            
        }
    }

    const getOrderedMessage = (index) => {
        return whatsAppChat.messageMap[whatsAppChat.orderedMessages[index]];
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
        addTopic,
        getTopics,
        getFullMessagesInOrder,
        getFullMessage,
        updateTopic,
        deleteTopic,
        createTopic,
        createTopicsFromHashes,
        getFullTopic,
        saveSelectedTopicMesssage,
        removeSelectedTopicMessage,
    };
}

export default DiaryModel;