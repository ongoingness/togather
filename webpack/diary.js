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
                console.log(model.getDiaryTitle());
                ui.renderWhoTheDiaryIsFor(model.getWhoDiaryIsFor(), model.getDiaryTitle());
            },
            eventHandler: (e, params) => {
            
                switch(params.type) {

                    case 'stop-assembling':
                        updateState(STATES.uploadFiles);
                        break;

                    case 'go-to-step-2':
                        model.setWhoDiaryIsFor(params.who);
                        model.setDiaryTitle(params.diaryTitle);
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
                
                worker: undefined,
                pages:  undefined,

                canvas: new Map(),
                canvasOrder: ['ca','cb','cc'],

            },
            render: async() => {

                STATES.reviewDiary.variables.currentPage = 1;
                STATES.reviewDiary.variables.canvas = new Map();
                STATES.reviewDiary.variables.canvasOrder = ['ca','cb','cc'];

                const doc = model.getDiaryDocument();
               // var string = doc.output('datauristring');
                //var embed = "<embed width='100%' height='100%' src='" + string + "'/>"

                //doc.output('dataurlnewwindow');
                //<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring") + '"></iframe></body></html>'
                
                //console.log(doc.output("datauristring"));
                
                //STATES.reviewDiary.variables.worker = templates.startPreviewPdfWorker(doc);

                if(doc != undefined) {
                    ui.renderReviewDiary();
                    
                    const {isSafari} = checkBrowser();
                    if(isSafari) {
                        ui.renderPreviewWithDataUri(templates.getDataUriStringPdf(doc));
                    
                    } else {
                        ui.renderPreviewOnIframeWithDataUri(templates.getDataUriStringPdf(doc));
                    }
                        /*
                        STATES.reviewDiary.variables.pages = await templates.previewPdf4(STATES.reviewDiary.variables.worker);
                        const ca =  ui.renderPreviewDiaryPage('ca', false);
                        const cb =  ui.renderPreviewDiaryPage('cb', false);
                        const cc =  ui.renderPreviewDiaryPage('cc', false);
                        STATES.reviewDiary.variables.canvas.set('ca', ca);
                        STATES.reviewDiary.variables.canvas.set('cb', cb);
                        STATES.reviewDiary.variables.canvas.set('cc', cc);

                        templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[1], cb);

                        ui.displayPreviewCanvas(STATES.reviewDiary.variables.canvasOrder[1]);
*/


                        /*
                        templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], cb);
                        if(STATES.reviewDiary.variables.currentPage + 1 < model.getDiaryDocument().getNumberOfPages()-1) {
                            templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[2], cc);
                        }*/

                        //STATES.reviewDiary.variables.canvas = ui.renderPreviewDiaryPage();
                        
                        //STATES.reviewDiary.variables.pages = await templates.previewPdf4(STATES.reviewDiary.variables.worker);
                        //const c = ui.renderPreviewDiaryPage(STATES.reviewDiary.variables.currentPage, true);
                        //templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], c);
                        //STATES.reviewDiary.variables.canvas.set(STATES.reviewDiary.variables.currentPage, c);

                        //const d = c.toDataURL("image/png");
                        //console.log(d);
                        /*
                        if(STATES.reviewDiary.variables.currentPage + 1 < model.getDiaryDocument().getNumberOfPages()-1) {
                            const c2 = ui.renderPreviewDiaryPage(2, false);
                            templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[2], c2);
                            STATES.reviewDiary.variables.canvas.set(2, c2);
                        }
                */
                        
                   
                        

                    //}
                }
            },
            eventHandler: (e, params) => {

                switch(params.type) {
/*
                    case 'next-page':
              
                        if(STATES.reviewDiary.variables.currentPage + 1 <= model.getDiaryDocument().getNumberOfPages()){
                            STATES.reviewDiary.variables.currentPage += 1;
                            templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], STATES.reviewDiary.variables.canvas.get(STATES.reviewDiary.variables.canvasOrder[1]));
                            /*
                            console.log('start', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                            ui.hidePreviewCanvas(STATES.reviewDiary.variables.canvasOrder[1]);
                            STATES.reviewDiary.variables.currentPage += 1;
                            ui.displayPreviewCanvas(STATES.reviewDiary.variables.canvasOrder[2]);
                            console.log('end', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                            
                            const nextCanvas = `${STATES.reviewDiary.variables.canvasOrder[0]}`;
                            STATES.reviewDiary.variables.canvasOrder.shift();
                            STATES.reviewDiary.variables.canvasOrder.push(nextCanvas);
                            
                            if(STATES.reviewDiary.variables.currentPage + 1 <= model.getDiaryDocument().getNumberOfPages()) {
                                console.log('end2', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                                templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage + 1], STATES.reviewDiary.variables.canvas.get(nextCanvas));
                            }
                            console.log('');*/

                            /*
                            ui.hidePreviewPage(STATES.reviewDiary.variables.currentPage);
                            STATES.reviewDiary.variables.currentPage += 1;
                            ui.displayPreviewPage(STATES.reviewDiary.variables.currentPage);

                            if(STATES.reviewDiary.variables.currentPage < model.getDiaryDocument().getNumberOfPages()-1 && !STATES.reviewDiary.variables.canvas.has(STATES.reviewDiary.variables.currentPage + 1)) {
                                const cn = ui.renderPreviewDiaryPage(STATES.reviewDiary.variables.currentPage + 1, false);
                                templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage + 1], cn);
                                STATES.reviewDiary.variables.canvas.set(STATES.reviewDiary.variables.currentPage + 1, cn);
                            }
                                */
                            //const c = ui.renderPreviewDiaryPage();
                            //templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], c);
 //                       }
 //                       break;
/*
                    case 'previous-page':
                    
                        if(STATES.reviewDiary.variables.currentPage - 1 >= 1){
                            STATES.reviewDiary.variables.currentPage -= 1;
                            templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], STATES.reviewDiary.variables.canvas.get(STATES.reviewDiary.variables.canvasOrder[1]));
                            */
                            /*
                            console.log('start', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                            ui.hidePreviewCanvas(STATES.reviewDiary.variables.canvasOrder[1]);
                            STATES.reviewDiary.variables.currentPage -= 1;
                            ui.displayPreviewCanvas(STATES.reviewDiary.variables.canvasOrder[0]);
                            console.log('end', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                            
                            const nextCanvas = `${STATES.reviewDiary.variables.canvasOrder[2]}`;
                            STATES.reviewDiary.variables.canvasOrder.pop();
                            STATES.reviewDiary.variables.canvasOrder.unshift(nextCanvas);

                            if(STATES.reviewDiary.variables.currentPage - 1 >= 1) {
                                console.log('end2', STATES.reviewDiary.variables.canvasOrder, model.getDiaryDocument().getNumberOfPages(), STATES.reviewDiary.variables.currentPage);
                                templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage - 1], STATES.reviewDiary.variables.canvas.get(nextCanvas));
                            }
                            */

/*
                            ui.hidePreviewPage(STATES.reviewDiary.variables.currentPage);
                            STATES.reviewDiary.variables.currentPage -= 1;
                            ui.displayPreviewPage(STATES.reviewDiary.variables.currentPage);
*/
                            //templates.renderPageToCanvas(STATES.reviewDiary.variables.pages[STATES.reviewDiary.variables.currentPage], STATES.reviewDiary.variables.canvas);
//                        }
//                        break;

                    

                    case 'stop-assembling':
                       // templates.destroyPreviewPdfWorker(STATES.reviewDiary.variables.worker);
                        updateState(STATES.uploadFiles);
                        break;

                    case 'go-to-step-4':
                        //templates.destroyPreviewPdfWorker(STATES.reviewDiary.variables.worker);
                        updateState(STATES.selectMessages);
                        break;

                    case 'go-to-step-6':
                        //templates.destroyPreviewPdfWorker(STATES.reviewDiary.variables.worker);
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
                ui.renderShare(previousState === STATES.giveFeedback ? 'Thanks for your feedback!' : '{% t diary.dd1 %}');
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
                        break;

                    case 'share-twitter':
                        const text = 'Gathering in stories when being together is not possible #togather';
                        const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURI(text)}&url=https://togather.me`;
                        window.fathom.trackGoal('LRZPNF3C', 0);
                        window.open(twitterLink, '_blank');
                        break

                    case 'no':
                        window.location.href = `{{ site.url }}{{ site.baseurl }}/`;
                        break;
                }

            }
        },
    }

    let currentState = STATES.topicsFound;
    let previousState;

    const handleEvent = (e, params) => {
        e.stopPropagation();
        currentState.eventHandler(e, params);
    }

    const updateState = (newState) => {
        previousState = currentState;
        currentState = newState;
        ui.clearPage();
        currentState.render();
    }

    const updateStateWithParameters = (newState, parameters) => {
        previousState = currentState;
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