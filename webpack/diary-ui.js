/**
 * Contains all calls to render the diary pages and manipluate the DOM.
 * Plugs all events from the DOM to given event handler.
 * @author Luis Carvalho
 * @param {*} eventHandler 
 * @returns 
 */
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

    /**
     * Render the site header.
     * @param {string} title title to be displayed in the header. 
     */
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
        document.body.append(header);

        const headerTop = document.createElement('div');
        headerTop.classList.add('header__top');
        header.append(headerTop);

        const spanTitle = document.createElement('span');
        spanTitle.classList.add('header__top__text');
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
        overlayContent.style.minWidth = `${document.body.offsetWidth}px`;
        nav.append(overlayContent);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);

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
        aContact.id = 'contact-a';
        aContact.href = '{{ site.url }}{{ site.baseurl }}/contact';
        aContact.innerText = '{% t nav-overlay.contact-a %}';
        overlayContent.appendChild(aContact);
    
    }

    /**
     * Renders the footer of the site.
     */
    const renderSiteFooter = () => {

        const footer = document.createElement('footer');
        document.body.append(footer);

        const div1 = document.createElement('div');
        div1.classList.add('footer__upper-container');
        footer.append(div1);

        const contactButton = document.createElement('button');
        contactButton.classList.add('footer__contact-button');
        contactButton.innerText = "{% t nav-overlay.contact-a %}";
        contactButton.addEventListener('click', () => location.href='{{ site.url }}{{ site.baseurl }}/contact');
        div1.append(contactButton);

        const div2 = document.createElement('div');
        div2.classList.add('footer__border');
        div1.append(div2);
        
        const div3 = document.createElement('div');
        div3.classList.add('footer__lower-container');
        footer.append(div3);

        const div4 = document.createElement('div');
        div4.classList.add('footer__logo-container');
        div3.append(div4);

        const imgLogo = document.createElement('img');
        imgLogo.classList.add('footer__logo');
        imgLogo.src = "{{ '/assets/images/TOGATHER_LOGO_reverse.png' | prepend: site.baseurl_root }}";
        imgLogo.width = "80";
        imgLogo.alt = "{% t footer.f2 %}"
        div4.append(imgLogo);

        const togatherNameLogo = document.createElement('h3');
        togatherNameLogo.classList.add('footer__logo__title');
        togatherNameLogo.innerText = "{% t about.t7 %}";
        div4.append(togatherNameLogo);

        const div5 = document.createElement('div');
        div5.classList.add("row");
        div5.style = "height: 120px; margin-bottom: 35px;";
        div3.append(div5);

        const div6 = document.createElement('div');
        div6.id = "sitemap";
        div6.classList.add("column");
        div5.append(div6);

        const div7 = document.createElement('div');
        div7.classList.add('footer__links-container');
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
        div8.classList.add("column", "language-column");
        div5.append(div8);

        const openLanguageModal = () => document.getElementById("languageModal").style.display = "block";
    
        const closeLanguageModal = () => document.getElementById("languageModal").style.display = "none";
    
        const languageModal = document.createElement('languageModal');
        languageModal.id = 'languageModal';
        languageModal.classList.add('modal');
        document.body.appendChild(languageModal);
        
        const modalContent = document.createElement('modal-content');
        modalContent.classList.add('modal-content');
        languageModal.append(modalContent);

        const closeModalButton = document.createElement('a');
        closeModalButton.classList.add('modal__close-button');
        closeModalButton.addEventListener('click', closeLanguageModal);
        closeModalButton.innerText = '×';
        modalContent.append(closeModalButton);

        const modalP = document.createElement('p');
        modalP.style.color = 'black';
        modalP.style.textAlign = 'center';
        modalP.innerText = '{% t footer.f1 %}';
        modalContent.append(modalP);
        
        const languageList = document.createElement('div');
        languageList.id = 'languageList';
        languageList.style.position = 'relative';
        modalContent.append(languageList);

        const buttonEN = document.createElement('a');
        buttonEN.href = '/diary/';
        buttonEN.innerText = '{% t global.english %}';
        languageList.append(buttonEN);

        const buttonPT = document.createElement('a');
        buttonPT.href = '/pt/diary/';
        buttonPT.innerText = '{% t global.portugues %}';
        languageList.append(buttonPT);

        const buttonNL = document.createElement('a');
        buttonNL.href = '/nl/diary/';
        buttonNL.innerText = '{% t global.nederlands %}';
        languageList.append(buttonNL);

        const buttonEL = document.createElement('a');
        buttonEL.href = '/el/diary/';
        buttonEL.innerText = '{% t global.greek %}';
        languageList.append(buttonEL);

        const buttonES = document.createElement('a');
        buttonES.href = '/es/diary/';
        buttonES.innerText = '{% t global.spanish %}';
        languageList.append(buttonES);

        window.onclick = (event) => {
            const modal = document.getElementById("languageModal");
            if (event.target == modal)
                closeLanguageModal()
        }
        
        const languageButton = document.createElement('button');
        languageButton.classList.add('language-button');
        languageButton.innerText = '{% t footer.f1 %} {{site.lang}}';
        languageButton.addEventListener('click', openLanguageModal);

        div8.append(languageButton);

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
        imgProjectLogo.alt = "{% t footer.f3 %}";
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
        imgTeamLogo.alt = "{% t footer.f4 %}";
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
        imgNorthumbriaLogo.alt = "{% t footer.f5 %}";
        aNorthumbriaLogo.append(imgNorthumbriaLogo);

    }

    /**
     * Renders page where files are uploaded.
     */
    const renderUploadFiles = () => {
    
        renderSiteHeader("{% t diary.dh1 %}");

        const content = document.createElement('main');
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
        dualTextBox.style.textAlign = "left";
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
        selectFilesButton.id = 'uploadFilesInputText'
        selectFilesButton.classList.add('button', "secondary", 'small-font');
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
            try {
                window.fathom.trackGoal('6QSZBLZG', 0);
            } catch (e) {
                console.log('Fathom Disabled');
            }
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

        renderSiteFooter();
       
    }

    /**
     * Renders a warning modal displaying a error message.
     * @param {string} errorMessage text to be displayed in the warning. 
     * @param {Function} onClose function to be called when the modal is closed. 
     */
    const renderErrorModal = (errorMessage, onClose = undefined) => {

        const modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.append(modal);

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.style.borderRadius = '15px';
        modalContent.style.paddingTop = '40px';
        modal.appendChild(modalContent);

        const modalText = document.createElement('p');
        modalText.style.textAlign = 'center';
        modalText.innerText = errorMessage;
        modalContent.appendChild(modalText);

        const modalOK = document.createElement('button');
        modalOK.classList.add('primary');
        modalOK.innerText = '{% t error.e1 %}';
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

    /**
     * Renders the upload error modal.
     */
    const renderUploadErrorModal = () => {

        const onClose = () => {
            const button = document.getElementById('startAssembling');
            button.innerHTML = '{% t diary.uf7 %}';
            button.disabled = false;
        }
        renderErrorModal('{% t diary.uem1 %}', onClose);

    };

    /**
     * Renders a loader in an existing button.
     * @param {HTMLButtonElement} button the button where the loader will be displayed.
     */
    const renderButtonLoader = (button) => {
        button.disabled = true;
        button.style.width = `${button.offsetWidth}px`;
        button.innerText = '';

        const icon = document.createElement('div');
        icon.classList.add('button-loader');
        button.appendChild(icon);
    }

    /**
     * Renders an element with the name of the file.
     * @param {File} file file whose name will be displayed.
     */
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

    /**
     * Renders the diary header in a parent.
     * @param {HTMLElement} parent element where the header will be added.
     * @param {number} step step of the assembling process. 
     * @param {boolean} noMargin true if the is no margin in the page. 
     */
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
        spanTitle.classList.add('header__top__text');
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
        stopButton.classList.add('secondary', 'small-font');
        stopButton.style.margin = 'auto';
        stopButton.innerHTML = '{% t diary.dh3 %}';
        stopButton.addEventListener('click', e => eventHandler(e, {type: 'stop-assembling'}));
        buttonContainer.appendChild(stopButton);

        const continueButton = document.createElement('button');
        continueButton.classList.add('primary', 'small-font');
        continueButton.style.margin = 'auto';
        continueButton.style.marginTop = '20px';
        continueButton.innerHTML = '{% t diary.dh4 %}';
        continueButton.addEventListener('click', closeNav);
        buttonContainer.appendChild(continueButton);

        const closeDiary  = document.createElement('button');
        closeDiary.style.background = 'none';
        closeDiary.style.padding = '6px';
        closeDiary.style.font = '50px/28px Roboto';
        closeDiary.tabIndex = 0;
        closeDiary.innerHTML = '&times;';
        closeDiary.setAttribute('aria-label', 'Open Navigation Overlay');
        closeDiary.addEventListener('click', openNav);
        spanHeaderRight.appendChild(closeDiary);
        
    }

    /**
     * Renders the page with the diary assembling step.
     */
    const renderDiarySteps = () => {

        renderDiaryHeader(document.body, "{% t diary.dh1 %}");
        
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
        goButton.addEventListener('click', e => {
            renderButtonLoader(goButton);
            eventHandler(e, {type: 'go-to-step-1'})
        });
        content.appendChild(goButton);

    }

    /**
     * Element with buttons to control the process through the assembling.
     * @param {HTMLElement} parent element where this will be added.
     * @param {number} step step of the assembling process. 
     * @param {HTMLElement} helpContent content to be displayed when the help button is pressed. 
     * @returns {StepControllerButtons} object with the buttons and functions in this element.
     */
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

        return {leftButton: previousButton, leftButtonListener: previousButtonListener, rightButton: nextButton, rightButtonListener: nextButtonListener, helpButton};
    }

    /**
     * Renders the page who is the diary for.
     * @param {string} who 
     * @param {string} diaryTitle 
     */
    const renderWhoTheDiaryIsFor = (who, diaryTitle) => {

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
        inputName.setAttribute('maxlength', '19');
        inputName.style.margin = '50px auto';
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

        const inputDiaryTitle = document.createElement('input');
        inputDiaryTitle.classList.add('who__input-name');
        inputDiaryTitle.setAttribute('maxlength', '19');
        inputDiaryTitle.style.marginTop = '0px';
        inputDiaryTitle.placeholder = '{% t diary.wtdif5 %}';
        inputDiaryTitle.addEventListener('submit', (e) =>  {});
        if(diaryTitle != undefined && diaryTitle != '')
            inputDiaryTitle.value = diaryTitle;
        lowerPage.appendChild(inputDiaryTitle);

        const helpText = document.createElement('div');
        helpText.classList.add('privacy__text');
        helpText.innerHTML = '{% t diary.wtdif4 %}';

        const { rightButton, rightButtonListener } = renderStepController(document.body, 1, helpText);
        rightButton.removeEventListener('click', rightButtonListener);
        rightButton.addEventListener('click', e => {
            renderButtonLoader(rightButton);
            eventHandler(e, {type: `go-to-step-2`, who: inputName.value, diaryTitle: inputDiaryTitle.value})
        });

        if(inputName.value == undefined || inputName.value == '')
            rightButton.disabled = true;
    }

    /**
     * Renders the page with the contributers.
     * @param {ParserUser} userData object with the contributer..
     */
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

        const buttonInfoContainer = document.createElement('div');
        buttonInfoContainer.style.marginTop = "10px";
        const editInfoButton = document.createElement('p');
        buttonInfoContainer.appendChild(editInfoButton);

        const userNotVisibleImage = document.createElement('i');
        userNotVisibleImage.classList.add('far', 'fa-eye-slash');
        userNotVisibleImage.style.width = '20px';
        userNotVisibleImage.style.height = '20px';
        editInfoButton.appendChild(userNotVisibleImage);

        const textNode = document.createTextNode("/");
        editInfoButton.appendChild(textNode);

        const userVisibleImage = document.createElement('i');
        userVisibleImage.classList.add('far', 'fa-eye');
        userVisibleImage.style.width = '20px';
        userVisibleImage.style.height = '20px';
        editInfoButton.appendChild(userVisibleImage);

        const textNodeVisible = document.createTextNode("{% t diary.wc4 %}");
        editInfoButton.appendChild(textNodeVisible);

        helpContent.append(buttonInfoContainer);

        renderStepController(document.body, 2, helpContent);
    }

    /**
     * Clears listeners and remove everything inside the body element.
     */
    const clearPage = () => {
        removeEventListeners();
        removeChildren('body');
    }

    /**
     * Renders page with all existing topics.
     * @param {[Topic]} topics list of topics.
     */
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
        overlayContent.style.display = 'flex';
        overlay.appendChild(overlayContent);

        window.addEventListener('resize', (e) => overlayContent.style.minWidth = `${document.body.offsetWidth}px`);


        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '0 auto';
        overlayContent.append(buttonContainer);

        const selectFromChatButton = document.createElement('button');
        selectFromChatButton.classList.add('secondary');
        selectFromChatButton.style.marginBottom = '20px';
        selectFromChatButton.innerText = '{% t diary.tf3 %}';
        selectFromChatButton.addEventListener('click', (e) => {
            renderButtonLoader(selectFromChatButton);
            eventHandler(e, {type: 'select-from-chat'});
        }); 
        buttonContainer.appendChild(selectFromChatButton);

        const writeButton = document.createElement('button');
        writeButton.classList.add('primary');
        writeButton.innerText = '{% t diary.tf4 %}';
        writeButton.addEventListener('click', (e) => {
            renderButtonLoader(writeButton);
            eventHandler(e, {type: 'write-topic'});
        }); 
        buttonContainer.appendChild(writeButton);

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

    /**
     * Renders a single topic.
     * @param {number} day relative day of the topics
     * @param {Topic} topicData object containg the topic data.
     */
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
        topicHeaderDay.innerText = `${new Date(topicData.timestamp).toLocaleDateString(undefined, { year: undefined, month: '2-digit', day: '2-digit' })}`;//`{% t diary.t1 %} ${topicData.day}`;
        topicHeader.appendChild(topicHeaderDay);

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

    /**
     * Renders a list of topics.
     * @param {[Topic]} topics topics to be rendered.
     */
    const renderTopics = (topics) => {

        for(let i = 0; i < topics.length; i++) {

            renderTopic(i, topics[i]);
        }

    }

    /**
     * Removes rendered topics.
     */
    const removeTopics = () => {
        removeChildren('lowerPage');
    }

    /**
     * Removes the children elements from a given DOM element.
     * @param {string} id id of the element whose children will be removed.
     */
    const removeChildren = (id) => {

        const myNode = document.getElementById(id);
        if(myNode != undefined) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
        }

    }

    /**
     * Renders the write a topic page.
     * @param {Topic?} topicData data of an exsting topic, null if writting a new topic.
     */
    const renderWriteTopic = (topicData) => {

        renderDiaryHeader(document.body, '#3/5', true);

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
        if(topicData == undefined) rightButton.classList.add('small-font');//rightButton.style.fontSize = 'large';

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

    /**
     * Renders in a list a newly added topic.
     * @param {Topic} topicData data of the new topic.
     * @param {number} index index pf the new topic. 
     */
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

    /**
     * Render a media file to an DOM element.
     * @param {File} file file content with metadata.
     * @param {HTMLElement} parent DOM Element where the photo will be added.
     * @param {number} index index associated with the image.
     */
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

    /* 
    const startChatUI = () => {

        document.getElementById('baseList').classList.add('chat__list__background');
    
    }
    */

    /*
    const removeChatUI = () => {

        document.getElementById('baseList').classList.remove('chat__list__background');

    }*/

    /**
     * Render page to select topics from chat.
     * @param {[Message]} chatData messages from the chat. 
     */
    const renderSelectTopicFromChat = (chatData) => {

        renderDiaryHeader(document.body, "#3/5", true);

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
        rightButton.classList.add('small-font');

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

    /**
     * Renders a chat message in a list.
     * @param {Message} messageData message data. 
     * @param {string} messageListId id of DOM Element list where the message in rendered.
     * @param {boolean} isSelected true if the message is selected. 
     * @param {boolean} isFromDay true if the message is from a day. 
     * @param {string} selectString string to be displayed if the message is selected. 
     * @param {boolean} isSelectedFromThisDay true is the message was selected from the current day. 
     */
    const renderChatMessage = (messageData, messageListId, isSelected = false, isFromDay = false, selectString = '{% t diary.t2 %}', isSelectedFromThisDay = false) => {
        
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

    /**
     * Renders the page to edit an existing topic.
     * @param {Topic} topicData 
     */
    const renderEditTopic = (topicData) => {
        renderWriteTopic(topicData);
    }

    /**
     * Renders page to select messages per topic.
     * @param {TopicWithMessages} dayData All data of the current topic.
     * @param {[Message]} allMessagesData All messages.
     * @param {Map<string, object>} selectedMessagesHashes hashes of all messages associated with the topic.
     */
    const renderSelectMessages = (dayData, allMessagesData, selectedMessagesHashes) => {

        renderDiaryHeader(document.body, "#4/5", true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

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
        prevDayInside.innerHTML = '<'
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
        nextDayInside.innerHTML = '>';
        nextDay.appendChild(nextDayInside );

        const dotContainer = document.createElement('div');
        dotContainer.id = 'dotContainer';
        dotContainer.classList.add('day-scroller__dot-container');
        dayScrollerContainer.appendChild(dotContainer);

        const title = document.createElement('div');
        title.style.marginTop = '13px';
        title.style.marginBottom = '13px';
        title.innerText = '{% t diary.sm1 %}';
        upperPage.appendChild(title);

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

    /**
     * Clear the current day data from the select messages page.
     */
    const clearDay = () => {

        document.getElementById('dayDisplay').innerText = '';
        removeChildren('dotContainer');
        removeChildren('lowerPage');

    }

 /*
    const updateDay = (dayData) => {
        document.getElementById('dayDisplay').innerText = `${new Date(dayData.timestamp).toLocaleDateString(undefined, { year: undefined, month: '2-digit', day: '2-digit' })}`//`{% t diary.t1 %} ${dayData.day}`;
        //document.getElementById('dayDisplay').style = `color: ${dayData.color};`
        document.getElementById('dayDisplay').addEventListener('click', e => document.getElementById('topicText').style.height = '100%')
    }*/

    /**
     * Renders the data of the current topic and list of the messages.
     * @param {TopicWithMessages} dayData All data of the current topic.
     * @param {[Message]} allMessagesData All messages.
     * @param {Map<string, object>} selectedMessagesHashes hashes of all messages associated with the topic.
     */
    const renderDay = (dayData, allMessagesData, selectedMessages) => {

        const stringDate =`${new Date(dayData.timestamp).toLocaleDateString(undefined, { year: undefined, month: '2-digit', day: '2-digit' })}`;

        document.getElementById('dayDisplay').innerText = `${dayData.part === 0 ? stringDate : `${stringDate} #${dayData.part}`}`;
        document.getElementById('dayDisplay').addEventListener('click', e => {
            const topicText = document.getElementById('topicText');
            topicText.style.height = topicText.offsetHeight === 0 ? `${document.getElementById('lowerPage').offsetHeight}px` : '0';
        });

        document.getElementById('prevDay').disabled = false;
        document.getElementById('nextDay').disabled = false;

        if(dayData.index === 0) { 

            document.getElementById('dayDisplay').style.position = 'relative';
            const tapImage = document.createElement('img');
            tapImage.src = "{{ '/assets/images/tap_test.svg' | prepend: site.baseurl }}";
            tapImage.width = '25';
            tapImage.height = '25';
            tapImage.classList.add('day-display__tap');
            document.getElementById('dayDisplay').appendChild(tapImage);

            const tapInstructions = document.createElement('div');
            tapInstructions.classList.add('day-display__tap__instructions');
            tapInstructions.innerText = '{% t diary.sm3 %}';
            document.getElementById('dayDisplay').appendChild(tapInstructions);

            document.getElementById('prevDay').disabled = true;
        } 
        
       if (dayData.index + 1 === dayData.totalOfTopics) {
            document.getElementById('nextDay').disabled = true;
        }

        const topicTextOverlay = document.createElement('div');
        topicTextOverlay.id = 'topicText';
        topicTextOverlay.classList.add('overlay', 'topic-text');
        topicTextOverlay.style.height = `${ (document.body.offsetHeight * 0.78 - 132)}px`
        lowerPage.appendChild(topicTextOverlay);
        window.addEventListener('resize', e => {
            const lowerPage = document.getElementById('lowerPage');
            if(topicTextOverlay != undefined &&  lowerPage != undefined) 
                topicTextOverlay.style.height = `${lowerPage.offsetHeight}px`
        });

        topicTextOverlay.addEventListener('click', e =>  document.getElementById('topicText').style.height = '0%')

        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content', 'privacy');
        overlayContent.style.display = 'flex';
        overlayContent.style.flexDirection = 'column';
        overlayContent.style.top = '40px';
        topicTextOverlay.appendChild(overlayContent);

        const topicTextTitle = document.createElement('div');
        topicTextTitle.classList.add('overlay__text-box');
        topicTextTitle.style.marginBottom = '20px';
        topicTextTitle.innerText = `{% t topic.t3 %} ${dayData.part === 0 ? stringDate : `${stringDate} #${dayData.part}`}`;
        overlayContent.appendChild(topicTextTitle);

        const topicTextBox = document.createElement('div');
        topicTextBox.classList.add('overlay__text-box');
        topicTextBox.style.maxHeight = '160px';
        topicTextBox.style.overflowY = 'auto';
        topicTextBox.innerText = `"${dayData.text}"`;
        overlayContent.appendChild(topicTextBox);

        const startSelecting = document.createElement('button');
        startSelecting.style.margin = 'auto';
        startSelecting.style.color = 'white';
        startSelecting.style.marginTop = '10px';
        startSelecting.style.background = 'none';
        startSelecting.style.padding = '6px';
        startSelecting.style.font = '50px / 28px Roboto'
        startSelecting.style.width = '40px';
        startSelecting.style.bottom = '10px';
        startSelecting.style.position = 'absolute';
        startSelecting.style.left = '50%';
        startSelecting.style.transform = 'translate(-50%, 0)';

        startSelecting.innerText = '×';
        topicTextOverlay.appendChild(startSelecting);

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

            let stringDate = new Date(dayData.timestamp).toLocaleDateString(undefined, { year: undefined, month: '2-digit', day: '2-digit' })

            let text = dayData.part === 0 ? `${stringDate}` : `${stringDate} #${dayData.part}`;
            
            if(selectedMessages != undefined) {
                if(selectedMessages.has(message.hash)) {
                    isSelected = true;
                    const {day, part, timestamp} = selectedMessages.get(message.hash);
                    isSelectedFromThisDay = dayData.day === day && dayData.part === part;    
                    stringDate = new Date(timestamp).toLocaleDateString(undefined, { year: undefined, month: '2-digit', day: '2-digit' })
                    text = part === 0 ? `${stringDate}`: `${stringDate} #${part}`;
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
            prevDay.innerHTML = '<'

        if (nextDayLoader.length > 0)
            nextDay.innerHTML = '>'
        
    }

    /*
    const renderFullTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text;
        document.getElementById('readMoreButton').classList.add('hidden');
        document.getElementById('readLessButton').classList.remove('hidden');
    } */

    /*
    const renderShortTopic = (text) => {
        document.getElementById('topicDisplayText').innerText = text.substring(0, 80);
        document.getElementById('readLessButton').classList.add('hidden');
        document.getElementById('readMoreButton').classList.remove('hidden');
    }
    */

    /**
     * Renders a preview of the pdf in a div.
     * @param {string} pdfData the base64 string with the pdf data.
     * @returns {HTMLDivElement} div with a iframe displaying the pdf.
     */
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

    /**
     * Renders the page to preview the pdf.
     */
    const renderReviewDiary = () => {

        renderDiaryHeader(document.body, "#5/5", true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.style.marginTop = '16px';
        title.style.marginBottom = '20px';
        title.innerText = '{% t diary.rd1 %}';
        upperPage.appendChild(title);

        const lowerPage = document.createElement('div');
        lowerPage.id = 'lowerPage';
        lowerPage.classList.add('lower-page');
        lowerPage.style.height = '100%';
        lowerPage.style.position = 'relative';
        content.appendChild(lowerPage);

        /*
        const prevDiaryPage = document.createElement('button');
        prevDiaryPage.classList.add('diary-page-button');
        lowerPage.append(prevDiaryPage);

        const prevDiaryPageIcon = document.createElement('div');
        prevDiaryPageIcon.classList.add('fas', 'fa-chevron-left');
        prevDiaryPage.addEventListener('click', (e) => eventHandler(e, {type: 'previous-page'}));  
        prevDiaryPage.append(prevDiaryPageIcon);

        const nextDiaryPage = document.createElement('button');
        nextDiaryPage.classList.add('diary-page-button', 'next');
        nextDiaryPage.addEventListener('click', (e) => eventHandler(e, {type: 'next-page'}));  
        lowerPage.append(nextDiaryPage);

        const nextDiaryPageIcon = document.createElement('div');
        nextDiaryPageIcon.classList.add('fas', 'fa-chevron-right');
        nextDiaryPage.append(nextDiaryPageIcon);

        const pageContainer = document.createElement('div');
        pageContainer.id = 'pageContainer';
        pageContainer.style.display = 'flex';
        pageContainer.style.height = '100%';
        pageContainer.style.margin = 'auto';
        lowerPage.appendChild(pageContainer);
        */

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = "{% t diary.rd2 %}";

        const {rightButton} = renderStepController(document.body, 5, helpContent);
        rightButton.innerText = '{% t diary.rd3 %}';

    }

    /**
     * Renders a preview of the pdf using its data uri.
     * @param {string} dataUri content of the pdf in a data uri.
     */
    const renderPreviewOnIframeWithDataUri = (dataUri) => {

        const iframe = document.createElement('iframe');
        iframe.id = 'previewIframe';
        iframe.src = dataUri;
        iframe.style.height = '100%';
        document.getElementById('lowerPage').append(iframe);

    }

    /**
     * Creates a canvas to display a single pdf page.
     * @param {string} canvasId id of the canvas.
     * @param {boolean} display true if the canvas is visible. 
     * @returns {HTMLCanvasElement} canvas with the given id.
     */
    const renderPreviewDiaryPage = (canvasId, display) => {

        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.classList.add('preview-canvas');
        canvas.style.display = display ? 'block' : 'none';
        document.getElementById('pageContainer').appendChild(canvas);
        
        return canvas;
    }

    /**
     * Makes a canvas visible.
     * @param {string} canvasId id of the canvas. 
     */
    const displayPreviewCanvas = (canvasId) => {
        document.getElementById(canvasId).style.display = 'block';
    }

    /**
     * Hides a canvas.
     * @param {string} canvasId id of the canvas. 
     */
    const hidePreviewCanvas = (canvasId) => {
        document.getElementById(canvasId).style.display = 'none';
    }

    /**
     * Renders a preview of the pdf using its data uri.
     * @param {string} dataUri content of the pdf in a data uri.
     */
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

    /**
     * Renders the download page. Asks if the users wants to participate in the study.
     * @param {string} participate "yes" if the user wants to participate in the study.
     */
    const renderDownloadDiary = (participate) => {

        renderDiaryHeader(document.body, "#5/5", true);

        const {openShareModal, closeShareModal} = renderShareModal();

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.id = 'pageTitle';
        title.classList.add();
        title.style.textAlign = 'center';
        title.style.font = 'normal normal 300 25px/43px Roboto Condensed';
        title.style.letterSpacing = '0.64px';
        title.style.paddingTop = '15px';
        title.innerText = participate === undefined ? '{% t diary.dd4 %}' : '{% t diary.dd1 %}';
        upperPage.appendChild(title);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        centerContainer.style.marginLeft = '20px';
        centerContainer.style.marginRight = '20px';
        centerContainer.style.marginTop = '15px';
        content.appendChild(centerContainer);

        const textBox1 = document.createElement('div');
        textBox1.id = "download-main-text";
        textBox1.innerText = '{% t diary.dd5 %}';
        centerContainer.appendChild(textBox1);

        const form = document.createElement('form');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        centerContainer.appendChild(form);

        const textbox3 = document.createElement('div');
        textbox3.id = "download-form-text";
        textbox3.style.textAlign = 'center';
        textbox3.innerText = '{% t diary.dd6 %}';
        form.append(textbox3);

        const optionsContainer = document.createElement('div');
        optionsContainer.style.margin = 'auto';
        form.append(optionsContainer);

        const yesRadioButton = document.createElement('input');
        yesRadioButton.type = 'radio';
        yesRadioButton.id = 'yes';
        yesRadioButton.name = 'participate';
        yesRadioButton.value = 'yes';
        yesRadioButton.checked = participate != undefined && participate === 'yes';
        yesRadioButton.addEventListener('change', () => {
            divWarning.innerText = '{% t diary.dd7 %}';
            document.getElementById('submitButtonParticipation').disabled = false;
        })
        optionsContainer.append(yesRadioButton);

        const labelYesButton = document.createElement('label');
        labelYesButton.for = 'yes';
        labelYesButton.innerText = '{% t diary.dd8 %}';
        labelYesButton.style.marginRight = '20px';
        optionsContainer.append(labelYesButton);

        const noRadioButton = document.createElement('input');
        noRadioButton.type = 'radio';
        noRadioButton.id = 'no';
        noRadioButton.name = 'participate';
        noRadioButton.value = 'no';
        noRadioButton.checked = participate != undefined && participate === 'no';
        noRadioButton.style.marginLeft = '20px';
        noRadioButton.addEventListener('change', () => {
            divWarning.innerText = '';
            document.getElementById('submitButtonParticipation').disabled = false;
        })
        optionsContainer.append(noRadioButton);

        const labelNoButton = document.createElement('label');
        labelNoButton.for = 'no';
        labelNoButton.innerText = '{% t diary.dd9 %}';
        optionsContainer.append(labelNoButton);

        const divWarning = document.createElement('div');
        divWarning.id = 'warning';
        divWarning.style.width = '100%';
        divWarning.style.height = '30px';
        divWarning.style.fontSize = '13px';
        divWarning.style.lineHeight = '13px';
        divWarning.style.textAlign = 'center';
        form.append(divWarning);

        const buttonContainer1 = document.createElement('div');
        buttonContainer1.style.display = 'flex';
        buttonContainer1.style.flexDirection = 'row';
        form.append(buttonContainer1);
                
        const submitButton = document.createElement('button');
        submitButton.classList.add('primary');
        submitButton.id = 'submitButtonParticipation';
        submitButton.style.margin = 'auto';
        submitButton.innerText = '{% t diary.dd10 %}';
        submitButton.disabled = true;

        submitButton.addEventListener('click', e => {
            e.preventDefault();
            let value = undefined;
            const radios = document.getElementsByName('participate');
            for (var i = 0, length = radios.length; i < length && value === undefined; i++) {
                if (radios[i].checked) {
                  value = radios[i].value;
                }
            }
            downloadButton.style.display = 'block';
            title.innerText = '{% t diary.dd1 %}';
            submitButton.disabled = true;
            eventHandler(e, {type: 'participate', value});
        });
        buttonContainer1.appendChild(submitButton);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'row';
        centerContainer.append(buttonContainer);
                
        const downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.classList.add('secondary');
        downloadButton.style.display =  participate === undefined ? 'none' : 'block';
        downloadButton.style.margin = 'auto';
        downloadButton.style.marginTop = '15px';
        downloadButton.innerText = '{% t diary.dd3 %}';
        downloadButton.addEventListener('click', e => {
            openShareModal();
            try {
                window.fathom.trackGoal('ZNO1KYRF', 0);
            } catch (e) {
                console.log('Fathom disabled')
            }
            eventHandler(e, {type: 'download-diary'});
        });
        buttonContainer.appendChild(downloadButton);

        const {leftButton, rightButton, helpButton} = renderStepController(document.body, 5);
        rightButton.innerText = '{% t diary.rd3 %}';
        helpButton.remove();

    }

    /**
     * Renders a page  that askes the user for feedback.
     */
    const renderAskFeedback = () => {

        renderDiaryHeader(document.body, "#5/5", false);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add();
        title.style.textAlign = 'center';
        title.style.font = 'normal normal 300 32px/43px Roboto Condensed';
        title.style.letterSpacing = '0.64px';
        title.innerText = '{% t diary.dd1 %}';
        upperPage.appendChild(title);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        centerContainer.style.marginLeft = '27px';
        centerContainer.style.marginRight = '27px';
        centerContainer.style.marginTop = '27px';
        content.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.innerText = 'Thanks for using Togather, as we are curious to how you have experienced living with togather, we are keen to hear your thoughts!';
        textBox1.style.margin = '28px 0';
        textBox1.style.marginBottom = '40px';
        textBox1.style.textAlign = 'center';
        centerContainer.appendChild(textBox1);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        centerContainer.append(buttonContainer);
        
        const giveButton = document.createElement('button');
        giveButton.classList.add('secondary');
        giveButton.style.margin = 'auto';
        giveButton.innerText = 'Give Feedback';
        giveButton.addEventListener('click', e => eventHandler(e, {type: 'give-feedback'}));
        buttonContainer.appendChild(giveButton);

        const noButton = document.createElement('button');
        noButton.classList.add('primary');
        noButton.style.margin = 'auto';
        noButton.style.marginTop = '25px';
        noButton.innerText = 'No thanks';
        noButton.addEventListener('click', e => eventHandler(e, {type: 'no'}));
        buttonContainer.appendChild(noButton);

    }

    /**
     * Renders page where the user can write its feedback.
     */
    const renderGiveFeedback = () => {

        renderDiaryHeader(document.body, "", false);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const centerContainer = document.createElement('div');
        centerContainer.classList.add('feedback__container');
        content.appendChild(centerContainer);

        const textBox1 = document.createElement('div');
        textBox1.innerText = 'Please write your feedback in the box below:';
        textBox1.style.margin = '28px 0';
        textBox1.style.marginBottom = '40px';
        textBox1.style.marginTop = '0px';
        textBox1.style.textAlign = 'center';
        centerContainer.appendChild(textBox1);
        
        const feedback = document.createElement('textarea');
        feedback.classList.add('feedback__textarea');
        feedback.placeholder = 'Type Here'
        centerContainer.appendChild(feedback);
         
        const giveButton = document.createElement('button');
        giveButton.classList.add('secondary');
        giveButton.style.margin = 'auto';
        giveButton.innerText = 'Submit';
        giveButton.addEventListener('click', e => {
            renderButtonLoader(giveButton);
            feedback.style.borderColor = 'initial';
            if(feedback.value === undefined || feedback.value.trim() === '') {
                feedback.style.borderColor = 'red';
                giveButton.innerText = 'Submit';
                giveButton.disabled = false;
            } else {
                eventHandler(e, {type: 'give-feedback', feedback: feedback.value.trim()});
            }
        });
        centerContainer.appendChild(giveButton);

    }

    /**
     * Renders a page with social media sharing buttons.
     * @param {string} titleText title to be displayed in the page. 
     */
    const renderShare = (titleText) => {

        renderDiaryHeader(document.body, '#5/5', false);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        title.classList.add();
        title.style.textAlign = 'center';
        title.style.font = 'normal normal 300 32px/43px Roboto Condensed';
        title.style.letterSpacing = '0.64px';
        title.innerText = titleText;
        upperPage.appendChild(title);

        const centerContainer = document.createElement('div');
        centerContainer.style.margin = 'auto';
        centerContainer.style.marginLeft = '27px';
        centerContainer.style.marginRight = '27px';
        centerContainer.style.marginTop = '27px';
        centerContainer.style.display = 'flex';
        centerContainer.style.flexDirection = 'column';
        content.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.innerText = '{% t diary.s1 %}';
        textBox1.style.marginBottom = '40px';
        textBox1.style.textAlign = 'center';
        centerContainer.appendChild(textBox1);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'row';
        centerContainer.append(buttonContainer);

        const shareWhatsAppButton = document.createElement('button');
        shareWhatsAppButton.style.background = "url({{ '/assets/images/WhatsApp_Logo_2.png' | prepend: site.baseurl }}) no-repeat";
        shareWhatsAppButton.style.height = '70px';
        shareWhatsAppButton.style.width = '70px';
        shareWhatsAppButton.style.backgroundPosition = 'center';
        shareWhatsAppButton.style.backgroundSize = 'cover';
        shareWhatsAppButton.style.borderRadius = '100px';
        shareWhatsAppButton.style.margin = 'auto';
        shareWhatsAppButton.style.marginRight = '20px';
        shareWhatsAppButton.addEventListener('click', e => eventHandler(e, {type: 'share'}));
        buttonContainer.appendChild(shareWhatsAppButton);
    
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
        noButton.classList.add('primary');
        noButton.style.margin = 'auto';
        noButton.style.marginTop = '75px';
        noButton.innerText = '{% t diary.s2 %}';
        noButton.addEventListener('click', e => eventHandler(e, {type: 'no'}));
        centerContainer.appendChild(noButton);   
    }

    /**
     * Creates a modal containing social media sharing links.
     * @returns {ShareModalFunctions}
     */
    const renderShareModal = () => {

        const openShareModal = () => {document.getElementById("shareModal").style.display = "block"};
    
        const closeShareModal = () => {document.getElementById("shareModal").style.display = "none"};
    
        const shareModal = document.createElement('shareModal');
        shareModal.id = 'shareModal';
        shareModal.classList.add('modal');
        document.body.appendChild(shareModal);
        
        const modalContent = document.createElement('modal-content');
        modalContent.classList.add('modal-content');
        shareModal.append(modalContent);
        
        const centerContainer = document.createElement('div');
        centerContainer.style.marginTop = '30px';
        centerContainer.style.display = 'flex';
        centerContainer.style.flexDirection = 'column';
        modalContent.appendChild(centerContainer);
        
        const textBox1 = document.createElement('div');
        textBox1.innerText = '{% t diary.s1 %}';
        textBox1.style.marginBottom = '40px';
        textBox1.style.textAlign = 'center';
        centerContainer.appendChild(textBox1);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'row';
        centerContainer.append(buttonContainer);

        const shareWhatsAppButton = document.createElement('button');
        shareWhatsAppButton.style.background = "url({{ '/assets/images/WhatsApp_Logo_2.png' | prepend: site.baseurl }}) no-repeat";
        shareWhatsAppButton.style.height = '70px';
        shareWhatsAppButton.style.width = '70px';
        shareWhatsAppButton.style.backgroundPosition = 'center';
        shareWhatsAppButton.style.backgroundSize = 'cover';
        shareWhatsAppButton.style.borderRadius = '100px';
        shareWhatsAppButton.style.margin = 'auto';
        shareWhatsAppButton.style.marginRight = '20px';
        shareWhatsAppButton.addEventListener('click', e => eventHandler(e, {type: 'share'}));
        buttonContainer.appendChild(shareWhatsAppButton);
    
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
        noButton.classList.add('primary');
        noButton.style.margin = 'auto';
        noButton.style.marginTop = '20px';
        noButton.innerText = '{% t diary.s2 %}';
        noButton.addEventListener('click', e => closeShareModal());
        centerContainer.appendChild(noButton);   

        window.onclick = (event) => {
            const modal = document.getElementById("shareModal");
            if (event.target == modal)
                closeShareModal()
        }
        
        return {openShareModal, closeShareModal};
    }

    /**
     * Open the share modal.
     */
    const openShareModal = () => {
        document.getElementById("shareModal").style.display = "block";
    };

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

        renderTopicsFound,
        renderWriteTopic,
        renderEditTopic,
        renderTopics,
        removeTopics,

        renderSelectTopicFromChat,
        renderSelectMessages,
        renderDay,
        clearDay,

        renderPdfPreview,
        displayPreviewCanvas,
        hidePreviewCanvas,

        renderUploadErrorModal,

        renderPreviewWithDataUri,

        renderPreviewOnIframeWithDataUri,

        openShareModal,
    }
}

export default DiaryUI;