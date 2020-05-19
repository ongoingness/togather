---
---

const DiaryUI = (eventHandler) => {

    const renderBaseUI = () => {

        const baseContainer = document.createElement('div');
        baseContainer.id = 'baseContainer';
        baseContainer.classList.add('base-container');

        const baseContainerHeader = document.createElement('div');
        baseContainerHeader.classList.add('base-container__level');
        baseContainerHeader.classList.add('base-container__header');
        baseContainer.appendChild(baseContainerHeader);

        const headerText = document.createElement('div');
        headerText.id = 'base-container-header-text';
        headerText.classList.add('base-container__header__text');
        baseContainerHeader.appendChild(headerText);

        const baseContainerList = document.createElement('div');
        baseContainerList.id = 'baseList';
        baseContainerList.classList.add('base-container__list');
        baseContainer.appendChild(baseContainerList);

        const baseContainerFooter = document.createElement('div');
        baseContainerFooter.classList.add('base-container__level');
        baseContainerFooter.classList.add('base-container__footer');
        baseContainer.appendChild(baseContainerFooter);

        const footerLeft =  document.createElement('div');
        footerLeft.id='base-container-footer-left';
        footerLeft.classList.add('base-container__footer__item');
        baseContainerFooter.appendChild(footerLeft);

        const footerRight =  document.createElement('div');
        footerRight.id='base-container-footer-right';
        footerRight.classList.add('base-container__footer__item');
        baseContainerFooter.appendChild(footerRight);

        document.body.appendChild(baseContainer);

    }

    const clearBaseUI = () => {

        document.getElementById('baseList').classList.remove('chat__list__background');
        document.getElementById('baseList').classList.remove('topic__list__background');
        document.getElementById('base-container-header-text').classList.remove('base-container__header__text__override');

        removeChildren('base-container-header-text');
        removeChildren('baseList');
        removeChildren('base-container-footer-left');
        removeChildren('base-container-footer-right');
      
    }

    const removeBaseUI = () => {

        removeChildren('baseContainer');
        document.body.removeChild(document.getElementById('baseContainer'));

    }

    const startTopicUI = () => {

        document.getElementById('baseList').classList.add('topic__list__background');
    
    }

    const removeTopicUI = () => {

        document.getElementById('baseList').classList.remove('topic__list__background');

    }

    const renderUploadFiles = () => {

        const headerText = document.getElementById('base-container-header-text');
        headerText.innerText = i18n.getStringById('create_diary');

        const topicList = document.getElementById('baseList');

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('topic__add-topic__options');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('topic__add-topic__buttons-container');
        optionsContainer.appendChild(buttonsContainer);

        const uploadFilesLabel = document.createElement('label');
        uploadFilesLabel.classList.add('upload-files__label');
        uploadFilesLabel.innerText = i18n.getStringById('upload_files');
        buttonsContainer.appendChild(uploadFilesLabel);

        const uploadFilesInput = document.createElement('input');
        uploadFilesInput.id = 'uploadFilesInput';
        uploadFilesInput.classList.add('upload-files__input');
        uploadFilesInput.type = 'file';
        uploadFilesInput.multiple = true;
        uploadFilesInput.addEventListener('change', (e) => eventHandler(e, {type: 'upload-files', input: uploadFilesInput}))
        uploadFilesLabel.appendChild(uploadFilesInput);
        
        topicList.appendChild(optionsContainer);

    }

    const renderTopicsFound = (topics) => {
     
        document.getElementById('base-container-header-text').innerText = i18n.getStringById('topics_found_header');
        
        renderTopics(topics);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic-button');
        addTopicButton.classList.add('base-container__footer__item__button');
        addTopicButton.innerText = i18n.getStringById('add_topics');
        addTopicButton.addEventListener('click', (e) => eventHandler(e, {type: 'add-topic'}));              
        document.getElementById('base-container-footer-left').appendChild(addTopicButton);

        const thatsAllButton  = document.createElement('button');
        thatsAllButton.classList.add('topic-button');
        thatsAllButton.classList.add('base-container__footer__item__button');
        thatsAllButton.innerText = i18n.getStringById('thats_all');
        thatsAllButton.addEventListener('click', (e) => eventHandler(e, {type: 'thats-all'}));  
        document.getElementById('base-container-footer-right').appendChild(thatsAllButton);

    }

    const renderTopic = (day, topicData) => {
                
        const topicList = document.getElementById('baseList');

        const topic =  document.createElement('div');
        topic.classList.add('topic');

        const topicHeader = document.createElement('div');
        topicHeader.classList.add('topic__header');
        topic.appendChild(topicHeader);

        const topicHeaderDay =  document.createElement('div');
        topicHeaderDay.classList.add('topic__header__day');
        topicHeaderDay.innerText = `${i18n.getStringById('day')} ${topicData.day}`;
        topicHeaderDay.style = `color: ${topicData.color};`
        topicHeader.appendChild(topicHeaderDay);

        const date = new Date(topicData.timestamp);
        const topicHeaderDate =  document.createElement('div');
        topicHeaderDate.classList.add('topic__header__date');
        topicHeaderDate.innerText = `${date.toLocaleDateString()}`;
        topicHeaderDate.style = `color: ${topicData.color};`
        topicHeader.appendChild(topicHeaderDate);

        const topicHeaderEditButton = document.createElement('button');
        topicHeaderEditButton.classList.add('topic__header__edit-button');
        topicHeaderEditButton.addEventListener('click', (e) => eventHandler(e, {type: 'edit-topic', hash: topicData.hash}));
        topicHeader.appendChild(topicHeaderEditButton);

        const editButtonImage = document.createElement('img');
        editButtonImage.src = "{{ '/assets/images/edit.svg' | prepend: site.baseurl }}";
        editButtonImage.width = '25';
        editButtonImage.height = '25';
        topicHeaderEditButton.appendChild(editButtonImage);

        const topicHeaderDeleteButton = document.createElement('button');
        topicHeaderDeleteButton.classList.add('topic__header__delete-button');
        topicHeaderDeleteButton.addEventListener('click', (e) => eventHandler(e, {type: 'delete-topic', day}));
        topicHeader.appendChild(topicHeaderDeleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        topicHeaderDeleteButton.appendChild(deleteButtonImage);

        for(let line of topicData.text) {
            const topicText = document.createElement('div');
            topicText.innerText = `${line}`;
            topic.appendChild(topicText);
        }

        if(topicData.files.length > 0) {
            const chatMessageMediaBody = document.createElement('div');
            chatMessageMediaBody.classList.add('topic__media');
            topic.appendChild(chatMessageMediaBody);
            for(let file of topicData.files) {

                if(file.type.includes('audio')) {

                    const audio = document.createElement('audio');
                    audio.setAttribute('controls', true);

                    const source = document.createElement('source');
                    source.setAttribute('src', file.data);
                    source.setAttribute('type', file.type);

                    audio.appendChild(source);
                    chatMessageMediaBody.appendChild(audio);

                } else if(file.type.includes('video')) {

                    const video = document.createElement('video');
                    video.width = 320;
                    video.height = 240;
                    video.controls = true;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;

                    const source = document.createElement('source');
                    source.src = file.data;
                    source.type = file.type;

                    video.appendChild(source);
                    chatMessageMediaBody.appendChild(video);

                } else if(file.type.includes('image')) {

                    const image = document.createElement('img');
                    image.src = file.data;
                    image.width = 320;
                    image.height = 240;
                    chatMessageMediaBody.appendChild(image);

                }
            }
        }

        topicList.appendChild(topic);          
    }

    const renderTopics = (topics) => {

        for(let i = 0; i < topics.length; i++) {
            renderTopic(i, topics[i]);
        }

    }

    const removeTopics = () => {
        removeChildren('baseList');
    }

    const removeChildren = (id) => {

        const myNode = document.getElementById(id);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }

    }

    const renderAddTopicOptions = () => {

        const headerText = document.getElementById('base-container-header-text');
        headerText.innerText = i18n.getStringById('add_topic_options_header');

        const topicList = document.getElementById('baseList');

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('topic__add-topic__options');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('topic__add-topic__buttons-container');
        optionsContainer.appendChild(buttonsContainer);

        const writeTopic = document.createElement('button');
        writeTopic.classList.add('topic-button');
        writeTopic.innerText = i18n.getStringById('write_topic');
        writeTopic.addEventListener('click', (e) => eventHandler(e, {type: 'write-topic'})); 
        buttonsContainer.appendChild(writeTopic);

        const orText = document.createElement('div');
        orText.innerText = i18n.getStringById('or');
        buttonsContainer.appendChild(orText);

        const selectTopic = document.createElement('button');
        selectTopic.classList.add('topic-button');
        selectTopic.innerText = i18n.getStringById('select_from_chat');
        selectTopic.addEventListener('click', (e) => eventHandler(e, {type: 'select-from-chat'})); 
        buttonsContainer.appendChild(selectTopic);
        
        topicList.appendChild(optionsContainer);

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = i18n.getStringById('back');
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'})); 
        document.getElementById('base-container-footer-left').appendChild(backButton);

    }

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const renderWriteTopic = (topicData) => {

        const headerText = document.getElementById('base-container-header-text');
        headerText.innerText = i18n.getStringById('write_topic_header');

        const topicList = document.getElementById('baseList');

        const container = document.createElement('div');
        container.classList.add('topic__write-topic__container');

        const topicTextArea = document.createElement('textarea');
        topicTextArea.classList.add('topic__write-topic__textarea');
        topicTextArea.placeholder = i18n.getStringById('type_your_own_topic_here');
        if(topicData != null)
            topicTextArea.textContent = topicData.text;
        container.appendChild(topicTextArea);

        const datePhotoContainer = document.createElement('div');
        datePhotoContainer.classList.add('topic__write-topic__date-photo-container');
        container.appendChild(datePhotoContainer);
        
        const topicDate = document.createElement('input');
        topicDate.type = 'date';
        topicDate.name = 'topicDate';
        topicDate.id = 'topicDate';
        topicDate.classList.add('topic__write-topic__date');
        if(topicData != null)
            topicDate.valueAsDate = new Date(topicData.fulltimestamp);
        datePhotoContainer.appendChild(topicDate);

        const addPhotoLabel = document.createElement('label');
        addPhotoLabel.classList.add('topic__write-topic__add-photo-label');
        datePhotoContainer.appendChild(addPhotoLabel);

        const addPhotoInput = document.createElement('input');
        addPhotoInput.classList.add('topic__write-topic__add-photo-input');
        addPhotoInput.type = 'file';
        addPhotoInput.multiple = true;
        addPhotoLabel.appendChild(addPhotoInput);
        addPhotoInput.addEventListener('change', async (e) => {

            let files = [];
    
            const readFile = (file) => {
                const fileReader = new FileReader();
    
                return new Promise((resolve, reject) => {
                    fileReader.onerror = () => {
                        fileReader.abort();
                        reject(new DOMException("Problem parsing input file."));
                    };
    
                    fileReader.onload = () => {
                        resolve({file, fileContent: fileReader.result});
                    };
    
                    if(file.type === 'text/plain') {
                        fileReader.readAsText(file);
                    } else {
                        fileReader.readAsDataURL(file); 
                    }
                    
                });
            }
    
            let nMedia = document.getElementsByClassName('topic__write-topic__photo-container').length;

            for(let i = 0; i < addPhotoInput.files.length; i++) {
                const result = await readFile(addPhotoInput.files[i]);
                const file = { type: result.file.type, data: result.fileContent, name: result.file.name } 

                renderAddedPhoto(file, (nMedia+i)%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2);                 
                files.push(file);
            }
    
            eventHandler(e, {type: 'upload-files', files});
            
        });

        const uploadedPhotos = document.createElement('div');
        uploadedPhotos.classList.add('topic__write-topic__uploaded-photos');
        container.appendChild(uploadedPhotos);
     
        const uploadedPhotosRow = document.createElement('div');
        uploadedPhotosRow.classList.add('topic__write-topic__uploaded-photos__row');
        uploadedPhotos.appendChild(uploadedPhotosRow);

        const uploadedPhotosColumn1 = document.createElement('div');
        uploadedPhotosColumn1.id = 'uploadedPhotosColumn1';
        uploadedPhotosColumn1.classList.add('topic__write-topic__uploaded-photos__column');
        uploadedPhotosRow.appendChild(uploadedPhotosColumn1);

        const uploadedPhotosColumn2 = document.createElement('div');
        uploadedPhotosColumn2.id = 'uploadedPhotosColumn2';
        uploadedPhotosColumn2.classList.add('topic__write-topic__uploaded-photos__column');
        uploadedPhotosRow.appendChild(uploadedPhotosColumn2);

        if(topicData && topicData.files) {
            for(let i = 0; i < topicData.files.length; i++) {
                renderAddedPhoto(topicData.files[i], i%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2); 
            }
        }

        topicList.appendChild(container);

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = i18n.getStringById('back');
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'}))    
        document.getElementById('base-container-footer-left').appendChild(backButton);

        const doneButton = document.createElement('button');
        doneButton.classList.add('topic-button');
        doneButton.classList.add('base-container__footer__item__button');
        doneButton.innerText = i18n.getStringById('done');
        doneButton.addEventListener('click', (e) => eventHandler(e, {type: 'done', hash: topicData != null ? topicData.hash : '', text: topicTextArea.value , timestamp: topicDate.valueAsDate.getTime() }));   
        document.getElementById('base-container-footer-right').appendChild(doneButton);

    }

    const renderAddedPhoto = (file, parent) => {
  
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('topic__write-topic__photo-container');
        parent.appendChild(photoContainer);

        const chatMessageMediaBody = document.createElement('div');
        chatMessageMediaBody.classList.add('chat-message__media');
        photoContainer.appendChild(chatMessageMediaBody);

        if(file.type.includes('audio')) {

            const audio = document.createElement('audio');
            audio.setAttribute('controls', true);

            const source = document.createElement('source');
            source.setAttribute('src', file.data);
            source.setAttribute('type', file.type);

            audio.appendChild(source);
            chatMessageMediaBody.appendChild(audio);

        } else if(file.type.includes('video')) {

            const video = document.createElement('video');
            video.width = 320;
            video.height = 240;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;

            const source = document.createElement('source');
            source.src = file.data;
            source.type = file.type;

            video.appendChild(source);
            chatMessageMediaBody.appendChild(video);

        } else if(file.type.includes('image')) {

            const image = document.createElement('img');
            image.classList.add('topic__write-topic__uploaded-photos__image');
            image.src = file.data;
            image.width = 320;
            image.height = 240;
            chatMessageMediaBody.appendChild(image);

        }
            
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('topic__write-topic__uploaded-photos__delete-button');
        deleteButton.addEventListener('click', (e) => {
            photoContainer.remove();
            eventHandler(e, {type: 'delete-photo', file})
        });   
        photoContainer.appendChild(deleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        deleteButton.appendChild(deleteButtonImage);

    }

    const startChatUI = () => {

        document.getElementById('baseList').classList.add('chat__list__background');
    
    }

    const removeChatUI = () => {

        document.getElementById('baseList').classList.remove('chat__list__background');

    }

    const renderSelectTopicFromChat = (chatData) => {

        document.getElementById('base-container-header-text').innerText = 'Select missing topics from your chat.';

        for(let message of chatData) {
            renderChatMessage(message, 'baseList');
        }

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = i18n.getStringById('back');
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'}))    
        document.getElementById('base-container-footer-left').appendChild(backButton);

        const doneButton = document.createElement('button');
        doneButton.classList.add('topic-button');
        doneButton.classList.add('base-container__footer__item__button');
        doneButton.innerText = i18n.getStringById('done');
        doneButton.addEventListener('click', (e) => eventHandler(e, {type: 'done'}));   
        document.getElementById('base-container-footer-right').appendChild(doneButton);

    }

    const renderChatMessage = (messageData, messageListId, isSelected = false, isFromDay = false) => {
        
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');

        if(isFromDay)
            chatMessage.classList.add('day');
        
        if(isSelected)
            chatMessage.classList.add('selected');
 
        chatMessage.addEventListener('click', (e) => {

            if(chatMessage.classList.contains('selected')) {
                chatMessage.classList.remove('selected');
                eventHandler(e, {type: 'deselected-message', hash: messageData.hash});
            } else {
                chatMessage.classList.add('selected');
                eventHandler(e, {type: 'selected-message', hash: messageData.hash});
            }
            
        }); 

        document.getElementById(messageListId).appendChild(chatMessage);

        const header = document.createElement('div');
        header.classList.add('chat-message__header');
        chatMessage.appendChild(header);
      
        const chatMessageUser = document.createElement('div');
        chatMessageUser.innerText = `${messageData.user}`;
        chatMessageUser.classList.add('chat-message__name');
        chatMessageUser.style = `color: ${messageData.color}`;
        header.appendChild(chatMessageUser);

        const date = new Date(messageData.fulltimestamp);
        const chatMessageTime = document.createElement('div');
        chatMessageTime.innerText = `${date.toLocaleDateString()}`;
        chatMessageTime.classList.add('chat-message__date');
        chatMessageTime.style = `color: ${messageData.color}`;
        header.appendChild(chatMessageTime);

        for(let line of messageData.text) {
            const chatMessageTextBody = document.createElement('div');
            chatMessageTextBody.classList.add('chat-message__text');
            chatMessageTextBody.innerText = `${line}`;
            chatMessage.appendChild(chatMessageTextBody);
        }

        if(messageData.files.length > 0) {
            const chatMessageMediaBody = document.createElement('div');
            chatMessageMediaBody.classList.add('chat-message__media');
            chatMessage.appendChild(chatMessageMediaBody);
            for(let file of messageData.files) {

                if(file.type.includes('audio')) {

                    const audio = document.createElement('audio');
                    audio.setAttribute('controls', true);

                    const source = document.createElement('source');
                    source.setAttribute('src', file.data);
                    source.setAttribute('type', file.type);

                    audio.appendChild(source);
                    chatMessageMediaBody.appendChild(audio);

                } else if(file.type.includes('video')) {

                    const video = document.createElement('video');
                    video.width = 320;
                    video.height = 240;
                    video.controls = true;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;

                    const source = document.createElement('source');
                    source.src = file.data;
                    source.type = file.type;

                    video.appendChild(source);
                    chatMessageMediaBody.appendChild(video);

                } else if(file.type.includes('image')) {

                    const image = document.createElement('img');
                    image.src = file.data;
                    image.width = 320;
                    image.height = 240;
                    chatMessageMediaBody.appendChild(image);

                }
            }
        }
    }

    const renderEditTopic = (topicData) => {
        renderWriteTopic(topicData);
        document.getElementById('base-container-header-text').innerText  = i18n.getStringById('edit_topic_header');
    }

    const renderSelectMessages = (dayData, allMessagesData) => {

        const headerText = document.getElementById('base-container-header-text');
        headerText.classList.add('base-container__header__text__override');

        const dayScrollerContainer = document.createElement('div');
        dayScrollerContainer.classList.add('day-scroller__container');
        headerText.appendChild(dayScrollerContainer);

        const days = document.createElement('div');
        days.classList.add('day-scroller__day-buttons-container');
        dayScrollerContainer.appendChild(days);

        const daysLeft = document.createElement('div');
        daysLeft.classList.add('day-scroller__day-buttons-container__left');
        days.appendChild(daysLeft);

        const prevDay = document.createElement('button');
        prevDay.id = 'prevDay';
        prevDay.classList.add('day-scroller__prev');
        prevDay.innerHTML = '&#10094;'
        prevDay.addEventListener('click', (e) => eventHandler(e, {type: 'prev-day'}));  
        daysLeft.appendChild(prevDay);

        const daysCenter = document.createElement('div');
        daysCenter.classList.add('day-scroller__day-buttons-container__center');
        days.appendChild(daysCenter);

        const dayDisplay = document.createElement('div');
        dayDisplay.id = 'dayDisplay';
        dayDisplay.classList.add('day-scroller__day-display');
        daysCenter.appendChild(dayDisplay);

        const daysRight = document.createElement('div');
        daysRight.classList.add('day-scroller__day-buttons-container__right');
        days.appendChild(daysRight);

        const nextDay = document.createElement('button');
        nextDay.id = 'nextDay';
        nextDay.classList.add('day-scroller__next');
        nextDay.innerHTML = '&#10095;'
        nextDay.addEventListener('click', (e) => eventHandler(e, {type: 'next-day'}));  
        daysRight.appendChild(nextDay);

        const dotContainer = document.createElement('div');
        dotContainer.id = 'dotContainer';
        dotContainer.classList.add('day-scroller__dot-container');
        dayScrollerContainer.appendChild(dotContainer);

        const baseList = document.getElementById('baseList');
        baseList.classList.add('no-padding');

        const topicDisplay = document.createElement('div');
        topicDisplay.id = 'topicDisplay';
        topicDisplay.classList.add('select-messages__topic-display');
        baseList.appendChild(topicDisplay);

        const topicDisplayText = document.createElement('span');
        topicDisplayText.id = 'topicDisplayText';
        topicDisplay.appendChild(topicDisplayText);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('select-messages__button-container');
        topicDisplay.appendChild(buttonContainer);

        const readMoreButton = document.createElement('button');
        readMoreButton.id = 'readMoreButton';
        readMoreButton.classList.add('select-messages__read-more-button');
        readMoreButton.innerText = i18n.getStringById('read_more');
        readMoreButton.addEventListener('click', (e) => eventHandler(e, {type: 'read-more'}));     
        buttonContainer.appendChild(readMoreButton);

        const readLessButton = document.createElement('button');
        readLessButton.id = 'readLessButton';
        readLessButton.classList.add('select-messages__read-less-button');
        readLessButton.classList.add('hidden');
        readLessButton.innerText = i18n.getStringById('read_less');;
        readLessButton.addEventListener('click', (e) => eventHandler(e, {type: 'read-less'}));     
        buttonContainer.appendChild(readLessButton);

        const actionText = document.createElement('div');
        actionText.classList.add('select-messages__action-text');
        actionText.innerText = i18n.getStringById('select_messages_action_text');
        topicDisplay.appendChild(actionText);
        
        const topicsButton = document.createElement('button');
        topicsButton.id = 'topics';
        topicsButton.classList.add('topic-button');
        topicsButton.classList.add('base-container__footer__item__button');
        topicsButton.innerText = i18n.getStringById('topics');
        topicsButton.addEventListener('click', (e) => eventHandler(e, {type: 'topics'}))    
        document.getElementById('base-container-footer-left').appendChild(topicsButton);

        const finishDiaryButton = document.createElement('button');
        finishDiaryButton.id = 'finishDiary';
        finishDiaryButton.classList.add('topic-button');
        finishDiaryButton.classList.add('base-container__footer__item__button');
        finishDiaryButton.innerText = i18n.getStringById('finish');
        finishDiaryButton.addEventListener('click', (e) => eventHandler(e, {type: 'finish-diary'}));   
        document.getElementById('base-container-footer-right').appendChild(finishDiaryButton);

        renderDay(dayData, allMessagesData);


        if(window.innerWidth > 700) {

            document.body.style.display = 'flex';
            document.body.style.position = 'relative';
            document.getElementById('baseContainer').style.marginRight = 0;
          
            const previewContainer = document.createElement('div');
            previewContainer.classList.add('preview-container');
            previewContainer.style.maxHeight = `${window.innerHeight}px`;
            document.body.appendChild(previewContainer);

            const canvas = document.createElement('canvas');
            canvas.id = 'preview';
            canvas.classList.add('preview-canvas');
            canvas.style.maxHeight = `${window.innerHeight}px`;
            previewContainer.appendChild(canvas);


            const prevPage = document.createElement('button');
            prevPage.id = 'prevPage';
            prevPage.classList.add('topic-button', 'preview-button', 'prev');
            prevPage.innerText = 'Prev';
            prevPage.addEventListener('click', (e) => eventHandler(e, {type: 'prev-page'}))    
            previewContainer.appendChild(prevPage);

            const nextPage = document.createElement('button');
            nextPage.id = 'nextPage';
            nextPage.classList.add('topic-button', 'preview-button', 'next');
            nextPage.innerText = 'Next';
            nextPage.addEventListener('click', (e) => eventHandler(e, {type: 'next-page'}))    
            previewContainer.appendChild(nextPage);
    

        }

    }

    const clearDay = () => {

        document.getElementById('dayDisplay').innerText = '';
        removeChildren('dotContainer');
        document.getElementById('topicDisplayText').innerText = '';
        document.getElementById('readMoreButton').classList.add('hidden');
        document.getElementById('readLessButton').classList.add('hidden');
        
        const elements = document.getElementsByClassName('chat-message');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        
    }

    const renderDay = (dayData, allMessagesData) => {

        document.getElementById('dayDisplay').innerText = `${i18n.getStringById('day')} ${dayData.day}`;
        document.getElementById('dayDisplay').style = `color: ${dayData.color};`

        if(dayData.index == dayData.totalOfTopics-1) {
            document.getElementById('nextDay').style.display = 'none';
            document.getElementById('finishDiary').style.display = 'inline-block';
        } else {
            document.getElementById('nextDay').style.display = 'inline-block';
            document.getElementById('finishDiary').style.display = 'none';
        }

        if(dayData.index == 0) {
            document.getElementById('prevDay').style.display = 'none';
            document.getElementById('topics').style.display = 'inline-block';
        } else {
            document.getElementById('prevDay').style.display = 'inline-block';
            document.getElementById('topics').style.display = 'none';
        }

        for(let i = 0; i < dayData.totalOfTopics; i++) {
            const dot = document.createElement('span');
            dot.classList.add('day-scroller__dot');
            if(i==dayData.index)
                dot.classList.add('selected');
            else {
                dot.addEventListener('click', (e) => eventHandler(e, {type: 'goto-topic', topic: i}));  
            }
            document.getElementById('dotContainer').appendChild(dot);
        }

        if(dayData.text.length > 0) {

            const joinedText = dayData.text.join(' ');
            if(joinedText.length < 90) {
                document.getElementById('topicDisplayText').innerText =  joinedText;
                document.getElementById('readMoreButton').classList.add('hidden');
                document.getElementById('readLessButton').classList.add('hidden');
            } else {
                renderShortTopic(joinedText);        
            }

        }

   
        for(let message of allMessagesData) {

            const isSelected = dayData.selectedMessages.some(sm => sm.hash === message.hash);
            const isFromDay = new Date(message.fulltimestamp).getDate() === new Date(dayData.timestamp).getDate()

            renderChatMessage(message, 'baseList', isSelected, isFromDay);
        }

        let dayMessages = document.getElementsByClassName('chat-message day');
        if(dayMessages.length > 0) {
            console.log('hello')
            document.getElementById('baseList').scrollTop = dayMessages[0].offsetTop - (window.innerHeight * 0.35) ;
        }

    }

    const renderFullTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text;
        document.getElementById('readMoreButton').classList.add('hidden');
        document.getElementById('readLessButton').classList.remove('hidden');
    } 

    const renderShortTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text.substring(0, 80);
        document.getElementById('readLessButton').classList.add('hidden');
        document.getElementById('readMoreButton').classList.remove('hidden');
    } 


  
    return{

        renderBaseUI,
        clearBaseUI,
        removeBaseUI,

        startTopicUI,
        removeTopicUI,
        renderUploadFiles,
        renderTopicsFound,
        renderAddTopicOptions,
        renderWriteTopic,
        renderEditTopic,
        renderTopics,
        removeTopics,

        startChatUI,
        removeChatUI,
        renderSelectTopicFromChat,
        renderSelectMessages,
        renderFullTopic,
        renderShortTopic,
        renderDay,
        clearDay,

    }
}

export default DiaryUI;