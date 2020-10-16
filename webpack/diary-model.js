const emojiRegex = require('emoji-regex');

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

    let title;

    let diaryDocument;

    let participate;

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
                whatsAppChat.users[user].visible = true;

                if(whatsAppChat.users[user].name.length > 17) 
                    whatsAppChat.users[user].name = whatsAppChat.users[user].name.substring(0, 17);

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

    const removeEmojiOnlyMessages = () => {

        const regex = emojiRegex();
        const messagesToBeRemoved = [];

        whatsAppChat.messageMap.forEach( (message, hash) => {
       
            if(message.files.length === 0) {
 
                const textLinesToBeRemoved = [];

                for(const [index, textLine] of message.text.entries()) {
    
                let match;
                let noEmojis = textLine;
                while (match = regex.exec(textLine)) {
                        noEmojis = noEmojis.replace(match[0], '');
                }

                if(noEmojis === '')
                        textLinesToBeRemoved.push(index);
                
                }

                for(const index of textLinesToBeRemoved)
                    message.text.splice(index, 1);
    
                if(message.text.length === 0)
                    messagesToBeRemoved.push(hash);
            
            }

        });

        for(const hash of messagesToBeRemoved)
            whatsAppChat.messageMap.delete(hash);

    }

    const findTopics = () => {

        const topicRegex = RegExp('https://togather.me/topics/[0-9]+');

        const tempTopics = [];
        let startDay = -1;

        whatsAppChat.messageMap.forEach( (message, hash) => {

            if(whatsAppChat.users[message.user].visible) {

                if(message.rawText.length > 0) {
                    const regexResult = topicRegex.exec(message.rawText[0]);

                    if(regexResult != null) {

                        message.text[1] = message.text[1].slice(7);
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

    const sortTopicsByTimestamp = (topics) => topics.sort((a, b) => whatsAppChat.messageMap.get(a.hash).fulltimestamp - whatsAppChat.messageMap.get(b.hash).fulltimestamp);
    
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

    /*
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

    const getTopicWithMessages = (index) => {

        const topic = getTopic(index);

        const selectedMessages = [];

        for(let messageHash of topics[index].selectedMessages) {
            selectedMessages.push(getMessage(messageHash));
        }

        topic.index = index;
        topic.totalOfTopics = topics.length,
        topic.selectedMessages = selectedMessages; 

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

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
      
   
    }

    const deleteTopic = (day) => {
        topics.splice(day, 1);
    
        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
    }
    
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
            if(value.user === "" || whatsAppChat.users[value.user].visible) {
                if(!topics.some(topic => topic.hash === key))
                    messages.push(getMessage(key));
            }
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
                selectedMessages: [],
            });
        }

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);
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
            selectedMessages: [],
        }

        topics.push(topic);

        sortTopicsByTimestamp(topics);
        setTopicsDay(topics);
        setTopicsPart(topics);

    }

    const sortMessagesByTimestamp = (hashList) => hashList.sort((a, b) => whatsAppChat.messageMap.get(a).fulltimestamp - whatsAppChat.messageMap.get(b).fulltimestamp);

    const saveSelectedTopicMesssage = (topicIndex, messageHash) => {
        topics[topicIndex].selectedMessages.push(messageHash);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
    }

    const removeSelectedTopicMessage = (topicIndex, messageHash) => {
        const indexToBeRemoved = topics[topicIndex].selectedMessages.indexOf(messageHash);
        topics[topicIndex].selectedMessages.splice(indexToBeRemoved, 1);
        sortMessagesByTimestamp(topics[topicIndex].selectedMessages);
    }

    const getWhoDiaryIsFor = () => who;

    const setWhoDiaryIsFor = (newWho) => {
        who = newWho;
    }

    const getDiaryTitle = () => title;

    const setDiaryTitle = (newTitle) => {
        title = newTitle;
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

    const getSelectedMessagesHashes = () => {

        const result = new Map();

        for(const topic of topics) {

            for(const selectedMessage of topic.selectedMessages)
                result.set(selectedMessage, {day: topic.day, part: topic.part, timestamp: whatsAppChat.messageMap.get(topic.hash).fulltimestamp});

        }
 

        return result;
    }

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
    
    const changeUserMessagesVisibility = (userHash) => {
        whatsAppChat.users[userHash].visible = !whatsAppChat.users[userHash].visible;
    }

    const setDiaryDocument = (doc) => diaryDocument = doc;
    const getDiaryDocument = () => diaryDocument; 

    const setParticipate = (tempParticipate) => participate = tempParticipate;
    const getParticipate = () => participate; 

    const loadSave = async () => {

        console.log(whatsAppChat);

        whatsAppChat.files.forEach( async(value, key, map) => {
            console.log(value, key);

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
                            console.log(pdfDoc);
                            pdfDoc.getMetadata().then(function(stuff) {
                                const saved = JSON.parse(stuff.info.Keywords);

                                console.log(saved);
                        
                                title = saved.title;
                                who = saved.who;
                                loadUsers(saved.users); 
                                loadTopics(saved.topics);                              

                                console.log(topics);

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