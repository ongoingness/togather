import DiaryUI from './diary-ui.js';
import DiaryModel from './diary-model.js';
import DiaryTemplates from './diary-templates.js';
import WhatsAppChatParser from './whatapp-chat-parser.js';

const Diary = () => {

    const STATES = {
        uploadFiles: {
            render: () => {    
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderUploadFiles();
            },
            eventHandler: async (e, params) => {

                switch(params.type) {
                  
                    case 'upload-files': 
                        const whatsAppChat = await WhatsAppChatParser().start(params.input);              
                        model.setWhatsAppChat(whatsAppChat);
                        model.findTopics();
                        updateState(STATES.topicsFound);
                        break;

                }

            }
        },
        topicsFound: {
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderTopicsFound(model.getTopics());
            },
            eventHandler: (e, params) => {
                console.log(params.type);
                switch(params.type) {
                  
                    case 'add-topic': 
                        updateState(STATES.topicsOptions);
                        break;

                    case 'thats-all':
                        updateState(STATES.selectMessages);
                        break;

                    case 'edit-topic':
                        updateStateWithParameters(STATES.editTopic, { hash: params.hash });
                        break;

                    case 'delete-topic':
                        model.deleteTopic(params.day);
                        ui.removeTopics();
                        ui.renderTopics(model.getTopics());
                        break;
                }
            }
        },
        topicsOptions: {
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderAddTopicOptions();
            },
            eventHandler: (e, params) => {
        
                switch(params.type) {

                    case 'write-topic':
                        updateState(STATES.writeTopic);
                        break;

                    case 'select-from-chat':
                        updateState(STATES.selectTopicFromChat);
                        break;

                    case 'back': 
                        updateState(STATES.topicsFound);
                        break;
                }
            }
        },
        writeTopic: {
            variables: {
                tempMedia: [],
            },
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderWriteTopic();
            },
            eventHandler: (e, params) => {

                switch(params.type) {
                    
                    case 'delete-photo':
                        console.log(params.file);
                        const index = STATES.writeTopic.variables.tempMedia.indexOf(params.file);
                        console.log(index);
                        STATES.writeTopic.variables.tempMedia.splice(index, 1);
                        console.log(STATES.writeTopic.variables.tempMedia);
                        break;

                    case 'done':
                        model.createTopic({
                            text: params.text, 
                            timestamp: params.timestamp
                        });
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsOptions);
                        break;

                    case 'upload-files':
                        STATES.writeTopic.variables.tempMedia = STATES.writeTopic.variables.tempMedia.concat(params.files);
                        console.log(STATES.writeTopic.variables.tempMedia);
                        break;
                }

            }
        },
        selectTopicFromChat: {
            variables: {
                selectedMessages: [],
            },
            render: () => {
                ui.clearBaseUI();
                ui.startChatUI();
                ui.renderSelectTopicFromChat(model.getMessages());
            },
            eventHandler: (e, params) => {

                switch(params.type) {
                    
                    case 'deselected-message':
                        const index = STATES.selectTopicFromChat.variables.selectedMessages.indexOf(params.hash);
                        STATES.selectTopicFromChat.variables.selectedMessages.splice(index, 1);
                        console.log(STATES.selectTopicFromChat.variables.selectedMessages);
                        break;
                    case 'selected-message':
                        STATES.selectTopicFromChat.variables.selectedMessages.push(params.hash);
                        console.log(STATES.selectTopicFromChat.variables.selectedMessages);
                        break;

                    case 'done':
                        model.createTopicsFromHashes(STATES.selectTopicFromChat.variables.selectedMessages);
                        STATES.selectTopicFromChat.variables.selectedMessages = [];
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        STATES.selectTopicFromChat.variables.selectedMessages = [];
                        updateState(STATES.topicsOptions);
                        break;
                }

            }
        },
        editTopic: {
            render: () => {
                const hash = STATES.editTopic.parameters.hash;
                const topic = model.getMessage(hash);
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderEditTopic(topic);
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'done':
                        console.log(params);
                        model.updateTopic({
                            hash: params.hash,
                            text: params.text, 
                            timestamp: params.timestamp
                        });
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsFound);
                        break;
                }

            }
        },
        selectMessages: {
            variables: {
                topic: 0,
                totalOfTopics: 0,
                text: '',
            },
            render: () => {
                ui.clearBaseUI();
                ui.startChatUI();
                const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                STATES.selectMessages.variables.totalOfTopics = fullTopic.totalOfTopics;
                ui.renderSelectMessages(fullTopic);
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'next-day':
                        if(STATES.selectMessages.variables.topic < STATES.selectMessages.variables.totalOfTopics-1) {
                            STATES.selectMessages.variables.topic += 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            STATES.selectMessages.variables.text = fullTopic.text;
                            ui.clearDay();
                            ui.renderDay(fullTopic);
                        }
                        break;

                    case 'prev-day':
                        if(STATES.selectMessages.variables.topic > 0) {
                            STATES.selectMessages.variables.topic -= 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            STATES.selectMessages.variables.text = fullTopic.text;
                            ui.clearDay();
                            ui.renderDay(fullTopic);
                        }
                        break;

                    case 'goto-topic':
                        STATES.selectMessages.variables.topic = params.topic;
                        const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                        STATES.selectMessages.variables.text = fullTopic.text;
                        ui.clearDay();
                        ui.renderDay(fullTopic);
                        break;

                    case 'read-more':
                        ui.renderFullTopic(STATES.selectMessages.variables.text);
                        break;

                    case 'read-less':
                        ui.renderShortTopic(STATES.selectMessages.variables.text);
                        break;

                    case 'selected-message':
                        model.saveSelectedTopicMesssage(STATES.selectMessages.variables.topic, params.hash);
                        break;

                    case 'deselected-message':
                        model.removeSelectedTopicMessage(STATES.selectMessages.variables.topic, params.hash);
                        break;

                    case 'topics':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'finish-diary': 
                        DiaryTemplates().generatePDF(model.getTopicsWithMessages());             
                        break;

                }
            
            }   
        }
    }

    let currentState = STATES.topicsFound;
    let previousState = 0;

    const handleEvent = (e, params) => {
        e.stopPropagation();
        console.log(params);
        currentState.eventHandler(e, params);
    }

    const updateState = (newState) => {
        previousState = currentState;
        currentState = newState;
        currentState.render();
    }

    const updateStateWithParameters = (newState, parameters) => {
        previousState = currentState;
        currentState = newState;
        currentState['parameters'] = parameters;
        currentState.render();
    }

    const ui = DiaryUI(handleEvent);
    const model = DiaryModel();

    ui.renderBaseUI();
    updateState(STATES.uploadFiles);

}

export default Diary;