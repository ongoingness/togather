import DiaryUI from './diary-ui.js';
import DiaryModel from './diary-model.js';
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

                        const parser = WhatsAppChatParser();
                        const whatsAppChat = await parser.start(params.input);                
                        console.log(whatsAppChat);
                        const {messageMap, orderedMessages, users, files} = whatsAppChat;


                        break;
                }

            }
        },
        topicsFound: {
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderTopicsFound(['topic']);
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
                        updateState(STATES.editTopic);
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
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderWriteTopic();
            },
            eventHandler: (e, params) => {

                switch(params.type) {
                    
                    case 'delete-photo':
                        break;

                    case 'done':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsOptions);
                        break;
                }

            }
        },
        selectTopicFromChat: {
            render: () => {
                ui.clearBaseUI();
                ui.startChatUI();
                ui.renderSelectTopicFromChat();
            },
            eventHandler: (e, params) => {

                switch(params.type) {
                    
                    case 'delete-photo':
                        break;

                    case 'done':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsOptions);
                        break;
                }

            }
        },
        editTopic: {
            render: () => {
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderEditTopic();
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'done':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsFound);
                        break;
                }

            }
        },
        selectMessages: {
            render: () => {
                ui.clearBaseUI();
                ui.startChatUI();
                ui.renderSelectMessages();
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'read-more':
                        ui.renderFullTopic('This is the challenge that we selected we were gonna write something about today. Now wer are gonna select every message that is send for today.');
                        break;

                    case 'read-less':
                        let longTopic = 'This is the challenge that we selected we were gonna write something about today. Now wer are gonna select every message that is send for today.';

                        ui.renderShortTopic(longTopic.substring(0, 90));
                        break;

                    case 'topics':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'finish-diary': 
                        updateState(STATES.topicsFound);
                        break;

                }
            
            }   
        }
    }

    let currentState = STATES.topicsFound;
    let previousState = 0;

    const handleEvent = (e, params) => {
        e.stopPropagation();
        console.log(params.type);
        currentState.eventHandler(e, params);
    }

    const updateState = (newState) => {
        previousState = currentState;
        currentState = newState;
        currentState.render();
    }

    const ui = DiaryUI(handleEvent);
    const model = DiaryModel();

    ui.renderBaseUI();
    updateState(STATES.uploadFiles);


}

export default Diary;