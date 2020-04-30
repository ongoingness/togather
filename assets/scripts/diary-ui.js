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
        const headerText = document.getElementById('base-container-header-text');
        headerText.innerText = 'Make changes to this topic';
    }

    return{

        renderBaseUI,
        clearBaseUI,
        removeBaseUI,

        startTopicUI,
        removeTopicUI,
        renderTopicsFound,
        renderAddTopicOptions,
        renderWriteTopic,
        renderEditTopic,

        startChatUI,
        removeChatUI,
        renderSelectTopicFromChat,

    }
}