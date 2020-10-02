import DiaryUI from './diary-ui.js';
import DiaryModel from './diary-model.js';
import DiaryTemplates from './diary-templates.js';
import WhatsAppChatParser from './whatapp-chat-parser.js';
import DataCollection from './data-collection.js';
import { checkBrowser } from './utils.js';

const Diary = () => {

    const STATES = {
        uploadFiles: {
            variables: {
                files: new Map(),
            },
            render: () => {    
                ui.renderUploadFiles();
            },
            eventHandler: async (e, params) => {

                switch(params.type) {
                  
                    case 'upload-files':
                        for(let file of params.files) {
                            if(!STATES.uploadFiles.variables.files.has(file.name)) {
                                STATES.uploadFiles.variables.files.set(file.name, file);
                                ui.renderFile(file);
                            }
                        }
                        break;

                    case 'start-assembling':
                        try {
                            const whatsAppChat = await WhatsAppChatParser().start(Array.from(STATES.uploadFiles.variables.files.values()));              
                            model.setWhatsAppChat(whatsAppChat);
                            model.removeEmojiOnlyMessages();
                            model.findTopics();
                            STATES.uploadFiles.variables.files = new Map();
                            updateState(STATES.diarySteps);
                        } catch (e) {
                            if(e === 'No chat file found')
                                ui.renderUploadErrorModal();
                        }
                        break;

                    case 'delete-file':
                        STATES.uploadFiles.variables.files.delete(params.filename);
                        break;

                }

            }
        },
        diarySteps: {
            render: () => {
                ui.renderDiarySteps(); 
            },
            eventHandler: (e, params) => {
            
                switch(params.type) {
                    
                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'go-to-step-1':
                        updateState(STATES.whoTheDiaryIsFor);
                        break;

                }

            }
        },
        whoTheDiaryIsFor: {
            render: () => {
                ui.renderWhoTheDiaryIsFor(model.getWhoDiaryIsFor());
            },
            eventHandler: (e, params) => {
            
                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'go-to-step-2':
                        model.setWhoDiaryIsFor(params.who);
                        updateState(STATES.whoContributed);
                        break;

                }

            }
        },
        whoContributed: {
            render:() => {
                ui.renderWhoContributed(model.getUsers());
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'edit-name':
                        model.updateUsername(params.hash, params.name);
                        break;

                    case 'go-to-step-1':
                        updateState(STATES.whoTheDiaryIsFor);
                        break;

                    case 'go-to-step-3':
                        updateState(STATES.topicsFound);
                        break;

                    case 'change-visibility':
                        model.changeUserMessagesVisibility(params.hash);
                        break;

                }

            }
        },
        topicsFound: {
            render: () => {
                ui.renderTopicsFound(model.getTopics());
            },
            eventHandler: (e, params) => {
                switch(params.type) {
                  
                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

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
                        break;

                    case 'write-topic':
                        updateState(STATES.writeTopic);
                        break;

                    case 'select-from-chat':
                        updateState(STATES.selectTopicFromChat);
                        break;

                    case 'go-to-step-2':
                        updateState(STATES.whoContributed);
                        break;

                    case 'go-to-step-4':
                        updateState(STATES.selectMessages);
                        break;
                }
            }
        },
        writeTopic: {
            variables: {
                tempMedia: new Map(),
            },
            render: () => {
                ui.renderWriteTopic();
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;
                    
                    case 'delete-photo':
                        const media = STATES.writeTopic.variables.tempMedia.get(params.index);
                        const fileIndex = media.indexOf(params.file);
                        media.splice(fileIndex, 1)
                        STATES.writeTopic.variables.tempMedia.set(params.index, media);
                        break;

                    case 'done':
                        for(const [index, {text, timestamp}] of params.topics.entries()) {
                            model.createTopic({
                                text, 
                                timestamp,
                                tempFiles: STATES.writeTopic.variables.tempMedia.has(index) ? STATES.writeTopic.variables.tempMedia.get(index) : [],
                            });   
                        }
                        STATES.writeTopic.variables.tempMedia = new Map();
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back':
                        STATES.writeTopic.variables.tempMedia = new Map();
                        updateState(STATES.topicsFound);
                        break;

                    case 'upload-files':
                        if(STATES.writeTopic.variables.tempMedia.has(params.index))
                            STATES.writeTopic.variables.tempMedia.set(params.index, STATES.writeTopic.variables.tempMedia.get(params.index).concat(params.files));
                        else
                            STATES.writeTopic.variables.tempMedia.set(params.index, params.files);
                        break;
                }

            }
        },
        selectTopicFromChat: {
            variables: {
                selectedMessages: [],
            },
            render: () => {
                ui.renderSelectTopicFromChat(model.getMessages());
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;
                    
                    case 'deselected-message':
                        const index = STATES.selectTopicFromChat.variables.selectedMessages.indexOf(params.hash);
                        STATES.selectTopicFromChat.variables.selectedMessages.splice(index, 1);
                        break;
                    case 'selected-message':
                        STATES.selectTopicFromChat.variables.selectedMessages.push(params.hash);
                        break;

                    case 'done':
                        model.createTopicsFromHashes(STATES.selectTopicFromChat.variables.selectedMessages);
                        STATES.selectTopicFromChat.variables.selectedMessages = [];
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        STATES.selectTopicFromChat.variables.selectedMessages = [];
                        updateState(STATES.topicsFound);
                        break;

                }

            }
        },
        editTopic: {
            variables: {
                tempMedia: new Map(),
            },
            render: () => {
                const hash = STATES.editTopic.parameters.hash;
                const topic = model.getMessage(hash);
                STATES.editTopic.variables.tempMedia.set("0", topic.files);
                ui.renderEditTopic(topic);
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'delete-photo':
                        const media = STATES.editTopic.variables.tempMedia.get(params.index);
                        const fileIndex = media.indexOf(params.file);
                        media.splice(fileIndex, 1)
                        STATES.editTopic.variables.tempMedia.set(params.index, media);

                        break;

                    case 'upload-files':
                        if(STATES.editTopic.variables.tempMedia.has(params.index))
                        STATES.editTopic.variables.tempMedia.set(params.index, STATES.editTopic.variables.tempMedia.get(params.index).concat(params.files));
                    else
                        STATES.editTopic.variables.tempMedia.set(params.index, params.files);
                        break;

                    case 'done':
                        for(const [index, {text, timestamp}] of params.topics.entries()) {
                            model.updateTopic({
                                hash: params.hash,
                                text, 
                                timestamp,
                                tempFiles: STATES.editTopic.variables.tempMedia.has(index) ? STATES.editTopic.variables.tempMedia.get(index) : [],
                            });   
                        }
                        STATES.editTopic.variables.tempMedia = new Map();
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back':
                        STATES.editTopic.variables.tempMedia = new Map();
                        updateState(STATES.topicsFound);
                        break;
                }

            }
        },
        selectMessages: {
            variables: {
                topic: 0,
                totalOfTopics: 0,
            },
            render: async () => {
                const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                STATES.selectMessages.variables.totalOfTopics = fullTopic.totalOfTopics;
                ui.renderSelectMessages(fullTopic, model.getMessages(), model.getSelectedMessagesHashes());
            },
            eventHandler: async(e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'next-day':
                        if(STATES.selectMessages.variables.topic < STATES.selectMessages.variables.totalOfTopics-1) {
                            STATES.selectMessages.variables.topic += 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            ui.clearDay();
                            ui.renderDay(fullTopic, model.getMessages(), model.getSelectedMessagesHashes());
                        }
                        break;

                    case 'prev-day':
                        if(STATES.selectMessages.variables.topic > 0) {
                            STATES.selectMessages.variables.topic -= 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            ui.clearDay();
                            ui.renderDay(fullTopic, model.getMessages(), model.getSelectedMessagesHashes());
                        }
                        break;

                    case 'goto-topic':
                        STATES.selectMessages.variables.topic = params.topic;
                        const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                        ui.clearDay();
                        ui.renderDay(fullTopic, model.getMessages(), model.getSelectedMessagesHashes());
                        break;

                    case 'selected-message':
                        model.saveSelectedTopicMesssage(STATES.selectMessages.variables.topic, params.hash);
                        break;

                    case 'deselected-message':
                        model.removeSelectedTopicMessage(STATES.selectMessages.variables.topic, params.hash);
                        break;
                                
                    case 'go-to-step-3':
                        STATES.selectMessages.variables.topic = 0;
                        STATES.selectMessages.variables.totalOfTopics = 0
                        updateState(STATES.topicsFound);
                        break;

                    case 'go-to-step-5':
                        STATES.selectMessages.variables.topic = 0;
                        STATES.selectMessages.variables.totalOfTopics = 0
                        const doc = await templates.generatePDF(model.getDiary());
                        model.setDiaryDocument(doc);
                        updateState(STATES.reviewDiary);
                        break;

                }
            
            }   
        },
        reviewDiary: {
            variables: {
                currentPage: 1,
                canvas: undefined,
            },
            render: async() => {
                const doc = model.getDiaryDocument();
                if(doc != undefined) {
                    ui.renderReviewDiary();
                    const {isSafari} = checkBrowser();
                    if(isSafari) {
                        ui.renderPreviewWithDataUri(templates.getDataUriStringPdf(model.getDiaryDocument()));
                    } else {
                        STATES.reviewDiary.variables.canvas = ui.renderPreviewDiaryPage();
                        templates.previewPdf(doc, 1, STATES.reviewDiary.variables.canvas);
                        /*
                        for(let i = 1; i <= doc.getNumberOfPages(); i++) {
                            const canvas = ui.renderPreviewDiaryPage();
                            templates.previewPdf(doc, i, canvas);
                        }*/
                    }
                }
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'next-page':
                        STATES.reviewDiary.variables.currentPage += 1;
                        templates.previewPdf(model.getDiaryDocument(), STATES.reviewDiary.variables.currentPage, STATES.reviewDiary.variables.canvas);
                        break;

                    case 'previous-page':
                        STATES.reviewDiary.variables.currentPage -= 1;
                        templates.previewPdf(model.getDiaryDocument(), STATES.reviewDiary.variables.currentPage, STATES.reviewDiary.variables.canvas);
                        break;

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'go-to-step-4':
                        updateState(STATES.selectMessages);
                        break;

                    case 'go-to-step-6':
                        updateState(STATES.downloadDiary);
                        break;
                
                }

            }

        },
        downloadDiary: {
            render: () => {
                ui.renderDownloadDiary();
            },
            eventHandler: async(e,params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'download-diary':
                        const doc = model.getDiaryDocument();
                        if(doc != undefined)
                            templates.downloadPdf(doc, `For ${model.getWhoDiaryIsFor()} - ToGather`);
                        updateState(STATES.share);
                        break;

                }

            }
        },
        askFeedback: {
            render: () => {
                ui.renderAskFeedback();
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'give-feedback':
                        updateState(STATES.giveFeedback);
                        break;

                    case 'no':
                        window.location.href = `{{ site.url }}{{ site.baseurl }}/`;
                        break;
                }

            }
        },
        giveFeedback: {
            render: () => {
                ui.renderGiveFeedback();
            },
            eventHandler: async(e, params) => {

                switch(params.type) {

                    case 'give-feedback':
                        await DataCollection().sendFeedback(params.feedback, params.consent);
                        updateState(STATES.share);
                        break
                }

            }
        },
        share: {
            render: () => {
                ui.renderShare();
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'share':
                        const link = (navigator.userAgent.match(/Android/i) 
                                    || navigator.userAgent.match(/webOS/i) 
                                    || navigator.userAgent.match(/iPhone/i)  
                                    || navigator.userAgent.match(/iPad/i)  
                                    || navigator.userAgent.match(/iPod/i) 
                                    || navigator.userAgent.match(/BlackBerry/i) 
                                    || navigator.userAgent.match(/Windows Phone/i)) ? 
                                    `https://api.whatsapp.com/send?text=${encodeURI('https://togather.me/')}`:
                                    `https://web.whatsapp.com/send?text=${encodeURI('https://togather.me/')}`;
                        
                        window.open(link, '_blank');
                        window.location.href = `{{ site.url }}{{ site.baseurl }}/`;
                        break;

                    case 'share-twitter':
                        const text = 'Gathering in stories when being together is not possible #togather';
                        const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURI(text)}&url=https://togather.me`;
                        window.fathom.trackGoal('LRZPNF3C', 0);
                        window.open(twitterLink, '_blank');
                        window.location.href = `{{ site.url }}{{ site.baseurl }}/`;
                        break

                    case 'no':
                        window.location.href = `{{ site.url }}{{ site.baseurl }}/`;
                        break;
                }

            }
        },
    }

    let currentState = STATES.topicsFound;

    const handleEvent = (e, params) => {
        e.stopPropagation();
        currentState.eventHandler(e, params);
    }

    const updateState = (newState) => {
        currentState = newState;
        ui.clearPage();
        currentState.render();
    }

    const updateStateWithParameters = (newState, parameters) => {
        currentState = newState;
        currentState['parameters'] = parameters;
        ui.clearPage();
        currentState.render();
    }

    const templates = DiaryTemplates();
    const ui = DiaryUI(handleEvent);
    const model = DiaryModel();

    updateState(STATES.uploadFiles);

};

export default Diary;