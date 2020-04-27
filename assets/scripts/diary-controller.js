const DiaryController = () => {

    const STATES = {
        waitForFiles: 0,
        topicsFound: {
            render: () => {
                ui.clearTopicUI();
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
                }
            }
        },
        topicsOptions: {
            render: () => {
                ui.clearTopicUI();
                ui.renderAddTopicOptions();
            },
            eventHandler: (e, params) => {
        
                switch(params.type) {

                    case 'write-topic':
                        updateState(STATES.writeTopic);
                        break;

                    case 'select-from-chat':
                        break;

                    case 'back': 
                        updateState(STATES.topicsFound);
                        break;
                }
            }
        },
        writeTopic: {
            render: () => {
                ui.clearTopicUI();
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
    
    ui.startTopicUI();
    updateState(STATES.writeTopic);


}