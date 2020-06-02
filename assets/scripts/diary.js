---
---

import DiaryUI from './diary-ui.js';
import DiaryModel from './diary-model.js';
import DiaryTemplates from './diary-templates.js';
import WhatsAppChatParser from './whatapp-chat-parser.js';

const Diary = () => {

    const STATES = {
        uploadFiles: {
            variables: {
                files: new Map(),
            },
            render: () => {    
                
                ui.renderSiteHeader();
                ui.renderUploadFiles();
                ui.renderSiteFooter();
                
                //ui.clearBaseUI();
                //ui.startTopicUI();
                //ui.renderUploadFiles();
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
                        const whatsAppChat = await WhatsAppChatParser().start(Array.from(STATES.uploadFiles.variables.files.values()));              
                        model.setWhatsAppChat(whatsAppChat);
                        model.findTopics();
                        updateState(STATES.topicsFound);
                        break;

                    case 'delete-file':
                        STATES.uploadFiles.variables.files.delete(params.filename);
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
                        const index = STATES.writeTopic.variables.tempMedia.indexOf(params.file);
                        STATES.writeTopic.variables.tempMedia.splice(index, 1);
                        break;

                    case 'done':
                        model.createTopic({
                            text: params.text, 
                            timestamp: params.timestamp,
                            tempFiles: STATES.writeTopic.variables.tempMedia,
                        });
                        STATES.writeTopic.variables.tempMedia = []
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'back': 
                        updateState(STATES.topicsOptions);
                        break;

                    case 'upload-files':
                        STATES.writeTopic.variables.tempMedia = STATES.writeTopic.variables.tempMedia.concat(params.files);
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
            variables: {
                tempMedia: [],
            },
            render: () => {
                const hash = STATES.editTopic.parameters.hash;
                const topic = model.getMessage(hash);
                STATES.editTopic.variables.tempMedia = topic.files;
                console.log(STATES.editTopic.variables.tempMedia);
                ui.clearBaseUI();
                ui.startTopicUI();
                ui.renderEditTopic(topic);
            },
            eventHandler: (e, params) => {

                switch(params.type) {

                    case 'delete-photo':
                        console.log(STATES.editTopic.variables.tempMedia);
                        const index = STATES.editTopic.variables.tempMedia.indexOf(params.file);
                        STATES.editTopic.variables.tempMedia.splice(index, 1);
                        console.log(STATES.editTopic.variables.tempMedia);
                        break;

                    case 'upload-files':
                        STATES.editTopic.variables.tempMedia = STATES.editTopic.variables.tempMedia.concat(params.files);
                        break;

                    case 'done':
                       
                        model.updateTopic({
                            hash: params.hash,
                            text: params.text, 
                            timestamp: params.timestamp,
                            tempFiles: STATES.editTopic.variables.tempMedia,
                        });
                        STATES.editTopic.variables.tempMedia = []
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
                page: 1,
            },
            render: async () => {
                ui.clearBaseUI();
                ui.startChatUI();
                const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                STATES.selectMessages.variables.totalOfTopics = fullTopic.totalOfTopics;
                STATES.selectMessages.variables.text = fullTopic.text.join(' ');
                ui.renderSelectMessages(fullTopic, model.getMessages());
                if(window.innerWidth > 700) {
                    let doc3 = await DiaryTemplates().generatePDF(model.getTopicsWithMessages(), STATES.selectMessages.variables.topic);
                    DiaryTemplates().previewPdf(doc3, STATES.selectMessages.variables.page);
                }
            },
            eventHandler: async(e, params) => {

                switch(params.type) {

                    case 'next-day':
                        if(STATES.selectMessages.variables.topic < STATES.selectMessages.variables.totalOfTopics-1) {
                            STATES.selectMessages.variables.topic += 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            STATES.selectMessages.variables.text = fullTopic.text.join(' ');
                            ui.clearDay();
                            ui.renderDay(fullTopic, model.getMessages());
                        }
                        break;

                    case 'prev-day':
                        if(STATES.selectMessages.variables.topic > 0) {
                            STATES.selectMessages.variables.topic -= 1;
                            const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                            STATES.selectMessages.variables.text = fullTopic.text.join(' ');
                            ui.clearDay();
                            ui.renderDay(fullTopic, model.getMessages());
                        }
                        break;

                    case 'goto-topic':
                        STATES.selectMessages.variables.topic = params.topic;
                        const fullTopic = model.getTopicWithMessages(STATES.selectMessages.variables.topic);
                        STATES.selectMessages.variables.text = fullTopic.text.join(' ');
                        ui.clearDay();
                        ui.renderDay(fullTopic, model.getMessages());
                        break;

                    case 'read-more':
                        ui.renderFullTopic(STATES.selectMessages.variables.text);
                        break;

                    case 'read-less':
                        ui.renderShortTopic(STATES.selectMessages.variables.text);
                        break;

                    case 'selected-message':
                        model.saveSelectedTopicMesssage(STATES.selectMessages.variables.topic, params.hash);
                        if(window.innerWidth > 700) {
                            let doc1 = await DiaryTemplates().generatePDF(model.getTopicsWithMessages(), STATES.selectMessages.variables.topic);

                            if(STATES.selectMessages.variables.page < doc1.internal.getNumberOfPages())
                                STATES.selectMessages.variables.page = doc1.internal.getNumberOfPages();

                            DiaryTemplates().previewPdf(doc1);
                        }
                        break;

                    case 'deselected-message':
                        model.removeSelectedTopicMessage(STATES.selectMessages.variables.topic, params.hash);
                        if(window.innerWidth > 700) {


                            let doc2 = await DiaryTemplates().generatePDF(model.getTopicsWithMessages(), STATES.selectMessages.variables.topic);

                            if(STATES.selectMessages.variables.page > doc2.internal.getNumberOfPages())
                                STATES.selectMessages.variables.page = doc2.internal.getNumberOfPages();

                            DiaryTemplates().previewPdf(doc2);
                        }
                        break;

                    case 'topics':
                        updateState(STATES.topicsFound);
                        break;
                    
                    case 'finish-diary': 
                        const topicss = model.getTopicsWithMessages();
                        const doc = await DiaryTemplates().generatePDF(topicss);             
                        DiaryTemplates().downloadPdf(doc);
                        const dataUriString = DiaryTemplates().getDataUriStringPdf(doc);
                        const previewBody = DiaryUI().renderPdfPreview(dataUriString);
                        const previewWindow = window.open("", '__blank');
                        previewWindow.document.body.appendChild(previewBody);
                        break;
                    
                    case 'next-page':
                        if(window.innerWidth > 700) {
                            let doc4 = await DiaryTemplates().generatePDF(model.getTopicsWithMessages(), STATES.selectMessages.variables.topic);
                            if(STATES.selectMessages.variables.page + 1 <= doc4.internal.getNumberOfPages()) {
                                STATES.selectMessages.variables.page = STATES.selectMessages.variables.page + 1;
                                DiaryTemplates().previewPdf(doc4, STATES.selectMessages.variables.page);
                            }

                        }
                        break;
                        
                    case 'prev-page':
                        if(window.innerWidth > 700) {
                            if(STATES.selectMessages.variables.page - 1 >= 1) {
                                let doc5 = await DiaryTemplates().generatePDF(model.getTopicsWithMessages(), STATES.selectMessages.variables.topic);
                                STATES.selectMessages.variables.page = STATES.selectMessages.variables.page-1;
                                DiaryTemplates().previewPdf(doc5, STATES.selectMessages.variables.page);
                            }
                        }
                        break;

                }
            
            }   
        },
        previewPdf: {

            render: async () => {
                
  
            },
            eventHandler: async(e, params) => {

            },
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

    //ui.renderBaseUI();
    updateState(STATES.uploadFiles);

}

export default Diary;