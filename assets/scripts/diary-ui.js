---
---

const DiaryUI = (eventHandler) => {

    const startTopicUI = () => {

        const topicContainer = document.createElement('div');
        topicContainer.id = 'topicContainer';
        topicContainer.classList.add('topic-container');

        const topicContainerHeader = document.createElement('div');
        topicContainerHeader.classList.add('topic-container__level');
        topicContainerHeader.classList.add('topic-container__header');
        topicContainer.appendChild(topicContainerHeader);

        const headerText = document.createElement('div');
        headerText.id = 'topic-container-header-text';
        headerText.classList.add('topic-container__header__text');
        topicContainerHeader.appendChild(headerText);

        const topicContainerList = document.createElement('div');
        topicContainerList.id = 'topicList';
        topicContainerList.classList.add('topic-container__list');
        topicContainer.appendChild(topicContainerList);

        const topicContainerFooter = document.createElement('div');
        topicContainerFooter.classList.add('topic-container__level');
        topicContainerFooter.classList.add('topic-container__footer');
        topicContainer.appendChild(topicContainerFooter);

        const footerLeft =  document.createElement('div');
        footerLeft.id='topic-container-footer-left';
        footerLeft.classList.add('topic-container__footer__item');
        topicContainerFooter.appendChild(footerLeft);

        const footerRight =  document.createElement('div');
        footerRight.id='topic-container-footer-right';
        footerRight.classList.add('topic-container__footer__item');
        topicContainerFooter.appendChild(footerRight);

        document.body.appendChild(topicContainer);

    }

    const clearTopicUI = () => {

        document.getElementById('topic-container-header-text').innerText = '';
        removeChildren('topicList');
        removeChildren('topic-container-footer-left');
        removeChildren('topic-container-footer-right');
      
    }

    const removeTopicUI = () => {
        removeChildren('topicContainer');
        document.body.removeChild(document.getElementById('topicContainer'));
    }

    const renderTopicsFound = (topics) => {

        document.getElementById('topic-container-header-text').innerText = 'We found the following daily topics you have been messaging about. Is this set complete? Or are there any topics you want to add tho this list?';
        
        renderTopics(topics);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic-button');
        addTopicButton.classList.add('topic-container__footer__item__button');
        addTopicButton.innerText = 'ADD TOPICS';
        addTopicButton.addEventListener('click', (e) => eventHandler(e, {type: 'add-topic'}));              
        document.getElementById('topic-container-footer-left').appendChild(addTopicButton);

        const thatsAllButton  = document.createElement('button');
        thatsAllButton.classList.add('topic-button');
        thatsAllButton.classList.add('topic-container__footer__item__button');
        thatsAllButton.innerText = 'THAT\'S All';
        thatsAllButton.addEventListener('click', (e) => eventHandler(e, {type: 'thats-all'}));  
        document.getElementById('topic-container-footer-right').appendChild(thatsAllButton);

    }

    const renderTopic = (day, topicData) => {
                
        const topicList = document.getElementById('topicList');

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
        topicHeaderEditButton.addEventListener('click', () => {
            console.log('Topic Edit Button');
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

        const headerText = document.getElementById('topic-container-header-text');
        headerText.innerText = 'New Topic From Where';

        const topicList = document.getElementById('topicList');

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
        backButton.classList.add('topic-container__footer__item__button');
        backButton.innerText = 'BACK';
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'})); 
        document.getElementById('topic-container-footer-left').appendChild(backButton);

    }

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const renderWriteTopic = () => {

        const headerText = document.getElementById('topic-container-header-text');
        headerText.innerText = 'Write your own topic and assign it to a date.';

        const topicList = document.getElementById('topicList');

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
        backButton.classList.add('topic-container__footer__item__button');
        backButton.innerText = 'BACK';
        backButton.addEventListener('click', (e) => eventHandler(e, {type: 'back'}))    
        document.getElementById('topic-container-footer-left').appendChild(backButton);

        const doneButton = document.createElement('button');
        doneButton.classList.add('topic-button');
        doneButton.classList.add('topic-container__footer__item__button');
        doneButton.innerText = 'DONE';
        doneButton.addEventListener('click', (e) => eventHandler(e, {type: 'done'}));   
        document.getElementById('topic-container-footer-right').appendChild(doneButton);

    }

    const renderAddedPhoto = (photoData, parent) => {

        console.log(parent)
    
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

        const chatContainer = document.createElement('div');
        chatContainer.id = 'chatContainer';
        chatContainer.classList.add('chat-container');

        const chatContainerHeader = document.createElement('div');
        chatContainerHeader.classList.add('chat-container__level');
        chatContainerHeader.classList.add('chat-container__header');
        chatContainer.appendChild(chatContainerHeader);

        const headerText = document.createElement('div');
        headerText.id = 'chat-container-header-text';
        headerText.classList.add('chat-container__header__text');
        chatContainerHeader.appendChild(headerText);

        const chatContainerList = document.createElement('div');
        chatContainerList.id = 'chatList';
        chatContainerList.classList.add('chat-container__list');
        chatContainer.appendChild(chatContainerList);

        const chatContainerFooter = document.createElement('div');
        chatContainerFooter.classList.add('chat-container__level');
        chatContainerFooter.classList.add('chat-container__footer');
        chatContainer.appendChild(chatContainerFooter);

        const footerLeft =  document.createElement('div');
        footerLeft.id='chat-container-footer-left';
        footerLeft.classList.add('chat-container__footer__item');
        chatContainerFooter.appendChild(footerLeft);

        const footerRight =  document.createElement('div');
        footerRight.id='chat-container-footer-right';
        footerRight.classList.add('chat-container__footer__item');
        chatContainerFooter.appendChild(footerRight);

        document.body.appendChild(chatContainer);

        console.log("eys")

    }

    const clearChatUI = () => {

        document.getElementById('chat-container-header-text').innerText = '';
        removeChildren('chatList');
        removeChildren('chat-container-footer-left');
        removeChildren('chat-container-footer-right');
      
    }

    const removeChatUI = () => {
        removeChildren('chatContainer');
    }

    return{
        startTopicUI,
        clearTopicUI,
        removeTopicUI,
        renderTopicsFound,
        renderAddTopicOptions,
        renderWriteTopic,

        startChatUI,
        clearChatUI,
        removeChatUI,
    }
}