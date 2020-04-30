const DiaryController = () => {

    const STATES = {
        waitForFiles: {
            render: () => {

            },
            eventHandler: (e, params) => {

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
            
            }   
        }
    }

    let currentState = STATES.topicsFound;
    let previousState = 0;

    const handleEvent = (e, params) => {
        e.stopPropagation();
        currentState.eventHandler(e, params);
    }

    const updateState = (newState) => {
        previousState = currentState;
        currentState = newState;
        currentState.render();
    }

    const ui = DiaryUI(handleEvent);

    ui.renderBaseUI();
    updateState(STATES.selectMessages);


}