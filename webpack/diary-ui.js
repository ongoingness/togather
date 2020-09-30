const DiaryUI = (eventHandler) => {

    /*
        [ {elem, eventype, eventListener}]
    */
    const eventListeners = [];

    const addEventListener = (elem, eventType, listener) => {
        elem.addEventListener(eventType, listener);
        eventListeners.push({elem, eventType, listener});
    }

    const removeEventListeners = () => {
        for( const {elem, eventType, listener} of eventListeners)
            elem.removeEventListener(eventType, listener);
        eventListeners.length = 0;
    }

    const renderSiteHeader = (title) => {

        // Will hold previously focused element
        let focusedElementBeforeOverlay;

        const openNav = () => {
            document.getElementById("myNav").style.visibility = 'visible'
            document.getElementById("myNav").style.width = "100%";
            
            // Save current focus
            focusedElementBeforeOverlay = document.activeElement;

            const trapTabKey = (e) => {
                // Check for TAB key press
                if (e.keyCode === 9) {
                    // SHIFT + TAB
                    if (e.shiftKey) {
                        if (document.activeElement === firstTabStop) {
                            e.preventDefault();
                            lastTabStop.focus();
                        }
                    // TAB
                    } else {
                        if (document.activeElement === lastTabStop) {
                            e.preventDefault();
                            firstTabStop.focus();
                        }
                    }
                }
                // ESCAPE
                if (e.keyCode === 27) {
                    console.log('clise');
                    closeNav();
                }
            }
            // Listen for and trap the keyboard
            nav.addEventListener('keydown', trapTabKey);

            // Listen for indicators to close the modal
           // modalOverlay.addEventListener('click', closeModal);

            // Find all focusable children
            var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
            var focusableElements = nav.querySelectorAll(focusableElementsString);
            // Convert NodeList to Array
            focusableElements = Array.prototype.slice.call(focusableElements);

            var firstTabStop = focusableElements[0];
            var lastTabStop = focusableElements[focusableElements.length - 1];

            // Focus first child
            firstTabStop.focus();
        }

        const closeNav = () => {
            focusedElementBeforeOverlay.focus();
            document.getElementById("myNav").style.width = "0%";
            document.getElementById("myNav").style.visibility = 'hidden';
        }

        const header = document.createElement('header');
        header.id = 'header';
        body.append(header);

        const headerTop = document.createElement('div');
        headerTop.classList.add('header__top');
        header.append(headerTop);

        const spanTitle = document.createElement('span');
        spanTitle.innerText = title;
        headerTop.append(spanTitle);

        const spanHeaderRight = document.createElement('span');
        spanHeaderRight.classList.add('header__right');
        headerTop.append(spanHeaderRight);

        const hamburguer = document.createElement('button');
        hamburguer.classList.add('header__hamburguer');
        hamburguer.tabIndex = 0;
        hamburguer.setAttribute('aria-label', 'Open Navigation Overlay');
        hamburguer.addEventListener('click', openNav);
        spanHeaderRight.appendChild(hamburguer);
        
        for(let i = 0; i < 3; i++) {
            const hamLine = document.createElement('div');
            hamLine.classList.add('hamburguer-line');
            hamburguer.appendChild(hamLine);
        }

        const headerButton = document.createElement('div');
        headerButton.classList.add('header__bottom');
        header.append(headerButton);

        const nav = document.createElement('div');
        nav.id = 'myNav';
        nav.classList.add('overlay');
        header.appendChild(nav);

        const closeNavButton = document.createElement('button');
        closeNavButton.classList.add('close-button');
        closeNavButton.setAttribute('aria-label', 'Close Navigation Overlay');
        closeNavButton.addEventListener('click', closeNav);
        closeNavButton.innerHTML = '&times;';
        nav.append(closeNavButton);

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content');
        nav.append(overlayContent);

        const aHome = document.createElement('a');
        aHome.id = 'home-a';
        aHome.href = '{{ site.url }}{{ site.baseurl }}/';
        aHome.innerText = '{% t nav-overlay.home-a %}';
        overlayContent.appendChild(aHome);

        const aTopic = document.createElement('a');
        aTopic.id = 'topic-a';
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics';
        aTopic.innerText = '{% t nav-overlay.topic-a %}';
        overlayContent.appendChild(aTopic);

        const aExpl = document.createElement('a');
        aExpl.id = 'explained-a';
        aExpl.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aExpl.innerText = '{% t nav-overlay.explained-a %}';
        overlayContent.appendChild(aExpl)

        const aInst = document.createElement('a');
        aInst.id = 'instructions-a';
        aInst.href = '{{ site.url }}{{ site.baseurl }}/instructions'
        aInst.innerText = '{% t nav-overlay.instructions-a %}';
        overlayContent.appendChild(aInst);

        const aDiary = document.createElement('a');
        aDiary.id = 'diary-a'
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary' 
        aDiary.innerText = '{% t nav-overlay.diary-a %}';
        aDiary.style.textDecoration = 'underline';
        overlayContent.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.id = 'about-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about';
        aAbout.innerText = '{% t nav-overlay.about-a %}';
        overlayContent.appendChild(aAbout);

        const aContact = document.createElement('a');
        aAbout.id = 'contact-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/contact';
        aAbout.innerText = '{% t nav-overlay.contact-a %}';
        overlayContent.appendChild(aContact);
        

        /*
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
        headerText.innerText = 'Togather';
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
        aHome.innerText = '{% t nav-overlay.home-a %}';
        overlayContent.appendChild(aHome);

        const aTopic = document.createElement('a');
        aTopic.id = 'topic-a';
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics';
        aTopic.innerText = '{% t nav-overlay.topic-a %}';
        overlayContent.appendChild(aTopic);

        const aExpl = document.createElement('a');
        aExpl.id = 'explained-a';
        aExpl.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aExpl.innerText = '{% t nav-overlay.explained-a %}';
        overlayContent.appendChild(aExpl)

        const aInst = document.createElement('a');
        aInst.id = 'instructions-a';
        aInst.href = '{{ site.url }}{{ site.baseurl }}/instructions'
        aInst.innerText = '{% t nav-overlay.instructions-a %}';
        overlayContent.appendChild(aInst);

        const aDiary = document.createElement('a');
        aDiary.id = 'diary-a'
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary' 
        aDiary.innerText = '{% t nav-overlay.diary-a %}';
        aDiary.style.textDecoration = 'underline';
        overlayContent.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.id = 'about-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about';
        aAbout.innerText = '{% t nav-overlay.about-a %}';
        overlayContent.appendChild(aAbout);

        const aContact = document.createElement('a');
        aAbout.id = 'contact-a';
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/contact';
        aAbout.innerText = '{% t nav-overlay.contact-a %}';
        overlayContent.appendChild(aContact);
        */
    }

    const renderSiteFooter = () => {

        const footer = document.createElement('footer');
        footer.style = "height: 378px; width: 100%; color: white; margin-top: 90px;"
        document.body.append(footer);

        const div1 = document.createElement('div');
        div1.style = "position: relative; width: 100%; height: 30px;"
        footer.append(div1);

        const contactButton = document.createElement('button');
        contactButton.style = "background-color: #d9b43c; z-index: 1;position: absolute;border: none;top: 0;right: 25px;font-size: 16px;font-weight: bold;color: #2b2b2b;border-radius: 15px;width: 100px;height: 30px;";
        contactButton.innerText = "Contact Us";
        div1.append(contactButton);

        const div2 = document.createElement('div');
        div2.style = "background-color: #d9b43c;bottom: 0px;height: 10px;position: absolute;width: 100%;z-index: 0;"
        div1.append(div2);
        
        const div3 = document.createElement('div');
        div3.style = "background: #596a84; height: 348px; width: 100%;";
        footer.append(div3);

        const div4 = document.createElement('div');
        div4.style = "text-align: center;padding: 20px;"
        div3.append(div4);

        const imgLogo = document.createElement('img');
        imgLogo.src = "{{ '/assets/images/TOGATHER_LOGO_reverse.png' | prepend: site.baseurl_root }}";
        imgLogo.width = "80";
        imgLogo.style = "opacity: 0.5"
        imgLogo.alt="Togather Logo"
        div4.append(imgLogo);

        const togatherNameLogo = document.createElement('h3');
        togatherNameLogo.style = "font: 32px/24px 'Roboto Condensed';letter-spacing: 0.96px;margin: 0;color: white;text-transform: uppercase;margin-top: 10px;";
        togatherNameLogo.innerText = "Togather";
        div4.append(togatherNameLogo);

        const div5 = document.createElement('div');
        div5.classList.add("row");
        div5.style = "height: 120px; margin-bottom: 35px;";
        div3.append(div5);

        const div6 = document.createElement('div');
        div6.classList.add("column");
        div5.append(div6);

        const div7 = document.createElement('div');
        div7.style = "display: flex; flex-direction: column; width: 100px;";
        div6.append(div7);

        const a1 = document.createElement('a');
        a1.classList.add("footer__text__small");
        a1.href = "{{ site.url }}{{ site.baseurl }}/";
        a1.innerText = "{% t nav-overlay.home-a %}";
        div7.append(a1);

        const a2 = document.createElement('a');
        a2.classList.add("footer__text__small");
        a2.href = "{{ site.url }}{{ site.baseurl }}/topics";
        a2.innerText = "{% t nav-overlay.topic-a %}";
        div7.append(a2);

        const a3 = document.createElement('a');
        a3.classList.add("footer__text__small");
        a3.href = "{{ site.url }}{{ site.baseurl }}/explained";
        a3.innerText = "{% t nav-overlay.explained-a %}";
        div7.append(a3);

        const a4 = document.createElement('a');
        a4.classList.add("footer__text__small");
        a4.href = "{{ site.url }}{{ site.baseurl }}/instructions";
        a4.innerText = "{% t nav-overlay.instructions-a %}";
        div7.append(a4);
     
        const a5 = document.createElement('a');
        a5.classList.add("footer__text__small");
        a5.href = "{{ site.url }}{{ site.baseurl }}/diary";
        a5.innerText = "{% t nav-overlay.diary-a %}";
        div7.append(a5);

        const a6 = document.createElement('a');
        a6.classList.add("footer__text__small");
        a6.href = "{{ site.url }}{{ site.baseurl }}/about";
        a6.innerText = "{% t nav-overlay.about-a %}";
        div7.append(a6);
                   
        const a7 = document.createElement('a');
        a7.classList.add("footer__text__small");
        a7.href = "{{ site.url }}{{ site.baseurl }}/contact";
        a7.innerText = "{% t nav-overlay.contact-a %}";
        div7.append(a7);
                   
        const div8 = document.createElement('div');
        div8.classList.add("column");
        div8.style = "max-width: 200px;"
        div5.append(div8);

        const languageLabel = document.createElement('label');
        languageLabel.id = "f1";
        languageLabel.for = "languages" 
        languageLabel.classList.add("footer__text__small");
        languageLabel.style = "padding: 0;"
        languageLabel.innerText = "{% t footer.f1 %}";
        div8.append(languageLabel);

        const languageSelect = document.createElement('select');
        languageSelect.name = "languages";
        languageSelect.id = "languages";
        languageSelect.style = "height: 22px; margin-right:20px; line-height:22px;";
        languageSelect.addEventListener('change', () => window.location.href = languageSelect.options[languageSelect.selectedIndex].value);

        div8.append(languageSelect);

        let language = window.location.href.trim().split('/').filter(elem => elem != '')[2]
        language = language === 'diary' ? 'en' : language;

        const option1 = document.createElement('option');
        option1.value = "/diary";
        option1.selected = language === 'en'
        option1.innerText = "{% t global.english %}";
        languageSelect.append(option1);

        const option2 = document.createElement('option');
        option2.value = "/pt/diary";
        option2.selected = language === 'pt';
        option2.innerText = "{% t global.portugues %}";
        languageSelect.append(option2);

        const div9 = document.createElement('div');
        div9.style = "text-align: center;";
        div3.append(div9);

        const div10 = document.createElement('div');
        div10.style = "display: flex; flex-direction: row; flex-wrap: wrap; padding: 0px 15px;";
        div9.append(div10);

        const div11 = document.createElement('div');
        div11.style = "margin: auto; margin-right: 20px;";
        div10.append(div11);

        const aProjectLogo = document.createElement('a');
        aProjectLogo.href = "https://enablingongoingness.com/";
        div11.append(aProjectLogo);

        const imgProjectLogo = document.createElement('img');
        imgProjectLogo.src = "{{ '/assets/images/Ongoingness-logo.svg' | prepend: site.baseurl_root }}";
        imgProjectLogo.height = "30";
        imgProjectLogo.alt = "Enabling Ongoingness Project Logo";
        aProjectLogo.append(imgProjectLogo);

        const div12 = document.createElement('div');
        div12.style = "margin: auto 0;";
        div10.append(div12);

        const aTeamLogo = document.createElement('a');
        aTeamLogo.href = "https://www.kylemontague.co.uk/#team";
        div12.append(aTeamLogo);

        const imgTeamLogo = document.createElement('img');
        imgTeamLogo.src = "{{ '/assets/images/iDi_logo_extended_white.svg' | prepend: site.baseurl_root }}";
        imgTeamLogo.height = "30";
        imgTeamLogo.alt = "Inclusive Design & Innovation (IDI) research group Logo";
        aTeamLogo.append(imgTeamLogo);

        const div13 = document.createElement('div');
        div13.style = "margin: auto; margin-left: 20px;";
        div10.append(div13);

        const aNorthumbriaLogo = document.createElement('a');
        aNorthumbriaLogo.href = "https://www.northumbria.ac.uk/";
        div13.append(aNorthumbriaLogo);

        const imgNorthumbriaLogo = document.createElement('img');
        imgNorthumbriaLogo.src = "{{ '/assets/images/unn_logo_white.png' | prepend: site.baseurl_root }}";
        imgNorthumbriaLogo.height = "30";
        imgNorthumbriaLogo.alt = "Northumbria University Logo";
        aNorthumbriaLogo.append(imgNorthumbriaLogo);

    }

    const renderUploadFiles = () => {
    
        renderSiteHeader("{% t diary.dh1 %}");

        const content = document.createElement('main');
        //content.classList.add('content');
        content.style.height = 'initial';
        document.body.appendChild(content);

        const textBox1 = document.createElement('div');
        textBox1.innerText = '{% t diary.uf1 %}';
        content.appendChild(textBox1);
        
        const dualTextBox = document.createElement('div');
        dualTextBox.classList.add('dual-text-box', 'text-box');
        dualTextBox.style = 'font-style: italic; margin-right: 0; margin-left: 0px; font-weight: 400;';
        content.appendChild(dualTextBox);

        const dualTextBoxLeft = document.createElement('div');
        dualTextBoxLeft.innerText = '{% t diary.uf2 %}';
        dualTextBoxLeft.style.marginRight = '10px';
        dualTextBox.appendChild(dualTextBoxLeft);

        const dualTextBoxRight = document.createElement('div');
        dualTextBoxRight.innerText = '{% t diary.uf3 %}';
        dualTextBox.appendChild(dualTextBoxRight);

        const textBox2 = document.createElement('div');
        textBox2.style.marginTop = '0';
        textBox2.innerText = '{% t diary.uf4 %}';
        content.appendChild(textBox2);

        const selectContainer = document.createElement('div');
        selectContainer.style = "height: 47px; display: flex; margin-top: 38px;"
        content.append(selectContainer);

        const selectFilesButton = document.createElement('label');
        selectFilesButton.classList.add('button', "secondary", 'small-font');
        selectFilesButton.style = "margin: auto; line-height: 47px;";
        selectFilesButton.innerHTML = '{% t diary.uf5 %}';
        selectContainer.appendChild(selectFilesButton);

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
        content.appendChild(filesSelectedContainer);

        const noFilesSelected = document.createElement('div');
        noFilesSelected.id = 'noFilesSelected';
        noFilesSelected.style = 'font: italic normal normal 18px/24px Roboto; letter-spacing: 0.36px; color: black; opacity: 1;';
        noFilesSelected.innerText = '{% t diary.uf6 %}';
        filesSelectedContainer.appendChild(noFilesSelected);

        const buttonContainer = document.createElement('div');
        buttonContainer.style = "display: flex; flex-direction: column;";
        content.append(buttonContainer);

        const startButton = document.createElement('button');
        startButton.id = 'startAssembling';
        startButton.classList.add("third", 'small-font');
        startButton.style.margin = 'auto';
        startButton.style.marginBottom = '20px';
        startButton.innerHTML = '{% t diary.uf7 %}';
        startButton.disabled = true;

        const startButtonClickListener = e => {
            renderButtonLoader(startButton);
            window.fathom.trackGoal('6QSZBLZG', 0);
            eventHandler(e, {type: 'start-assembling'});
        };

        //startButton.addEventListener('click', e => eventHandler(e, {type: 'start-assembling'}));
        addEventListener(startButton, 'click', startButtonClickListener);
        buttonContainer.appendChild(startButton);

        const instructionsButton = document.createElement('button');        
        instructionsButton.classList.add('outline', 'small-font');
        instructionsButton.style.margin = 'auto';
        instructionsButton.style.marginTop = '20px';
        instructionsButton.innerHTML = '{% t diary.uf8 %}';
        const instructionsButtonClickListener = (e) => location.href='{{ site.url }}{{ site.baseurl }}/instructions';
        //instructionsButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/instructions/');
        addEventListener(instructionsButton, 'click', instructionsButtonClickListener);
        buttonContainer.appendChild(instructionsButton);

        const aboutButton = document.createElement('button');
        aboutButton.classList.add('outline', 'small-font');
        aboutButton.style.margin = 'auto';
        aboutButton.style.marginTop = '20px';
        aboutButton.innerHTML = '{% t diary.uf9 %}';
        const aboutButtonClickListener = (e) =>  location.href='{{ site.url }}{{ site.baseurl }}/about';
        //aboutButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/about/');
        addEventListener(aboutButton, 'click', aboutButtonClickListener);
        buttonContainer.appendChild(aboutButton);

        //renderSiteFooter(document.body);

        renderSiteFooter();
       
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
            button.innerHTML = '{% t diary.uf7 %}';
            button.style.width = 'initial';
            button.disabled = false;
        }
        renderErrorModal('{% t diary.uem1 %}', onClose);

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

        const fileElemDeleteButtonContainer = document.createElement('div');
        fileElemDeleteButtonContainer.style.height = '100%';
        fileElemDeleteButtonContainer.style.margin = 'auto';
        fileElemContainer.append(fileElemDeleteButtonContainer);

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
        fileElemDeleteButtonContainer.appendChild(fileElemDeleteButton);

        const deleteButtonImage = document.createElement('img');
        deleteButtonImage.src = "{{ '/assets/images/delete.svg' | prepend: site.baseurl }}";
        deleteButtonImage.width = '25';
        deleteButtonImage.height = '25';
        fileElemDeleteButton.appendChild(deleteButtonImage);

    }

    const renderDiaryHeader = (parent, step, noMargin = false) => {

        const header = document.createElement('header');
        header.id = 'header';
        if(noMargin)
            header.style.marginBottom = '0px';
        parent.append(header);

        const headerTop = document.createElement('div');
        headerTop.classList.add('header__top');
        header.append(headerTop);

        const spanTitle = document.createElement('span');
        spanTitle.innerText = step;
        headerTop.append(spanTitle);

        const spanHeaderRight = document.createElement('span');
        spanHeaderRight.classList.add('header__right');
        spanHeaderRight.style.display = "flex";
        headerTop.append(spanHeaderRight);

        const headerBottom = document.createElement('div');
        headerBottom.classList.add('header__bottom');
        header.append(headerBottom);

        const openNav = () => {
            document.getElementById('closeNav').style.width = '100%';
        }

        const closeNav = () => {
            document.getElementById('closeNav').style.width = '0%';
        }

        const nav = document.createElement('div');
        nav.id = 'closeNav';
        nav.classList.add('overlay', 'privacy');
        nav.style.visibility = "visible";
        document.body.appendChild(nav);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

        //const closeNavElemContainer = document.createElement('div');
        //nav.append(closeNavElemContainer);

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
        textContent.innerHTML = '{% t diary.dh2 %}';
        overlayContent.appendChild(textContent);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.margin = '0 27px';
        buttonContainer.style.marginTop = '57px';
        overlayContent.appendChild(buttonContainer);

        const stopButton = document.createElement('button');
        stopButton.classList.add('secondary');
        stopButton.style.margin = 'auto';
        stopButton.innerHTML = '{% t diary.dh3 %}';
        stopButton.addEventListener('click', e => eventHandler(e, {type: 'stop-assembling'}));
        buttonContainer.appendChild(stopButton);

        const continueButton = document.createElement('button');
        continueButton.classList.add('primary');
        continueButton.style.margin = 'auto';
        continueButton.style.marginTop = '20px';
        continueButton.innerHTML = '{% t diary.dh4 %}';
        continueButton.addEventListener('click', closeNav);
        buttonContainer.appendChild(continueButton);

        /*
        const closeDiary = document.createElement('a');
        closeDiary.classList.add('diary-header__close-button');
        closeDiary.addEventListener('click', openNav);
        closeDiary.innerHTML = '&times;';
        leftColumn.appendChild(closeDiary);
        */

        const closeDiary  = document.createElement('button');
        closeDiary.style.background = 'none';
        closeDiary.style.padding = '6px';
        closeDiary.style.font = '50px/28px Roboto';
        closeDiary.tabIndex = 0;
        closeDiary.innerHTML = '&times;';
        closeDiary.setAttribute('aria-label', 'Open Navigation Overlay');
        closeDiary.addEventListener('click', openNav);
        spanHeaderRight.appendChild(closeDiary);
        

        /*

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
        text.innerText = '{% t diary.dh1 %}';
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
            textContent.innerHTML = '{% t diary.dh2 %}';
            overlayContent.appendChild(textContent);
    
            const stopButton = document.createElement('button');
            stopButton.classList.add('button', 'round', 'diary');
            stopButton.style.marginTop = '8vh';
            stopButton.innerHTML = '{% t diary.dh3 %}';
            stopButton.addEventListener('click', e => eventHandler(e, {type: 'stop-assembling'}));
            overlayContent.appendChild(stopButton);

            const continueButton = document.createElement('button');
            continueButton.classList.add('button', 'round', 'diary');
            continueButton.style.marginTop = '8vh';
            continueButton.innerHTML = '{% t diary.dh4 %}';
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
        */
  
    }

    const renderDiarySteps = () => {

        renderDiaryHeader(document.body, "Assemble Diary");
        
        const content = document.createElement('main');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        document.body.appendChild(content);

        const textBox1 = document.createElement('div');
        textBox1.innerHTML = '{% t diary.ds1 %}';
        textBox1.style.margin = 'auto';
        textBox1.style.marginBottom ='28px';
        content.appendChild(textBox1);

        const stepsContainer = document.createElement('div');
        stepsContainer.classList.add('diary-steps__steps-container');
        content.appendChild(stepsContainer);

        const step1 = document.createElement('div');
        step1.classList.add('title', 'diary');
        step1.innerText = '{% t diary.ds2 %}';
        stepsContainer.appendChild(step1);

        const step2 = document.createElement('div');
        step2.classList.add('title', 'diary');
        step2.innerText = '{% t diary.ds3 %}';
        stepsContainer.appendChild(step2);

        const step3 = document.createElement('div');
        step3.classList.add('title', 'diary');
        step3.innerText = '{% t diary.ds4 %}';
        stepsContainer.appendChild(step3);

        const step4 = document.createElement('div');
        step4.classList.add('title', 'diary');
        step4.innerText = '{% t diary.ds5 %}';
        stepsContainer.appendChild(step4);

        const step5 = document.createElement('div');
        step5.classList.add('title', 'diary');
        step5.innerText = '{% t diary.ds6 %}';
        stepsContainer.appendChild(step5);

        const goButton = document.createElement('button');
        goButton.classList.add('secondary');
        goButton.style.margin = 'auto';
        goButton.style.marginTop = '40px';
        goButton.innerHTML = '{% t diary.ds8 %}';
        goButton.addEventListener('click', e => eventHandler(e, {type: 'go-to-step-1'}));
        content.appendChild(goButton);

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

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
        nav.appendChild(overlayContent);

        const closeNavElem = document.createElement('a');
        closeNavElem.href = 'javascript:void(0)';
        closeNavElem.classList.add('closebtn', 'close-helper');
        closeNavElem.addEventListener('click', closeNav);
        closeNavElem.innerHTML = '&times;';
        nav.appendChild(closeNavElem);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

        if(helpContent != undefined)
            overlayContent.appendChild(helpContent);

        const container = document.createElement('div');
        container.classList.add('step-controller__container');
        parent.appendChild(container);

        const column1 = document.createElement('div');
        column1.style.display = 'flex';
        column1.style.width ='40%'
        column1.style.margin = 'auto';
        container.appendChild(column1);

        let previousButton;
        let previousButtonListener;
        if(step > 1) {
            previousButton = document.createElement('button');
            previousButton.id = 'leftButton';
            previousButton.classList.add('third', 'step-controller__step-button');
            previousButton.innerText = `< {% t diary.sc1 %} ${step - 1}`;
            previousButtonListener = (e) => {
                renderButtonLoader(previousButton);
                eventHandler(e, {type: `go-to-step-${step - 1}`})
            } 
            previousButton.addEventListener('click', previousButtonListener);
            column1.appendChild(previousButton);
        }

        const column2 = document.createElement('div');
        column2.style.display = 'flex';
        column2.style.width ='20%'
        column2.style.margin = 'auto';
        container.appendChild(column2);

        const helpButton = document.createElement('button');
        helpButton.classList.add('outline', 'step-controller__help-button');
        helpButton.innerText = '?';
        helpButton.addEventListener('click', openNav);
        column2.appendChild(helpButton);

        const column3 = document.createElement('div');
        column3.style.display = 'flex';
        column3.style.width ='40%'
        column3.style.margin = 'auto';
        container.appendChild(column3);

        const nextButton = document.createElement('button');
        nextButton.id = 'rightButton';
        nextButton.classList.add('third', 'step-controller__step-button');
        nextButton.innerText = `{% t diary.sc1 %} ${step + 1} >`;

        const nextButtonListener = (e) => {
            renderButtonLoader(nextButton);
            eventHandler(e, {type: `go-to-step-${step + 1}`})
        }
        nextButton.addEventListener('click', nextButtonListener);
        column3.appendChild(nextButton);

        return {leftButton: previousButton, leftButtonListener: previousButtonListener, rightButton: nextButton, rightButtonListener: nextButtonListener};
    }

    const renderWhoTheDiaryIsFor = (who) => {

        renderDiaryHeader(document.body, "#1/5", true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = '{% t diary.wtdif1 %}';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = '{% t diary.wtdif2 %}';
        upperPage.appendChild(textBox);

        const lowerPage = document.createElement('div');
        lowerPage.classList.add('lower-page');
        content.appendChild(lowerPage);

        const inputName = document.createElement('input');
        inputName.classList.add('who__input-name');
        inputName.placeholder = '{% t diary.wtdif3 %}';
        inputName.addEventListener('input', () => rightButton.disabled = inputName.value.length === 0);
        inputName.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                inputName.blur();
            }
          });

        inputName.addEventListener('submit', (e) =>  {});
        if(who != undefined && who != '')
            inputName.value = who;
        lowerPage.appendChild(inputName);

        const helpText = document.createElement('div');
        helpText.classList.add('privacy__text');
        helpText.innerHTML = '{% t diary.wtdif4 %}';

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

        renderDiaryHeader(document.body, '#2/5', true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = '{% t diary.wc1 %}';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = '{% t diary.wc2 %}';
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
            usernameText.maxLength = '17';
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
        helpContent.innerText = "{% t diary.wc3 %}";

        renderStepController(document.body, 2, helpContent);
    }

    const clearPage = () => {
        removeEventListeners();
        removeChildren('body');
    }

    const renderTopicsFound = (topics) => {

        renderDiaryHeader(document.body, '#3/5', true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage)

        const title = document.createElement('div');
        title.classList.add('title', 'diary');
        title.style.marginTop = '16px';
        title.innerText = '{% t diary.tf1 %}';
        upperPage.appendChild(title);

        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        textBox.innerText = '{% t diary.tf2 %}';
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
        selectFromChatButton.innerText = '{% t diary.tf3 %}';
        selectFromChatButton.addEventListener('click', (e) => {
            renderButtonLoader(selectFromChatButton);
            eventHandler(e, {type: 'select-from-chat'});
        }); 
        overlayContent.appendChild(selectFromChatButton);

        const writeButton = document.createElement('button');
        writeButton.classList.add('button', 'diary', 'round');
        writeButton.innerText = '{% t diary.tf4 %}';
        writeButton.addEventListener('click', (e) => {
            renderButtonLoader(writeButton);
            eventHandler(e, {type: 'write-topic'});
        }); 
        overlayContent.appendChild(writeButton);

        const addTopicContainer =  document.createElement('div');
        addTopicContainer.style.width = 'fit-content';
        addTopicContainer.style.padding = '0 15px';
        addTopicContainer.classList.add('topic');
        lowerPage.appendChild(addTopicContainer);

        const addTopicButton  = document.createElement('button');
        addTopicButton.classList.add('topic__add-topic-button');
        addTopicButton.innerText = '{% t diary.tf5 %}';
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
        helpContent.innerText = "{% t diary.tf6 %}";

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
        topicHeaderDay.innerText = `{% t diary.t1 %} ${topicData.day}`;
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
        textBox.innerText = '{% t diary.wt1 %}';
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
            addTopicContainer.style.padding = '0 15px';
            addTopicContainer.classList.add('topic');
            lowerPage.appendChild(addTopicContainer);

            const addTopicButton  = document.createElement('button');
            addTopicButton.classList.add('topic__add-topic-button');
            addTopicButton.innerText = '{% t diary.wt2 %}';
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
        helpContent.innerText = "{% t diary.wt3 %}";

        const {leftButton, rightButton, leftButtonListener, rightButtonListener} = renderStepController(document.body, 3, helpContent);
        leftButton.innerText = '< {% t diary.wt4 %}';
        rightButton.innerText = topicData == undefined ? '{% t diary.wt5 %}' : '{% t diary.wt6 %}';
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
        topicTextArea.placeholder = '{% t diary.nt1 %}';
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
        text.innerText = '{% t diary.nt2 %}';
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
        textBox.innerText = '{% t diary.stfc1 %}';
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
        helpContent.innerText = "{% t diary.stfc2 %}";

        const {leftButton, rightButton, leftButtonListener, rightButtonListener} = renderStepController(document.body, 3, helpContent);
        leftButton.innerText = '< {% t diary.stfc3 %}';
        rightButton.innerText = '{% t diary.stfc4 %}';
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
        title.innerText = '{% t diary.sm1 %}';
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
        helpContent.innerText = "{% t diary.sm2 %}";

        const { rightButton } = renderStepController(document.body, 4, helpContent);
        
        rightButton.disabled = dayData.index + 1 < dayData.totalOfTopics;

    }

    const clearDay = () => {

        document.getElementById('dayDisplay').innerText = '';
        removeChildren('dotContainer');
        removeChildren('lowerPage');

    }

    const updateDay = (dayData) => {
        document.getElementById('dayDisplay').innerText = `{% t diary.t1 %} ${dayData.day}`;
        document.getElementById('dayDisplay').style = `color: ${dayData.color};`
        document.getElementById('dayDisplay').addEventListener('click', e => document.getElementById('topicText').style.height = '100%')
    }

    const renderDay = (dayData, allMessagesData, selectedMessages) => {

        document.getElementById('dayDisplay').innerText = `{% t diary.t1 %} ${dayData.part === 0 ? `${dayData.day}` : `${dayData.day} #${dayData.part}`}`;
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
        topicTextTitle.innerText = `{% t diary.d1 %} ${dayData.day}:`;
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
        startSelecting.innerText = '{% t diary.d2 %}';
        overlayContent.appendChild(startSelecting);

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

        for(let message of allMessagesData) {

            const isFromDay = new Date(message.fulltimestamp).getDate() === new Date(dayData.timestamp).getDate();
            let isSelected = false;
            let selectedDay = dayData.day;
            let isSelectedFromThisDay = false;
            let text = dayData.part === 0 ? `{% t diary.t1 %} ${selectedDay}` : `{% t diary.t1 %} ${selectedDay} #${dayData.part}`;
            if(selectedMessages != undefined) {
                if(selectedMessages.has(message.hash)) {
                    isSelected = true;
                    const {day, part} = selectedMessages.get(message.hash);
                    isSelectedFromThisDay = dayData.day === day && dayData.part === part;
                    text = dayData.part === 0 ? `{% t diary.t1 %} ${day}` : `{% t diary.t1 %} ${day} #${part}`;
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
        buttonDownload.innerText = '{% t diary.pp1 %}';
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
        title.innerText = '{% t diary.rd1 %}';
        upperPage.appendChild(title);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        lowerPage.style.height = '100%';
        content.appendChild(lowerPage);

        const pageContainer = document.createElement('div');
        pageContainer.id = 'pageContainer';
        pageContainer.style.margin = '25px';
        pageContainer.style.height = '100%';
        lowerPage.appendChild(pageContainer);

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = "{% t diary.rd2 %}";

        const {rightButton} = renderStepController(document.body, 5, helpContent);
        rightButton.innerText = '{% t diary.rd3 %}';

    }

    const renderPreviewDiaryPage = () => {

        const canvas = document.createElement('canvas');
        canvas.classList.add('preview-canvas');
        document.getElementById('pageContainer').appendChild(canvas);
        
        return canvas;
    }

    const renderPreviewWithDataUri = (dataUri) => {

        const pageContainer = document.getElementById('pageContainer');
        const lowerPage = document.getElementById('lowerPage');
        pageContainer.style.height = `${lowerPage.offsetHeight - 50}px`

        window.addEventListener('resize', (e) => pageContainer.style.height = `${lowerPage.offsetHeight - 50}px`);

        const object = document.createElement('object');
        object.data = dataUri;
        object.type = 'application/pdf';
        object.style.width = '100%';
        object.style.height = '100%'
        pageContainer.appendChild(object);
        
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
        title.innerText = '{% t diary.dd1 %}';
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
        textBox1.innerText = '{% t diary.dd2 %}';
        textBox1.style.marginTop = '28px';
        centerContainer.appendChild(textBox1);
        
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('button', 'round', 'diary');
        downloadButton.innerText = '{% t diary.dd3 %}';
        downloadButton.addEventListener('click', e => {
            window.fathom.trackGoal('ZNO1KYRF', 0);
            eventHandler(e, {type: 'download-diary'});
        });
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
        title.innerText = '{% t diary.dd1 %}';
        upperPage.appendChild(title);

        const gradient = document.createElement('div');
        gradient.classList.add('gradient-container', 'diary');
        content.appendChild(gradient);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        gradient.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.classList.add('text-box');
        textBox1.style.textAlign ='center';
        textBox1.innerText = '{% t diary.s1 %}';
        textBox1.style.marginTop = '28px';
        centerContainer.appendChild(textBox1);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.margin = '30px 0';
        centerContainer.appendChild(buttonContainer);

        const shareWhatsAppButton = document.createElement('button');
        shareWhatsAppButton.classList.add('button', 'round');
        shareWhatsAppButton.style.backgroundColor = '#53ce5e';
        shareWhatsAppButton.style.borderRadius = '100px';
        shareWhatsAppButton.style.margin = 'auto';
        shareWhatsAppButton.style.marginRight = '20px';
        shareWhatsAppButton.addEventListener('click', e => eventHandler(e, {type: 'share'}));
        buttonContainer.appendChild(shareWhatsAppButton);
    
        const imgWA = document.createElement('img');
        imgWA.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
        imgWA.height = '50';
        shareWhatsAppButton.appendChild(imgWA);

        const shareTwitterButton = document.createElement('button');
        shareTwitterButton.classList.add('button', 'round');
        shareTwitterButton.style.background = "url({{ '/assets/images/Twitter_Social_Icon_Circle_Color.svg' | prepend: site.baseurl }}) no-repeat";
        shareTwitterButton.style.height = '70px';
        shareTwitterButton.style.width = '70px';
        shareTwitterButton.style.margin = 'auto';
        shareTwitterButton.style.marginLeft = '20px';
        shareTwitterButton.addEventListener('click', e => eventHandler(e, {type: 'share-twitter'}));
        buttonContainer.appendChild(shareTwitterButton);

        const noButton = document.createElement('button');
        noButton.classList.add('button', 'round', 'diary');
        noButton.style.backgroundColor = '#00797D';
        noButton.style.marginTop = '75px';
        noButton.innerText = '{% t diary.s2 %}';
        noButton.addEventListener('click', e => eventHandler(e, {type: 'no'}));
        centerContainer.appendChild(noButton);

    }
/*
    const  renderSiteFooter = (parent) => {
        const footer = document.createElement('div');
        footer.classList.add('footer');
        parent.appendChild(footer);

        const footerText = document.createElement('div');
        footerText.classList.add('footer__text');
        footerText.innerText = 'Togather';
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
        aHome.innerText = '{% t nav-overlay.home-a %}';
        linksContainer.appendChild(aHome);

        const aTopic = document.createElement('a');
        aTopic.classList.add('footer__text__small');
        aTopic.href = '{{ site.url }}{{ site.baseurl }}/topics';
        aTopic .innerText = '{% t nav-overlay.topic-a %}';
        linksContainer.appendChild(aTopic);

        const aIntro = document.createElement('a');
        aIntro.classList.add('footer__text__small');
        aIntro.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aIntro .innerText = '{% t nav-overlay.explained-a %}';
        linksContainer.appendChild(aIntro);

        const aInstructions = document.createElement('a');
        aInstructions.classList.add('footer__text__small');
        aInstructions.href = '{{ site.url }}{{ site.baseurl }}/explained';
        aInstructions.innerText = '{% t nav-overlay.instructions-a %}';
        linksContainer.appendChild(aInstructions);

        const aDiary = document.createElement('a');
        aDiary.classList.add('footer__text__small');
        aDiary.href = '{{ site.url }}{{ site.baseurl }}/diary';
        aDiary.innerText = '{% t nav-overlay.diary-a %}';
        linksContainer.appendChild(aDiary);

        const aAbout = document.createElement('a');
        aAbout.classList.add('footer__text__small');
        aAbout.href = '{{ site.url }}{{ site.baseurl }}/about';
        aAbout.innerText = '{% t nav-overlay.about-a %}';
        linksContainer.appendChild(aAbout);

        const footerColumn2 = document.createElement('div');
        footerColumn2.classList.add('column');
        footerColumn2.style.maxWidth = '200px';
        footerRow.appendChild(footerColumn2);

        const langLabel = document.createElement('label');
        langLabel.for = 'languages';
        langLabel.classList.add('footer__text__small');
        langLabel.style.padding = '0';
        langLabel.innerText = '{% t footer.f1 %}';
        footerColumn2.appendChild(langLabel);

        const langSelect = document.createElement('select');
        langSelect.id = 'languages';
        langSelect.style.marginRight = '20px';
        langSelect.addEventListener('change', () => window.location.href = langSelect.options[langSelect.selectedIndex].value);
        footerColumn2.appendChild(langSelect);

        let language = window.location.href.trim().split('/').filter(elem => elem != '')[2]
        language = language === 'diary' ? 'en' : language;

        const option = document.createElement('option');
        option.value = '/diary';
        option.innerText = '{% t global.english %}';
        option.selected = language === 'en';
        langSelect.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = '/pt/diary';
        option2.innerText = '{% t global.portugues %}';
        option2.selected = language === 'pt';
        langSelect.appendChild(option2);

        const contactButton = document.createElement('button');
        contactButton.classList.add('button', 'contact');
        contactButton.addEventListener('click', () => {
            location.href='{{ site.url }}{{ site.baseurl }}/contact';
        });
        contactButton.innerText = '{% t nav-overlay.contact-a %} >>';
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
*/

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

        renderPreviewWithDataUri,
    }
}

export default DiaryUI;