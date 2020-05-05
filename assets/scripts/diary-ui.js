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
        headerText.innerText = 'New Topic From Where';

        const topicList = document.getElementById('baseList');

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('topic__add-topic__options');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('topic__add-topic__buttons-container');
        optionsContainer.appendChild(buttonsContainer);

        const uploadFilesLabel = document.createElement('label');
        uploadFilesLabel.classList.add('topic__write-topic__add-photo-label');
        optionsContainer.appendChild(uploadFilesLabel);

        const uploadFilesInput = document.createElement('input');
        uploadFilesInput.id = 'uploadFilesInput';
        uploadFilesInput.classList.add('topic__write-topic__add-photo-input');
        uploadFilesInput.type = 'file';
        uploadFilesInput.multiple = true;
        uploadFilesInput.addEventListener('change', (e) => eventHandler(e, {type: 'upload-files', input: uploadFilesInput}))
        uploadFilesLabel.appendChild(uploadFilesInput);
        
        topicList.appendChild(optionsContainer);

    }

    const renderTopicsFound = (topics) => {
     
        document.getElementById('base-container-header-text').innerText = 'We found the following daily topics you have been messaging about. Is this set complete? Or are there any topics you want to add tho this list?';
        
        renderTopics(topics);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic-button');
        addTopicButton.classList.add('base-container__footer__item__button');
        addTopicButton.innerText = 'ADD TOPICS';
        addTopicButton.addEventListener('click', (e) => eventHandler(e, {type: 'add-topic'}));              
        document.getElementById('base-container-footer-left').appendChild(addTopicButton);

        const thatsAllButton  = document.createElement('button');
        thatsAllButton.classList.add('topic-button');
        thatsAllButton.classList.add('base-container__footer__item__button');
        thatsAllButton.innerText = 'THAT\'S All';
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

        const color = getRandomColor();

        const topicHeaderDay =  document.createElement('div');
        topicHeaderDay.classList.add('topic__header__day');
        topicHeaderDay.innerText = `DAY ${day + 1}`;
        topicHeaderDay.style = `color: ${color};`
        topicHeader.appendChild(topicHeaderDay);

        const topicHeaderDate =  document.createElement('div');
        topicHeaderDate.classList.add('topic__header__date');
        topicHeaderDate.innerText = `2020/20/01`;
        topicHeaderDate.style = `color: ${color};`
        topicHeader.appendChild(topicHeaderDate);

        const topicHeaderEditButton = document.createElement('button');
        topicHeaderEditButton.classList.add('topic__header__edit-button');
        topicHeaderEditButton.addEventListener('click', (e) => {
           
            eventHandler(e, {type: 'edit-topic', data: '111'});
        });
        topicHeader.appendChild(topicHeaderEditButton);

        const editButtonImage = document.createElement('img');
        editButtonImage.src = "{{ '/assets/images/edit.svg' | prepend: site.baseurl }}";
        editButtonImage.width = '25';
        editButtonImage.height = '25';
        topicHeaderEditButton.appendChild(editButtonImage);

        const topicHeaderDeleteButton = document.createElement('button');
        topicHeaderDeleteButton.classList.add('topic__header__delete-button');
        topicHeaderDeleteButton.addEventListener('click', () => {
            console.log('Topic Delete Button');
        });
        topicHeader.appendChild(topicHeaderDeleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        topicHeaderDeleteButton.appendChild(deleteButtonImage);

        const topicText = document.createElement('div');
        topicText.innerText = `I am a TOPIC ${day}`;
        topic.appendChild(topicText);

        topicList.appendChild(topic);          
    }

    const renderTopics = (topics) => {

        for(topic of topics) {

            for(let i = 0; i < 20; i++) {
                renderTopic(i, topic);
            }

        }

    }

    const removeChildren = (id) => {

        const myNode = document.getElementById(id);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }

    }

    const renderAddTopicOptions = () => {

        const headerText = document.getElementById('base-container-header-text');
        headerText.innerText = 'New Topic From Where';

        const topicList = document.getElementById('baseList');

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('topic__add-topic__options');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('topic__add-topic__buttons-container');
        optionsContainer.appendChild(buttonsContainer);

        const writeTopic = document.createElement('button');
        writeTopic.classList.add('topic-button');
        writeTopic.innerText = 'Write Topic';
        writeTopic.addEventListener('click', (e) => eventHandler(e, {type: 'write-topic'})); 
        buttonsContainer.appendChild(writeTopic);

        const orText = document.createElement('div');
        orText.innerText = 'or';
        buttonsContainer.appendChild(orText);

        const selectTopic = document.createElement('button');
        selectTopic.classList.add('topic-button');
        selectTopic.innerText = 'Select from chat';
        selectTopic.addEventListener('click', (e) => eventHandler(e, {type: 'select-from-chat'})); 
        buttonsContainer.appendChild(selectTopic);
        
        topicList.appendChild(optionsContainer);

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = 'BACK';
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
        headerText.innerText = 'Write your own topic and assign it to a date.';

        const topicList = document.getElementById('baseList');

        const container = document.createElement('div');
        container.classList.add('topic__write-topic__container');

        const topicTextArea = document.createElement('textarea');
        topicTextArea.classList.add('topic__write-topic__textarea');
        topicTextArea.placeholder = 'Type your own topic here';
        container.appendChild(topicTextArea);

        const datePhotoContainer = document.createElement('div');
        datePhotoContainer.classList.add('topic__write-topic__date-photo-container');
        container.appendChild(datePhotoContainer);
        
        const topicDate = document.createElement('input');
        topicDate.type = 'date';
        topicDate.name = 'topicDate';
        topicDate.id = 'topicDate';
        topicDate.classList.add('topic__write-topic__date');
        datePhotoContainer.appendChild(topicDate);

        const addPhotoLabel = document.createElement('label');
        addPhotoLabel.classList.add('topic__write-topic__add-photo-label');
        datePhotoContainer.appendChild(addPhotoLabel);

        const addPhotoInput = document.createElement('input');
        addPhotoInput.classList.add('topic__write-topic__add-photo-input');
        addPhotoInput.type = 'file';
        addPhotoLabel.appendChild(addPhotoInput);

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

        //////////////////////
        renderAddedPhoto("{{ '/assets/images/test1.jpg' | prepend: site.baseurl }}", uploadedPhotosColumn1); 
        renderAddedPhoto("{{ '/assets/images/test2.jpg' | prepend: site.baseurl }}", uploadedPhotosColumn1); 
        renderAddedPhoto("{{ '/assets/images/test3.jpg' | prepend: site.baseurl }}", uploadedPhotosColumn2); 
        renderAddedPhoto("{{ '/assets/images/test4.jpg' | prepend: site.baseurl }}", uploadedPhotosColumn2); 
        ///////////////////////

        topicList.appendChild(container);

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = 'BACK';
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'}))    
        document.getElementById('base-container-footer-left').appendChild(backButton);

        const doneButton = document.createElement('button');
        doneButton.classList.add('topic-button');
        doneButton.classList.add('base-container__footer__item__button');
        doneButton.innerText = 'DONE';
        doneButton.addEventListener('click', (e) => eventHandler(e, {type: 'done'}));   
        document.getElementById('base-container-footer-right').appendChild(doneButton);

    }

    const renderAddedPhoto = (photoData, parent) => {
  
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('topic__write-topic__photo-container');
        parent.appendChild(photoContainer);

        const photo = document.createElement('img');
        photo.classList.add('topic__write-topic__uploaded-photos__image');
        photo.src = photoData;
        photoContainer.appendChild(photo);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('topic__write-topic__uploaded-photos__delete-button');
        deleteButton.addEventListener('click', (e) => eventHandler(e, {type: 'delete-photo'}));   
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

    const renderSelectTopicFromChat = () => {

        document.getElementById('base-container-header-text').innerText = 'Select missing topics from your chat.';

        for(let i = 0; i < 100; i++) {
            renderChatMessage(i, 'baseList');
        }

        const backButton = document.createElement('button');
        backButton.classList.add('topic-button');
        backButton.classList.add('base-container__footer__item__button');
        backButton.innerText = 'BACK';
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'}))    
        document.getElementById('base-container-footer-left').appendChild(backButton);

        const doneButton = document.createElement('button');
        doneButton.classList.add('topic-button');
        doneButton.classList.add('base-container__footer__item__button');
        doneButton.innerText = 'DONE';
        doneButton.addEventListener('click', (e) => eventHandler(e, {type: 'done'}));   
        document.getElementById('base-container-footer-right').appendChild(doneButton);

    }

    const renderChatMessage = (messageData, messageListId) => {

        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');
        chatMessage.addEventListener('click', (e) => {

            if(chatMessage.classList.contains('selected')) {
                chatMessage.classList.remove('selected');
                eventHandler(e, {type: 'deselected-message', hash: '123'})
            } else {
                chatMessage.classList.add('selected');
                eventHandler(e, {type: 'selected-message', hash: '123'})
            }
            
        }); 

        document.getElementById(messageListId).appendChild(chatMessage);

        const header = document.createElement('div');
        header.classList.add('chat-message__header');
        chatMessage.appendChild(header);
      
        const colour = getRandomColor();

        const chatMessageUser = document.createElement('div');
        chatMessageUser.innerText = 'User';
        chatMessageUser.classList.add('chat-message__name');
        chatMessageUser.style = `color: ${colour}`;
        header.appendChild(chatMessageUser);

        const chatMessageTime = document.createElement('div');
        chatMessageTime.innerText = '2002/20/22';
        chatMessageTime.classList.add('chat-message__date');
        chatMessageTime.style = `color: ${colour}`;
        header.appendChild(chatMessageTime);

        const chatMessageBody = document.createElement('div');
        chatMessageBody.classList.add('chat-message__text');
        chatMessageBody.innerText = 'Text message Test dsfsdfsdfdsfds fsdfsdfsdfsdfsdfsd fsd fsd fsdf ds fdsfsdf sdf sd fsdf sf ';
        chatMessage.appendChild(chatMessageBody);


        /*
        if(parsedMessage.file != '') {
            if(files[parsedMessage.file].type.includes('audio')) {
                const audio = document.createElement('audio');
                audio.setAttribute('controls', true);

                const source = document.createElement('source');
                source.setAttribute('src', files[parsedMessage.file].data);
                source.setAttribute('type', files[parsedMessage.file].type);

                audio.appendChild(source);
                chatMessageBody.appendChild(audio);

            } else if(files[parsedMessage.file].type.includes('video')) {
                const video = document.createElement('video');
                video.width = 320;
                video.height = 240;
                video.controls = true;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;

                const source = document.createElement('source');
                source.src = files[parsedMessage.file].data;
                source.type = files[parsedMessage.file].type;

                video.appendChild(source);
                chatMessageBody.appendChild(video);
            } else if(files[parsedMessage.file].type.includes('image')) {
                const image = document.createElement('img');
                image.src = files[parsedMessage.file].data;
                image.width = 320;
                image.height = 240;
                chatMessageBody.appendChild(image);
            }

        }*/

    }

    const renderEditTopic = (topicData) => {
        renderWriteTopic(topicData);
        document.getElementById('base-container-header-text').innerText  = 'Make changes to this topic';
    }

    const renderSelectMessages = () => {

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
        prevDay.classList.add('day-scroller__prev');
        prevDay.innerHTML = '&#10094;'
        daysLeft.appendChild(prevDay);

        const daysCenter = document.createElement('div');
        daysCenter.classList.add('day-scroller__day-buttons-container__center');
        days.appendChild(daysCenter);

        const dayDisplay1 = document.createElement('div');
        dayDisplay1.classList.add('day-scroller__day-display');
        dayDisplay1.innerText = 'Day 1';
        daysCenter.appendChild(dayDisplay1);

        const daysRight = document.createElement('div');
        daysRight.classList.add('day-scroller__day-buttons-container__right');
        days.appendChild(daysRight);

        const nextDay = document.createElement('button');
        nextDay.classList.add('day-scroller__next');
        nextDay.innerHTML = '&#10095;'
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

        //Check topic description size

        /////////////////////////////

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('select-messages__button-container');
        topicDisplay.appendChild(buttonContainer);

        const readMoreButton = document.createElement('button');
        readMoreButton.id = 'readMoreButton';
        readMoreButton.classList.add('select-messages__read-more-button');
        readMoreButton.innerText = 'Read More';
        readMoreButton.addEventListener('click', (e) => eventHandler(e, {type: 'read-more'}));     
        buttonContainer.appendChild(readMoreButton);

        const readLessButton = document.createElement('button');
        readLessButton.id = 'readLessButton';
        readLessButton.classList.add('select-messages__read-less-button');
        readLessButton.classList.add('hidden');
        readLessButton.innerText = 'Read Less';
        readLessButton.addEventListener('click', (e) => eventHandler(e, {type: 'read-less'}));     
        buttonContainer.appendChild(readLessButton);

        const actionText = document.createElement('div');
        actionText.classList.add('select-messages__action-text');
        actionText.innerText = 'Select all the messages to go in the diary for this day.'
        topicDisplay.appendChild(actionText);
        
        const topicsButton = document.createElement('button');
        topicsButton.classList.add('topic-button');
        topicsButton.classList.add('base-container__footer__item__button');
        topicsButton.innerText = 'TOPICS';
        topicsButton.addEventListener('click', (e) => eventHandler(e, {type: 'topics'}))    
        document.getElementById('base-container-footer-left').appendChild(topicsButton);

        const finishDiaryButton = document.createElement('button');
        finishDiaryButton.classList.add('topic-button');
        finishDiaryButton.classList.add('base-container__footer__item__button');
        finishDiaryButton.innerText = 'FINISH DIARY';
        finishDiaryButton.addEventListener('click', (e) => eventHandler(e, {type: 'finish-diary'}));   
        document.getElementById('base-container-footer-right').appendChild(finishDiaryButton);

        renderDay('1', 'topicDisplay', 'baseList');
  
    }

    const clearDay = () => {
ß
    }

    const renderDay = (dayData, topicDisplayId, messageListId) => {

        const dot = document.createElement('span');
        dot.classList.add('day-scroller__dot');
        document.getElementById('dotContainer').appendChild(dot);

        renderShortTopic('This is the challenge that we selected we were gonna write something about today. Now wer are gonna select every message that is send for today.');        

        for(let i = 0; i < 100; i++) {
            renderChatMessage(i, messageListId);
        }

    }

    const renderFullTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text;
        document.getElementById('readMoreButton').classList.add('hidden');
        document.getElementById('readLessButton').classList.remove('hidden');
    } 

    const renderShortTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text;
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

        startChatUI,
        removeChatUI,
        renderSelectTopicFromChat,
        renderSelectMessages,
        renderFullTopic,
        renderShortTopic,
        renderDay,

    }
}

export default DiaryUI;