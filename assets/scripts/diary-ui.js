---
---

const DiaryUI = (eventHandler) => {

    const renderSiteHeader = () => {

        const header = document.createElement('div');
        header.classList.add('header');
        document.body.appendChild(header);

        const openNav = () => {
            document.getElementById("myNav").style.width = "100%";
        }

        const closeNav = () => {
            document.getElementById("myNav").style.width = "0%";
        }

        const hamburguer = document.createElement('div');
        hamburguer.classList.add('hamburguer');
        hamburguer.addEventListener('click', openNav);
        header.appendChild(hamburguer);
        
        for(let i = 0; i < 3; i++) {
            const hamLine = document.createElement('div');
            hamLine.classList.add('hamburguer-line');
            hamburguer.appendChild(hamLine);
        }

        const headerText = document.createElement('div');
        headerText.classList.add('header__text');
        headerText.innerText = 'ToGather';
        header.appendChild(headerText);

        const nav = document.createElement('div');
        nav.id = 'myNav';
        nav.classList.add('overlay');
        document.body.appendChild(nav);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn');
        closeNavElem.addEventListener('click', closeNav);
        closeNavElem.innerHTML = '&times;';
        nav.appendChild(closeNavElem);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content');
        nav.appendChild(overlayContent);

        const aHome = document.createElement('a');
        aHome.id = 'home-a';
        aHome.href = '{{ site.url }}{{ site.baseurl }}/';
        aHome.innerText = 'Home';
        overlayContent.appendChild(aHome);

        const aTopic = document.createElement('a');
        aTopic.id = 'topic-a';
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics/';
        aTopic.innerText = 'Get a topic';
        overlayContent.appendChild(aTopic);

        const aExpl = document.createElement('a');
        aExpl.id = 'explained-a';
        aExpl.href = '{{ site.url }}{{ site.baseurl }}/explained/';
        aExpl.innerText = 'ToGather Explained';
        overlayContent.appendChild(aExpl)

        const aInst = document.createElement('a');
        aInst.id = 'instructions-a';
        aInst.href = '{{ site.url }}{{ site.baseurl }}/instructions/'
        aInst.innerText = 'Instructions';
        overlayContent.appendChild(aInst);

        const aDiary = document.createElement('a');
        aDiary.id = 'diary-a'
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary/' 
        aDiary.innerText = 'Assemble Diary';
        overlayContent.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.id = 'about-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about/';
        aAbout.innerText = 'About Us';
        overlayContent.appendChild(aAbout);
        
    }

    const renderSiteFooter = (parent) => {

        const footer = document.createElement('div');
        footer.classList.add('footer');
        parent.appendChild(footer);

        const footerText = document.createElement('div');
        footerText.classList.add('footer__text');
        footerText.innerText = 'ToGather';
        footer.appendChild(footerText);

    }

    const renderUploadFiles = () => {
    
        renderSiteHeader();

        renderDiaryHeader(document.body);

        const content = document.createElement('div');
        content.classList.add('content');
        content.style.height = 'initial';
        document.body.appendChild(content);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.innerText = 'Find your exported WhatsApp group chat files and add them below.';
        textBox1.style.marginTop = '28px';
        gradient.appendChild(textBox1);
        
        const dualTextBox = document.createElement('div');
        dualTextBox.classList.add('dual-text-box', 'text-box');
        dualTextBox.style = 'font-style: italic; margin-top: 0;';
        gradient.appendChild(dualTextBox);

        const dualTextBoxLeft = document.createElement('div');
        dualTextBoxLeft.innerText = 'TIP:';
        dualTextBoxLeft.style.marginRight = '10px';
        dualTextBox.appendChild(dualTextBoxLeft);

        const dualTextBoxRight = document.createElement('div');
        dualTextBoxRight.innerText = 'Exported by an Android phone? Select all media files and a .txt file. Exported by an iPhone? Select the .zip file.';
        dualTextBox.appendChild(dualTextBoxRight);

        const textBox2 = document.createElement('div');
        textBox2.classList.add('text-box');
        textBox2.style.marginTop = '0';
        textBox2.innerText = 'Your conversations stay private as this all happens just on your device, you even don\'t need internet.';
        gradient.appendChild(textBox2);

        const selectFilesButton = document.createElement('label');
        selectFilesButton.classList.add('button', 'round', 'diary');
        selectFilesButton.style.marginTop = '38px'
        selectFilesButton.innerHTML = 'Select Files';
        gradient.appendChild(selectFilesButton);

        const uploadFilesInput = document.createElement('input');
        uploadFilesInput.id = 'uploadFilesInput';
        uploadFilesInput.classList.add('upload-files__input');
        uploadFilesInput.type = 'file';
        uploadFilesInput.multiple = true;
        uploadFilesInput.addEventListener('change', e => eventHandler(e, {type: 'upload-files', files: uploadFilesInput.files}));
        selectFilesButton.appendChild(uploadFilesInput);

        const filesSelectedContainer = document.createElement('div');
        filesSelectedContainer.id = 'filesSelected';
        filesSelectedContainer.classList.add('files-selected-container', 'text-box');
        gradient.appendChild(filesSelectedContainer);

        const noFilesSelected = document.createElement('div');
        noFilesSelected.id = 'noFilesSelected';
        noFilesSelected.innerText = 'No files selected';
        filesSelectedContainer.appendChild(noFilesSelected);

        const startButton = document.createElement('button');
        startButton.id = 'startAssembling';
        startButton.classList.add('button', 'round', 'diary');
        startButton.innerHTML = 'Start assembling';
        startButton.disabled = true;
        startButton.addEventListener('click', e => eventHandler(e, {type: 'start-assembling'}));
        gradient.appendChild(startButton);

        const instructionsButton = document.createElement('button');
        instructionsButton.classList.add('button', 'started', 'small-font');
        instructionsButton.style.marginTop = '4.5vh';
        instructionsButton.innerHTML = 'Full assembling instructions >>';
        instructionsButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/instructions/');
        gradient.appendChild(instructionsButton);

        const aboutButton = document.createElement('button');
        aboutButton.classList.add('button', 'pick', 'small-font');
        aboutButton.style.marginTop = '3vh';
        aboutButton.style.marginBottom = '6vh';
        aboutButton.innerHTML = 'How we assure your privacy >>';
        aboutButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/about/');
        gradient.appendChild(aboutButton);

        renderSiteFooter(document.body);
       
    }

    const renderFile = (file) => {

        document.getElementById('noFilesSelected').style.display = 'none';
        document.getElementById('startAssembling').disabled = false;

        const fileElemContainer = document.createElement('div');
        fileElemContainer.classList.add('file-element-container');
        document.getElementById('filesSelected').appendChild(fileElemContainer);

        const fileElem = document.createElement('div');
        fileElem.classList.add('file-element');
        fileElem.innerText = file.name;
        fileElemContainer.appendChild(fileElem);

        const fileElemDeleteButton = document.createElement('button');
        fileElemDeleteButton.classList.add('file-element__delete-button');
        fileElemDeleteButton.addEventListener('click', (e) => {
            fileElemContainer.remove();

            if(document.getElementsByClassName('file-element-container').length === 0) {
                document.getElementById('noFilesSelected').style.display = 'block';
                document.getElementById('startAssembling').disabled = true;
            }

            eventHandler(e, {type: 'delete-file', filename: file.name});
        });
        fileElemContainer.appendChild(fileElemDeleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        fileElemDeleteButton.appendChild(deleteButtonImage);

    }

    const renderDiaryHeader = (parent, step) => {

        const assembleHeader = document.createElement('div');
        assembleHeader.classList.add('content-header', 'diary');
        parent.appendChild(assembleHeader);

        const leftColumn = document.createElement('div');
        leftColumn.style.width = '20%';
        leftColumn.style.display = 'flex';
        leftColumn.style.margin = 'auto';
        assembleHeader.appendChild(leftColumn);

        const centerColumn = document.createElement('div');
        centerColumn.style.width = '60%';
        centerColumn.style.display = 'flex';
        centerColumn.style.margin = 'auto';
        assembleHeader.appendChild(centerColumn);

        const text = document.createElement('div');
        text.classList.add('diary-header__text');
        text.style.width = '100%';
        text.style.paddingTop = '4px';
        text.innerText = 'Assemble Diary';
        centerColumn.appendChild(text);

        const rightColumn = document.createElement('div');
        rightColumn.style.width = '20%';
        rightColumn.style.display = 'flex';
        rightColumn.style.margin = 'auto';
        assembleHeader.appendChild(rightColumn);


        if(step != undefined) {

            const openNav = () => {
                document.getElementById('privacyNav').style.width = '100%';
            }

            const closeNav = () => {
                document.getElementById('privacyNav').style.width = '0%';
            }

            const nav = document.createElement('div');
            nav.id = 'privacyNav';
            nav.classList.add('overlay', 'privacy');
            document.body.appendChild(nav);

            const closeNavElem = document.createElement('a');
            closeNavElem.href = 'javascript:void(0)';
            closeNavElem.classList.add('closebtn', 'close-diary');
            closeNavElem.addEventListener('click', closeNav);
            closeNavElem.innerHTML = '&times;';
            nav.appendChild(closeNavElem);

            const overlayContent = document.createElement('div');
            overlayContent.id = 'exitContent';
            overlayContent.classList.add('overlay-content', 'privacy');
            nav.appendChild(overlayContent);

            const textContent = document.createElement('div');
            textContent.classList.add('privacy__text');
            textContent.style.width = overlayContent.style.width;
            textContent.innerHTML = 'Because of our privacy measures if you quit now, <span class=\'bold\'>your process cannot be saved</span>. This means when you come back to assemble <span class=\'bold\'>you have to start over</span>. If you want a break you can leave this website open without losing your progress. <span class=\'bold\'>Are you sure</span> you want to stop assembling your diary?';
            overlayContent.appendChild(textContent);

            const stopButton = document.createElement('button');
            stopButton.classList.add('button', 'round', 'diary');
            stopButton.style.marginTop = '8vh';
            stopButton.innerHTML = 'Yes, stop assembling';
            stopButton.addEventListener('click', e => eventHandler(e, {type: 'stop-assembling'}));
            overlayContent.appendChild(stopButton);

            const continueButton = document.createElement('button');
            continueButton.classList.add('button', 'round', 'diary');
            continueButton.style.marginTop = '8vh';
            continueButton.innerHTML = 'No, continue with the diary';
            continueButton.addEventListener('click', closeNav);
            overlayContent.appendChild(continueButton);

            const closeDiary = document.createElement('a');
            closeDiary.classList.add('diary-header__close-button');
            closeDiary.addEventListener('click', openNav);
            closeDiary.innerHTML = '&times;';
            leftColumn.appendChild(closeDiary);
    
            const stepCounter = document.createElement('div');
            stepCounter.classList.add('diary-header__step-counter');
            stepCounter.innerText = `#${step}/5`;
            rightColumn.appendChild(stepCounter);

        }
  
    }

    const renderDiarySteps = () => {

        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        document.body.appendChild(container); 

        renderDiaryHeader(container);
        
        const content = document.createElement('div');
        content.classList.add('content');
        container.appendChild(content);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.innerHTML = 'Assembling the diary takes <span class=\'bold\'>5 steps</span>.';
        textBox1.style.marginTop = '28px';
        textBox1.style.marginBottom ='28px';
        textBox1.style.textAlign = 'center';
        gradient.appendChild(textBox1);

        const stepsContainer = document.createElement('div');
        stepsContainer.classList.add('diary-steps__steps-container');
        gradient.appendChild(stepsContainer);

        const step1 = document.createElement('div');
        step1.classList.add('title', 'diary');
        step1.innerText = '#1 Who is the diary for?';
        stepsContainer.appendChild(step1);

        const step2 = document.createElement('div');
        step2.classList.add('title', 'diary');
        step2.innerText = '#2 Check contibuter names';
        stepsContainer.appendChild(step2);

        const step3 = document.createElement('div');
        step3.classList.add('title', 'diary');
        step3.innerText = '#3 Complete topic list';
        stepsContainer.appendChild(step3);

        const step4 = document.createElement('div');
        step4.classList.add('title', 'diary');
        step4.innerText = '#4 Collect responses per day';
        stepsContainer.appendChild(step4);

        const step5 = document.createElement('div');
        step5.classList.add('title', 'diary');
        step5.innerText = '#5 Review and download diary';
        stepsContainer.appendChild(step5);

        const line = document.createElement('div');
        line.classList.add('diary-steps__vertical-line');
        gradient.appendChild(line);

        const circle = document.createElement('div');
        circle.classList.add('diary-steps__circle');
        gradient.appendChild(circle);

        const stepCounterHelper = document.createElement('div');
        stepCounterHelper.classList.add('diary-steps__step-counter-helper');
        stepCounterHelper.innerText = 'Here you will see in which step you are.';
        gradient.appendChild(stepCounterHelper);

        const goButton = document.createElement('button');
        goButton.classList.add('button', 'round', 'diary');
        goButton.style.marginTop = '130px';
        goButton.innerHTML = 'Go to step 1';
        goButton.addEventListener('click', e => eventHandler(e, {type: 'go-to-step-1'}));
        gradient.appendChild(goButton);

        renderSiteFooter(container);

    }


    const renderStepController = (parent, step, helpContent) => {

        const openNav = () => {
            document.getElementById('helpNav').style.width = '100%';
        }

        const closeNav = () => {
            document.getElementById('helpNav').style.width = '0%';
        }

        const nav = document.createElement('div');
        nav.id = 'helpNav';
        nav.classList.add('overlay', 'privacy');
        parent.appendChild(nav);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn', 'close-diary');
        closeNavElem.addEventListener('click', closeNav);
        closeNavElem.innerHTML = '&times;';
        nav.appendChild(closeNavElem);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        nav.appendChild(overlayContent);

        if(helpContent != undefined)
            overlayContent.appendChild(helpContent);

        const container = document.createElement('div');
        container.classList.add('step-controller__container');
        parent.appendChild(container);

        const column1 = document.createElement('div');
        column1.style.width ='40%'
        column1.style.margin = 'auto';
        container.appendChild(column1);

        let previousButton;
        let previousButtonListener;
        if(step > 1) {
            previousButton = document.createElement('button');
            previousButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
            previousButton.innerText = `< Step ${step - 1}`;
            previousButtonListener = (e) => {
                eventHandler(e, {type: `go-to-step-${step - 1}`})
            } 
            previousButton.addEventListener('click', previousButtonListener);
            column1.appendChild(previousButton);
        }

        const column2 = document.createElement('div');
        column2.style.width ='20%'
        column2.style.margin = 'auto';
        container.appendChild(column2);

        const helpButton = document.createElement('button');
        helpButton.classList.add('button', 'round', 'diary', 'step-controller__help-button');
        helpButton.innerText = '?';
        helpButton.addEventListener('click', openNav);
        column2.appendChild(helpButton);

        const column3 = document.createElement('div');
        column3.style.width ='40%'
        column3.style.margin = 'auto';
        container.appendChild(column3);

        const nextButton = document.createElement('button');
        nextButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
        nextButton.innerText = `Step ${step + 1} >`;

        const nextButtonListener = (e) => {
            eventHandler(e, {type: `go-to-step-${step + 1}`})
        }
        nextButton.addEventListener('click', nextButtonListener);
        column3.appendChild(nextButton);

        return {leftButton: previousButton, leftButtonListener: previousButtonListener, rightButton: nextButton, rightButtonListener: nextButtonListener};
    }

    const renderWhoTheDiaryIsFor = (who) => {

        renderDiaryHeader(document.body, 1);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Who is this Diary for?';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = 'The name will be used to create a personal cover and opening page.';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        const inputName = document.createElement('input');
        inputName.classList.add('who__input-name');
        inputName.placeholder = 'Type the name here';
        if(who != undefined)
            inputName.value = who;

        lowerPage.appendChild(inputName);

        const helpText = document.createElement('div');
        helpText.classList.add('privacy__text');
        helpText.innerHTML = 'Give the name of your loved one who you are making this diary for. This name will be used on the cover of the final diary and on the first page to create a personal booklet and message for them. We do not save this information, this is all private and just for you and who you choose to share it with.';

        const { rightButton, rightButtonListener } = renderStepController(document.body, 1, helpText);
        rightButton.removeEventListener('click', rightButtonListener);
        rightButton.addEventListener('click', e => eventHandler(e, {type: `go-to-step-2`, who: inputName.value}));
    }

    const renderWhoContributed = (userData) => {

        renderDiaryHeader(document.body, 2);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Who contributed to this diary?';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = 'We found the following names in the group. Is this list correct?';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        const usernameList = document.createElement('div');
        usernameList.classList.add('who-contributed__username-list');
        lowerPage.appendChild(usernameList);



        for(const hash in userData) {

            const username = document.createElement('div');
            username.classList.add('who-contributed__username');
            usernameList.appendChild(username);

            const usernameText = document.createElement('input');
            usernameText.classList.add('who-contributed__username-input');
            usernameText.value = userData[hash].name;
            usernameText.disabled = true;
            username.appendChild(usernameText);

            const usernameEdit = document.createElement('button');
            usernameEdit.classList.add('who-contributed__username-edit');
            username.appendChild(usernameEdit);

            usernameEdit.addEventListener('click',  () => {
                username.classList.add('edit');
                editButtonImage.style.display = 'none';
                usernameCheck.style.display = 'block';
                usernameText.disabled = false;
                usernameText.focus();
            });

            const editButtonImage = document.createElement('img');
            editButtonImage.src = "{{ '/assets/images/edit.svg' | prepend: site.baseurl }}";
            editButtonImage.width = '25';
            editButtonImage.height = '25';
            usernameEdit.appendChild(editButtonImage);

            const usernameCheck = document.createElement('button');
            usernameCheck.classList.add('who-contributed__username-edit');
            usernameCheck.style.display = 'none';
            username.appendChild(usernameCheck);

            const checkButtonImage = document.createElement('img');
            checkButtonImage.src = "{{ '/assets/images/checkmark.svg' | prepend: site.baseurl }}";
            checkButtonImage.width = '25';
            checkButtonImage.height = '25';
            usernameCheck.appendChild(checkButtonImage);

            usernameCheck.addEventListener('click',  (e) => {
                username.classList.remove('edit');
                editButtonImage.style.display = 'block';
                usernameCheck.style.display = 'none';
                usernameText.disabled = true;
                eventHandler(e, {type: `edit-name`, hash, name: usernameText.value})
            });

        }

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'These are the names of the group members as they are saved on your phone. Make sure the list is complete and that these are the names that you would like to have them in the diary. If you would like to change them, click the pencil button to edit. If you see just a phone number, this person was not saved in your contacts. As we use these names to show who wrote which message take the time to check and edit them.';

        renderStepController(document.body, 2, helpContent);
    }

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

    const clearPage = () => {
        removeChildren('body');
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

    /*
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
    */

    const renderTopicsFound = (topics) => {

        if(topics == undefined) {

            topics = [    {
                day: 1,
                hash: "ssss",
                messages: [],
                text: ['test1', 'test2', 'test3'],
                timestamp: new Date().getTime(),
                color: 'red',
            }]

        }
        renderDiaryHeader(document.body, 3);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Which topics did you chat about?';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = 'We found the following set of topics. Is this list complete?';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        renderTopics(topics);

        const overlay = document.createElement('div');
        overlay.id = 'addTopicOptions';
        overlay.classList.add('overlay', 'privacy');
        document.body.appendChild(overlay);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn', 'close-diary');
        closeNavElem.addEventListener('click', () => overlay.style.width = '0');
        closeNavElem.innerHTML = '&times;';
        overlay.appendChild(closeNavElem);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'topic__options');
        overlay.appendChild(overlayContent);

        const selectFromChatButton = document.createElement('button');
        selectFromChatButton.classList.add('button', 'diary', 'round');
        selectFromChatButton.style.marginBottom = '50px';
        selectFromChatButton.innerText = 'Select from chat';
        selectFromChatButton.addEventListener('click', (e) => eventHandler(e, {type: 'select-from-chat'})); 
        overlayContent.appendChild(selectFromChatButton);

        const writeButton = document.createElement('button');
        writeButton.classList.add('button', 'diary', 'round');
        writeButton.innerText = 'Write my own';
        writeButton.addEventListener('click', (e) => eventHandler(e, {type: 'write-topic'})); 
        overlayContent.appendChild(writeButton);

        const addTopicContainer =  document.createElement('div');
        addTopicContainer.style.width = 'fit-content';
        addTopicContainer.classList.add('topic');
        lowerPage.appendChild(addTopicContainer);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic__add-topic-button');
        addTopicButton.innerText = 'Add Topic';
        addTopicButton.addEventListener('click', (e) => overlay.style.width = '100%');              
        addTopicContainer.appendChild(addTopicButton);

        const addButtonImage = document.createElement('img');
        addButtonImage.style.paddingRight = '10px';
        addButtonImage.src = "{{ '/assets/images/plus.svg' | prepend: site.baseurl }}";
        addButtonImage.width = '25';
        addButtonImage.height = '25';
        addTopicButton.insertBefore(addButtonImage, addTopicButton.childNodes[0]);

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'The topics we have found are the ones you shared through the Togather website. If you thought of your own topics you can add them here. You can select them from the chat, if you shared them there, or write your own. If there were days that you didn\'t have a topic, but messages were shared, then try to find a description for that. For example; A log of Monday. Or; Some things we liked to share today. This way we can add that day in the diary template.';

        renderStepController(document.body, 3, helpContent);

        /*
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
        */

    }

    const renderTopic = (day, topicData) => {
            
        const lowerPage = document.getElementById('lowerPage');

        const topic =  document.createElement('div');
        topic.classList.add('topic');
        lowerPage.appendChild(topic);

        const topicHeader = document.createElement('div');
        topicHeader.classList.add('topic__header');
        topic.appendChild(topicHeader);

        const topicHeaderDay =  document.createElement('div');
        topicHeaderDay.classList.add('topic__header__day');
        topicHeaderDay.innerText = `${i18n.getStringById('day')} ${topicData.day}`;
        topicHeader.appendChild(topicHeaderDay);

        const date = new Date(topicData.timestamp);
        const topicHeaderDate =  document.createElement('div');
        topicHeaderDate.classList.add('topic__header__date');
        topicHeaderDate.innerText = `${date.toLocaleDateString()}`;
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

        if(topicData.files && topicData.files.length > 0) {
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


        /*

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
        */      
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

    /*
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
    */

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const renderWriteTopic = (topicData) => {

        renderDiaryHeader(document.body, 3);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = 'Write your own topic and for which date this was';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        let newTopicCounter = 0;
        renderNewTopic(lowerPage, newTopicCounter);
        newTopicCounter++;

        const addTopicContainer =  document.createElement('div');
        addTopicContainer.id = 'addTopic';
        addTopicContainer.style.width = 'fit-content';
        addTopicContainer.classList.add('topic');
        lowerPage.appendChild(addTopicContainer);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic__add-topic-button');
        addTopicButton.innerText = 'Write another topic';
        addTopicButton.addEventListener('click', (e) => {
            renderNewTopic(lowerPage, newTopicCounter);
            newTopicCounter++;
        });              
        addTopicContainer.appendChild(addTopicButton);

        const addButtonImage = document.createElement('img');
        addButtonImage.style.paddingRight = '10px';
        addButtonImage.src = "{{ '/assets/images/plus.svg' | prepend: site.baseurl }}";
        addButtonImage.width = '25';
        addButtonImage.height = '25';
        addTopicButton.insertBefore(addButtonImage, addTopicButton.childNodes[0]);

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'The topics we have found are the ones you shared through the Togather website. If you thought of your own topics you can add them here. You can select them from the chat, if you shared them there, or write your own. If there were days that you didn\'t have a topic, but messages were shared, then try to find a description for that. For example; A log of Monday. Or; Some things we liked to share today. This way we can add that day in the diary template.';

        const openNav = () => {
            document.getElementById('helpNav').style.width = '100%';
        }

        const closeNav = () => {
            document.getElementById('helpNav').style.width = '0%';
        }

        const nav = document.createElement('div');
        nav.id = 'helpNav';
        nav.classList.add('overlay', 'privacy');
        document.body.appendChild(nav);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn', 'close-diary');
        closeNavElem.addEventListener('click', closeNav);
        closeNavElem.innerHTML = '&times;';
        nav.appendChild(closeNavElem);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        nav.appendChild(overlayContent);

        if(helpContent != undefined)
            overlayContent.appendChild(helpContent);

        const container = document.createElement('div');
        container.classList.add('step-controller__container');
        document.body.appendChild(container);

        const column1 = document.createElement('div');
        column1.style.width ='40%'
        column1.style.margin = 'auto';
        container.appendChild(column1);

        const previousButton = document.createElement('button');;
        previousButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
        previousButton.innerText = `< Back`;
        const previousButtonListener = (e) => {
            eventHandler(e, {type: `back`})
        } 
        previousButton.addEventListener('click', previousButtonListener);
        column1.appendChild(previousButton);
        

        const column2 = document.createElement('div');
        column2.style.width ='20%'
        column2.style.margin = 'auto';
        container.appendChild(column2);

        const helpButton = document.createElement('button');
        helpButton.classList.add('button', 'round', 'diary', 'step-controller__help-button');
        helpButton.innerText = '?';
        helpButton.addEventListener('click', openNav);
        column2.appendChild(helpButton);

        const column3 = document.createElement('div');
        column3.style.width ='40%'
        column3.style.margin = 'auto';
        container.appendChild(column3);

        const nextButton = document.createElement('button');
        nextButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
        nextButton.innerText = 'Add to topics';

        const nextButtonListener = (e) => {

            const topics = new Map();
            const dates = document.getElementsByClassName('topic__write-topic__date');
            const textAreas = document.getElementsByClassName('topic__write-topic__textarea');
          
            for(let i = 0; i < dates.length; i++) {
                topics.set(dates[i].getAttribute('index'),{text: textAreas[i].value , timestamp: dates[i].valueAsDate.getTime()});
            }

            eventHandler(e, {type: 'done', topics})
        }
        nextButton.addEventListener('click', nextButtonListener);
        column3.appendChild(nextButton);
        
        /*

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
*/
    }

    const renderNewTopic = (topicData, index) => {

        const container = document.createElement('div');
        container.classList.add('topic');
        document.getElementById('lowerPage').insertBefore(container,  document.getElementById('addTopic'));

        const topicDate = document.createElement('input');
        topicDate.type = 'date';
        topicDate.name = 'topicDate';
        topicDate.id = 'topicDate';
        topicDate.setAttribute('index', index);
        topicDate.classList.add('topic__write-topic__input', 'topic__write-topic__date');
        if(topicData != null)
            topicDate.valueAsDate = new Date(topicData.fulltimestamp);
        container.appendChild(topicDate);

        const topicTextArea = document.createElement('textarea');
        topicTextArea.classList.add('topic__write-topic__input', 'topic__write-topic__textarea');
        topicTextArea.placeholder = 'Type your topic description here';
        topicTextArea.resize
        if(topicData != null)
            topicTextArea.textContent = topicData.text;
        container.appendChild(topicTextArea);

        container.appendChild(document.createElement('br'));

        const addPhotoLabel = document.createElement('label');
        addPhotoLabel.classList.add('topic__write-topic__input');
        container.appendChild(addPhotoLabel);

        const labelContainer = document.createElement('span');
        addPhotoLabel.appendChild(labelContainer);

        const addButtonImage = document.createElement('img');
        addButtonImage.style.paddingRight = '10px';
        addButtonImage.style.display = 'inline-block';
        addButtonImage.style.verticalAlign = 'middle';
        addButtonImage.src = "{{ '/assets/images/plus.svg' | prepend: site.baseurl }}";
        addButtonImage.width = '25';
        addButtonImage.height = '25';
        labelContainer.appendChild(addButtonImage);

        const text = document.createElement('span');
        text.innerText = 'Add media';
        labelContainer.appendChild(text);

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
    
            let nMedia = uploadedPhotos.getElementsByClassName('topic__write-topic__photo-container').length;

            for(let i = 0; i < addPhotoInput.files.length; i++) {
                const result = await readFile(addPhotoInput.files[i]);
                const file = { type: result.file.type, data: result.fileContent, name: result.file.name } 

                renderAddedPhoto(file, (nMedia+i)%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2, index);                 
                files.push(file);
            }
    
            eventHandler(e, {type: 'upload-files', files, index});
            
        });

        const uploadedPhotos = document.createElement('div');
        uploadedPhotos.classList.add('topic__write-topic__uploaded-photos');
        container.appendChild(uploadedPhotos);
    
        const uploadedPhotosRow = document.createElement('div');
        uploadedPhotosRow.classList.add('topic__write-topic__uploaded-photos__row');
        uploadedPhotos.appendChild(uploadedPhotosRow);

        const uploadedPhotosColumn1 = document.createElement('div');
        uploadedPhotosColumn1.id = `uploadedPhotosColumn1${index}`;
        uploadedPhotosColumn1.classList.add('topic__write-topic__uploaded-photos__column');
        uploadedPhotosRow.appendChild(uploadedPhotosColumn1);

        const uploadedPhotosColumn2 = document.createElement('div');
        uploadedPhotosColumn2.id = `uploadedPhotosColumn2${index}`;
        uploadedPhotosColumn2.classList.add('topic__write-topic__uploaded-photos__column');
        uploadedPhotosRow.appendChild(uploadedPhotosColumn2);

        if(topicData && topicData.files) {
            for(let i = 0; i < topicData.files.length; i++) {
                renderAddedPhoto(topicData.files[i], i%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2, index); 
            }
        }
    }


    const renderAddedPhoto = (file, parent, index) => {
  
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
            eventHandler(e, {type: 'delete-photo', file, index})
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

    const renderPdfPreview = (pdfData) => {

        const div = document.createElement('div');
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.position = 'relative';

        const iframe = document.createElement('iframe');
        iframe.src = pdfData;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        div.appendChild(iframe);

        const buttonDownload = document.createElement('button');
        buttonDownload.style.position = 'absolute';
        buttonDownload.style.bottom = '5vh';
        buttonDownload.style.left = '50%';
        buttonDownload.innerText = 'Download';
        div.appendChild(buttonDownload);

        return div;

    }

  
    return {

        renderSiteHeader,
        renderSiteFooter,
        renderUploadFiles,
        renderFile,
        renderDiarySteps,
        renderWhoTheDiaryIsFor,
        renderWhoContributed,

        clearPage,

        renderBaseUI,
        clearBaseUI,
        removeBaseUI,

        startTopicUI,
        removeTopicUI,
        renderTopicsFound,
        //renderAddTopicOptions,
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

        renderPdfPreview,

    }
}

export default DiaryUI;