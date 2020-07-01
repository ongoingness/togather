const DiaryUI = (eventHandler) => {

    /*
        [ {elem, eventype, eventListener}]
    */
    const eventListeners = [];

    const addEventListener = (elem, eventType, listener) => {
        elem.addEventListener(eventType, listener);
        eventListeners.push({elem, eventType, listener});
        console.log(eventListeners);
    }

    const removeEventListeners = () => {
        for( const {elem, eventType, listener} of eventListeners)
            elem.removeEventListener(eventType, listener);
        eventListeners.length = 0;
        console.log(eventListeners);
    }

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
        //hamburguer.addEventListener('click', openNav);
        addEventListener(hamburguer, 'click', openNav);
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
        //closeNavElem.addEventListener('click', closeNav);
        addEventListener(closeNavElem, 'click', closeNav)
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
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics';
        aTopic.innerText = 'Get a topic';
        overlayContent.appendChild(aTopic);

        const aExpl = document.createElement('a');
        aExpl.id = 'explained-a';
        aExpl.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aExpl.innerText = 'Introduction';
        overlayContent.appendChild(aExpl)

        const aInst = document.createElement('a');
        aInst.id = 'instructions-a';
        aInst.href = '{{ site.url }}{{ site.baseurl }}/instructions'
        aInst.innerText = 'Instructions';
        overlayContent.appendChild(aInst);

        const aDiary = document.createElement('a');
        aDiary.id = 'diary-a'
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary' 
        aDiary.innerText = 'Assemble Diary';
        aDiary.style.textDecoration = 'underline';
        overlayContent.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.id = 'about-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about';
        aAbout.innerText = 'About';
        overlayContent.appendChild(aAbout);
        
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
        selectFilesButton.classList.add('button', 'round', 'diary','b-gradient');
        selectFilesButton.style.marginTop = '38px'
        selectFilesButton.innerHTML = 'Select Files';
        gradient.appendChild(selectFilesButton);

        const uploadFilesInput = document.createElement('input');
        uploadFilesInput.id = 'uploadFilesInput';
        uploadFilesInput.classList.add('upload-files__input');
        uploadFilesInput.type = 'file';
        uploadFilesInput.multiple = true;
        const uploadFileChangeListener = (e) => {
            eventHandler(e, {type: 'upload-files', files: uploadFilesInput.files})
        };
        //uploadFilesInput.addEventListener('change', uploadFileChangeListener);
        addEventListener(uploadFilesInput, 'change', uploadFileChangeListener);

        //uploadFilesInput.addEventListener('click', e => uploadFilesInput.value = null);
        const uploadFilesClickListener = (e) => uploadFilesInput.value = null;
        addEventListener(uploadFilesInput, 'click', uploadFilesClickListener);
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

        const startButtonClickListener = e => {
            renderButtonLoader(startButton);
            eventHandler(e, {type: 'start-assembling'});
        };

        //startButton.addEventListener('click', e => eventHandler(e, {type: 'start-assembling'}));
        addEventListener(startButton, 'click', startButtonClickListener);
        gradient.appendChild(startButton);

        const instructionsButton = document.createElement('button');
        instructionsButton.classList.add('button', 'started', 'small-font');
        instructionsButton.style.marginTop = '4.5vh';
        instructionsButton.innerHTML = 'Full assembling instructions >>';
        const instructionsButtonClickListener = (e) => location.href='{{ site.url }}{{ site.baseurl }}/instructions';
        //instructionsButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/instructions/');
        addEventListener(instructionsButton, 'click', instructionsButtonClickListener);
        gradient.appendChild(instructionsButton);

        const aboutButton = document.createElement('button');
        aboutButton.classList.add('button', 'pick', 'small-font');
        aboutButton.style.marginTop = '3vh';
        aboutButton.style.marginBottom = '6vh';
        aboutButton.innerHTML = 'How we assure your privacy >>';
        const aboutButtonClickListener = (e) =>  location.href='{{ site.url }}{{ site.baseurl }}/about';
        //aboutButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/about/');
        addEventListener(aboutButton, 'click', aboutButtonClickListener);
        gradient.appendChild(aboutButton);

        renderSiteFooter(document.body);
       
    }

    const renderErrorModal = (errorMessage, onClose = undefined) => {

        const modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.append(modal);

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modal.appendChild(modalContent);

        const closeButton = document.createElement('a');
        closeButton.classList.add('modal__close-button');
        closeButton.innerText = '×';
        closeButton.addEventListener('click', () => {
            modal.remove();
            if(onClose != undefined)
                onClose();
        });
        modalContent.appendChild(closeButton);

        const modalText = document.createElement('p');
        modalText.style.textAlign = 'center';
        modalText.innerText = errorMessage;
        modalContent.appendChild(modalText);

        const modalOK = document.createElement('button');
        modalOK.classList.add('button', 'round', 'pick');
        modalOK.innerText = 'Okay';
        modalOK.addEventListener('click', (e) => {
            modal.remove();
            if(onClose != undefined)
                onClose();
        });
        modalContent.appendChild(modalOK);

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.remove();
                onClose();
            }
        }
        
        modal.style.display = 'block';
    }

    const renderUploadErrorModal = () => {

        const onClose = () => {
            const button = document.getElementById('startAssembling');
            button.innerHTML = 'Start Assembling';
            button.style.width = 'initial';
            button.disabled = false;
        }
        renderErrorModal('No chat file found', onClose);

    };

    const renderLoader = (parent) => {

        const openLoader = () => {
            document.getElementById('loader').style.width = '100%';
        }

        const closeLoader = () => {
            document.getElementById('loader').style.width = '0%';
        }

        const nav = document.createElement('div');
        nav.id = 'loader';
        nav.classList.add('overlay', 'privacy');
        nav.style.opacity = '0.95';
        parent.appendChild(nav);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
        overlayContent.style.height = '100%';
        overlayContent.style.top = '0';
        nav.appendChild(overlayContent);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

        const container = document.createElement('div');
        container.classList.add('step-controller__container');
        container.style.height = '100%';
        overlayContent.appendChild(container);

        const loader = document.createElement('div');
        loader.classList.add('loader');
        container.append(loader);

        return {openLoader, closeLoader};
    }

    const renderButtonLoader = (button) => {
        button.disabled = true;
        button.style.width = `${button.offsetWidth}px`;
        button.innerText = '';

        const icon = document.createElement('i');
        icon.classList.add('button-loader');
        button.appendChild(icon);
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
        //text.style.paddingTop = '4px';
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

            window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

            const closeNavElem = document.createElement('a');
            closeNavElem.href = 'javascript:void(0)';
            closeNavElem.classList.add('closebtn', 'close-diary');
            closeNavElem.addEventListener('click', closeNav);
            closeNavElem.innerHTML = '&times;';
            nav.appendChild(closeNavElem);

            const overlayContent = document.createElement('div');
            overlayContent.id = 'exitContent';
            overlayContent.classList.add('overlay-content', 'privacy');
            overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
            nav.appendChild(overlayContent);

            const textContent = document.createElement('div');
            textContent.classList.add('privacy__text');
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
        container.style.overflowX = 'hidden';
        document.body.appendChild(container); 

        renderDiaryHeader(container);
        
        const content = document.createElement('div');
        content.classList.add('content');
        content.style.height = '94%';
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
        goButton.style.marginBottom = '30px';
        goButton.innerHTML = 'Go to step 1';
        goButton.addEventListener('click', e => eventHandler(e, {type: 'go-to-step-1'}));
        gradient.appendChild(goButton);

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
        nav.style.opacity = '0.95';
        parent.appendChild(nav);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn', 'close-helper');
        closeNavElem.addEventListener('click', closeNav);
        closeNavElem.innerHTML = '&times;';
        nav.appendChild(closeNavElem);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
        nav.appendChild(overlayContent);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

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
            previousButton.id = 'leftButton';
            previousButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
            previousButton.innerText = `< Step ${step - 1}`;
            previousButtonListener = (e) => {
                renderButtonLoader(previousButton);
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
        nextButton.id = 'rightButton';
        nextButton.classList.add('button', 'round', 'diary', 'step-controller__step-button');
        nextButton.innerText = `Step ${step + 1} >`;

        const nextButtonListener = (e) => {
            renderButtonLoader(nextButton);
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
        inputName.addEventListener('input', () => rightButton.disabled = inputName.value.length === 0);
        inputName.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                inputName.blur();
            }
          });

        inputName.addEventListener('submit', (e) =>  console.log('what'));
        if(who != undefined && who != '')
            inputName.value = who;
        lowerPage.appendChild(inputName);

        const helpText = document.createElement('div');
        helpText.classList.add('privacy__text');
        helpText.innerHTML = 'Give the name of your loved one who you are making this diary for. This name will be used on the cover of the final diary and on the first page to create a personal booklet and message for them. We do not save this information, this is all private and just for you and who you choose to share it with.';

        const { rightButton, rightButtonListener } = renderStepController(document.body, 1, helpText);
        rightButton.removeEventListener('click', rightButtonListener);
        rightButton.addEventListener('click', e => {
            renderButtonLoader(rightButton);
            eventHandler(e, {type: `go-to-step-2`, who: inputName.value})
        });

        if(inputName.value == undefined || inputName.value == '')
            rightButton.disabled = true;
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
            usernameText.style.width = `${username.offsetWidth-115}px`;
            usernameText.value = userData[hash].name;
            usernameText.disabled = true;
            username.appendChild(usernameText);

            window.addEventListener('resize', e => usernameText.style.width = `${username.offsetWidth-115}px`);

            const usernameEdit = document.createElement('button');
            usernameEdit.classList.add('who-contributed__username-edit');
            username.appendChild(usernameEdit);

            usernameEdit.addEventListener('click',  () => {
                username.classList.add('edit');
                usernameEdit.style.display = 'none';
                usernameCheck.style.display = 'block';
                usernameText.disabled = false;
                usernameText.focus();
                userVisibility.disabled = true;
            });

            usernameText.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    usernameEdit.blur();
                    username.classList.remove('edit');
                    usernameEdit.style.display = 'block';
                    usernameCheck.style.display = 'none';
                    usernameText.disabled = true;
                    userVisibility.disabled = false;
                    eventHandler(e, {type: `edit-name`, hash, name: usernameText.value})
                }
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
                usernameEdit.style.display = 'block';
                usernameCheck.style.display = 'none';
                usernameText.disabled = true;
                userVisibility.disabled = false;
                eventHandler(e, {type: `edit-name`, hash, name: usernameText.value})
            });

            const userVisibility = document.createElement('button');
            userVisibility.classList.add('who-contributed__username-edit');
            userVisibility.addEventListener('click', (e) => {
                if(document.getElementById(`${hash}v`).style.display == 'none') {
                    document.getElementById(`${hash}v`).style.display = 'initial';
                    document.getElementById(`${hash}i`).style.display = 'none';
                    usernameEdit.disabled = true; 
                    usernameEdit.classList.add('not-visible');
                    usernameText.classList.add('not-visible');
                } else {
                    document.getElementById(`${hash}v`).style.display = 'none';
                    document.getElementById(`${hash}i`).style.display = 'initial';
                    usernameEdit.disabled = false; 
                    usernameEdit.classList.remove('not-visible');
                    usernameText.classList.remove('not-visible');
                }
                eventHandler(e, {type: `change-visibility`, hash});
            });
            username.appendChild(userVisibility);

            const userVisibleImage = document.createElement('i');
            userVisibleImage.id = `${hash}v`;
            userVisibleImage.classList.add('far', 'fa-eye');
            userVisibleImage.style.width = '25px';
            userVisibleImage.style.height = '25px';
            userVisibility.appendChild(userVisibleImage);

            const userNotVisibleImage = document.createElement('i');
            userNotVisibleImage.id = `${hash}i`;
            userNotVisibleImage.classList.add('far', 'fa-eye-slash');
            userNotVisibleImage.style.width = '25px';
            userNotVisibleImage.style.height = '25px';
            userVisibility.appendChild(userNotVisibleImage);

            if(userData[hash].visible) {
                userVisibleImage.style.display = 'none';
                userNotVisibleImage.style.display = 'initial';
            } else {
                userVisibleImage.style.display = 'initial';
                userNotVisibleImage.style.display = 'none';
                usernameEdit.disabled = true; 
                usernameEdit.classList.add('not-visible');
                usernameText.classList.add('not-visible');
            }

        }

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'These are the names of the group members as they are saved on your phone. Make sure the list is complete and that these are the names that you would like to have them in the diary. If you would like to change them, click the pencil button to edit. If you see just a phone number, this person was not saved in your contacts. As we use these names to show who wrote which message take the time to check and edit them.';

        renderStepController(document.body, 2, helpContent);
    }

    const clearPage = () => {
        removeEventListeners();
        removeChildren('body');
    }

    const renderTopicsFound = (topics) => {

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
        overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
        overlay.appendChild(overlayContent);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

        const selectFromChatButton = document.createElement('button');
        selectFromChatButton.classList.add('button', 'diary', 'round');
        selectFromChatButton.style.marginBottom = '50px';
        selectFromChatButton.innerText = 'Select from chat';
        selectFromChatButton.addEventListener('click', (e) => {
            renderButtonLoader(selectFromChatButton);
            eventHandler(e, {type: 'select-from-chat'});
        }); 
        overlayContent.appendChild(selectFromChatButton);

        const writeButton = document.createElement('button');
        writeButton.classList.add('button', 'diary', 'round');
        writeButton.innerText = 'Write my own';
        writeButton.addEventListener('click', (e) => {
            renderButtonLoader(writeButton);
            eventHandler(e, {type: 'write-topic'});
        }); 
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

        const { rightButton } = renderStepController(document.body, 3, helpContent);
        rightButton.disabled = document.getElementsByClassName('topic__header').length === 0;
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
        topicHeaderDay.innerText = `Day ${topicData.day}`;
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
        topicHeaderDeleteButton.addEventListener('click', (e) => {
            topic.remove();
            document.getElementById('rightButton').disabled = document.getElementsByClassName('topic__header').length === 0;
            eventHandler(e, {type: 'delete-topic', day})
        });
        topicHeader.appendChild(topicHeaderDeleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        topicHeaderDeleteButton.appendChild(deleteButtonImage);

        for(let line of topicData.text) {
            const topicText = document.createElement('div');
            topicText.style.marginTop = '15px';
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
                    video.classList.add('topic__media__image');
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
                    image.classList.add('topic__media__image');
                    image.src = file.data;
                    image.width = 320;
                    image.height = 240;
                    chatMessageMediaBody.appendChild(image);

                }
            }
        }    
    }

    const renderTopics = (topics) => {

        for(let i = 0; i < topics.length; i++) {

            renderTopic(i, topics[i]);
        }

    }

    const removeTopics = () => {
        removeChildren('lowerPage');
    }

    const removeChildren = (id) => {

        const myNode = document.getElementById(id);
        if(myNode != undefined) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
        }

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
        renderNewTopic(topicData, `${newTopicCounter}`);
        newTopicCounter++;

        if(topicData == undefined) {
    
            const addTopicContainer =  document.createElement('div');
            addTopicContainer.id = 'addTopic';
            addTopicContainer.style.width = 'fit-content';
            addTopicContainer.classList.add('topic');
            lowerPage.appendChild(addTopicContainer);

            const addTopicButton  = document.createElement('button');
            addTopicButton.classList.add('topic__add-topic-button');
            addTopicButton.innerText = 'Write another topic';
            addTopicButton.addEventListener('click', (e) => {
                renderNewTopic(lowerPage, `${newTopicCounter}`);
                newTopicCounter++;
            });              
            addTopicContainer.appendChild(addTopicButton);

            const addButtonImage = document.createElement('img');
            addButtonImage.style.paddingRight = '10px';
            addButtonImage.src = "{{ '/assets/images/plus.svg' | prepend: site.baseurl }}";
            addButtonImage.width = '25';
            addButtonImage.height = '25';
            addTopicButton.insertBefore(addButtonImage, addTopicButton.childNodes[0]);

        }

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'The topics we have found are the ones you shared through the Togather website. If you thought of your own topics you can add them here. You can select them from the chat, if you shared them there, or write your own. If there were days that you didn\'t have a topic, but messages were shared, then try to find a description for that. For example; A log of Monday. Or; Some things we liked to share today. This way we can add that day in the diary template.';

        const {leftButton, rightButton, leftButtonListener, rightButtonListener} = renderStepController(document.body, 3, helpContent);
        leftButton.innerText = '< Back';
        rightButton.innerText = topicData == undefined ? 'Add to topics' : 'Done';
        if(topicData == undefined) rightButton.style.fontSize = 'large';

        rightButton.removeEventListener('click', rightButtonListener);
        const newRightButtonListener = (e) => {

            renderButtonLoader(rightButton);

            const topics = new Map();
            const dates = document.getElementsByClassName('topic__write-topic__date');
            const textAreas = document.getElementsByClassName('topic__write-topic__textarea');
          
            for(let i = 0; i < dates.length; i++) {

                if(dates[i].valueAsDate != null && (textAreas[i].value != null && textAreas[i].value != ''))
                    topics.set(`${dates[i].getAttribute('index')}`,{text: textAreas[i].value , timestamp: dates[i].valueAsDate.getTime()});
            
            }

            const params = {type: 'done', topics};
            if(topicData != undefined) params.hash = topicData.hash;
            eventHandler(e, params);
            
        }
        rightButton.addEventListener('click', newRightButtonListener);

        leftButton.removeEventListener('click', leftButtonListener);
        const newLeftButtonListener = (e) => {

            renderButtonLoader(leftButton);
            eventHandler(e, {type: 'back'});

        }
        leftButton.addEventListener('click', newLeftButtonListener);

    }

    const renderNewTopic = (topicData, index) => {

        const container = document.createElement('div');
        container.classList.add('topic');
        document.getElementById('lowerPage').insertBefore(container,  document.getElementById('addTopic'));

        const topicDate = document.createElement('input');
        topicDate.type = 'date';
        topicDate.name = 'topicDate';
        topicDate.id = 'topicDate';
        topicDate.setAttribute('index', `${index}`);
        topicDate.classList.add('topic__write-topic__input', 'topic__write-topic__date');
        topicDate.placeholder = 'DD/MM/YYYY';
        if(topicData != null)
            topicDate.valueAsDate = new Date(topicData.fulltimestamp);
        container.appendChild(topicDate);

        const textAreaContainer = document.createElement('div');
        container.appendChild(textAreaContainer);

        const topicTextArea = document.createElement('textarea');
        topicTextArea.classList.add('topic__write-topic__input', 'topic__write-topic__textarea');
        topicTextArea.placeholder = 'Type your topic description here';
        topicTextArea.resize = false;
        topicTextArea.style.height = '150px';
        if(topicData != null)
            topicTextArea.textContent = topicData.text;
        textAreaContainer.appendChild(topicTextArea);

        topicTextArea.style.height = topicTextArea.offsetHeight;

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

                renderAddedPhoto(file, (nMedia+i)%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2, `${index}`);                 
                files.push(file);
            }
    
            eventHandler(e, {type: 'upload-files', files, index: `${index}`});
            
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
                renderAddedPhoto(topicData.files[i], i%2 === 0 ? uploadedPhotosColumn1 : uploadedPhotosColumn2, `${index}`); 
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
            eventHandler(e, {type: 'delete-photo', file, index: `${Number(index)}`})
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

        renderDiaryHeader(document.body, 3);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = 'Select the topics you want to add.';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        for(let message of chatData) {
            renderChatMessage(message, 'lowerPage');
        }

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'Find the topics that we missed from you WhatsApp group chat. select them to add them to the topic list.';

        const {leftButton, rightButton, leftButtonListener, rightButtonListener} = renderStepController(document.body, 3, helpContent);
        leftButton.innerText = '< Back';
        rightButton.innerText = 'Add to topics';
        rightButton.style.fontSize = 'large';

        rightButton.removeEventListener('click', rightButtonListener);
        const newRightButtonListener = (e) => {

            renderButtonLoader(rightButton);
            eventHandler(e, {type: 'done'});
            
        }
        rightButton.addEventListener('click', newRightButtonListener);

        leftButton.removeEventListener('click', leftButtonListener);
        const newLeftButtonListener = (e) => {

            renderButtonLoader(leftButton);
            eventHandler(e, {type: 'back'});

        }
        leftButton.addEventListener('click', newLeftButtonListener);

    }

    const renderChatMessage = (messageData, messageListId, isSelected = false, isFromDay = false, selectString = 'Topic', isSelectedFromThisDay = false) => {
        
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');

        if(isFromDay)
            chatMessage.classList.add('day');
        
        if(isSelected) {
            chatMessage.classList.add('selected');
        
            const selectContainer = document.createElement('div');
            selectContainer.classList.add('selected-container');
            chatMessage.appendChild(selectContainer);

            const selectText = document.createElement('div');
            selectText.classList.add('selected-text');
            selectText.innerText = `${selectString}`;
            selectContainer.appendChild(selectText);
        } 

        
        if(!isSelected || (isSelected && isSelectedFromThisDay)) {

        
            chatMessage.addEventListener('click', (e) => {

                if(chatMessage.classList.contains('selected')) {
                    chatMessage.classList.remove('selected');
                    chatMessage.getElementsByClassName('selected-container')[0].remove();

                    eventHandler(e, {type: 'deselected-message', hash: messageData.hash});
                } else {
                    chatMessage.classList.add('selected');
        
                    const selectContainer = document.createElement('div');
                    selectContainer.classList.add('selected-container');
                    chatMessage.appendChild(selectContainer);

                    const selectText = document.createElement('div');
                    selectText.classList.add('selected-text');
                    selectText.innerText = `${selectString}`;
                    selectContainer.appendChild(selectText);
                
                    eventHandler(e, {type: 'selected-message', hash: messageData.hash});
                }
                
            }); 
        }

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
                    video.classList.add('topic__media__image');
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
                    image.classList.add('topic__media__image');
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
    }

    const renderSelectMessages = (dayData, allMessagesData, selectedMessagesHashes) => {

        renderDiaryHeader(document.body, 4);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Select all messages for this day:';
        upperPage.appendChild(title);

        const dayScrollerContainer = document.createElement('div');
        dayScrollerContainer.classList.add('day-scroller__container');
        upperPage.appendChild(dayScrollerContainer);

        const days = document.createElement('div');
        days.classList.add('day-scroller__day-buttons-container');
        dayScrollerContainer.appendChild(days);

        const daysLeft = document.createElement('div');
        daysLeft.classList.add('day-scroller__day-buttons-container__left');
        days.appendChild(daysLeft);

        const prevDay = document.createElement('button');
        prevDay.id = 'prevDay';
        prevDay.classList.add('day-scroller__prev');
        //prevDay.innerHTML = '&#10094;'
        prevDay.addEventListener('click', (e) => {
            prevDay.disabled = true;
            nextDay.disabled = true;
            prevDay.style.width = `${prevDay.offsetWidth}px`;
            prevDay.innerText = '';
    
            const icon = document.createElement('i');
            icon.classList.add('day-scroller__button__loader');
            prevDay.appendChild(icon);
            eventHandler(e, {type: 'prev-day'})
        });  
        daysLeft.appendChild(prevDay);

        const prevDayInside = document.createElement('div');
        prevDayInside.innerHTML = '&#10094;'
        prevDay.appendChild(prevDayInside);

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
        //nextDay.innerHTML = '&#10095;'
        nextDay.addEventListener('click', (e) => {
            
            nextDay.disabled = true;
            prevDay.disabled = true;
            nextDay.style.width = `${nextDay.offsetWidth}px`;
            nextDay.innerText = '';
    
            const icon = document.createElement('i');
            icon.classList.add('day-scroller__button__loader');
            nextDay.appendChild(icon);
            
            eventHandler(e, {type: 'next-day'});
        });  
        daysRight.appendChild(nextDay);

        const nextDayInside = document.createElement('div');
        nextDayInside.innerHTML = '&#10095;'
        nextDay.appendChild(nextDayInside );

        const dotContainer = document.createElement('div');
        dotContainer.id = 'dotContainer';
        dotContainer.classList.add('day-scroller__dot-container');
        dayScrollerContainer.appendChild(dotContainer);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
    
        content.appendChild(lowerPage);

        renderDay(dayData, allMessagesData, selectedMessagesHashes);

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'The topics we have found are the ones you shared through the Togather website. If you thought of your own topics you can add them here. You can select them from the chat, if you shared them there, or write your own. If there were days that you didn\'t have a topic, but messages were shared, then try to find a description for that. For example; A log of Monday. Or; Some things we liked to share today. This way we can add that day in the diary template.';

        const { rightButton } = renderStepController(document.body, 4, helpContent);
        
        rightButton.disabled = dayData.index + 1 < dayData.totalOfTopics;

    }

    const clearDay = () => {

        document.getElementById('dayDisplay').innerText = '';
        removeChildren('dotContainer');
        removeChildren('lowerPage');

    }

    const updateDay = (dayData) => {
        document.getElementById('dayDisplay').innerText = `Day ${dayData.day}`;
        document.getElementById('dayDisplay').style = `color: ${dayData.color};`
        document.getElementById('dayDisplay').addEventListener('click', e => document.getElementById('topicText').style.height = '100%')
    }

    const renderDay = (dayData, allMessagesData, selectedMessages) => {

        document.getElementById('dayDisplay').innerText = `Day ${dayData.part === 0 ? `${dayData.day}` : `${dayData.day} #${dayData.part}`}`;
        document.getElementById('dayDisplay').style = `color: ${dayData.color};`
        document.getElementById('dayDisplay').addEventListener('click', e => {
            const topicText = document.getElementById('topicText');
            topicText.style.height = topicText.offsetHeight === 0 ? '100%' : '0';
        });

        document.getElementById('prevDay').disabled = false;
        document.getElementById('nextDay').disabled = false;

        if(dayData.index === 0) { 

            document.getElementById('dayDisplay').style.position = 'relative';
            const tapImage = document.createElement('img');
            tapImage.src = "{{ '/assets/images/tap.svg' | prepend: site.baseurl }}";
            tapImage.width = '25';
            tapImage.height = '25';
            tapImage.classList.add('day-display__tap');
            document.getElementById('dayDisplay').appendChild(tapImage);

            document.getElementById('prevDay').disabled = true;
        } 
        
       if (dayData.index + 1 === dayData.totalOfTopics) {
            document.getElementById('nextDay').disabled = true;
        }

        const topicTextOverlay = document.createElement('div');
        topicTextOverlay.id = 'topicText';
        topicTextOverlay.classList.add('overlay', 'topic-text');
        lowerPage.appendChild(topicTextOverlay);

        topicTextOverlay.addEventListener('click', e =>  document.getElementById('topicText').style.height = '0%')

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        overlayContent.styletop = '35px';
        topicTextOverlay.appendChild(overlayContent);

        const topicTextTitle = document.createElement('div');
        topicTextTitle.classList.add('overlay__text-box');
        topicTextTitle.style.marginBottom = '20px';
        topicTextTitle.innerText = `Topic Day ${dayData.day}:`;
        overlayContent.appendChild(topicTextTitle);

        const topicTextBox = document.createElement('div');
        topicTextBox.classList.add('overlay__text-box');
        topicTextBox.style.maxHeight = '250px';
        topicTextBox.style.overflowY = 'auto';
        topicTextBox.innerText = `"${dayData.text}"`;
        overlayContent.appendChild(topicTextBox);

        const startSelecting = document.createElement('button');
        startSelecting.classList.add('button', 'round');
        startSelecting.style.margin = 'auto';
        startSelecting.style.color = 'white';
        startSelecting.style.borderColor = 'white';
        startSelecting.style.borderStyle = 'solid';
        startSelecting.style.background = '#E26A6A';
        startSelecting.style.marginTop = '10px';
        startSelecting.innerText = 'Select Messages';
        overlayContent.appendChild(startSelecting);

        /*
        const topicCheckBox = document.createElement('div');
        topicCheckBox.classList.add('overlay__text-box');
        overlayContent.appendChild(topicCheckBox);

        const checkButtonImage = document.createElement('img');
        checkButtonImage.src = "{{ '/assets/images/checkmark.svg' | prepend: site.baseurl }}";
        checkButtonImage.width = '25';
        checkButtonImage.height = '25';
        checkButtonImage.classList.add('overlay__topic__checkmark');
        topicCheckBox.appendChild(checkButtonImage);
        */

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

        console.log('ss', selectedMessages);

        for(let message of allMessagesData) {

            const isFromDay = new Date(message.fulltimestamp).getDate() === new Date(dayData.timestamp).getDate();
            let isSelected = false;
            let selectedDay = dayData.day;
            let isSelectedFromThisDay = false;
            let text = dayData.part === 0 ? `Day ${selectedDay}` : `Day ${selectedDay} #${dayData.part}`;
            if(selectedMessages != undefined) {
                if(selectedMessages.has(message.hash)) {
                    isSelected = true;
                    const {day, part} = selectedMessages.get(message.hash);
                    isSelectedFromThisDay = dayData.day === day && dayData.part === part;
                    text = dayData.part === 0 ? `Day ${day}` : `Day ${day} #${part}`;
                }
            }

            

            renderChatMessage(message, 'lowerPage', isSelected, isFromDay, text, isSelectedFromThisDay);
        }

        let dayMessages = document.getElementsByClassName('chat-message day');
        if(dayMessages.length > 0) {
            document.getElementById('lowerPage').scrollTop = dayMessages[0].offsetTop - (window.innerHeight * 0.35) ;
        }

        if(document.getElementById('rightButton') != undefined)
            document.getElementById('rightButton').disabled = dayData.index + 1 < dayData.totalOfTopics;


        const prevDay = document.getElementById('prevDay');
        const nextDay = document.getElementById('nextDay');

        const prevDayLoader = prevDay.getElementsByClassName('day-scroller__button__loader');
        const nextDayLoader = nextDay.getElementsByClassName('day-scroller__button__loader');
        
        if(prevDayLoader.length > 0)
            prevDay.innerHTML = '&#10094;'

        if (nextDayLoader.length > 0)
            nextDay.innerHTML = '&#10095;'
        
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

    const renderReviewDiary = () => {

        renderDiaryHeader(document.body, 5);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Review your diary, is it complete?';
        upperPage.appendChild(title);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        const pageContainer = document.createElement('div');
        pageContainer.id = 'pageContainer';
        pageContainer.style.margin = '25px';
        lowerPage.appendChild(pageContainer);

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = 'Go through the pages of your diary. Check if all the days, with their topics and messages are there. When you are happy with the diary you can save and download it. If there are things missing, go back to the previous step and add them.';

        const {rightButton} = renderStepController(document.body, 5, helpContent);
        rightButton.innerText = 'Finish Diary';

    }

    const renderPreviewDiaryPage = () => {

        const canvas = document.createElement('canvas');
        canvas.classList.add('preview-canvas');
        document.getElementById('pageContainer').appendChild(canvas);
        
        return canvas;
    }

    const renderDownloadDiary = () => {

        renderDiaryHeader(document.body, 5);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Your diary is ready!';
        upperPage.appendChild(title);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        centerContainer.style.font = 'Bold 18px/24px Open Sans';
        gradient.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.innerText = 'Download your Diary here:';
        textBox1.style.marginTop = '28px';
        centerContainer.appendChild(textBox1);
        
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('button', 'round', 'diary');
        downloadButton.innerText = 'Download Diary';
        downloadButton.addEventListener('click', e => eventHandler(e, {type: 'download-diary'}));
        centerContainer.appendChild(downloadButton);

    }

    const renderAskFeedback = () => {

        renderDiaryHeader(document.body, 5);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Your diary is ready!';
        upperPage.appendChild(title);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        gradient.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.innerText = 'Thanks for using Togather, as we are curious to how you have experienced living with togather, we are keen to hear your thoughts!';
        textBox1.style.marginTop = '28px';
        centerContainer.appendChild(textBox1);
        
        const giveButton = document.createElement('button');
        giveButton.classList.add('button', 'round', 'diary');
        giveButton.style.backgroundColor = '#00797D';
        giveButton.innerText = 'Give Feedback';
        giveButton.addEventListener('click', e => eventHandler(e, {type: 'give-feedback'}));
        centerContainer.appendChild(giveButton);

        const noButton = document.createElement('button');
        noButton.classList.add('button', 'round', 'diary');
        noButton.style.backgroundColor = '#00797D';
        noButton.style.marginTop = '25px';
        noButton.innerText = 'No thanks';
        noButton.addEventListener('click', e => eventHandler(e, {type: 'no'}));
        centerContainer.appendChild(noButton);
    }

    const renderGiveFeedback = () => {

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const centerContainer = document.createElement('div');
        centerContainer.classList.add('feedback__container');
        gradient.appendChild(centerContainer);7

        const title = document.createElement('div');
        title.classList.add('title', 'feedback');
        title.style.marginTop = '25px';
        title.innerText = 'Feedback Form';
        centerContainer.appendChild(title);
        
        const feedback = document.createElement('textarea');
        feedback.classList.add('feedback__textarea');
        centerContainer.appendChild(feedback);
        
        const consentLabel = document.createElement('label');
        consentLabel.classList.add('feedback__label');
        consentLabel.innerText = 'Consent text! Do I consent?';
        centerContainer.appendChild(consentLabel);

        const consent = document.createElement('input');
        consent.classList.add('feedback__checkbox');
        consent.type = 'checkbox';
        consentLabel.appendChild(consent);
        
        const giveButton = document.createElement('button');
        giveButton.classList.add('button', 'round', 'diary');
        giveButton.style.backgroundColor = '#00797D';
        giveButton.innerText = 'Submit';
        giveButton.addEventListener('click', e => {
            renderButtonLoader(giveButton);
            feedback.style.borderColor = 'initial';
            if(feedback.value === undefined || feedback.value.trim() === '') {
                feedback.style.borderColor = 'red';
                giveButton.innerText = 'Submit';
                giveButton.disabled = false;
            } else {
                eventHandler(e, {type: 'give-feedback', feedback: feedback.value.trim(), consent: consent.checked});
            }
        });
        centerContainer.appendChild(giveButton);

    }

    const renderShare = () => {

        renderDiaryHeader(document.body, 5);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = 'Your diary is ready!';
        upperPage.appendChild(title);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        gradient.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.innerText = 'Thanks for your feedback! If you have friends or family that might also like Togather share the website with them through this link.';
        textBox1.style.marginTop = '28px';
        centerContainer.appendChild(textBox1);
        
        const giveButton = document.createElement('button');
        giveButton.classList.add('button', 'round', 'diary');
        giveButton.style.backgroundColor = '#00797D';
        giveButton.innerText = 'Share Togather';
        giveButton.addEventListener('click', e => eventHandler(e, {type: 'share'}));
        centerContainer.appendChild(giveButton);

        const noButton = document.createElement('button');
        noButton.classList.add('button', 'round', 'diary');
        noButton.style.backgroundColor = '#00797D';
        noButton.style.marginTop = '25px';
        noButton.innerText = 'No thanks';
        noButton.addEventListener('click', e => eventHandler(e, {type: 'no'}));
        centerContainer.appendChild(noButton);

    }

    const  renderSiteFooter = (parent) => {
        const footer = document.createElement('div');
        footer.classList.add('footer');
        parent.appendChild(footer);

        const footerText = document.createElement('div');
        footerText.classList.add('footer__text');
        footerText.innerText = 'ToGather';
        footer.appendChild(footerText);

        const footerRow = document.createElement('div');
        footerRow.classList.add('row');
        footerRow.style.height = '100px';
        footerRow.style.marginBottom = '35px';
        footer.appendChild(footerRow);

        const footerColumn = document.createElement('div');
        footerColumn.classList.add('column');
        footerRow.appendChild(footerColumn);

        const linksContainer = document.createElement('div');
        linksContainer.style.display = 'flex';
        linksContainer.style.flexDirection = 'column';
        linksContainer.style.width = '100px';
        footerColumn.appendChild(linksContainer);

        const aHome = document.createElement('a');
        aHome.classList.add('footer__text__small');
        aHome.href = '{{ site.url }}{{ site.baseurl }}/';
        aHome.innerText = 'Home';
        linksContainer.appendChild(aHome);

        const aTopic = document.createElement('a');
        aTopic.classList.add('footer__text__small');
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics';
        aTopic .innerText = 'Get a Topic';
        linksContainer.appendChild(aTopic);

        const aIntro = document.createElement('a');
        aIntro.classList.add('footer__text__small');
        aIntro.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aIntro .innerText = 'Introduction';
        linksContainer.appendChild(aIntro);

        const aInstructions = document.createElement('a');
        aInstructions.classList.add('footer__text__small');
        aInstructions.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aInstructions.innerText = 'Instructions';
        linksContainer.appendChild(aInstructions);

        const aDiary = document.createElement('a');
        aDiary.classList.add('footer__text__small');
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary';
        aDiary.innerText = 'Assemble Diary';
        linksContainer.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.classList.add('footer__text__small');
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about';
        aAbout.innerText = 'About';
        linksContainer.appendChild(aAbout);

        const footerColumn2 = document.createElement('div');
        footerColumn2.classList.add('column');
        footerColumn2.style.maxWidth = '200px';
        footerRow.appendChild(footerColumn2);

        const langLabel = document.createElement('label');
        langLabel.for = 'languages';
        langLabel.classList.add('footer__text__small');
        langLabel.style.padding = '0';
        langLabel.innerText = 'Select Language:';
        footerColumn2.appendChild(langLabel);

        const langSelect = document.createElement('select');
        langSelect.id = 'languages';
        langSelect.style.marginRight = '20px';
        footerColumn2.appendChild(langSelect);

        const option = document.createElement('option');
        option.value = 'en';
        option.innerText = 'English';
        langSelect.appendChild(option);

        const contactButton = document.createElement('button');
        contactButton.classList.add('button', 'contact');
        contactButton.addEventListener('click', () => {
            location.href='{{ site.url }}{{ site.baseurl }}/contact';
        });
        contactButton.innerText = 'Contact >>';
        footerColumn2.appendChild(contactButton);

        const logoContainer = document.createElement('div');
        logoContainer.style.display = 'flex';
        logoContainer.style.flexDirection = 'row';
        logoContainer.style.flexWrap = 'wrap';
        logoContainer.style.paddingLeft = '15px';
        footer.appendChild(logoContainer);

        const img1Container = document.createElement('div');
        img1Container.style.width = '100px';
        img1Container.style.height = '40px';
        img1Container.style.paddingRight = '12px';
        img1Container.style.paddingBottom = '15px';
        logoContainer.appendChild(img1Container);

        const ongoingnessLink = document.createElement('a');
        ongoingnessLink.href = "https://enablingongoingness.com/";
        img1Container.appendChild(ongoingnessLink);

        const img1 = document.createElement('img');
        img1.src = "{{ '/assets/images/Ongoingness-logo.svg' | prepend: site.baseurl }}";
        ongoingnessLink.appendChild(img1);

        const img2Container = document.createElement('div');
        img2Container.style.padding = '0px 12px';
        img2Container.style.paddingBottom = '15px';
        logoContainer.appendChild(img2Container);

        const idiLink = document.createElement('a');
        idiLink.href = "https://www.kylemontague.co.uk/";
        img2Container.appendChild(idiLink);

        const img2 = document.createElement('img');
        img2.src = "{{ '/assets/images/iDi_logo_extended_white.svg' | prepend: site.baseurl }}";
        idiLink.appendChild(img2);

        const img3Container = document.createElement('div');
        img3Container.style.padding = '0px 12px';
        img3Container.style.paddingRight = '24px';
        img3Container.style.paddingBottom = '15px';
        logoContainer.appendChild(img3Container);

        const openLabLink = document.createElement('a');
        openLabLink.href = "https://openlab.ncl.ac.uk/";
        img3Container.appendChild(openLabLink);

        const img3 = document.createElement('img');
        img3.src = "{{ '/assets/images/openlab-vertical.svg' | prepend: site.baseurl }}";
        openLabLink.appendChild(img3);

        const img4Container = document.createElement('div');
        img4Container.style.width = '125px';
        img4Container.style.height = '40px'
        img4Container.style.paddingRight = '12px';
        img4Container.style.paddingBottom = '15px';
        logoContainer.appendChild(img4Container);

        const northumbriaLink = document.createElement('a');
        northumbriaLink.href = "https://www.northumbria.ac.uk/";
        img4Container.appendChild(northumbriaLink);

        const img4 = document.createElement('img');
        img4.width = '150';
        img4.height = '40';
        img4.src = "{{ '/assets/images/unn_logo_white.png' | prepend: site.baseurl }}";
        northumbriaLink.appendChild(img4);

        const img5Container = document.createElement('div');
        img5Container.style.width = '120px';
        img5Container.style.height = '40px'
        img5Container.style.padding = '0px 12px';
        img5Container.style.paddingBottom = '15px';
        logoContainer.appendChild(img5Container);

        const newcastleLink = document.createElement('a');
        newcastleLink.href = "https://www.ncl.ac.uk/";
        img5Container.appendChild(newcastleLink);

        const img5 = document.createElement('img');
        img5.width = '120';
        img5.height = '40';
        img5.src = "{{ '/assets/images/NCL_logo_white.png' | prepend: site.baseurl }}";
        newcastleLink.appendChild(img5);

    }

    return {

        renderSiteHeader,
        renderSiteFooter,
        renderUploadFiles,
        renderFile,
        renderDiarySteps,
        renderWhoTheDiaryIsFor,
        renderWhoContributed,

        renderReviewDiary,
        renderPreviewDiaryPage,
        renderDownloadDiary,
        renderAskFeedback,
        renderGiveFeedback,
        renderShare,

        clearPage,

        updateDay,

        renderTopicsFound,
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

        renderUploadErrorModal,
    }
}

export default DiaryUI;