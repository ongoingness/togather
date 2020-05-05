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

        let previousTopic;
        let currentTopic;

        for(let hash of whatsAppChat.orderedMessages) {

            let message = whatsAppChat.messageMap[hash];

            let isTopic = false;
            for(let link of message.links) {
                if(topicRegex.exec(link) != null) {
                    isTopic = true;
                    break;
                }
            }

            if(isTopic) {

                if(currentTopic != undefined) {
                    tempTopics.push({...currentTopic});
                }
                currentTopic = {
                    timestamp: message.datetimestamp,
                    hash,
                    messages: [],
                    selectedMessages: [],
                };

            } else {
                if(currentTopic != undefined) {
                    currentTopic.messages.push(hash)
                }
            }
              
        }

        if(currentTopic != undefined) {
            tempTopics.push({...currentTopic});
        }

        topics = tempTopics;
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
                timestamp: topic.timestamp,
                text: whatsAppChat.messageMap[topic.hash].text,
            });
        }
        return resultTopics;
    }

    const getFullMessagesInOrder = () => {

        const messages = [];

        for(let hash of whatsAppChat.orderedMessages) {
            messages.push(whatsAppChat.messageMap[hash]);
        }

        return messages;
    }

    return {
        setWhatsAppChat,
        findTopics,
        addTopic,
        getTopics,
        getFullMessagesInOrder,
    };
}

export default DiaryModel;