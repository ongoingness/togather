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
        imgLogo.alt="Togather Logo"
        div4.append(imgLogo);

        const togatherNameLogo = document.createElement('h3');
        togatherNameLogo.classList.add('footer__logo__title');
        togatherNameLogo.innerText = "Togather";
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

        /*
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('button-loader-container');
        button.append(iconContainer);
*/
        const icon = document.createElement('div');
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
        goButton.addEventListener('click', e => {
            renderButtonLoader(goButton);
            eventHandler(e, {type: 'go-to-step-1'})
        });
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


        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '0 27px';
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
        prevDayInside.innerHTML = '<'//'&#10094;'
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
        nextDayInside.innerHTML = '>'//'&#10095;'
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

    const clearDay = () => {

        document.getElementById('dayDisplay').innerText = '';
        removeChildren('dotContainer');
        removeChildren('lowerPage');

    }

    const updateDay = (dayData) => {
        document.getElementById('dayDisplay').innerText = `{% t diary.t1 %} ${dayData.day}`;
        //document.getElementById('dayDisplay').style = `color: ${dayData.color};`
        document.getElementById('dayDisplay').addEventListener('click', e => document.getElementById('topicText').style.height = '100%')
    }

    const renderDay = (dayData, allMessagesData, selectedMessages) => {

        document.getElementById('dayDisplay').innerText = `{% t diary.t1 %} ${dayData.part === 0 ? `${dayData.day}` : `${dayData.day} #${dayData.part}`}`;
        //document.getElementById('dayDisplay').style = `color: ${dayData.color};`
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
            tapInstructions.innerText = 'Click to see topic';
            document.getElementById('dayDisplay').appendChild(tapInstructions);

            document.getElementById('prevDay').disabled = true;
        } 
        
       if (dayData.index + 1 === dayData.totalOfTopics) {
            document.getElementById('nextDay').disabled = true;
        }

        //console.log(document.getElementsByClassName('upper-page')[0].offsetHeight);

        const topicTextOverlay = document.createElement('div');
        topicTextOverlay.id = 'topicText';
        topicTextOverlay.classList.add('overlay', 'topic-text');
        topicTextOverlay.style.height = `${ (document.body.offsetHeight * 0.78 - 132)}px`
        lowerPage.appendChild(topicTextOverlay);
        window.addEventListener('resize', e => topicTextOverlay.style.height = `${document.getElementById('lowerPage').offsetHeight}px`);

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
        topicTextTitle.innerText = `{% t diary.d1 %} ${dayData.day}:`;
        overlayContent.appendChild(topicTextTitle);

        const topicTextBox = document.createElement('div');
        topicTextBox.classList.add('overlay__text-box');
        topicTextBox.style.maxHeight = '220px';
        topicTextBox.style.overflowY = 'auto';
        topicTextBox.innerText = `"${dayData.text}"`;
        overlayContent.appendChild(topicTextBox);

        const startSelecting = document.createElement('button');
        //startSelecting.classList.add('button', 'round');
        startSelecting.style.margin = 'auto';
        startSelecting.style.color = 'white';
        //startSelecting.style.borderColor = 'white';
        //startSelecting.style.borderStyle = 'solid';
        //startSelecting.style.background = '#E26A6A';
        startSelecting.style.marginTop = '10px';
        startSelecting.style.background = 'none';
        startSelecting.style.padding = '6px';
        startSelecting.style.font = '50px / 28px Roboto'
        startSelecting.style.width = '40px';
        startSelecting.style.bottom = '10px';
        startSelecting.style.position = 'absolute';
        startSelecting.style.left = '50%';
        startSelecting.style.transform = 'translate(-50%, 0)';

        startSelecting.innerText = '×'//'{% t diary.d2 %}';
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
            prevDay.innerHTML = '<'

        if (nextDayLoader.length > 0)
            nextDay.innerHTML = '>'
        
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

        renderDiaryHeader(document.body, "#5/5", true);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        upperPage.classList.add('upper-page');
        content.appendChild(upperPage);

        const title = document.createElement('div');
        //title.classList.add('title', 'diary');
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


        const iframe = document.createElement('iframe');
        iframe.src = "data:application/pdf;filename=generated.pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAyNTcKPj4Kc3RyZWFtCjAuNTcgdwowIEcKMC4wMCBHCjAuMDAgMC40NyAwLjQ5IHJnCjAuMDAgNzQ2LjAxIDU5NS4yOCAtNzcuMDMgcmUKZgpCVAovRjE2IDQyIFRmCjQ4LjMwIFRMCjEuMDAwIGcKMjIwLjc0IDY4OC44MiBUZAo8MDA0NDAwNzgwMDliMDI3NzAwMDEwMGExMDAyNTAwMDE+IFRqCkVUCkJUCi9GMTUgMzAgVGYKMzQuNTAgVEwKMC4wMDAgMC40NzUgMC40OTAgcmcKMjQxLjE2IDEzMy4yMyBUZAo8MDBhYTAwNzgwMDQ2MDAwMTAwYWEwMDRlMDAyZTAwOWI+IFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQovQ29udGVudHMgNiAwIFIKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0xlbmd0aCAxMjE4Cj4+CnN0cmVhbQowLjU3IHcKMC4wMCBHCkJUCi9GMTggMjAgVGYKMjMuMDAgVEwKMC4wMDAgZwoyNTEuMjggNzI4LjUwIFRkCjwwMDI3MDA0ODAwNDQwMDU1MDAwMzAwNDQwMDU2MDA0NzAwNDQ+IFRqCkVUCkJUCi9GMTggMjAgVGYKMjMuMDAgVEwKMC4wMDAgZwoxMDMuMDQgNjE1LjEyIFRkCjwwMDM3MDA0YjAwNGMwMDU2MDAwMzAwNDcwMDRjMDA0NDAwNTUwMDVjMDAwMzAwNGMwMDU2MDAwMzAwNDQwMDAzMDA0NjAwNTIwMDRmMDA0ZjAwNDgwMDQ2MDA1NzAwNGMwMDUyMDA1MTAwMDMwMDUyMDA0OTAwMDMwMDUwMDA0ODAwNTYwMDU2MDA0NDAwNGEwMDQ4MDA1NjAwMDMwMDQ5MDA1NTAwNTIwMDUwMDAxZD4gVGoKRVQKQlQKL0YxOSAxNiBUZgoxOC40MCBUTAowLjAwMCBnCjE0Mi44NyA1NTguNDMgVGQKPDAwMmUwMDVjMDA0ZjAwNDgwMDAzMDAzMDAwNTIwMDUxMDA1NzAwNDQwMDRhMDA1ODAwNDg+IFRqCkVUCkJUCi9GMTkgMTYgVGYKMTguNDAgVEwKMC4wMDAgZwozNDguMjYgNTU4LjQzIFRkCjwwMDJmMDA0YzAwNTEwMDUxMDA0ODAwNDQwMDAzMDAyYTAwNTUwMDUyMDA1MjAwNTc+IFRqCkVUCkJUCi9GMTkgMTYgVGYKMTguNDAgVEwKMC4wMDAgZwoxNTguNzggNTMwLjA4IFRkCjwwMDJkMDA1MjAwNTYwMDRiMDAwMzAwMzYwMDUyMDA1ODAwNTcwMDRiPiBUagpFVApCVAovRjE5IDE2IFRmCjE4LjQwIFRMCjAuMDAwIGcKMzQ2LjExIDUzMC4wOCBUZAo8MDAyZDAwNDQwMDVjMDA1MTAwNDgwMDAzMDAzYTAwNDQwMDRmMDA0ZjAwNDQwMDQ2MDA0OD4gVGoKRVQKQlQKL0YxOSAxNiBUZgoxOC40MCBUTAowLjAwMCBnCjE0OC40NiA1MDEuNzMgVGQKPDAwMmYwMDU4MDBhZjAwNTYwMDAzMDAyNjAwNDQwMDU1MDA1OTAwNDQwMDRmMDA0YjAwNTI+IFRqCkVUCkJUCi9GMTggMjAgVGYKMjMuMDAgVEwKMC4wMDAgZwoxMjkuNTEgMTcwLjA4IFRkCjwwMDM3MDA0YjAwNDgwMDVjMDAwMzAwNDYwMDQ0MDA1MzAwNTcwMDU4MDA1NTAwNDgwMDAzMDA1YzAwNTIwMDU4MDA1NTAwMDMwMDU3MDA0YzAwNTAwMDQ4MDAwMzAwNDQwMDUzMDA0NDAwNTUwMDU3MDAwMzAwNDcwMDU4MDA1NTAwNGMwMDUxMDA0YTAwMWQ+IFRqCkVUCkJUCi9GMTkgMTYgVGYKMTguNDAgVEwKMC4wMDAgZwoyMDUuOTcgMTEzLjM5IFRkCjwwMDE2MDAxMzAwMTIwMDEzMDAxNzAwMTIwMDE1MDAxMzAwMTUwMDEzMDAwMzAwMTAwMDAzMDAxNjAwMTMwMDEyMDAxMzAwMTcwMDEyMDAxNTAwMTMwMDE1MDAxMz4gVGoKRVQKZW5kc3RyZWFtCmVuZG9iago3IDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCAxIDAgUgovUmVzb3VyY2VzIDIgMCBSCi9NZWRpYUJveCBbMCAwIDU5NS4yOCA4NDEuODldCi9Db250ZW50cyA4IDAgUgo+PgplbmRvYmoKOCAwIG9iago8PAovTGVuZ3RoIDEyMjEKPj4Kc3RyZWFtCjAuNTcgdwowLjAwIEcKMC4wMCBHCjAuMzYgMC4wMyAwLjEwIHJnCjAuMDAgNzQ2LjAxIDU5NS4yOCAtNzcuMDMgcmUKZgpCVAovRjE2IDQyIFRmCjQ4LjMwIFRMCjEuMDAwIGcKMTI3LjU2IDY4OC44MiBUZAo8MDAyNTAwMDEwMGNkMDI3NzAyM2M+IFRqCkVUCkJUCi9GMTUgNDAgVGYKNDYuMDAgVEwKMC4wMDAgZwoxMjcuNTYgNjA2LjYxIFRkCjwwMjNlMDIzYjAyNzcwMDAxMDA5NzAwOWIwMDUyMDA2NjAyNzcwMjNkMDIzYjAyM2QwMjNiPiBUagpFVApCVAovRjE3IDE4IFRmCjIwLjcwIFRMCjAuMDAwIGcKMTE5LjA2IDQ4MS44MyBUZAo8MDAyODAwNDQwMDQ2MDA0YjAwMDMwMDU2MDA0YjAwNDQwMDU1MDA0ODAwMDMwMDQ0MDAwMzAwNTYwMDUyMDA1MTAwNGEwMDAzMDA1NzAwNGIwMDQ0MDA1NzAwMDMwMDUwMDA0NDAwNGUwMDQ4MDA1NjAwMDMwMDVjMDA1MjAwNTgwMDAzMDA0YjAwNDQwMDUzMDA1MzAwNWM+IFRqClQqIDwwMDQ0MDA1MTAwNDcwMDAzMDA1MjAwNTEwMDQ4MDAwMzAwNTcwMDRiMDA0NDAwNTcwMDAzMDA1NTAwNDgwMDUwMDA0YzAwNTEwMDQ3MDA1NjAwMDMwMDVjMDA1MjAwNTgwMDAzMDA1MjAwNDkwMDAzMDA1YzAwNTIwMDU4MDA1NTAwMDMwMDRmMDA1MjAwNTkwMDQ4MDA0NzAwMDMwMDUyMDA1MTAwNDgwMDBmPiBUagpUKiA8MDA0NDAwNTEwMDQ3MDAwMzAwNDgwMDViMDA1MzAwNGYwMDQ0MDA0YzAwNTEwMDAzMDA1YTAwNGIwMDVjMDAxMTAwMDMwMDJhMDA0NDAwNTcwMDRiMDA0ODAwNTUwMDAzMDA0NDAwNGYwMDRmMDAwMzAwNTcwMDRiMDA0ODAwNTYwMDQ4MDAwMzAwNTYwMDUyMDA1MTAwNGEwMDU2MDAwMzAwNGMwMDUxMDA1NzAwNTI+IFRqClQqIDwwMDQ0MDAwMzAwNTYwMDRiMDA0NDAwNTUwMDQ4MDA0NzAwMDMwMDUzMDA0ZjAwNDQwMDVjMDA0ZjAwNGMwMDU2MDA1NzAwMGYwMDAzMDA0OTAwNTIwMDU1MDAwMzAwNDgwMDViMDA0NDAwNTAwMDUzMDA0ZjAwNDgwMDAzMDA1MjAwNTEwMDAzMDAzNjAwNTMwMDUyMDA1NzAwNGMwMDQ5MDA1YzAwMTE+IFRqClQqIDwwMzk0MDA1MTAwNDYwMDRmMDA1ODAwNDcwMDQ4MDAwMzAwNDQwMDAzMDA0ZjAwNGMwMDUxMDA0ZTAwMDMwMDU3MDA1MjAwMDMwMDU3MDA0YjAwNGMwMDU2MDAwMzAwNTMwMDRmMDA0NDAwNWMwMDRmMDA0YzAwNTYwMDU3MDAwMzAwNGIwMDQ4MDA1NTAwNDgwMDAzMDA0YzAwNTEwMDAzMDA1NzAwNGIwMDQ4PiBUagpUKiA8MDA0NzAwNGMwMDQ0MDA1NTAwNWMwMDExPiBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjkgMCBvYmoKPDwvVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9SZXNvdXJjZXMgMiAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0KL0NvbnRlbnRzIDEwIDAgUgo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL0xlbmd0aCAxMTU1Ngo+PgpzdHJlYW0KMC41NyB3CjAuMDAgRwowLjAwIGcKMjk5LjkxIDg0MS44OSBtIDI5OS45MSA4NDMuMTQgMjk4Ljg5IDg0NC4xNiAyOTcuNjQgODQ0LjE2IGMKMjk2LjM5IDg0NC4xNiAyOTUuMzcgODQzLjE0IDI5NS4zNyA4NDEuODkgYwoyOTUuMzcgODQwLjY0IDI5Ni4zOSA4MzkuNjIgMjk3LjY0IDgzOS42MiBjCjI5OC44OSA4MzkuNjIgMjk5LjkxIDg0MC42NCAyOTkuOTEgODQxLjg5IGMKZgoyOTkuOTEgODI3LjcyIG0gMjk5LjkxIDgyOC45NyAyOTguODkgODI5Ljk4IDI5Ny42NCA4MjkuOTggYwoyOTYuMzkgODI5Ljk4IDI5NS4zNyA4MjguOTcgMjk1LjM3IDgyNy43MiBjCjI5NS4zNyA4MjYuNDYgMjk2LjM5IDgyNS40NSAyOTcuNjQgODI1LjQ1IGMKMjk4Ljg5IDgyNS40NSAyOTkuOTEgODI2LjQ2IDI5OS45MSA4MjcuNzIgYwpmCjI5OS45MSA4MTMuNTQgbSAyOTkuOTEgODE0LjgwIDI5OC44OSA4MTUuODEgMjk3LjY0IDgxNS44MSBjCjI5Ni4zOSA4MTUuODEgMjk1LjM3IDgxNC44MCAyOTUuMzcgODEzLjU0IGMKMjk1LjM3IDgxMi4yOSAyOTYuMzkgODExLjI4IDI5Ny42NCA4MTEuMjggYwoyOTguODkgODExLjI4IDI5OS45MSA4MTIuMjkgMjk5LjkxIDgxMy41NCBjCmYKMjk5LjkxIDc5OS4zNyBtIDI5OS45MSA4MDAuNjIgMjk4Ljg5IDgwMS42NCAyOTcuNjQgODAxLjY0IGMKMjk2LjM5IDgwMS42NCAyOTUuMzcgODAwLjYyIDI5NS4zNyA3OTkuMzcgYwoyOTUuMzcgNzk4LjEyIDI5Ni4zOSA3OTcuMTAgMjk3LjY0IDc5Ny4xMCBjCjI5OC44OSA3OTcuMTAgMjk5LjkxIDc5OC4xMiAyOTkuOTEgNzk5LjM3IGMKZgoyOTkuOTEgNzg1LjIwIG0gMjk5LjkxIDc4Ni40NSAyOTguODkgNzg3LjQ2IDI5Ny42NCA3ODcuNDYgYwoyOTYuMzkgNzg3LjQ2IDI5NS4zNyA3ODYuNDUgMjk1LjM3IDc4NS4yMCBjCjI5NS4zNyA3ODMuOTQgMjk2LjM5IDc4Mi45MyAyOTcuNjQgNzgyLjkzIGMKMjk4Ljg5IDc4Mi45MyAyOTkuOTEgNzgzLjk0IDI5OS45MSA3ODUuMjAgYwpmCjI5OS45MSA3NzEuMDIgbSAyOTkuOTEgNzcyLjI4IDI5OC44OSA3NzMuMjkgMjk3LjY0IDc3My4yOSBjCjI5Ni4zOSA3NzMuMjkgMjk1LjM3IDc3Mi4yOCAyOTUuMzcgNzcxLjAyIGMKMjk1LjM3IDc2OS43NyAyOTYuMzkgNzY4Ljc2IDI5Ny42NCA3NjguNzYgYwoyOTguODkgNzY4Ljc2IDI5OS45MSA3NjkuNzcgMjk5LjkxIDc3MS4wMiBjCmYKMjk5LjkxIDc1Ni44NSBtIDI5OS45MSA3NTguMTAgMjk4Ljg5IDc1OS4xMiAyOTcuNjQgNzU5LjEyIGMKMjk2LjM5IDc1OS4xMiAyOTUuMzcgNzU4LjEwIDI5NS4zNyA3NTYuODUgYwoyOTUuMzcgNzU1LjYwIDI5Ni4zOSA3NTQuNTggMjk3LjY0IDc1NC41OCBjCjI5OC44OSA3NTQuNTggMjk5LjkxIDc1NS42MCAyOTkuOTEgNzU2Ljg1IGMKZgoyOTkuOTEgNzQyLjY4IG0gMjk5LjkxIDc0My45MyAyOTguODkgNzQ0Ljk1IDI5Ny42NCA3NDQuOTUgYwoyOTYuMzkgNzQ0Ljk1IDI5NS4zNyA3NDMuOTMgMjk1LjM3IDc0Mi42OCBjCjI5NS4zNyA3NDEuNDIgMjk2LjM5IDc0MC40MSAyOTcuNjQgNzQwLjQxIGMKMjk4Ljg5IDc0MC40MSAyOTkuOTEgNzQxLjQyIDI5OS45MSA3NDIuNjggYwpmCjI5OS45MSA3MjguNTAgbSAyOTkuOTEgNzI5Ljc2IDI5OC44OSA3MzAuNzcgMjk3LjY0IDczMC43NyBjCjI5Ni4zOSA3MzAuNzcgMjk1LjM3IDcyOS43NiAyOTUuMzcgNzI4LjUwIGMKMjk1LjM3IDcyNy4yNSAyOTYuMzkgNzI2LjI0IDI5Ny42NCA3MjYuMjQgYwoyOTguODkgNzI2LjI0IDI5OS45MSA3MjcuMjUgMjk5LjkxIDcyOC41MCBjCmYKMjk5LjkxIDcxNC4zMyBtIDI5OS45MSA3MTUuNTggMjk4Ljg5IDcxNi42MCAyOTcuNjQgNzE2LjYwIGMKMjk2LjM5IDcxNi42MCAyOTUuMzcgNzE1LjU4IDI5NS4zNyA3MTQuMzMgYwoyOTUuMzcgNzEzLjA4IDI5Ni4zOSA3MTIuMDYgMjk3LjY0IDcxMi4wNiBjCjI5OC44OSA3MTIuMDYgMjk5LjkxIDcxMy4wOCAyOTkuOTEgNzE0LjMzIGMKZgoyOTkuOTEgNzAwLjE2IG0gMjk5LjkxIDcwMS40MSAyOTguODkgNzAyLjQzIDI5Ny42NCA3MDIuNDMgYwoyOTYuMzkgNzAyLjQzIDI5NS4zNyA3MDEuNDEgMjk1LjM3IDcwMC4xNiBjCjI5NS4zNyA2OTguOTEgMjk2LjM5IDY5Ny44OSAyOTcuNjQgNjk3Ljg5IGMKMjk4Ljg5IDY5Ny44OSAyOTkuOTEgNjk4LjkxIDI5OS45MSA3MDAuMTYgYwpmCjI5OS45MSA2ODUuOTggbSAyOTkuOTEgNjg3LjI0IDI5OC44OSA2ODguMjUgMjk3LjY0IDY4OC4yNSBjCjI5Ni4zOSA2ODguMjUgMjk1LjM3IDY4Ny4yNCAyOTUuMzcgNjg1Ljk4IGMKMjk1LjM3IDY4NC43MyAyOTYuMzkgNjgzLjcyIDI5Ny42NCA2ODMuNzIgYwoyOTguODkgNjgzLjcyIDI5OS45MSA2ODQuNzMgMjk5LjkxIDY4NS45OCBjCmYKMjk5LjkxIDY3MS44MSBtIDI5OS45MSA2NzMuMDYgMjk4Ljg5IDY3NC4wOCAyOTcuNjQgNjc0LjA4IGMKMjk2LjM5IDY3NC4wOCAyOTUuMzcgNjczLjA2IDI5NS4zNyA2NzEuODEgYwoyOTUuMzcgNjcwLjU2IDI5Ni4zOSA2NjkuNTQgMjk3LjY0IDY2OS41NCBjCjI5OC44OSA2NjkuNTQgMjk5LjkxIDY3MC41NiAyOTkuOTEgNjcxLjgxIGMKZgoyOTkuOTEgNjU3LjY0IG0gMjk5LjkxIDY1OC44OSAyOTguODkgNjU5LjkxIDI5Ny42NCA2NTkuOTEgYwoyOTYuMzkgNjU5LjkxIDI5NS4zNyA2NTguODkgMjk1LjM3IDY1Ny42NCBjCjI5NS4zNyA2NTYuMzkgMjk2LjM5IDY1NS4zNyAyOTcuNjQgNjU1LjM3IGMKMjk4Ljg5IDY1NS4zNyAyOTkuOTEgNjU2LjM5IDI5OS45MSA2NTcuNjQgYwpmCjI5OS45MSA2NDMuNDYgbSAyOTkuOTEgNjQ0LjcyIDI5OC44OSA2NDUuNzMgMjk3LjY0IDY0NS43MyBjCjI5Ni4zOSA2NDUuNzMgMjk1LjM3IDY0NC43MiAyOTUuMzcgNjQzLjQ2IGMKMjk1LjM3IDY0Mi4yMSAyOTYuMzkgNjQxLjIwIDI5Ny42NCA2NDEuMjAgYwoyOTguODkgNjQxLjIwIDI5OS45MSA2NDIuMjEgMjk5LjkxIDY0My40NiBjCmYKMjk5LjkxIDYyOS4yOSBtIDI5OS45MSA2MzAuNTQgMjk4Ljg5IDYzMS41NiAyOTcuNjQgNjMxLjU2IGMKMjk2LjM5IDYzMS41NiAyOTUuMzcgNjMwLjU0IDI5NS4zNyA2MjkuMjkgYwoyOTUuMzcgNjI4LjA0IDI5Ni4zOSA2MjcuMDIgMjk3LjY0IDYyNy4wMiBjCjI5OC44OSA2MjcuMDIgMjk5LjkxIDYyOC4wNCAyOTkuOTEgNjI5LjI5IGMKZgoyOTkuOTEgNjE1LjEyIG0gMjk5LjkxIDYxNi4zNyAyOTguODkgNjE3LjM5IDI5Ny42NCA2MTcuMzkgYwoyOTYuMzkgNjE3LjM5IDI5NS4zNyA2MTYuMzcgMjk1LjM3IDYxNS4xMiBjCjI5NS4zNyA2MTMuODcgMjk2LjM5IDYxMi44NSAyOTcuNjQgNjEyLjg1IGMKMjk4Ljg5IDYxMi44NSAyOTkuOTEgNjEzLjg3IDI5OS45MSA2MTUuMTIgYwpmCjI5OS45MSA2MDAuOTUgbSAyOTkuOTEgNjAyLjIwIDI5OC44OSA2MDMuMjEgMjk3LjY0IDYwMy4yMSBjCjI5Ni4zOSA2MDMuMjEgMjk1LjM3IDYwMi4yMCAyOTUuMzcgNjAwLjk1IGMKMjk1LjM3IDU5OS42OSAyOTYuMzkgNTk4LjY4IDI5Ny42NCA1OTguNjggYwoyOTguODkgNTk4LjY4IDI5OS45MSA1OTkuNjkgMjk5LjkxIDYwMC45NSBjCmYKMjk5LjkxIDU4Ni43NyBtIDI5OS45MSA1ODguMDIgMjk4Ljg5IDU4OS4wNCAyOTcuNjQgNTg5LjA0IGMKMjk2LjM5IDU4OS4wNCAyOTUuMzcgNTg4LjAyIDI5NS4zNyA1ODYuNzcgYwoyOTUuMzcgNTg1LjUyIDI5Ni4zOSA1ODQuNTAgMjk3LjY0IDU4NC41MCBjCjI5OC44OSA1ODQuNTAgMjk5LjkxIDU4NS41MiAyOTkuOTEgNTg2Ljc3IGMKZgoyOTkuOTEgNTcyLjYwIG0gMjk5LjkxIDU3My44NSAyOTguODkgNTc0Ljg3IDI5Ny42NCA1NzQuODcgYwoyOTYuMzkgNTc0Ljg3IDI5NS4zNyA1NzMuODUgMjk1LjM3IDU3Mi42MCBjCjI5NS4zNyA1NzEuMzUgMjk2LjM5IDU3MC4zMyAyOTcuNjQgNTcwLjMzIGMKMjk4Ljg5IDU3MC4zMyAyOTkuOTEgNTcxLjM1IDI5OS45MSA1NzIuNjAgYwpmCjI5OS45MSA1NTguNDMgbSAyOTkuOTEgNTU5LjY4IDI5OC44OSA1NjAuNjkgMjk3LjY0IDU2MC42OSBjCjI5Ni4zOSA1NjAuNjkgMjk1LjM3IDU1OS42OCAyOTUuMzcgNTU4LjQzIGMKMjk1LjM3IDU1Ny4xNyAyOTYuMzkgNTU2LjE2IDI5Ny42NCA1NTYuMTYgYwoyOTguODkgNTU2LjE2IDI5OS45MSA1NTcuMTcgMjk5LjkxIDU1OC40MyBjCmYKMjk5LjkxIDU0NC4yNSBtIDI5OS45MSA1NDUuNTAgMjk4Ljg5IDU0Ni41MiAyOTcuNjQgNTQ2LjUyIGMKMjk2LjM5IDU0Ni41MiAyOTUuMzcgNTQ1LjUwIDI5NS4zNyA1NDQuMjUgYwoyOTUuMzcgNTQzLjAwIDI5Ni4zOSA1NDEuOTggMjk3LjY0IDU0MS45OCBjCjI5OC44OSA1NDEuOTggMjk5LjkxIDU0My4wMCAyOTkuOTEgNTQ0LjI1IGMKZgoyOTkuOTEgNTMwLjA4IG0gMjk5LjkxIDUzMS4zMyAyOTguODkgNTMyLjM1IDI5Ny42NCA1MzIuMzUgYwoyOTYuMzkgNTMyLjM1IDI5NS4zNyA1MzEuMzMgMjk1LjM3IDUzMC4wOCBjCjI5NS4zNyA1MjguODMgMjk2LjM5IDUyNy44MSAyOTcuNjQgNTI3LjgxIGMKMjk4Ljg5IDUyNy44MSAyOTkuOTEgNTI4LjgzIDI5OS45MSA1MzAuMDggYwpmCjI5OS45MSA1MTUuOTEgbSAyOTkuOTEgNTE3LjE2IDI5OC44OSA1MTguMTcgMjk3LjY0IDUxOC4xNyBjCjI5Ni4zOSA1MTguMTcgMjk1LjM3IDUxNy4xNiAyOTUuMzcgNTE1LjkxIGMKMjk1LjM3IDUxNC42NSAyOTYuMzkgNTEzLjY0IDI5Ny42NCA1MTMuNjQgYwoyOTguODkgNTEzLjY0IDI5OS45MSA1MTQuNjUgMjk5LjkxIDUxNS45MSBjCmYKMjk5LjkxIDUwMS43MyBtIDI5OS45MSA1MDIuOTggMjk4Ljg5IDUwNC4wMCAyOTcuNjQgNTA0LjAwIGMKMjk2LjM5IDUwNC4wMCAyOTUuMzcgNTAyLjk4IDI5NS4zNyA1MDEuNzMgYwoyOTUuMzcgNTAwLjQ4IDI5Ni4zOSA0OTkuNDYgMjk3LjY0IDQ5OS40NiBjCjI5OC44OSA0OTkuNDYgMjk5LjkxIDUwMC40OCAyOTkuOTEgNTAxLjczIGMKZgoyOTkuOTEgNDg3LjU2IG0gMjk5LjkxIDQ4OC44MSAyOTguODkgNDg5LjgzIDI5Ny42NCA0ODkuODMgYwoyOTYuMzkgNDg5LjgzIDI5NS4zNyA0ODguODEgMjk1LjM3IDQ4Ny41NiBjCjI5NS4zNyA0ODYuMzEgMjk2LjM5IDQ4NS4yOSAyOTcuNjQgNDg1LjI5IGMKMjk4Ljg5IDQ4NS4yOSAyOTkuOTEgNDg2LjMxIDI5OS45MSA0ODcuNTYgYwpmCjI5OS45MSA0NzMuMzkgbSAyOTkuOTEgNDc0LjY0IDI5OC44OSA0NzUuNjUgMjk3LjY0IDQ3NS42NSBjCjI5Ni4zOSA0NzUuNjUgMjk1LjM3IDQ3NC42NCAyOTUuMzcgNDczLjM5IGMKMjk1LjM3IDQ3Mi4xMyAyOTYuMzkgNDcxLjEyIDI5Ny42NCA0NzEuMTIgYwoyOTguODkgNDcxLjEyIDI5OS45MSA0NzIuMTMgMjk5LjkxIDQ3My4zOSBjCmYKMjk5LjkxIDQ1OS4yMSBtIDI5OS45MSA0NjAuNDcgMjk4Ljg5IDQ2MS40OCAyOTcuNjQgNDYxLjQ4IGMKMjk2LjM5IDQ2MS40OCAyOTUuMzcgNDYwLjQ3IDI5NS4zNyA0NTkuMjEgYwoyOTUuMzcgNDU3Ljk2IDI5Ni4zOSA0NTYuOTUgMjk3LjY0IDQ1Ni45NSBjCjI5OC44OSA0NTYuOTUgMjk5LjkxIDQ1Ny45NiAyOTkuOTEgNDU5LjIxIGMKZgoyOTkuOTEgNDQ1LjA0IG0gMjk5LjkxIDQ0Ni4yOSAyOTguODkgNDQ3LjMxIDI5Ny42NCA0NDcuMzEgYwoyOTYuMzkgNDQ3LjMxIDI5NS4zNyA0NDYuMjkgMjk1LjM3IDQ0NS4wNCBjCjI5NS4zNyA0NDMuNzkgMjk2LjM5IDQ0Mi43NyAyOTcuNjQgNDQyLjc3IGMKMjk4Ljg5IDQ0Mi43NyAyOTkuOTEgNDQzLjc5IDI5OS45MSA0NDUuMDQgYwpmCjI5OS45MSA0MzAuODcgbSAyOTkuOTEgNDMyLjEyIDI5OC44OSA0MzMuMTMgMjk3LjY0IDQzMy4xMyBjCjI5Ni4zOSA0MzMuMTMgMjk1LjM3IDQzMi4xMiAyOTUuMzcgNDMwLjg3IGMKMjk1LjM3IDQyOS42MSAyOTYuMzkgNDI4LjYwIDI5Ny42NCA0MjguNjAgYwoyOTguODkgNDI4LjYwIDI5OS45MSA0MjkuNjEgMjk5LjkxIDQzMC44NyBjCmYKMjk5LjkxIDQxNi42OSBtIDI5OS45MSA0MTcuOTUgMjk4Ljg5IDQxOC45NiAyOTcuNjQgNDE4Ljk2IGMKMjk2LjM5IDQxOC45NiAyOTUuMzcgNDE3Ljk1IDI5NS4zNyA0MTYuNjkgYwoyOTUuMzcgNDE1LjQ0IDI5Ni4zOSA0MTQuNDMgMjk3LjY0IDQxNC40MyBjCjI5OC44OSA0MTQuNDMgMjk5LjkxIDQxNS40NCAyOTkuOTEgNDE2LjY5IGMKZgoyOTkuOTEgNDAyLjUyIG0gMjk5LjkxIDQwMy43NyAyOTguODkgNDA0Ljc5IDI5Ny42NCA0MDQuNzkgYwoyOTYuMzkgNDA0Ljc5IDI5NS4zNyA0MDMuNzcgMjk1LjM3IDQwMi41MiBjCjI5NS4zNyA0MDEuMjcgMjk2LjM5IDQwMC4yNSAyOTcuNjQgNDAwLjI1IGMKMjk4Ljg5IDQwMC4yNSAyOTkuOTEgNDAxLjI3IDI5OS45MSA0MDIuNTIgYwpmCjI5OS45MSAzODguMzUgbSAyOTkuOTEgMzg5LjYwIDI5OC44OSAzOTAuNjEgMjk3LjY0IDM5MC42MSBjCjI5Ni4zOSAzOTAuNjEgMjk1LjM3IDM4OS42MCAyOTUuMzcgMzg4LjM1IGMKMjk1LjM3IDM4Ny4wOSAyOTYuMzkgMzg2LjA4IDI5Ny42NCAzODYuMDggYwoyOTguODkgMzg2LjA4IDI5OS45MSAzODcuMDkgMjk5LjkxIDM4OC4zNSBjCmYKMjk5LjkxIDM3NC4xNyBtIDI5OS45MSAzNzUuNDMgMjk4Ljg5IDM3Ni40NCAyOTcuNjQgMzc2LjQ0IGMKMjk2LjM5IDM3Ni40NCAyOTUuMzcgMzc1LjQzIDI5NS4zNyAzNzQuMTcgYwoyOTUuMzcgMzcyLjkyIDI5Ni4zOSAzNzEuOTEgMjk3LjY0IDM3MS45MSBjCjI5OC44OSAzNzEuOTEgMjk5LjkxIDM3Mi45MiAyOTkuOTEgMzc0LjE3IGMKZgoyOTkuOTEgMzYwLjAwIG0gMjk5LjkxIDM2MS4yNSAyOTguODkgMzYyLjI3IDI5Ny42NCAzNjIuMjcgYwoyOTYuMzkgMzYyLjI3IDI5NS4zNyAzNjEuMjUgMjk1LjM3IDM2MC4wMCBjCjI5NS4zNyAzNTguNzUgMjk2LjM5IDM1Ny43MyAyOTcuNjQgMzU3LjczIGMKMjk4Ljg5IDM1Ny43MyAyOTkuOTEgMzU4Ljc1IDI5OS45MSAzNjAuMDAgYwpmCjI5OS45MSAzNDUuODMgbSAyOTkuOTEgMzQ3LjA4IDI5OC44OSAzNDguMDkgMjk3LjY0IDM0OC4wOSBjCjI5Ni4zOSAzNDguMDkgMjk1LjM3IDM0Ny4wOCAyOTUuMzcgMzQ1LjgzIGMKMjk1LjM3IDM0NC41NyAyOTYuMzkgMzQzLjU2IDI5Ny42NCAzNDMuNTYgYwoyOTguODkgMzQzLjU2IDI5OS45MSAzNDQuNTcgMjk5LjkxIDM0NS44MyBjCmYKMjk5LjkxIDMzMS42NSBtIDI5OS45MSAzMzIuOTEgMjk4Ljg5IDMzMy45MiAyOTcuNjQgMzMzLjkyIGMKMjk2LjM5IDMzMy45MiAyOTUuMzcgMzMyLjkxIDI5NS4zNyAzMzEuNjUgYwoyOTUuMzcgMzMwLjQwIDI5Ni4zOSAzMjkuMzkgMjk3LjY0IDMyOS4zOSBjCjI5OC44OSAzMjkuMzkgMjk5LjkxIDMzMC40MCAyOTkuOTEgMzMxLjY1IGMKZgoyOTkuOTEgMzE3LjQ4IG0gMjk5LjkxIDMxOC43MyAyOTguODkgMzE5Ljc1IDI5Ny42NCAzMTkuNzUgYwoyOTYuMzkgMzE5Ljc1IDI5NS4zNyAzMTguNzMgMjk1LjM3IDMxNy40OCBjCjI5NS4zNyAzMTYuMjMgMjk2LjM5IDMxNS4yMSAyOTcuNjQgMzE1LjIxIGMKMjk4Ljg5IDMxNS4yMSAyOTkuOTEgMzE2LjIzIDI5OS45MSAzMTcuNDggYwpmCjI5OS45MSAzMDMuMzEgbSAyOTkuOTEgMzA0LjU2IDI5OC44OSAzMDUuNTggMjk3LjY0IDMwNS41OCBjCjI5Ni4zOSAzMDUuNTggMjk1LjM3IDMwNC41NiAyOTUuMzcgMzAzLjMxIGMKMjk1LjM3IDMwMi4wNSAyOTYuMzkgMzAxLjA0IDI5Ny42NCAzMDEuMDQgYwoyOTguODkgMzAxLjA0IDI5OS45MSAzMDIuMDUgMjk5LjkxIDMwMy4zMSBjCmYKMjk5LjkxIDI4OS4xMyBtIDI5OS45MSAyOTAuMzkgMjk4Ljg5IDI5MS40MCAyOTcuNjQgMjkxLjQwIGMKMjk2LjM5IDI5MS40MCAyOTUuMzcgMjkwLjM5IDI5NS4zNyAyODkuMTMgYwoyOTUuMzcgMjg3Ljg4IDI5Ni4zOSAyODYuODcgMjk3LjY0IDI4Ni44NyBjCjI5OC44OSAyODYuODcgMjk5LjkxIDI4Ny44OCAyOTkuOTEgMjg5LjEzIGMKZgoyOTkuOTEgMjc0Ljk2IG0gMjk5LjkxIDI3Ni4yMSAyOTguODkgMjc3LjIzIDI5Ny42NCAyNzcuMjMgYwoyOTYuMzkgMjc3LjIzIDI5NS4zNyAyNzYuMjEgMjk1LjM3IDI3NC45NiBjCjI5NS4zNyAyNzMuNzEgMjk2LjM5IDI3Mi42OSAyOTcuNjQgMjcyLjY5IGMKMjk4Ljg5IDI3Mi42OSAyOTkuOTEgMjczLjcxIDI5OS45MSAyNzQuOTYgYwpmCjI5OS45MSAyNjAuNzkgbSAyOTkuOTEgMjYyLjA0IDI5OC44OSAyNjMuMDYgMjk3LjY0IDI2My4wNiBjCjI5Ni4zOSAyNjMuMDYgMjk1LjM3IDI2Mi4wNCAyOTUuMzcgMjYwLjc5IGMKMjk1LjM3IDI1OS41NCAyOTYuMzkgMjU4LjUyIDI5Ny42NCAyNTguNTIgYwoyOTguODkgMjU4LjUyIDI5OS45MSAyNTkuNTQgMjk5LjkxIDI2MC43OSBjCmYKMjk5LjkxIDI0Ni42MSBtIDI5OS45MSAyNDcuODcgMjk4Ljg5IDI0OC44OCAyOTcuNjQgMjQ4Ljg4IGMKMjk2LjM5IDI0OC44OCAyOTUuMzcgMjQ3Ljg3IDI5NS4zNyAyNDYuNjEgYwoyOTUuMzcgMjQ1LjM2IDI5Ni4zOSAyNDQuMzUgMjk3LjY0IDI0NC4zNSBjCjI5OC44OSAyNDQuMzUgMjk5LjkxIDI0NS4zNiAyOTkuOTEgMjQ2LjYxIGMKZgoyOTkuOTEgMjMyLjQ0IG0gMjk5LjkxIDIzMy42OSAyOTguODkgMjM0LjcxIDI5Ny42NCAyMzQuNzEgYwoyOTYuMzkgMjM0LjcxIDI5NS4zNyAyMzMuNjkgMjk1LjM3IDIzMi40NCBjCjI5NS4zNyAyMzEuMTkgMjk2LjM5IDIzMC4xNyAyOTcuNjQgMjMwLjE3IGMKMjk4Ljg5IDIzMC4xNyAyOTkuOTEgMjMxLjE5IDI5OS45MSAyMzIuNDQgYwpmCjI5OS45MSAyMTguMjcgbSAyOTkuOTEgMjE5LjUyIDI5OC44OSAyMjAuNTQgMjk3LjY0IDIyMC41NCBjCjI5Ni4zOSAyMjAuNTQgMjk1LjM3IDIxOS41MiAyOTUuMzcgMjE4LjI3IGMKMjk1LjM3IDIxNy4wMiAyOTYuMzkgMjE2LjAwIDI5Ny42NCAyMTYuMDAgYwoyOTguODkgMjE2LjAwIDI5OS45MSAyMTcuMDIgMjk5LjkxIDIxOC4yNyBjCmYKMjk5LjkxIDIwNC4wOSBtIDI5OS45MSAyMDUuMzUgMjk4Ljg5IDIwNi4zNiAyOTcuNjQgMjA2LjM2IGMKMjk2LjM5IDIwNi4zNiAyOTUuMzcgMjA1LjM1IDI5NS4zNyAyMDQuMDkgYwoyOTUuMzcgMjAyLjg0IDI5Ni4zOSAyMDEuODMgMjk3LjY0IDIwMS44MyBjCjI5OC44OSAyMDEuODMgMjk5LjkxIDIwMi44NCAyOTkuOTEgMjA0LjA5IGMKZgoyOTkuOTEgMTg5LjkyIG0gMjk5LjkxIDE5MS4xNyAyOTguODkgMTkyLjE5IDI5Ny42NCAxOTIuMTkgYwoyOTYuMzkgMTkyLjE5IDI5NS4zNyAxOTEuMTcgMjk1LjM3IDE4OS45MiBjCjI5NS4zNyAxODguNjcgMjk2LjM5IDE4Ny42NSAyOTcuNjQgMTg3LjY1IGMKMjk4Ljg5IDE4Ny42NSAyOTkuOTEgMTg4LjY3IDI5OS45MSAxODkuOTIgYwpmCjI5OS45MSAxNzUuNzUgbSAyOTkuOTEgMTc3LjAwIDI5OC44OSAxNzguMDIgMjk3LjY0IDE3OC4wMiBjCjI5Ni4zOSAxNzguMDIgMjk1LjM3IDE3Ny4wMCAyOTUuMzcgMTc1Ljc1IGMKMjk1LjM3IDE3NC41MCAyOTYuMzkgMTczLjQ4IDI5Ny42NCAxNzMuNDggYwoyOTguODkgMTczLjQ4IDI5OS45MSAxNzQuNTAgMjk5LjkxIDE3NS43NSBjCmYKMjk5LjkxIDE2MS41OCBtIDI5OS45MSAxNjIuODMgMjk4Ljg5IDE2My44NCAyOTcuNjQgMTYzLjg0IGMKMjk2LjM5IDE2My44NCAyOTUuMzcgMTYyLjgzIDI5NS4zNyAxNjEuNTggYwoyOTUuMzcgMTYwLjMyIDI5Ni4zOSAxNTkuMzEgMjk3LjY0IDE1OS4zMSBjCjI5OC44OSAxNTkuMzEgMjk5LjkxIDE2MC4zMiAyOTkuOTEgMTYxLjU4IGMKZgoyOTkuOTEgMTQ3LjQwIG0gMjk5LjkxIDE0OC42NSAyOTguODkgMTQ5LjY3IDI5Ny42NCAxNDkuNjcgYwoyOTYuMzkgMTQ5LjY3IDI5NS4zNyAxNDguNjUgMjk1LjM3IDE0Ny40MCBjCjI5NS4zNyAxNDYuMTUgMjk2LjM5IDE0NS4xMyAyOTcuNjQgMTQ1LjEzIGMKMjk4Ljg5IDE0NS4xMyAyOTkuOTEgMTQ2LjE1IDI5OS45MSAxNDcuNDAgYwpmCjI5OS45MSAxMzMuMjMgbSAyOTkuOTEgMTM0LjQ4IDI5OC44OSAxMzUuNTAgMjk3LjY0IDEzNS41MCBjCjI5Ni4zOSAxMzUuNTAgMjk1LjM3IDEzNC40OCAyOTUuMzcgMTMzLjIzIGMKMjk1LjM3IDEzMS45OCAyOTYuMzkgMTMwLjk2IDI5Ny42NCAxMzAuOTYgYwoyOTguODkgMTMwLjk2IDI5OS45MSAxMzEuOTggMjk5LjkxIDEzMy4yMyBjCmYKMjk5LjkxIDExOS4wNiBtIDI5OS45MSAxMjAuMzEgMjk4Ljg5IDEyMS4zMiAyOTcuNjQgMTIxLjMyIGMKMjk2LjM5IDEyMS4zMiAyOTUuMzcgMTIwLjMxIDI5NS4zNyAxMTkuMDYgYwoyOTUuMzcgMTE3LjgwIDI5Ni4zOSAxMTYuNzkgMjk3LjY0IDExNi43OSBjCjI5OC44OSAxMTYuNzkgMjk5LjkxIDExNy44MCAyOTkuOTEgMTE5LjA2IGMKZgoyOTkuOTEgMTA0Ljg4IG0gMjk5LjkxIDEwNi4xMyAyOTguODkgMTA3LjE1IDI5Ny42NCAxMDcuMTUgYwoyOTYuMzkgMTA3LjE1IDI5NS4zNyAxMDYuMTMgMjk1LjM3IDEwNC44OCBjCjI5NS4zNyAxMDMuNjMgMjk2LjM5IDEwMi42MSAyOTcuNjQgMTAyLjYxIGMKMjk4Ljg5IDEwMi42MSAyOTkuOTEgMTAzLjYzIDI5OS45MSAxMDQuODggYwpmCjI5OS45MSA5MC43MSBtIDI5OS45MSA5MS45NiAyOTguODkgOTIuOTggMjk3LjY0IDkyLjk4IGMKMjk2LjM5IDkyLjk4IDI5NS4zNyA5MS45NiAyOTUuMzcgOTAuNzEgYwoyOTUuMzcgODkuNDYgMjk2LjM5IDg4LjQ0IDI5Ny42NCA4OC40NCBjCjI5OC44OSA4OC40NCAyOTkuOTEgODkuNDYgMjk5LjkxIDkwLjcxIGMKZgoyOTkuOTEgNzYuNTQgbSAyOTkuOTEgNzcuNzkgMjk4Ljg5IDc4LjgwIDI5Ny42NCA3OC44MCBjCjI5Ni4zOSA3OC44MCAyOTUuMzcgNzcuNzkgMjk1LjM3IDc2LjU0IGMKMjk1LjM3IDc1LjI4IDI5Ni4zOSA3NC4yNyAyOTcuNjQgNzQuMjcgYwoyOTguODkgNzQuMjcgMjk5LjkxIDc1LjI4IDI5OS45MSA3Ni41NCBjCmYKMjk5LjkxIDYyLjM2IG0gMjk5LjkxIDYzLjYxIDI5OC44OSA2NC42MyAyOTcuNjQgNjQuNjMgYwoyOTYuMzkgNjQuNjMgMjk1LjM3IDYzLjYxIDI5NS4zNyA2Mi4zNiBjCjI5NS4zNyA2MS4xMSAyOTYuMzkgNjAuMDkgMjk3LjY0IDYwLjA5IGMKMjk4Ljg5IDYwLjA5IDI5OS45MSA2MS4xMSAyOTkuOTEgNjIuMzYgYwpmCjI5OS45MSA0OC4xOSBtIDI5OS45MSA0OS40NCAyOTguODkgNTAuNDYgMjk3LjY0IDUwLjQ2IGMKMjk2LjM5IDUwLjQ2IDI5NS4zNyA0OS40NCAyOTUuMzcgNDguMTkgYwoyOTUuMzcgNDYuOTQgMjk2LjM5IDQ1LjkyIDI5Ny42NCA0NS45MiBjCjI5OC44OSA0NS45MiAyOTkuOTEgNDYuOTQgMjk5LjkxIDQ4LjE5IGMKZgoyOTkuOTEgMzQuMDIgbSAyOTkuOTEgMzUuMjcgMjk4Ljg5IDM2LjI4IDI5Ny42NCAzNi4yOCBjCjI5Ni4zOSAzNi4yOCAyOTUuMzcgMzUuMjcgMjk1LjM3IDM0LjAyIGMKMjk1LjM3IDMyLjc2IDI5Ni4zOSAzMS43NSAyOTcuNjQgMzEuNzUgYwoyOTguODkgMzEuNzUgMjk5LjkxIDMyLjc2IDI5OS45MSAzNC4wMiBjCmYKMjk5LjkxIDE5Ljg0IG0gMjk5LjkxIDIxLjEwIDI5OC44OSAyMi4xMSAyOTcuNjQgMjIuMTEgYwoyOTYuMzkgMjIuMTEgMjk1LjM3IDIxLjEwIDI5NS4zNyAxOS44NCBjCjI5NS4zNyAxOC41OSAyOTYuMzkgMTcuNTggMjk3LjY0IDE3LjU4IGMKMjk4Ljg5IDE3LjU4IDI5OS45MSAxOC41OSAyOTkuOTEgMTkuODQgYwpmCjI5OS45MSA1LjY3IG0gMjk5LjkxIDYuOTIgMjk4Ljg5IDcuOTQgMjk3LjY0IDcuOTQgYwoyOTYuMzkgNy45NCAyOTUuMzcgNi45MiAyOTUuMzcgNS42NyBjCjI5NS4zNyA0LjQyIDI5Ni4zOSAzLjQwIDI5Ny42NCAzLjQwIGMKMjk4Ljg5IDMuNDAgMjk5LjkxIDQuNDIgMjk5LjkxIDUuNjcgYwpmCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgNSAwIFIgNyAwIFIgOSAwIFIgXQovQ291bnQgNAo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE0IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQg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AXEBdAF1AXsBhAGKAaABoQGmAacBsAJfArcCYAKfAngCUwJ7Ao0CfQKPArgCsALeArEBuwJvAqACZAKyAuICtAKdAkYCRwLZAqgCrwJWAtwCRQG8AnACSwJKAkwCVQATAAIACgAaABEAGAAbACIAPAAvADIAOQBbAFQAVgBYACgAdwCGAHkAewCUAIIClQCSALgAsQC0ALYAzgCZAYIA7ADbAOMA8wDqAPEA9AD7ARMBBgEJARABMwEsAS4BMAD/AVEBYAFTAVUBbgFcApYBbAGSAYsBjgGQAagBcwGqABYA7wADANwAFwDwACAA+QAjAPwAJAD9ACEA+gApAQAAKgEBAD8BFgAwAQcAOgERAEABFwAxAQgASgEiAEgBIABMASQASwEjAFEBKQBPAScAYAE5AF4BNwBVAS0AXwE4AFkBKwBTATYAYgE8AGUBPwFAAGgBQgBqAUQAaQFDAGsBRQBtAUcAcgFLAHQBTgBzAU0BTAB1AU8AkAFqAHoBVACOAWgAlgFwAJwBdgCeAXgAnQF3AKIBfAClAX8ApAF+AKMBfQCtAYcArAGGAKsBhQDFAZ8AwgGcALIBjADEAZ4AwAGaAMMBnQDJAaMAzwGpANAA1wGxANkBswDYAbIBgwCIAWIAugGUACcALQEEAGcAbAFGAHEAdgFQAAkA4gCzAY0ATQElAEkBIQBkAT4AkQFrAEMBGwAmACwBAwBHAR8AGQDyABwA9QCTAW0AEADpABUA7gA4AQ8APgEVAFcBLwBdATUAgQFbAI8BaQCfAXkAoAF6ALUBjwDBAZsApgGAAK4BiABQASgAgwFdAJUBbwCEAV4A1AGuAt0C2wLaAt8C5ALjAuUC4QLCAsMCxgLKAssCyALBAsACzALJAsQCxwHFAcYB7QHBAeUB5AHnAegB6QHiAeMB6gHNAcsB1wHeAb0BvgG/AcABwwHEAccByAHJAcoBzAHYAdkB2wHaAdwB3QHgAeEB3wHmAesB7AH6AfsB/AH9AgACAQIEAgUCBgIHAgkCFQIWAhgCFwIZAhoCHQIeAhwCIwIoAikCAgIDAioB/gIiAiECJAIlAiYCHwIgAicCCgIIAhQCGwHuAisB7wIsAcIB/wHwAi0B8QIuAfICLwHzAjAB9AIxAfUCMgH2AjMB9wI0AfgCNQH5AjYAHgD3ACsBAgBFAR0AbwFJAJgBcgCn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YQgBAAA0AE4BAC4sKCYiIBwYFBMODAYFADsBOwkJFitXIiYmNTUzFBQVHgIzMjY2NTQmJyIiIzUyMjMyNjU0JiMiBgcUFBUjNTQ2NjMyFhYVFAYHHgIVFAYG7j1LIjIBGDUqJjwjOkgBFQEBFQFHOzVEQUIBMiJQQz5OJUIxGjUkJlILMFU6DwENAi9CIh9QSFFnAS9TWkRYQ1ABCQINOVUvNVo4XGAKBixWRkJnOgAAAAAAAAAAUgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAQgAAAEIAAABCAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACVgAAAlYAAAJWAAACVgAAAogAAAKIAAACiAAAAogAAAKIAAACiAAAAogAAAKIAAACiAAAAogAAAKIAAACiAAAAogAAAKIAAACiAAAAogAAAKIAAACiAAAAogAAAKIAAACxAAAAsQAAALEAAACxAAAAsQAAALEAAACxAAAAsQAAALEAAACxAAAAsQAAALEAAACxAAAAsQAAALEAAACxAAAAsQAAALEAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA2AAAANgAAADYAAAA9YAAAPWAAAD1gAAA9YAAARcAAAEXAAABFwAAARcAAAEXAAABFwAAARcAAAEXAAABFwAAARcAAAEXAAABFwAAARcAAAEXAAABFwAAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABJ4AAASeAAAEngAABToAAAU6AAAFzAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAAABrgAAAa4AAAGuAJuADwB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAHUACAB1AAgAdQAIAJ1//ECdf/xAegASwHoAEsB6QA6AekAOgHpADoB6QA6AekAOgHpADoCBQBLA5YASwOWAEsCMQAJAgUASwIGAAoCBQBLA0oASwNKAEsBiQBKAYkASgGJAEoBiQBKAYkASgGJAEoBiQBKAYkASgGJAEoBiQBKAYkAPgGJAEoBiQBKAYkASgGJAEoBiQBKAYkASgGJAEoBiQBKAYkASgHdADwB3QA8AX8ASwF/AEsB/gA6Af4AOgH+ADoB/gA6Af4AOgH+ADoB/gA6Af4AOgIeAEoCHgAlAh4ASgIeAEoAzgBMAdcATADOAEwAzv/1AM7/8ADO/8wAzv/8AM4ASQDOAEkAzgAHAM4AJgDO//UAzgARAM4ACQDO//EBCQAIAQkACAHMAEoBzABKAcwASgF1AEsCfgBLAXUASwF1AEsBdQBLAXUASwI/AEsBdQADAngAQQJ4AEECAwBLAwwASwIDAEsCAwBLAgMASwIaAEsCzQBLAgMASwIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgQAOgIEADoCBAA6AgsAOgILADoCBAA6AgQAOgJsADoB5QBLAeUASwH5AEsCCwA6AfwASwH8AEsB/ABLAfwASwH8AEsB/ABLAcQAKgHEACoBxAAqAcQAKgHEACoBxAAqAcQAKgHyAD4CAAA2AZ4AFAF8ABQBngAUAZ4AFAGeABQBngAUAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQIVAEECFQBBAhUAQQHgABgCwgAiAsIAIgLCACICwgAiAsIAIgHEAA8BzgAUAc4AFAHOABQBzgAUAc4AFAHOABQBzgAUAc4AFAHOABQBkQAfAZEAHwGRAB8BkQAfAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYBewAmAXsAJgF7ACYCXAAmAlwAJgGNADkBjQA2AXcALgF3AC4BdwAuAXcALgF3AC4BdwAuAYsALgGuADcBvgAuAZoALgGLAC4C0AAuAtAALgF7AC4BewAuAXsALgF7AC4BewAuAXsALgF7AC4BewAuAXsALgF7AC4BewAjAXsALgF7AC4BewAuAXsALgF7AC4BewAuAXsALgF7AC4BewAuAXsAKwGQAA8BkAAPAQAAEQEAABEBrQAPAa0ADwGtAA8BrQAPAa0ADwGtAA8BrQAPAa3/7QGIADkBh//3AYgAOQGI/9wAvQBBALYAQQC2AEEAtv/qALb/5QC2/8EAtv/xALYAPgC9AEEAtv/8ALYAGwC2/+oBhwBBALYABgC9//4Atv/mAMr/8ADK//AAyv/wAX8AOQF/ADkBfwA5AZsAQAC6AEMAugBDAOUAQwC6ADoA2wBDAYQAQwD3ACMCbwA5Am8AOQGHADkBhwA5AbwAEAGHADkBhwA5AYQANgJRADkBhwA5AX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8AJQF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAX8ALgF/AC4BfwAuAnMAMgGQADkBkAA5AY4AOgGMADABGwBAARsAQAEbADkBGwA3ARsABwEbADABZAAiAWQAIgFkACIBZAAiAWQAIgFkACIBZAAiAeQAQAD9ABEBBwAQAPQAEADvABABBwAQAQcAEAEHABABiwA0AYsANAGLADQBiwA0AYsANAGLACsBiwA0AYsANAGLADQBiwA0AYsANAGLADQBiwA0AYsANAGLADQBiwA0AYsANAGLADQBiwA0AYsANAGLADQBiwA0AWUAEwI2ACECNgAhAjYAIQI2ACECNgAhAXcAFAF3ABgBdwAYAXcAGAF3ABgBdwAYAXcAGAF3ABgBdwAYAXcAGAFFACABRQAgAUUAIAFFACAB3gARAqoAEQN0ABECmwARAncAEQGtABEBvAARAYgARwGIAEAB1AAgAdYASgHoAEsBcQBLAXEASwF1AEoCNAAJAYkASgGJAEoBiQBKAmYAFQHMAD4CCABKAggASgIIAEoB1QBKAdUASgItABkCeABBAh4ASgIEADoCIQBLAeUASwHpADoBngAUAcQAIQHEACECUQA6AcQADwH5ADQCKwBKAr4ASwLIAEoB/wBLAc0ASwIeAAYCnQBKAyoAFQLtAEsBxAAqAeIAOgHyADoAzgBMAM7//AEJAAgCK//5ApwASwIPABcB5P/mAe7/+QJSABUBmQAUAmYAFQHkAEoCHgBKAc4AFAHOABQB+QBLAh4ASgIAADYCCwA6AXsAJgG3AD0BdwA5ARcAOQEXADkBIQA/AccADgF7AC4BewAuAXsALgH6AAQBZgAnAZcAOQGXADkBlwA5AXQAOQF0ADkBugAHAdsANAGqADkBfwAuAZYAOQGQADkBdwAuAUgABAF3ABgBdwAYAhUALgF3ABQBeAApAZoAOQInADkCOgA4AZMAOQF1ADkBuf//Ag8AOQJeAAQCQwA5AWQAIgF4AC4BggA1AL0AQQC2//EAyv/wAZb//AIBADkBgQATAZb//AGT//kBywAEAT8AAAIEAAQBewA5AbIAOQF2ABgBdwAYAYgAOQGyADkBewArAX8ALgIxAEoBrwAOAdQAIAHMAEoCBQBGAV4AMgHpADYB5QBEAe0AOAHdAEYB8ABGAZsAIwHzAEEB9QBBAOMAFAFYAB4BSgAeAUgAHgCG/2ACwf/iArEAFANjACgAsQBCALEANwC/AEsAzABDAgYAPwDFAEQAxQBEAdIAOwHSABgAwwBRAQkAOQFkAB0BxQAvAUkAFQFJABUAWQAUAQoAUgD/AB8A6AAlAO4AFwEXAEoBDgAxARsAJwFIADkByQA8AusAPAEbACcBRQAAAJkALgEIAC4BBwAhAQgALgCYACEAmQAuAZkAKQGfADQBZACFAUsAUwC4ABIASQASAVgAOgFYABIAvQAAAL0AAAC9AAAB6QA6AXsALgHpADoCAAAVAcMAKgGaAC4B4f/2AXL/9gF/AA0B/gA6AcwAFgFpABACBQAXAhUAQQIDABcEFABLAlgAHAHwABwB4AAWAWkAEALCABcBpAACAMMAUQHpAFABSQAVAWwAFgFZACIBTwAkAUsAHgGIADEBlgAxAWUAOQFlAB0BWQAmAWoAHgFCADEBiAAtAX4AKQFdACkBbQAaAV0AHgJaABUBCwAFAjEASgF+ACQBz//8AZgANAGmADQCfAAqA4sAMgGdACkDJQA7AloAOQHgABsBgAAkA14AHQNlACICsAAZAYUAPQBfAAoAxwAKAMwATQDEAEsBTQARAfQATgFrAB0DkQBLAnUAKADuABIBXwBaAAD/lAAA/+IAAP+gAAD/8wAA/8wAAP/6AAAAHwAAAC0AAP+OAAD/qgAA/4oAAP+qAAD/vwAA/2UAAP+OAAD/3QAA//YAAP/iAAD/lAAA/9wAAP/bAAD/ogAA/44AAP+qAAD/qgDOACoBZwBDARUAIwEjAFABQAAoAXQASgCnADMA0QAyATgANgFfAFoBJABQASAAOgFrAD4AAP/d/4n/7P+O/47/jv+K/4n/if+J/4kAAAAAAAEAAASp/t8AAATs/zv+7wTHAAEAAAAAAAAAAAAAAAAAAALnAAEAAALyAGAABwBqAAUAAgAqAFcAjQAAAIgOFQAEAAMAAgAAAAAAAP+cADIAAAAAAAAAAAAAAAAAAAAAAAAAAALyAAAAJADJAQIBAwEEAQUBBgEHAQgAxwEJAQoBCwEMAQ0BDgBiAQ8ArQEQAREBEgETAGMBFACuAJABFQAlARYAJgD9AP8AZAEXARgAJwEZARoA6QEbARwBHQEeAR8AKABlASABIQDIASIBIwEkASUBJgEnAMoBKAEpAMsBKgErASwBLQEuAS8BMAApATEAKgEyAPgBMwE0ATUBNgE3ACsBOAE5AToALAE7AMwBPADNAT0AzgD6AT4AzwE/AUABQQFCAUMALQFEAC4BRQFGAC8BRwFIAUkBSgFLAUwA4gAwAU0AMQFOAU8BUAFRAVIBUwBmADIA0AFUANEBVQFWAVcBWAFZAVoAZwFbAVwBXQDTAV4BXwFgAWEBYgFjAWQBZQFmAWcBaACRAWkArwFqALAAMwFrAO0ANAA1AWwBbQFuAW8BcAA2AXEA5AD7AXIBcwF0AXUBdgA3AXcBeAF5AXoBewA4ANQBfAF9ANUBfgBoAX8A1gGAAYEBggGDAYQBhQGGAYcBiAGJAYoBiwGMADkAOgGNAY4BjwGQADsAPADrAZEAuwGSAZMBlAGVAZYAPQGXAOYBmABEAGkBmQGaAZsBnAGdAZ4BnwBrAaABoQGiAaMBpAGlAGwBpgBqAacBqAGpAaoAbgGrAG0AoAGsAEUBrQBGAP4BAABvAa4BrwBHAOoBsAEBAbEBsgGzAEgAcAG0AbUAcgG2AbcBuAG5AboBuwBzAbwBvQBxAb4BvwHAAcEBwgHDAcQBxQBJAcYASgHHAPkByAHJAcoBywHMAEsBzQHOAc8ATADXAHQB0AB2AdEAdwHSAdMAdQHUAdUB1gHXAdgB2QBNAdoB2wBOAdwB3QHeAE8B3wHgAeEB4gHjAOMAUAHkAFEB5QHmAecB6AHpAeoAeABSAHkB6wB7AewB7QHuAe8B8AHxAHwB8gHzAfQAegH1AfYB9wH4AfkB+gH7AfwB/QH+Af8AoQIAAH0CAQCxAFMCAgDuAFQAVQIDAgQCBQIGAgcAVgIIAOUA/AIJAgoCCwCJAgwAVwINAg4CDwIQAhEAWAB+AhICEwCAAhQAgQIVAH8CFgIXAhgCGQIaAhsCHAIdAh4CHwIgAiECIgBZAFoCIwIkAiUCJgBbAFwA7AInALoCKAIpAioCKwIsAF0CLQDnAi4CLwIwAjECMgIzAMAAwQCdAJ4CNAI1AjYCNwI4AjkCOgI7AjwCPQI+Aj8CQAJBAkICQwJEAkUCRgJHAkgCSQJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXgJfAmACYQJiAmMCZAJlAmYCZwJoAmkCagJrAmwCbQJuAm8CcAJxAnICcwJ0AnUCdgJ3AngCeQJ6AnsCfAJ9An4CfwKAAoECggKDAoQChQKGAocCiAKJAooCiwKMAo0CjgKPApACkQKSApMClAKVApYClwKYApkCmgKbApwCnQKeAp8CoAKhAqICowKkAqUCpgKnAqgCqQKqAqsCrAKtAq4AmwKvArAAEwAUABUAFgAXABgAGQAaABsAHAKxArICswK0ALwA9AD1APYAEQAPAB0AHgCrAAQAowAiAKIAwwCHAA0ABgASAD8CtQALAAwAXgBgAD4AQAAQArYAsgCzArcAQgDEAMUAtAC1ALYAtwCpAKoAvgC/AAUACgK4ArkAAwK6ArsCvACEAr0AvQAHAr4CvwCmAPcCwALBAsICwwLEAsUCxgLHAsgCyQCFAsoAlgLLAswCzQAOAO8A8AC4ACAAjwAhAB8AlQCUAJMApwBhAKQAQQLOAJIAnACaAJkApQLPAJgACADGALkAIwAJAIgAhgCLAIoAjACDAtAC0QBfAOgAggLSAMIC0wLUAtUC1gLXAtgC2QLaAtsC3ALdAt4C3wLgAuEC4gLjAuQC5QLmAucC6ALpAuoC6wLsAu0C7gLvAI0A2wDhAN4A2ACOANwAQwDfANoA4ADdANkC8ALxAvIC8wL0AvUC9gL3AvgC+QL6AvsGQWJyZXZlB3VuaTFFQUUHdW5pMUVCNgd1bmkxRUIwB3VuaTFFQjIHdW5pMUVCNAd1bmkwMUNEB3VuaTFFQTQHdW5pMUVBQwd1bmkxRUE2B3VuaTFFQTgHdW5pMUVBQQd1bmkwMjAwB3VuaTFFQTAHdW5pMUVBMgd1bmkwMjAyB0FtYWNyb24HQW9nb25lawpBcmluZ2FjdXRlB0FFYWN1dGUHdW5pMUUwMgtDY2lyY3VtZmxleApDZG90YWNjZW50B3VuaTAxRjEHdW5pMDFDNAZEY2Fyb24GRGNyb2F0B3VuaTFFMEEHdW5pMDFGMgd1bmkwMUM1BkVicmV2ZQZFY2Fyb24HdW5pMUVCRQd1bmkxRUM2B3VuaTFFQzAHdW5pMUVDMgd1bmkxRUM0B3VuaTAyMDQKRWRvdGFjY2VudAd1bmkxRUI4B3VuaTFFQkEHdW5pMDIwNgdFbWFjcm9uB0VvZ29uZWsHdW5pMUVCQwd1bmkwMUI3B3VuaTAxRUUHdW5pMUUxRQd1bmkwMUY0BkdjYXJvbgtHY2lyY3VtZmxleAd1bmkwMTIyCkdkb3RhY2NlbnQHdW5pMDFFNARIYmFyB3VuaTAyMUULSGNpcmN1bWZsZXgCSUoGSWJyZXZlB3VuaTAyMDgHdW5pMUVDQQd1bmkxRUM4B3VuaTAyMEEHSW1hY3JvbgdJb2dvbmVrBkl0aWxkZQtKY2lyY3VtZmxleAd1bmkwMUU4B3VuaTAxMzYHdW5pMDFDNwZMYWN1dGUGTGNhcm9uB3VuaTAxM0IETGRvdAd1bmkwMUM4B3VuaTFFNDAHdW5pMDFDQQZOYWN1dGUGTmNhcm9uB3VuaTAxNDUDRW5nB3VuaTAxQ0IGT2JyZXZlB3VuaTFFRDAHdW5pMUVEOAd1bmkxRUQyB3VuaTFFRDQHdW5pMUVENgd1bmkwMjBDB3VuaTAyMkEHdW5pMDIzMAd1bmkxRUNDB3VuaTFFQ0UFT2hvcm4HdW5pMUVEQQd1bmkxRUUyB3VuaTFFREMHdW5pMUVERQd1bmkxRUUwDU9odW5nYXJ1bWxhdXQHdW5pMDIwRQdPbWFjcm9uB3VuaTAxRUELT3NsYXNoYWN1dGUHdW5pMDIyQwd1bmkxRTU2BlJhY3V0ZQZSY2Fyb24HdW5pMDE1Ngd1bmkwMjEwB3VuaTAyMTIGU2FjdXRlC1NjaXJjdW1mbGV4B3VuaTAyMTgHdW5pMUU2MAd1bmkxRTlFB3VuaTAxOEYEVGJhcgZUY2Fyb24HdW5pMDE2Mgd1bmkwMjFBB3VuaTFFNkEGVWJyZXZlB3VuaTAxRDMHdW5pMDIxNAd1bmkxRUU0B3VuaTFFRTYFVWhvcm4HdW5pMUVFOAd1bmkxRUYwB3VuaTFFRUEHdW5pMUVFQwd1bmkxRUVFDVVodW5nYXJ1bWxhdXQHdW5pMDIxNgdVbWFjcm9uB1VvZ29uZWsFVXJpbmcGVXRpbGRlBldhY3V0ZQtXY2lyY3VtZmxleAlXZGllcmVzaXMGV2dyYXZlC1ljaXJjdW1mbGV4B3VuaTFFRjQGWWdyYXZlB3VuaTFFRjYHdW5pMDIzMgd1bmkxRUY4BlphY3V0ZQpaZG90YWNjZW50BmFicmV2ZQd1bmkxRUFGB3VuaTFFQjcHdW5pMUVCMQd1bmkxRUIzB3VuaTFFQjUHdW5pMDFDRQd1bmkxRUE1B3VuaTFFQUQHdW5pMUVBNwd1bmkxRUE5B3VuaTFFQUIHdW5pMDIwMQd1bmkxRUExB3VuaTFFQTMHdW5pMDIwMwdhbWFjcm9uB2FvZ29uZWsKYXJpbmdhY3V0ZQdhZWFjdXRlB3VuaTFFMDMLY2NpcmN1bWZsZXgKY2RvdGFjY2VudAZkY2Fyb24HdW5pMUUwQgd1bmkwMUYzB3VuaTAxQzYGZWJyZXZlBmVjYXJvbgd1bmkxRUJGB3VuaTFFQzcHdW5pMUVDMQd1bmkxRUMzB3VuaTFFQzUHdW5pMDIwNQplZG90YWNjZW50B3VuaTFFQjkHdW5pMUVCQgd1bmkwMjA3B2VtYWNyb24HZW9nb25lawd1bmkxRUJEB3VuaTAyNTkHdW5pMDI5Mgd1bmkwMUVGB3VuaTFFMUYHdW5pMDFGNQZnY2Fyb24LZ2NpcmN1bWZsZXgHdW5pMDEyMwpnZG90YWNjZW50B3VuaTAxRTUEaGJhcgd1bmkwMjFGC2hjaXJjdW1mbGV4BmlicmV2ZQd1bmkwMjA5CWkubG9jbFRSSwd1bmkxRUNCB3VuaTFFQzkHdW5pMDIwQgJpagdpbWFjcm9uB2lvZ29uZWsGaXRpbGRlB3VuaTAyMzcLamNpcmN1bWZsZXgHdW5pMDFFOQd1bmkwMTM3DGtncmVlbmxhbmRpYwZsYWN1dGUGbGNhcm9uB3VuaTAxM0MEbGRvdAd1bmkwMUM5B3VuaTFFNDEGbmFjdXRlC25hcG9zdHJvcGhlBm5jYXJvbgd1bmkwMTQ2A2VuZwd1bmkwMUNDBm9icmV2ZQd1bmkxRUQxB3VuaTFFRDkHdW5pMUVEMwd1bmkxRUQ1B3VuaTFFRDcHdW5pMDIwRAd1bmkwMjJCB3VuaTAyMzEHdW5pMUVDRAd1bmkxRUNGBW9ob3JuB3VuaTFFREIHdW5pMUVFMwd1bmkxRUREB3VuaTFFREYHdW5pMUVFMQ1vaHVuZ2FydW1sYXV0B3VuaTAyMEYHb21hY3Jvbgd1bmkwMUVCC29zbGFzaGFjdXRlB3VuaTAyMkQHdW5pMUU1NwZyYWN1dGUGcmNhcm9uB3VuaTAxNTcHdW5pMDIxMQd1bmkwMjEzBnNhY3V0ZQtzY2lyY3VtZmxleAd1bmkwMjE5B3VuaTFFNjEFbG9uZ3MEdGJhcgZ0Y2Fyb24HdW5pMDE2Mwd1bmkwMjFCB3VuaTFFNkIGdWJyZXZlB3VuaTAxRDQHdW5pMDIxNQd1bmkxRUU1B3VuaTFFRTcFdWhvcm4HdW5pMUVFOQd1bmkxRUYxB3VuaTFFRUIHdW5pMUVFRAd1bmkxRUVGDXVodW5nYXJ1bWxhdXQHdW5pMDIxNwd1bWFjcm9uB3VvZ29uZWsFdXJpbmcGdXRpbGRlBndhY3V0ZQt3Y2lyY3VtZmxleAl3ZGllcmVzaXMGd2dyYXZlC3ljaXJjdW1mbGV4B3VuaTFFRjUGeWdyYXZlB3VuaTFFRjcHdW5pMDIzMwd1bmkxRUY5BnphY3V0ZQp6ZG90YWNjZW50A2ZfZgVmX2ZfaQZmX2ZfaWoFZl9mX2wEZl9pagd1bmkwNDEwB3VuaTA0MTEHdW5pMDQxMgd1bmkwNDEzB3VuaTA0MDMHdW5pMDQ5MAd1bmkwNDE0B3VuaTA0MTUHdW5pMDQwMAd1bmkwNDAxB3VuaTA0MTYHdW5pMDQxNwd1bmkwNDE4B3VuaTA0MTkHdW5pMDQwRAd1bmkwNDFBB3VuaTA0MEMHdW5pMDQxQgd1bmkwNDFDB3VuaTA0MUQHdW5pMDQxRQd1bmkwNDFGB3VuaTA0MjAHdW5pMDQyMQd1bmkwNDIyB3VuaTA0MjMHdW5pMDQwRQd1bmkwNDI0B3VuaTA0MjUHdW5pMDQyNwd1bmkwNDI2B3VuaTA0MjgHdW5pMDQyOQd1bmkwNDBGB3VuaTA0MkMHdW5pMDQyQQd1bmkwNDJCB3VuaTA0MDkHdW5pMDQwQQd1bmkwNDA1B3VuaTA0MDQHdW5pMDQyRAd1bmkwNDA2B3VuaTA0MDcHdW5pMDQwOAd1bmkwNDBCB3VuaTA0MkUHdW5pMDQyRgd1bmkwNDAyB3VuaTA0NjIHdW5pMDQ2QQd1bmkwNDkyB3VuaTA0OTYHdW5pMDQ5QQd1bmkwNEEyCVVzdHJhaXRjeQ9Vc3RyYWl0c3Ryb2tlY3kHdW5pMDRCQQd1bmkwNEM5B3VuaTA0RDgHdW5pMDRFOAd1bmkwNDMwB3VuaTA0MzEHdW5pMDQzMgd1bmkwNDMzB3VuaTA0NTMHdW5pMDQ5MQd1bmkwNDM0B3VuaTA0MzUHdW5pMDQ1MAd1bmkwNDUxB3VuaTA0MzYHdW5pMDQzNwd1bmkwNDM4B3VuaTA0MzkHdW5pMDQ1RAd1bmkwNDNBB3VuaTA0NUMHdW5pMDQzQgd1bmkwNDNDB3VuaTA0M0QHdW5pMDQzRQd1bmkwNDNGB3VuaTA0NDAHdW5pMDQ0MQd1bmkwNDQyB3VuaTA0NDMHdW5pMDQ1RQd1bmkwNDQ0B3VuaTA0NDUHdW5pMDQ0Nwd1bmkwNDQ2B3VuaTA0NDgHdW5pMDQ0OQd1bmkwNDVGB3VuaTA0NEMHdW5pMDQ0QQd1bmkwNDRCB3VuaTA0NTkHdW5pMDQ1QQd1bmkwNDU1B3VuaTA0NTQHdW5pMDQ0RAd1bmkwNDU2B3VuaTA0NTcHdW5pMDQ1OAd1bmkwNDVCB3VuaTA0NEUHdW5pMDQ0Rgd1bmkwNDUyB3VuaTA0NjMHdW5pMDQ2Qgd1bmkwNDkzB3VuaTA0OTcHdW5pMDQ5Qgd1bmkwNEEzCXVzdHJhaXRjeQ91c3RyYWl0c3Ryb2tlY3kHdW5pMDRCQgd1bmkwNENBB3VuaTA0RDkHdW5pMDRFOQJQaQd1bmkyMTJCB3VuaTIxMkEHdW5pMDBCOQd1bmkwMEIyB3VuaTAwQjMHdW5pMjA3NBZwZXJpb2RjZW50ZXJlZC5sb2NsQ0FUB3VuaTAwQUQHdW5pMjAxMAd1bmkyN0U4B3VuaTI3RTkHdW5pMDBBMAJDUgd1bmkyMEI1DWNvbG9ubW9uZXRhcnkEZG9uZwRFdXJvB3VuaTIwQjIHdW5pMjBBRARsaXJhB3VuaTIwQkEHdW5pMjBCQwd1bmkyMEE2BnBlc2V0YQd1bmkyMEIxB3VuaTIwQkQHdW5pMjBCOQd1bmkyMEE5B3VuaTIyMTkHdW5pMjA1Mgd1bmkyMjE1CGVtcHR5c2V0B3VuaTAwQjUGbWludXRlBnNlY29uZAd1bmkyMTEzB3VuaTIxMTYJZXN0aW1hdGVkB3VuaTAyQkMHdW5pMDJDOQd1bmkwMzA4B3VuaTAzMDcJZ3JhdmVjb21iCWFjdXRlY29tYgd1bmkwMzBCC3VuaTAzMEMuYWx0B3VuaTAzMDIHdW5pMDMwQwd1bmkwMzA2B3VuaTAzMEEJdGlsZGVjb21i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Y2VyYW5nZQoxNCBiZWdpbmJmY2hhcgo8MDAwMT48MDA0MT4KPDAwMmU+PDAwNDU+CjwwMDQ2PjwwMDQ3Pgo8MDA0ZT48MDA0OD4KPDAwNTI+PDAwNDk+CjwwMDY2PjwwMDRjPgo8MDA3OD48MDA0Zj4KPDAwOTc+PDAwNTA+CjwwMDliPjwwMDUyPgo8MDBhYT48MDA1ND4KPDAyM2I+PDAwMzA+CjwwMjNkPjwwMDMyPgo8MDIzZT48MDAzMz4KPDAyNzc+PDAwMjA+CmVuZGJmY2hhcgplbmRjbWFwCkNNYXBOYW1lIGN1cnJlbnRkaWN0IC9DTWFwIGRlZmluZXJlc291cmNlIHBvcAplbmQKZW5kCmVuZHN0cmVhbQplbmRvYmoKMjcgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvT3N3YWxkLUV4dHJhTGlnaHQKL0ZvbnRGaWxlMiAyNSAwIFIKL0ZvbnRCQm94IFstMTk3IC0yODcgMTIyMyAxMjk3XQovRmxhZ3MgMzIKL1N0ZW1WIDAKL0l0YWxpY0FuZ2xlIDAKL0FzY2VudCAxMTkzCi9EZXNjZW50IC0yODkKL0NhcEhlaWdodCA4MTAKPj4KZW5kb2JqCjI4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvT3N3YWxkLUV4dHJhTGlnaHQKL0ZvbnREZXNjcmlwdG9yIDI3IDAgUgovVyBbMTcwIFs0MTRdIDEyMCBbNTE2XSA3MCBbNTEwXSAxIFs0NjhdIDc4IFs1NDJdIDQ2IFszOTNdIDE1NSBbNTA4XSA1NzQgWzQ4NV0gNTcxIFs1MTddIDYzMSBbMTg5XSAxNTEgWzQ4NV0gODIgWzIwNl0gMTAyIFszNzNdIDU3MyBbNDg5XV0KL0NJRFRvR0lETWFwIC9JZGVudGl0eQovRFcgMTAwMAovU3VidHlwZSAvQ0lERm9udFR5cGUyCi9DSURTeXN0ZW1JbmZvCjw8Ci9TdXBwbGVtZW50IDAKL1JlZ2lzdHJ5IChBZG9iZSkKL09yZGVyaW5nIChJZGVudGl0eS1IKQo+Pgo+PgplbmRvYmoKMjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUwCi9Ub1VuaWNvZGUg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zwGpANAA1wGxANkBswDYAbIBgwCIAWIAugGUACcALQEEAGcAbAFGAHEAdgFQAAkA4gCzAY0ATQElAEkBIQBkAT4AkQFrAEMBGwAmACwBAwBHAR8AGQDyABwA9QCTAW0AEADpABUA7gA4AQ8APgEVAFcBLwBdATUAgQFbAI8BaQCfAXkAoAF6ALUBjwDBAZsApgGAAK4BiABQASgAgwFdAJUBbwCEAV4A1AGuAt0C2wLaAt8C5ALjAuUC4QLCAsMCxgLKAssCyALBAsACzALJAsQCxwHFAcYB7QHBAeUB5AHnAegB6QHiAeMB6gHNAcsB1wHeAb0BvgG/AcABwwHEAccByAHJAcoBzAHYAdkB2wHaAdwB3QHgAeEB3wHmAesB7AH6AfsB/AH9AgACAQIEAgUCBgIHAgkCFQIWAhgCFwIZAhoCHQIeAhwCIwIoAikCAgIDAioB/gIiAiECJAIlAiYCHwIgAicCCgIIAhQCGwHuAisB7wIsAcIB/wHwAi0B8QIuAfICLwHzAjAB9AIxAfUCMgH2AjMB9wI0AfgCNQH5AjYAHgD3ACsBAgBFAR0AbwFJAJgBcgCnAYEArwGJAMsBpQDIAaIAygGkABIA6wAUAO0ACwDkAA0A5gAOAOcADwDoAAwA5QAEAN0ABgDfAAcA4AAIAOEABQDeADsBEgA9ARQAQQEYADMBCgA1AQwANgENADcBDgA0AQsAXAE0AFoBMgCFAV8AhwFhAHwBVgB+AVgAfwFZAIABWgB9AVcAiQFjAIsBZQCMAWYAjQFnAIoBZAC3AZEAuQGTALsBlQC9AZcAvgGYAL8BmQC8AZYA0gGsANEBqwDTAa0A1QGvAm0CbgJpAmsCbAJqArkCuwJXAoIChQJ/AoAChAKKAoMCjAKGAocCiwI6AjkCpgKUApACpwKcApsAAAACAFoAAAJQAyoAAwAHACpAJwAAAAMCAANnAAIBAQJXAAICAV8EAQECAU8AAAcGBQQAAwADEQUGFytzESERJSERIVoB9v5xASj+2AMq/NZaAnYAAgATAAAB2QMqAAcACgAsQCkKAQQAAUwABAACAQQCaAAAAC1NBQMCAQEuAU4AAAkIAAcABxEREQYJGStzEzMTIycjBxMzAxOsba1rJaUnNodEAyr81szMAR0BbQACAD8AAAHfAyoACwAXACdAJAADAwBfAAAALU0AAgIBXwQBAQEuAU4AABcVDgwACwAKIQUJFytzETMyFhYVERQGBiMnMzI2NjURNCYmIyM/sFppLS1lVUhAPjQLEDY6PQMqN25S/tZWdj1RMFxBAQc/TiQAAAEAPwAAAXgDKgAJAClAJgACAAMEAgNnAAEBAF8AAAAtTQUBBAQuBE4AAAAJAAkRERERBgkaK3MRIRUjETMVIxE/ATnIm5sDKlH+8lD+hQAAAgAw//cB6wMxABEAIwAtQCoAAwMBYQABATNNBQECAgBhBAEAADQAThMSAQAcGhIjEyMKCAARAREGCRYrRSImJjURNDY2MzIWFhURFAYGJzI2NjURNCYmIyIGBhURFBYWAQ5SYiorYVJSYCsrYFItLhAQLi0tLxAQLwlAd1ABM1BzPT5yUP7MT3ZBWSVDLQFjLUEjI0Et/p0tQyUAAgA/AAAB3wMqAA8AGQAzQDAKAQIEAUwABAACAQQCZwAFBQBfAAAALU0GAwIBAS4BTgAAGRcSEAAPAA8RGCEHCRkrcxEzMhYWFRQGBgcTIwMjEREzMjY2NTQmIyM/o1FqMxQsJHNtalgrMDwcNE0yAyorX00vTTUM/moBfP6EAc0YOjRHPwABACf/9wHAAzEALQAxQC4cGwUEBAEDAUwAAwMCYQACAjNNAAEBAGEEAQAANABOAQAhHxcVCggALQEtBQkWK1ciJiYnNx4CMzI2NTQmJycmJjU0NjMyHgIXBy4CIyIGFRQWFxcWFhUUBgb+Rl0wBGQDFTArLC0yJogoJmZYMEkxHQVgAxItKiovGRyJLkYyVwk8akYbK1AzMS43QyJ4I1M9WWIZNE81GihDKS0sJTAZeChvTDxXLgAAAQAMAAAB1QMqAAgAI0AgBwQBAwIAAUwBAQAALU0DAQICLgJOAAAACAAIEhIECRgrcxEDMxMTMwMRu69pfHpqrgEeAgz+eQGH/fT+4gAAAQAeAAABFgMqAA4AIEAdBwECAQABTAAAAC1NAgEBAS4BTgAAAA4ADhwDCRcrcxEOAyM1PgM3MxGrASs2KgERLS8rD1ECngEKCghRBA4UHhT81gAAAAAAAAAAAABSAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAAArgAAAK4AAACuAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAASIAAAEiAAABIgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAFyAAABcgAAAXIAAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAAg4AAAIOAAACDgAAApQAAAKUAAAClAAAApQAAAKUAAAClAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADTAAAA0wAAANMAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA5oAAAOaAAADmgAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAAAD7gAAA+4AAAPuAqoAWgHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAewAEwHsABMB7AATAnv/zQJ7/80CDAA/AgwAPwIDADACAwAwAgMAMAIDADACAwAwAgMAMAIPAD8DsAA/A7AAPwIGAA4CDwA/AhEAEQIPAD8DagA/A2oAPwGXAD8BlwA/AZcAPwGXAD8BlwA/AZcAPwGXAD8BlwA/AZcAPwGXAD8BlwAbAZcAPwGXAD8BlwA/AZcAPwGXAD8BlwA/AZcAPwGXAD8BlwA/AcgAHgHIAB4BhwA/AYcAPwIXADACFwAwAhcAMAIXADACFwAwAhcAMAIXADACFwAwAjEAPwIxABACMQA/AjEAPwD4AEUCJQBFAPgARQD4//kA+P/vAPj/twD4//AA+ABFAPgARQD4//QA+AAsAPj/+AD4ABwA+P/0APj/5gEtAAcBLQAHAe8APwHvAD8B7wA/AY0APwK6AD8BjQA/AY0APwGNAD8BjQA/AnMAPwGN//oClAA9ApQAPQIQAD8DPQA/AhAAPwIQAD8CEAA/AhMAPwL2AD8CEAA/AhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACGwAwAhsAMAIbADACHAAwAhwAMAIbADACGwAwAqsAMAHgAD8B4AA/AfcAPwIdADACBwA/AgcAPwIHAD8CBwA/AgcAPwIHAD8B2QAnAdkAJwHZACcB2QAnAdkAJwHZACcB2QAnAhsAOAIXACwBnQAPAZAADwGQAA8BkAAPAZAADwGQAA8CHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4Ah8AOAIfADgCHwA4AfkAFwLZACQC2QAkAtkAJALZACQC2QAkAeIADQHhAAwB4QAMAeEADAHhAAwB4QAMAeEADAHhAAwB4QAMAeEADAGhACYBoQAmAaEAJgGhACYBqgAqAaoAKgGqACoBqgAqAaoAKgGqACoBqgAqAaoAKgGqACoBqgAqAaoAKgGqACoBqgAqAaoAKgGqACoBqgAWAaoAKgGqACoBqgAqAaoAKgGqACoBqgAqAaoAKgGqACoBqgAqAaoAKgKLACoCiwAqAb8AOAG/ADgBmwArAZsAKwGbACsBmwArAZsAKwGbACsBugArAdcANAIOACsBxgArAboAKwMVACsDFQArAaUAKwGlACsBpQArAaUAKwGlACsBpQArAaUAKwGlACsBpQArAaUAKwGlAA4BpQArAaUAKwGlACsBpQArAaUAKwGlACsBpQArAaUAKwGlACsBpQArAcoAHgHKAB4BHwATAR8AEwGzABQBswAUAbMAFAGzABQBswAUAbMAFAGzABQBs//xAb0AOQG9//oBvQA5Ab3/4gDlAD0A4AA9AOAAPQDg//AA4P/mAOD/rgDg/+cA4AA9AOUAPQDg/+sA4AAjAOD/7wHLAD0A4AATAOX/6gDg/90A5v/tAOb/7QDm/+0BrQA4Aa0AOAGtADgBrgA7AOUAQADlAEABNQBAAOUAPwEcAEABywBAAQsAEQKoADYCqAA2AbcANgG3ADYB9QAKAbcANgG3ADYBhAAsAp0ANgG3ADYBqQAsAakALAGpACwBqQAsAakALAGpACwBqQAsAakALAGpACwBqQAQAakALAGpACwBqQAsAakALAGpACwBqQAsAakALAGpACwBqQAsAakALAGpACwBqQAsAakALAGpACwBqQAsAakALAGoACwBqAAsAakALAGpACwCrQA5Ab4ANgG+ADYBvwA3AbsALAFBADkBQQA5AUEALAFBADgBQf/zAUEANAF2ABkBdgAZAXYAGQF2ABkBdgAZAXYAGQF2ABkCAwA7AR8AEwE0ABYA9AAWAUsAFgE0ABYBNAAWATQAFgG4ADIBuAAyAbgAMgG4ADIBuAAyAbgAFwG4ADIBuAAyAbgAMgG4ADIBuAAyAbgAMgG4ADIBuAAyAbgAMgG4ADIBuAAyAbgAMgG4ADIBuAAyAbgAMgG4ADIBgQAPAkwAHAJMABwCTAAcAkwAHAJMABwBhQAJAYgADAGIAAwBiAAMAYgADAGIAAwBiAAMAYgADAGIAAwBiAAMAVsAIAFbACABWwAgAVsAIAIkABMC4AATA8YAEwMIABMC0QATAesAEwIDABMBuwBNAbsAQwHsABMB7gA/AgwAPwGCAD8BggA/AXkAPwJzAAsBlwA/AZcAPwGXAD8CpAAEAeAAGQIhAD8CIQA/AiEAPwH8AD8B/AA/AkUAAgKUAD0CMQA/AhsAMAI8AD8B4AA/AgMAMAGdAA8BxAATAcQAEwKWADAB4gANAiYAMQJuAD8C7gA/AxYAPwIjAD8B7gA/AjcABQLYAD8DRAAOAw4APwHZACcB9wAwAgcAMQD4AEUA+P/wAS0ABwI4//8CzwA/AiEADQIjAAoCEv/+Ao8ABAGZAAACwQAEAg0APwI6AD8B4QAMAd0ADAImAD8COgA/AhcALAIcADABqgAqAbYANAGfADYBIgA2ASIANgEoADcB8AACAaUAKwGlACsBpQArAkMABAF3AB0ByQA2AckANgHJADYBnwA2AZ8ANgHlABECEQAzAcsANgGpACwBvAA2Ab4ANgGbACsBWgALAYgADAGIAAwCXgArAYUACQGxACUB5QA2AnEANgKYADYBvgA2AZ8ANgHg//wCbwA2ApMABQJ2ADYBdgAZAY0ALAGcACoA5QA9AOD/5wDm/+0Byf/2Aj0ANgGwAAoByf/2Aa3/9gISAAQBdAAAAlUABAG2ADYB5QA2AYQADAGJAAwBvQA5AeUANgGlACsBqAAsAi4APwIPABEB7AATAe8APwIFADoBjAAeAd4AKQHdACgB4wAoAdwALwH3ADoBggAWAfMAMgH2ACwBVABQAaYATAGqAE4BsgBOALf/YAOxADkDsQBcA2oAOwC8ADEAuwAoAMUAPADXADoCKQAmANAAMgDQADIB5wA2AecANwCwACQBawBEAY4ALQHmACABcQAdAXEAHQCuADABKgBJAQQAHQEsACgBQQAsAVQAPwE2ABoBQQAxAVgAOgHuAAgDxQAIAlgAMQFYAAAA0AA7AYAAOwGAAB8BgAA7ANAAHwDQADsBxwAfAeEAOQETACsBJAA8AQoAFAB/ABQBawArAWsAFwDlAAAA5QAAAOUAAAIDADABhAArAgMAMAImACYB6wAnAcYAKwHx//YBfP//AYcABAIXADACWP/3AY4AAgIPAAkCIAA4AhAACwRYAD8CWAAcAfUAHAH8ACABjgACAtkAJAHJAAoAsAAkAeYAPAFxAB0BnwAZAYUALQF/ADEBWgATAZ8ANgGhADYBdQA6AXUAHQGDADcBhQAhAXAAOQHAACQBvwAjAYMAKAG7ACIBvQAoAngAFQFEAA0CLgA/AZYAGgH///0BuQAyAd0AJwN7ACQE7AAlAdIAJAOIADsCXgA6AewAIAGrACoDXgAdA3gALgLfADcBxQA6AKwAHgFDAB4A7wBFANQAPwF4ACoB9ABFAX0AIwO+AEECdQAoAW4AFAEcAC4AAP90AAD/ygAA/3gAAP/kAAD/qgAA//8AAP9zAAD/dAAA/3wAAP+QAAD/agAA/6AAAP+wAAD/OwAA/3wAAP/JAAD/9gAA/8oAAP90AAD/yQAA/8oAAP93AAD/fAAA/6AAAP+gARUAOAFcACsBUQAeAWAAUAFXAB8BkAA8AKwAIAEWADkBkAA2ARwALgFhAFABIQAhAagAPgAA/8n/c//s/3z/fP98/2r/c/9z/3P/agAAAAAAAQAABKn+3wAABOz/O/7vBMcAAQAAAAAAAAAAAAAAAAAAAucAAQAAAvIAYAAHAGoABQACACoAVwCNAAAAiA4VAAQAAwACAAAAAAAA/5wAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAvIAAAAkAMkBAgEDAQQBBQEGAQcBCADHAQkBCgELAQwBDQEOAGIBDwCtARABEQESARMAYwEUAK4AkAEVACUBFgAmAP0A/wBkARcBGAAnARkBGgDpARsBHAEdAR4BHwAoAGUBIAEhAMgBIgEjASQBJQEmAScAygEoASkAywEqASsBLAEtAS4BLwEwACkBMQAqATIA+AEzATQBNQE2ATcAKwE4ATkBOgAsATsAzAE8AM0BPQDOAPoBPgDPAT8BQAFBAUIBQwAtAUQALgFFAUYALwFHAUgBSQFKAUsBTADiADABTQAxAU4BTwFQAVEBUgFTAGYAMgDQAVQA0QFVAVYBVwFYAVkBWgBnAVsBXAFdANMBXgFfAWABYQFiAWMBZAFlAWYBZwFoAJEBaQCvAWoAsAAzAWsA7QA0ADUBbAFtAW4BbwFwADYBcQDkAPsBcgFzAXQBdQF2ADcBdwF4AXkBegF7ADgA1AF8AX0A1QF+AGgBfwDWAYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwAOQA6AY0BjgGPAZAAOwA8AOsBkQC7AZIBkwGUAZUBlgA9AZcA5gGYAEQAaQGZAZoBmwGcAZ0BngGfAGsBoAGhAaIBowGkAaUAbAGmAGoBpwGoAakBqgBuAasAbQCgAawARQGtAEYA/gEAAG8BrgGvAEcA6gGwAQEBsQGyAbMASABwAbQBtQByAbYBtwG4AbkBugG7AHMBvAG9AHEBvgG/AcABwQHCAcMBxAHFAEkBxgBKAccA+QHIAckBygHLAcwASwHNAc4BzwBMANcAdAHQAHYB0QB3AdIB0wB1AdQB1QHWAdcB2AHZAE0B2gHbAE4B3AHdAd4ATwHfAeAB4QHiAeMA4wBQAeQAUQHlAeYB5wHoAekB6gB4AFIAeQHrAHsB7AHtAe4B7wHwAfEAfAHyAfMB9AB6AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wChAgAAfQIBALEAUwICAO4AVABVAgMCBAIFAgYCBwBWAggA5QD8AgkCCgILAIkCDABXAg0CDgIPAhACEQBYAH4CEgITAIACFACBAhUAfwIWAhcCGAIZAhoCGwIcAh0CHgIfAiACIQIiAFkAWgIjAiQCJQImAFsAXADsAicAugIoAikCKgIrAiwAXQItAOcCLgIvAjACMQIyAjMAwADBAJ0AngI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJJAkoCSwJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoMChAKFAoYChwKIAokCigKLAowCjQKOAo8CkAKRApICkwKUApUClgKXApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgCbAq8CsAATABQAFQAWABcAGAAZABoAGwAcArECsgKzArQAvAD0APUA9gARAA8AHQAeAKsABACjACIAogDDAIcADQAGABIAPwK1AAsADABeAGAAPgBAABACtgCyALMCtwBCAMQAxQC0ALUAtgC3AKkAqgC+AL8ABQAKArgCuQADAroCuwK8AIQCvQC9AAcCvgK/AKYA9wLAAsECwgLDAsQCxQLGAscCyALJAIUCygCWAssCzALNAA4A7wDwALgAIACPACEAHwCVAJQAkwCnAGEApABBAs4AkgCcAJoAmQClAs8AmAAIAMYAuQAjAAkAiACGAIsAigCMAIMC0ALRAF8A6ACCAtIAwgLTAtQC1QLWAtcC2ALZAtoC2wLcAt0C3gLfAuAC4QLiAuMC5ALlAuYC5wLoAukC6gLrAuwC7QLuAu8AjQDbAOEA3gDYAI4A3ABDAN8A2gDgAN0A2QLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wZBYnJldmUHdW5pMUVBRQd1bmkxRUI2B3VuaTFFQjAHdW5pMUVCMgd1bmkxRUI0B3VuaTAxQ0QHdW5pMUVBNAd1bmkxRUFDB3VuaTFFQTYHdW5pMUVBOAd1bmkxRUFBB3VuaTAyMDAHdW5pMUVBMAd1bmkxRUEyB3VuaTAyMDIHQW1hY3JvbgdBb2dvbmVrCkFyaW5nYWN1dGUHQUVhY3V0ZQd1bmkxRTAyC0NjaXJjdW1mbGV4CkNkb3RhY2NlbnQHdW5pMDFGMQd1bmkwMUM0BkRjYXJvbgZEY3JvYXQHdW5pMUUwQQd1bmkwMUYyB3VuaTAxQzUGRWJyZXZlBkVjYXJvbgd1bmkxRUJFB3VuaTFFQzYHdW5pMUVDMAd1bmkxRUMyB3VuaTFFQzQHdW5pMDIwNApFZG90YWNjZW50B3VuaTFFQjgHdW5pMUVCQQd1bmkwMjA2B0VtYWNyb24HRW9nb25lawd1bmkxRUJDB3VuaTAxQjcHdW5pMDFFRQd1bmkxRTFFB3VuaTAxRjQGR2Nhcm9uC0djaXJjdW1mbGV4B3VuaTAxMjIKR2RvdGFjY2VudAd1bmkwMUU0BEhiYXIHdW5pMDIxRQtIY2lyY3VtZmxleAJJSgZJYnJldmUHdW5pMDIwOAd1bmkxRUNBB3VuaTFFQzgHdW5pMDIwQQdJbWFjcm9uB0lvZ29uZWsGSXRpbGRlC0pjaXJjdW1mbGV4B3VuaTAxRTgHdW5pMDEzNgd1bmkwMUM3BkxhY3V0ZQZMY2Fyb24HdW5pMDEzQgRMZG90B3VuaTAxQzgHdW5pMUU0MAd1bmkwMUNBBk5hY3V0ZQZOY2Fyb24HdW5pMDE0NQNFbmcHdW5pMDFDQgZPYnJldmUHdW5pMUVEMAd1bmkxRUQ4B3VuaTFFRDIHdW5pMUVENAd1bmkxRUQ2B3VuaTAyMEMHdW5pMDIyQQd1bmkwMjMwB3VuaTFFQ0MHdW5pMUVDRQVPaG9ybgd1bmkxRURBB3VuaTFFRTIHdW5pMUVEQwd1bmkxRURFB3VuaTFFRTANT2h1bmdhcnVtbGF1dAd1bmkwMjBFB09tYWNyb24HdW5pMDFFQQtPc2xhc2hhY3V0ZQd1bmkwMjJDB3VuaTFFNTYGUmFjdXRlBlJjYXJvbgd1bmkwMTU2B3VuaTAyMTAHdW5pMDIxMgZTYWN1dGULU2NpcmN1bWZsZXgHdW5pMDIxOAd1bmkxRTYwB3VuaTFFOUUHdW5pMDE4RgRUYmFyBlRjYXJvbgd1bmkwMTYyB3VuaTAyMUEHdW5pMUU2QQZVYnJldmUHdW5pMDFEMwd1bmkwMjE0B3VuaTFFRTQHdW5pMUVFNgVVaG9ybgd1bmkxRUU4B3VuaTFFRjAHdW5pMUVFQQd1bmkxRUVDB3VuaTFFRUUNVWh1bmdhcnVtbGF1dAd1bmkwMjE2B1VtYWNyb24HVW9nb25lawVVcmluZwZVdGlsZGUGV2FjdXRlC1djaXJjdW1mbGV4CVdkaWVyZXNpcwZXZ3JhdmULWWNpcmN1bWZsZXgHdW5pMUVGNAZZZ3JhdmUHdW5pMUVGNgd1bmkwMjMyB3VuaTFFRjgGWmFjdXRlClpkb3RhY2NlbnQGYWJyZXZlB3VuaTFFQUYHdW5pMUVCNwd1bmkxRUIxB3VuaTFFQjMHdW5pMUVCNQd1bmkwMUNFB3VuaTFFQTUHdW5pMUVBRAd1bmkxRUE3B3VuaTFFQTkHdW5pMUVBQgd1bmkwMjAxB3VuaTFFQTEHdW5pMUVBMwd1bmkwMjAzB2FtYWNyb24HYW9nb25lawphcmluZ2FjdXRlB2FlYWN1dGUHdW5pMUUwMwtjY2lyY3VtZmxleApjZG90YWNjZW50BmRjYXJvbgd1bmkxRTBCB3VuaTAxRjMHdW5pMDFDNgZlYnJldmUGZWNhcm9uB3VuaTFFQkYHdW5pMUVDNwd1bmkxRUMxB3VuaTFFQzMHdW5pMUVDNQd1bmkwMjA1CmVkb3RhY2NlbnQHdW5pMUVCOQd1bmkxRUJCB3VuaTAyMDcHZW1hY3Jvbgdlb2dvbmVrB3VuaTFFQkQHdW5pMDI1OQd1bmkwMjkyB3VuaTAxRUYHdW5pMUUxRgd1bmkwMUY1BmdjYXJvbgtnY2lyY3VtZmxleAd1bmkwMTIzCmdkb3RhY2NlbnQHdW5pMDFFNQRoYmFyB3VuaTAyMUYLaGNpcmN1bWZsZXgGaWJyZXZlB3VuaTAyMDkJaS5sb2NsVFJLB3VuaTFFQ0IHdW5pMUVDOQd1bmkwMjBCAmlqB2ltYWNyb24HaW9nb25lawZpdGlsZGUHdW5pMDIzNwtqY2lyY3VtZmxleAd1bmkwMUU5B3VuaTAxMzcMa2dyZWVubGFuZGljBmxhY3V0ZQZsY2Fyb24HdW5pMDEzQwRsZG90B3VuaTAxQzkHdW5pMUU0MQZuYWN1dGULbmFwb3N0cm9waGUGbmNhcm9uB3VuaTAxNDYDZW5nB3VuaTAxQ0MGb2JyZXZlB3VuaTFFRDEHdW5pMUVEOQd1bmkxRUQzB3VuaTFFRDUHdW5pMUVENwd1bmkwMjBEB3VuaTAyMkIHdW5pMDIzMQd1bmkxRUNEB3VuaTFFQ0YFb2hvcm4HdW5pMUVEQgd1bmkxRUUzB3VuaTFFREQHdW5pMUVERgd1bmkxRUUxDW9odW5nYXJ1bWxhdXQHdW5pMDIwRgdvbWFjcm9uB3VuaTAxRUILb3NsYXNoYWN1dGUHdW5pMDIyRAd1bmkxRTU3BnJhY3V0ZQZyY2Fyb24HdW5pMDE1Nwd1bmkwMjExB3VuaTAyMTMGc2FjdXRlC3NjaXJjdW1mbGV4B3VuaTAyMTkHdW5pMUU2MQVsb25ncwR0YmFyBnRjYXJvbgd1bmkwMTYzB3VuaTAyMUIHdW5pMUU2QgZ1YnJldmUHdW5pMDFENAd1bmkwMjE1B3VuaTFFRTUHdW5pMUVFNwV1aG9ybgd1bmkxRUU5B3VuaTFFRjEHdW5pMUVFQgd1bmkxRUVEB3VuaTFFRUYNdWh1bmdhcnVtbGF1dAd1bmkwMjE3B3VtYWNyb24HdW9nb25lawV1cmluZwZ1dGlsZGUGd2FjdXRlC3djaXJjdW1mbGV4CXdkaWVyZXNpcwZ3Z3JhdmULeWNpcmN1bWZsZXgHdW5pMUVGNQZ5Z3JhdmUHdW5pMUVGNwd1bmkwMjMzB3VuaTFFRjkGemFjdXRlCnpkb3RhY2NlbnQDZl9mBWZfZl9pBmZfZl9pagVmX2ZfbARmX2lqB3VuaTA0MTAHdW5pMDQxMQd1bmkwNDEyB3VuaTA0MTMHdW5pMDQwMwd1bmkwNDkwB3VuaTA0MTQHdW5pMDQxNQd1bmkwNDAwB3VuaTA0MDEHdW5pMDQxNgd1bmkwNDE3B3VuaTA0MTgHdW5pMDQxOQd1bmkwNDBEB3VuaTA0MUEHdW5pMDQwQwd1bmkwNDFCB3VuaTA0MUMHdW5pMDQxRAd1bmkwNDFFB3VuaTA0MUYHdW5pMDQyMAd1bmkwNDIxB3VuaTA0MjIHdW5pMDQyMwd1bmkwNDBFB3VuaTA0MjQHdW5pMDQyNQd1bmkwNDI3B3VuaTA0MjYHdW5pMDQyOAd1bmkwNDI5B3VuaTA0MEYHdW5pMDQyQwd1bmkwNDJBB3VuaTA0MkIHdW5pMDQwOQd1bmkwNDBBB3VuaTA0MDUHdW5pMDQwNAd1bmkwNDJEB3VuaTA0MDYHdW5pMDQwNwd1bmkwNDA4B3VuaTA0MEIHdW5pMDQyRQd1bmkwNDJGB3VuaTA0MDIHdW5pMDQ2Mgd1bmkwNDZBB3VuaTA0OTIHdW5pMDQ5Ngd1bmkwNDlBB3VuaTA0QTIJVXN0cmFpdGN5D1VzdHJhaXRzdHJva2VjeQd1bmkwNEJBB3VuaTA0QzkHdW5pMDREOAd1bmkwNEU4B3VuaTA0MzAHdW5pMDQzMQd1bmkwNDMyB3VuaTA0MzMHdW5pMDQ1Mwd1bmkwNDkxB3VuaTA0MzQHdW5pMDQzNQd1bmkwNDUwB3VuaTA0NTEHdW5pMDQzNgd1bmkwNDM3B3VuaTA0MzgHdW5pMDQzOQd1bmkwNDVEB3VuaTA0M0EHdW5pMDQ1Qwd1bmkwNDNCB3VuaTA0M0MHdW5pMDQzRAd1bmkwNDNFB3VuaTA0M0YHdW5pMDQ0MAd1bmkwNDQxB3VuaTA0NDIHdW5pMDQ0Mwd1bmkwNDVFB3VuaTA0NDQHdW5pMDQ0NQd1bmkwNDQ3B3VuaTA0NDYHdW5pMDQ0OAd1bmkwNDQ5B3VuaTA0NUYHdW5pMDQ0Qwd1bmkwNDRBB3VuaTA0NEIHdW5pMDQ1OQd1bmkwNDVBB3VuaTA0NTUHdW5pMDQ1NAd1bmkwNDREB3VuaTA0NTYHdW5pMDQ1Nwd1bmkwNDU4B3VuaTA0NUIHdW5pMDQ0RQd1bmkwNDRGB3VuaTA0NTIHdW5pMDQ2Mwd1bmkwNDZCB3VuaTA0OTMHdW5pMDQ5Nwd1bmkwNDlCB3VuaTA0QTMJdXN0cmFpdGN5D3VzdHJhaXRzdHJva2VjeQd1bmkwNEJCB3VuaTA0Q0EHdW5pMDREOQd1bmkwNEU5AlBpB3VuaTIxMkIHdW5pMjEyQQd1bmkwMEI5B3VuaTAwQjIHdW5pMDBCMwd1bmkyMDc0FnBlcmlvZGNlbnRlcmVkLmxvY2xDQVQHdW5pMDBBRAd1bmkyMDEwB3VuaTI3RTgHdW5pMjdFOQd1bmkwMEEwAkNSB3VuaTIwQjUNY29sb25tb25ldGFyeQRkb25nBEV1cm8HdW5pMjBCMgd1bmkyMEFEBGxpcmEHdW5pMjBCQQd1bmkyMEJDB3VuaTIwQTYGcGVzZXRhB3VuaTIwQjEHdW5pMjBCRAd1bmkyMEI5B3VuaTIwQTkHdW5pMjIxOQd1bmkyMDUyB3VuaTIyMTUIZW1wdHlzZXQHdW5pMDBCNQZtaW51dGUGc2Vjb25kB3VuaTIxMTMHdW5pMjExNgllc3RpbWF0ZWQHdW5pMDJCQwd1bmkwMkM5B3VuaTAzMDgHdW5pMDMwNwlncmF2ZWNvbWIJYWN1dGVjb21iB3VuaTAzMEILdW5pMDMwQy5hbHQHdW5pMDMwMgd1bmkwMzBDB3VuaTAzMDYHdW5pMDMwQQl0aWxkZWNvbWIHdW5pMDMwNA1ob29rYWJvdmVjb21iB3VuaTAzMEYHdW5pMDMxMQd1bmkwMzEyB3VuaTAzMUIMZG90YmVsb3djb21iB3VuaTAzMjQHdW5pMDMyNgd1bmkwMzI3B3VuaTAzMjgHdW5pMDMyRQd1bmkwMzMxB3VuaTAzMzULdW5pMDMyNi5hbHQMdW5pMDMwMi5jYXNlDHVuaTAzMUIuY2FzZQt1bmkwMzA2MDMwMQt1bmkwMzA2MDMwMAt1bmkwMzA2MDMwOQt1bmkwMzA2MDMwMwt1bmkwMzAyMDMwMQt1bmkwMzAyMDMwMAt1bmkwMzAyMDMwOQt1bmkwMzAyMDMwMwROVUxMAAAAAAAQAMYAAwABBAkAAACqAAAAAwABBAkAAQAMAKoAAwABBAkAAgAOALYAAwABBAkAAwAyAMQAAwABBAkABAAcAPYAAwABBAkABQBWARIAAwABBAkABgAcAWgAAwABBAkACAAYAYQAAwABBAkACQAYAYQAAwABBAkACwAyAZwAAwABBAkADAAyAZwAAwABBAkADQEgAc4AAwABBAkADgA0Au4AAwABBAkBAAAMAyIAAwABBAkBAwAOALYAAwABBAkBBwAKAy4AQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMQA2ACAAVABoAGUAIABPAHMAdwBhAGwAZAAgAFAAcgBvAGoAZQBjAHQAIABBAHUAdABoAG8AcgBzACAAKABoAHQAdABwAHMAOgAvAC8AZwBpAHQAaAB1AGIALgBjAG8AbQAvAGcAbwBvAGcAbABlAGYAbwBuAHQAcwAvAE8AcwB3AGEAbABkAEYAbwBuAHQAKQBPAHMAdwBhAGwAZABSAGUAZwB1AGwAYQByADQALgAxADAAMAA7AG4AZQB3AHQAOwBPAHMAdwBhAGwAZAAtAFIAZQBnAHUAbABhAHIATwBzAHcAYQBsAGQAIABSAGUAZwB1AGwAYQByAFYAZQByAHMAaQBvAG4AIAA0AC4AMQAwADAAOwAgAHQAdABmAGEAdQB0AG8AaABpAG4AdAAgACgAdgAxAC4AOAAuADEALgA0ADMALQBiADAAYwA5ACkATwBzAHcAYQBsAGQALQBSAGUAZwB1AGwAYQByAFYAZQByAG4AbwBuACAAQQBkAGEAbQBzAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBzAGEAbgBzAG8AeAB5AGcAZQBuAC4AYwBvAG0AVABoAGkAcwAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUAIABpAHMAIABsAGkAYwBlAG4AcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAFMASQBMACAATwBwAGUAbgAgAEYAbwBuAHQAIABMAGkAYwBlAG4AcwBlACwAIABWAGUAcgBzAGkAbwBuACAAMQAuADEALgAgAFQAaABpAHMAIABsAGkAYwBlAG4AcwBlACAAaQBzACAAYQB2AGEAaQBsAGEAYgBsAGUAIAB3AGkAdABoACAAYQAgAEYAQQBRACAAYQB0ADoAIABoAHQAdABwADoA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AAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADLwAAAy8AAAMvAAADOIAAAziAAAM4gAADOIAAAziAAAM4gAADOIAAAziAAAM4gAADOIAAAziAAAM4gAADOIAAAziAAAM4gAADOIAAAziAAAM4gAADOIAAAziBM0AwQAAAAAEFAAAAhQAAAISACsDFwDhBSsAPwRoAEgGWACoBVwAQgG8AOECSABSAkj/YARqANcEaAB/Aez/nAJ/ADcCBgArAs3/ogRoAHkEaAEvBGgADARoAC8EaAAQBGgAUARoAIUEaACuBGgAYARoAGICBgArAgb/nARoAHkEaAB/BGgAeQNqAJ4GxwBvBHH/iwTJAFYErgCWBVQAVgQXAFYDxwBWBWoAlgVtAFYCi//ZAiP+wQR1AFYDywBWBrIAVAWeAFQFwwCWBIcAVgXDAJYEjQBWBAQAJwP8ALoFaACkBGIAvAbRAN8EJ/+YBAYAvAQ///ACSv/wAs0A3QJK/2oEIwA1Ayf/RARvAj8EhQBiBJ4AOwOaAGIEngBiA/IAYgKB/xsEAv+BBJ4AOwIIADsCCP7+A+cAOQIIADkG+gA7BJ4AOwR9AGIEnv/VBJ4AYgMrADsDbQAIApgAWgSeAHEDsgBiBbwAdQPT/7YDsv87A43/4wLLABsEaAIdAsv/tgRoAHMCFAAAAhL/8gRoAOEEaP/pBGgAqARoAH8EaAIdA+MAOwRvAckGqACLAq4AqgO+AFgEaAB/An8ANwaoAIsDDgDjA20A1wRoAH8CzQBgAs0AdwRvAhQEqv/VBT0AxwIGAKoBpP9WAs0BAgKwAKgDvgAXBe4AewXuAEIGHQBXA2r//ARx/4sEcf+LBHH/iwRx/4sEcf+LBHH/iwaJ/4kErgCWBBcAVgQXAFYEFwBWBBcAVgKL/9kCi//ZAov/2QKL/9kFVABIBZ4AVAXDAJYFwwCWBcMAlgXDAJYFwwCWBGgAqAXDAHcFaACkBWgApAVoAKQFaACkBAYAvASHAFYEnv8ABIUAYgSFAGIEhQBiBIUAYgSFAGIEhQBiBoUAYgOaAGID8gBiA/IAYgPyAGID8gBiAggAOwIIADsCCAA7AggAOwSNAFoEngA7BH0AYgR9AGIEfQBiBH0AYgR9AGIEaAB/BH0APQSeAHEEngBxBJ4AcQSeAHEDsv87BJ7/1QOy/zsEcf+LBIUAYgRx/4sEhQBiBHH/iwSFAGIErgCWA5oAYgSuAJYDmgBiBK4AlgOaAGIErgCWA5oAYgVUAFYEngBiBVQASASeAGIEFwBWA/IAYgQXAFYD8gBiBBcAVgPyAGIEFwBWA/IAYgQXAFYD8gBiBWoAlgQC/4EFagCWBAL/gQVqAJYEAv+BBWoAlgQC/4EFbQBWBJ4AOwVtAFYEngA7Aov/2QIIADsCi//ZAggAOwKL/9kCCAA7Aov/2QII/5oCi//ZAggAOwSs/9kEEAA7AiP+wQII/v4EdQBWA+cAOQPnADkDywBWAggAOQPLAFYCCP+fA8sAVgIIADkDywBWAkQAOQPLABcCAAAEBZ4AVASeADsFngBUBJ4AOwWeAFQEngA7BSkAXQWeAFQEngA7BcMAlgR9AGIFwwCWBH0AYgXDAJYEfQBiBtcAlgbpAGIEjQBWAysAOwSNAFYDK/+ZBI0AVgMrADsEBAAnA20ACAQEACcDbQAIBAQAJwNtAAgEBAAnA20ACAP8AJECmAA7A/wAugKYAFoD/ACqApgAKwVoAKQEngBxBWgApASeAHEFaACkBJ4AcQVoAKQEngBxBWgApASeAHEFaACkBJ4AcQbRAN8FvAB1BAYAvAOy/zsEBgC8BD//8AON/+MEP//wA43/4wQ///ADjf/jAjP+/ARoAAQEcf+NBIUAYgaJ/4kGhQBiBcMAdwR9AD0EBAAnA20ACARvAY8EbwHTBEgBlgRvAdsB8gFEBJ4CJwF1/28EbwFQBG8BjQSBAm8EgQHBBHH/iwIGAKoEiwBHBggARwOFAGAGDgBcBR8ARwZCAFQCcQBoBHH/iwTJAFYDzwBWBHf/yQQXAFYEP//wBW0AVgXDAJYCi//ZBHUAVgR3/4sGsgBUBZ4AVAQj/+UFwwCWBW8AVgSHAFYEK//jA/wAugQGALwF9ACWBCf/mAXhAMcF3f/wAov/2QQGALwEjQBiA48APwSeADsCcQBoBJwAhQSNAGIEnv/TA6wAVARtAEoDjwA/A6AAYgSeADsEWABiAnEAaAPnADkD3f+LBKr/1QPpAGIDjwBSBH0AYgTNAEwEkf/VA6AAYgSmAGIDWABMBJwAhQVcAGIEBv8bBbYAjwXXAGICcQBoBJwAhQR9AGIEnACFBdcAYgQXAFYFVgC6A88AVgSuAJYEBAAnAov/2QKL/9kCI/7BBx3/vgc3AFYFVgC6BHkAVgST//wFbwBWBHH/iwSDAFoEyQBWA88AVgT4/1YEFwBWBjX/nARC//oFkwBWBZMAVgR5AFYFJ/++BrIAVAVtAFYFwwCWBW8AVgSHAFYErgCWA/wAugST//wF9ACWBCf/mAVSAFQFHQD6B6QAVAeoAFQFAAC6BkoAVgRvAFYErgASB9UAVgSN/7QEhQBiBFQAZAROAGIDqAA3BIEAYgPyAGIGrP/dA33//ASeAHEEngBxA9EAOwRM/6IFhQA9BMsAOwR9AGIEngA7BJ7/1QOaAGIG+gA7A7L/OwVOAGID0/+2BMMAcQRxAJ4G+gBxBx8AcQS8AFQFxQCBBCcAgQOmABIGPwA7BDf/1QPyAGIEngA7A6gANwOaAGIDbQAIAggAOwIIADsCCP7+Bhn/ogZ/ADkEngA7A9EAOwOy/zsEngBxA88AVgMQADsG0QDfBbwAdQbRAN8FvAB1BtEA3wW8AHUEBgC8A7L/OwPXADcHrgA3B64ANwMn/zEBXAB7AVwAfQHs/5wB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GQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwEDAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQCsAKMAhACFAL0AlgDoAIYAjgCLAJ0AqQCkAQQAigEFAIMAkwDyAPMAjQCXAIgAwwDeAPEAngCqAPUA9AD2AKIArQDJAMcArgBiAGMAkABkAMsAZQDIAMoBBgEHAQgBCQDpAGYA0wDQANEArwBnAPAAkQDWANQA1QBoAOsA7QCJAGoAaQBrAG0AbABuAKAAbwBxAHAAcgBzAHUAdAB2AHcA6gB4AHoAeQB7AH0AfAC4AKEAfwB+AIAAgQDsAO4AugEKAQsBDAENAQ4BDwD9AP4BEAERARIBEwD/AQABFAEVARYBAQEXARgBGQEaARsBHAEdAR4BHwEgASEBIgD4APkBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzANcBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIA4gDjAUMBRAFFAUYBRwFIAUkBSgFLAUwBTQFOAU8BUAFRALAAsQFSAVMBVAFVAVYBVwFYAVkBWgFbAPsA/ADkAOUBXAFdAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoBawFsAW0BbgFvAXABcQC7AXIBcwF0AXUA5gDnAXYApgF3AXgBeQF6AXsBfAF9AX4A2ADhANoA2wDcAN0A4ADZAN8BfwGAAYEBggGDAYQBhQGGAYcBiAGJAYoBiwGMAY0BjgGPAZABkQGSAZMBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcAmwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisAsgCzAiwCLQC2ALcAxAIuALQAtQDFAIIAwgCHAKsAxgIvAjAAvgC/AjEAvAIyAPcCMwI0AjUCNgI3AjgAjACfAjkCOgI7AjwCPQCYAKgAmgCZAO8ApQCSAJwApwCPAJQAlQC5Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJJAkoCSwJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoMChAKFAoYChwKIAokCigKLAowCjQKOAo8CkAKRApICkwKUApUClgKXApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzALNAs4CzwLQAtEC0gLTAtQC1QLWAtcC2ALZAtoC2wLcAt0C3gLfAuAC4QLiAuMC5ALlAuYC5wLoAukC6gLrAuwC7QLuAu8C8ALxAvIC8wL0AvUC9gL3AvgC+QL6AvsC/AL9Av4C/wMAAwEDAgMDAwQDBQMGAwcDCAMJAwoDCwMMAw0DDgMPAxADEQMSAxMDFAMVAxYDFwMYAxkDGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRANFA0YDRwNIA0kDSgNLA0wDTQNOA08DUANRA1IDUwNUA1UDVgNXA1gDWQNaA1sDXANdA14DXwNgA2EDYgNjA2QDZQNmA2cDaANpA2oDawNsA20DbgNvA3ADcQNyA3MDdAN1A3YDdwN4A3kDegN7A3wDfQN+A38DgAOBA4IDgwOEA4UDhgOHA4gDiQOKA4sDjAONA44DjwOQA5EDkgOTA5QDlQOWA5cDmAOZA5oDmwOcA50ALADPAMwAzQDOA54DnwOgA6EA+gOiA6MDpAOlA6YDpwOoA6kDqgOrBG51bGwFSS5hbHQHdW5pMDBBRAlvdmVyc2NvcmUKSWdyYXZlLmFsdApJYWN1dGUuYWx0D0ljaXJjdW1mbGV4LmFsdA1JZGllcmVzaXMuYWx0B0FtYWNyb24HYW1hY3JvbgZBYnJldmUGYWJyZXZlB0FvZ29uZWsHYW9nb25lawtDY2lyY3VtZmxleAtjY2lyY3VtZmxleARDZG90BGNkb3QGRGNhcm9uBmRjYXJvbgZEY3JvYXQHRW1hY3JvbgdlbWFjcm9uBkVicmV2ZQZlYnJldmUKRWRvdGFjY2VudAplZG90YWNjZW50B0VvZ29uZWsHZW9nb25lawZFY2Fyb24GZWNhcm9uC0djaXJjdW1mbGV4C2djaXJjdW1mbGV4BEdkb3QEZ2RvdAxHY29tbWFhY2NlbnQMZ2NvbW1hYWNjZW50C0hjaXJjdW1mbGV4C2hjaXJjdW1mbGV4BEhiYXIEaGJhcgpJdGlsZGUuYWx0Bml0aWxkZQtJbWFjcm9uLmFsdAdpbWFjcm9uCklicmV2ZS5hbHQGaWJyZXZlC0lvZ29uZWsuYWx0B2lvZ29uZWsOSWRvdGFjY2VudC5hbHQGSUouYWx0AmlqC0pjaXJjdW1mbGV4C2pjaXJjdW1mbGV4DEtjb21tYWFjY2VudAxrY29tbWFhY2NlbnQMa2dyZWVubGFuZGljBkxhY3V0ZQZsYWN1dGUMTGNvbW1hYWNjZW50DGxjb21tYWFjY2VudAZMY2Fyb24GbGNhcm9uBExkb3QEbGRvdAZOYWN1dGUGbmFjdXRlDE5jb21tYWFjY2VudAxuY29tbWFhY2NlbnQGTmNhcm9uBm5jYXJvbgtuYXBvc3Ryb3BoZQNFbmcDZW5nB09tYWNyb24Hb21hY3JvbgZPYnJldmUGb2JyZXZlDU9odW5nYXJ1bWxhdXQNb2h1bmdhcnVtbGF1dAZSYWN1dGUGcmFjdXRlDFJjb21tYWFjY2VudAxyY29tbWFhY2NlbnQGUmNhcm9uBnJjYXJvbgZTYWN1dGUGc2FjdXRlC1NjaXJjdW1mbGV4C3NjaXJjdW1mbGV4DFRjb21tYWFjY2VudAx0Y29tbWFhY2NlbnQGVGNhcm9uBnRjYXJvbgRUYmFyBHRiYXIGVXRpbGRlBnV0aWxkZQdVbWFjcm9uB3VtYWNyb24GVWJyZXZlBnVicmV2ZQVVcmluZwV1cmluZw1VaHVuZ2FydW1sYXV0DXVodW5nYXJ1bWxhdXQHVW9nb25lawd1b2dvbmVrC1djaXJjdW1mbGV4C3djaXJjdW1mbGV4C1ljaXJjdW1mbGV4C3ljaXJjdW1mbGV4BlphY3V0ZQZ6YWN1dGUKWmRvdGFjY2VudAp6ZG90YWNjZW50BWxvbmdzCkFyaW5nYWN1dGUKYXJpbmdhY3V0ZQdBRWFjdXRlB2FlYWN1dGULT3NsYXNoYWN1dGULb3NsYXNoYWN1dGUMU2NvbW1hYWNjZW50DHNjb21tYWFjY2VudAV0b25vcw1kaWVyZXNpc3Rvbm9zCkFscGhhdG9ub3MJYW5vdGVsZWlhDEVwc2lsb250b25vcwhFdGF0b25vcw1Jb3RhdG9ub3MuYWx0DE9taWNyb250b25vcwxVcHNpbG9udG9ub3MKT21lZ2F0b25vcxFpb3RhZGllcmVzaXN0b25vcwVBbHBoYQRCZXRhBUdhbW1hB3VuaTAzOTQHRXBzaWxvbgRaZXRhA0V0YQVUaGV0YQhJb3RhLmFsdAVLYXBwYQZMYW1iZGECTXUCTnUCWGkHT21pY3JvbgJQaQNSaG8FU2lnbWEDVGF1B1Vwc2lsb24DUGhpA0NoaQNQc2kHdW5pMDNBORBJb3RhZGllcmVzaXMuYWx0D1Vwc2lsb25kaWVyZXNpcwphbHBoYXRvbm9zDGVwc2lsb250b25vcwhldGF0b25vcwlpb3RhdG9ub3MUdXBzaWxvbmRpZXJlc2lzdG9ub3MFYWxwaGEEYmV0YQVnYW1tYQVkZWx0YQdlcHNpbG9uBHpldGEDZXRhBXRoZXRhBGlvdGEFa2FwcGEGbGFtYmRhB3VuaTAzQkMCbnUCeGkHb21pY3JvbgNyaG8Gc2lnbWExBXNpZ21hA3RhdQd1cHNpbG9uA3BoaQNjaGkDcHNpBW9tZWdhDGlvdGFkaWVyZXNpcw91cHNpbG9uZGllcmVzaXMMb21pY3JvbnRvbm9zDHVwc2lsb250b25vcwpvbWVnYXRvbm9zCWFmaWkxMDAyMwlhZmlpMTAwNTEJYWZpaTEwMDUyCWFmaWkxMDA1MwlhZmlpMTAwNTQNYWZpaTEwMDU1LmFsdA1hZmlpMTAwNTYuYWx0CWFmaWkxMDA1NwlhZmlpMTAwNTgJYWZpaTEwMDU5CWFmaWkxMDA2MAlhZmlpMTAwNjEJYWZpaTEwMDYyCWFmaWkxMDE0NQlhZmlpMTAwMTcJYWZpaTEwMDE4CWFmaWkxMDAxOQlhZmlpMTAwMjAJYWZpaTEwMDIxCWFmaWkxMDAyMglhZmlpMTAwMjQJYWZpaTEwMDI1CWFmaWkxMDAyNglhZmlpMTAwMjcJYWZpaTEwMDI4CWFmaWkxMDAyOQlhZmlpMTAwMzAJYWZpaTEwMDMxCWFmaWkxMDAzMglhZmlpMTAwMzMJYWZpaTEwMDM0CWFmaWkxMDAzNQlhZmlpMTAwMzYJYWZpaTEwMDM3CWFmaWkxMDAzOAlhZmlpMTAwMzkJYWZpaTEwMDQwCWFmaWkxMDA0MQlhZmlpMTAwNDIJYWZpaTEwMDQzCWFmaWkxMDA0NAlhZmlpMTAwNDUJYWZpaTEwMDQ2CWFmaWkxMDA0NwlhZmlpMTAwNDgJYWZpaTEwMDQ5CWFmaWkxMDA2NQlhZmlpMTAwNjYJYWZpaTEwMDY3CWFmaWkxMDA2OAlhZmlpMTAwNjkJYWZpaTEwMDcwCWFmaWkxMDA3MglhZmlpMTAwNzMJYWZpaTEwMDc0CWFmaWkxMDA3NQlhZmlpMTAwNzYJYWZpaTEwMDc3CWFmaWkxMDA3OAlhZmlpMTAwNzkJYWZpaTEwMDgwCWFmaWkxMDA4MQlhZmlpMTAwODIJYWZpaTEwMDgzCWFmaWkxMDA4NAlhZmlpMTAwODUJYWZpaTEwMDg2CWFmaWkxMDA4NwlhZmlpMTAwODgJYWZpaTEwMDg5CWFmaWkxMDA5MAlhZmlpMTAwOTEJYWZpaTEwMDkyCWFmaWkxMDA5MwlhZmlpMTAwOTQJYWZpaTEwMDk1CWFmaWkxMDA5NglhZmlpMTAwOTcJYWZpaTEwMDcxCWFmaWkxMDA5OQlhZmlpMTAxMDAJYWZpaTEwMTAxCWFmaWkxMDEwMglhZmlpMTAxMDMJYWZpaTEwMTA0CWFmaWkxMDEwNQlhZmlpMTAxMDYJYWZpaTEwMTA3CWFmaWkxMDEwOAlhZmlpMTAxMDkJYWZpaTEwMTEwCWFmaWkxMDE5MwlhZmlpMTAwNTAJYWZpaTEwMDk4BldncmF2ZQZ3Z3JhdmUGV2FjdXRlBndhY3V0ZQlXZGllcmVzaXMJd2RpZXJlc2lzBllncmF2ZQZ5Z3JhdmUJYWZpaTAwMjA4DXVuZGVyc2NvcmVkYmwNcXVvdGVyZXZlcnNlZAZtaW51dGUGc2Vjb25kCWV4Y2xhbWRibAluc3VwZXJpb3IJYWZpaTA4OTQxBnBlc2V0YQRFdXJvCWFmaWk2MTI0OAlhZmlpNjEyODkJYWZpaTYxMzUyCWVzdGltYXRlZAlvbmVlaWdodGgMdGhyZWVlaWdodGhzC2ZpdmVlaWdodGhzDHNldmVuZWlnaHRocwd1bmlGQjAxB3VuaUZCMDINY3lyaWxsaWNicmV2ZQhkb3RsZXNzahBjYXJvbmNvbW1hYWNjZW50C2NvbW1hYWNjZW50EWNvbW1hYWNjZW50cm90YXRlDHplcm9zdXBlcmlvcgxmb3Vyc3VwZXJpb3IMZml2ZXN1cGVyaW9yC3NpeHN1cGVyaW9yDXNldmVuc3VwZXJpb3INZWlnaHRzdXBlcmlvcgxuaW5lc3VwZXJpb3IHdW5pMjAwMAd1bmkyMDAxB3VuaTIwMDIHdW5pMjAwMwd1bmkyMDA0B3VuaTIwMDUHdW5pMjAwNgd1bmkyMDA3B3VuaTIwMDgHdW5pMjAwOQd1bmkyMDBBB3VuaTIwMEIHdW5pRkVGRgd1bmlGRkZDB3VuaUZGRkQHdW5pMDFGMAd1bmkwMkJDB3VuaTAzRDEHdW5pMDNEMgd1bmkwM0Q2B3VuaTFFM0UHdW5pMUUzRgd1bmkxRTAwB3VuaTFFMDEHdW5pMUY0RAd1bmkwMkYzCWRhc2lhb3hpYQd1bmlGQjAzB3VuaUZCMDQFT2hvcm4Fb2hvcm4FVWhvcm4FdWhvcm4HdW5pMDMwMAd1bmkwMzAxB3VuaTAzMDMEaG9vawhkb3RiZWxvdwd1bmkwNDAwB3VuaTA0MEQHdW5pMDQ1MAd1bmkwNDVEB3VuaTA0NjAHdW5pMDQ2MQd1bmkwNDYyB3VuaTA0NjMHdW5pMDQ2NAd1bmkwNDY1B3VuaTA0NjYHdW5pMDQ2Nwd1bmkwNDY4B3VuaTA0NjkHdW5pMDQ2QQd1bmkwNDZCB3VuaTA0NkMHdW5pMDQ2RAd1bmkwNDZFB3VuaTA0NkYHdW5pMDQ3MAd1bmkwNDcxB3VuaTA0NzIHdW5pMDQ3Mwd1bmkwNDc0B3VuaTA0NzUHdW5pMDQ3Ngd1bmkwNDc3B3VuaTA0NzgHdW5pMDQ3OQd1bmkwNDdBB3VuaTA0N0IHdW5pMDQ3Qwd1bmkwNDdEB3VuaTA0N0UHdW5pMDQ3Rgd1bmkwNDgwB3VuaTA0ODEHdW5pMDQ4Mgd1bmkwNDgzB3VuaTA0ODQHdW5pMDQ4NQd1bmkwNDg2B3VuaTA0ODgHdW5pMDQ4OQd1bmkwNDhBB3VuaTA0OEIHdW5pMDQ4Qwd1bmkwNDhEB3VuaTA0OEUHdW5pMDQ4Rgd1bmkwNDkyB3VuaTA0OTMHdW5pMDQ5NAd1bmkwNDk1B3VuaTA0OTYHdW5pMDQ5Nwd1bmkwNDk4B3VuaTA0OTkHdW5pMDQ5QQd1bmkwNDlCB3VuaTA0OUMHdW5pMDQ5RAd1bmkwNDlFB3VuaTA0OUYHdW5pMDRBMAd1bmkwNEExB3VuaTA0QTIHdW5pMDRBMwd1bmkwNEE0B3VuaTA0QTUHdW5pMDRBNgd1bmkwNEE3B3VuaTA0QTgHdW5pMDRBOQd1bmkwNEFBB3VuaTA0QUIHdW5pMDRBQwd1bmkwNEFEB3VuaTA0QUUHdW5pMDRBRgd1bmkwNEIwB3VuaTA0QjEHdW5pMDRCMgd1bmkwNEIzB3VuaTA0QjQHdW5pMDRCNQd1bmkwNEI2B3VuaTA0QjcHdW5pMDRCOAd1bmkwNEI5B3VuaTA0QkEHdW5pMDRCQgd1bmkwNEJDB3VuaTA0QkQHdW5pMDRCRQd1bmkwNEJGC3VuaTA0QzAuYWx0B3VuaTA0QzEHdW5pMDRDMgd1bmkwNEMzB3VuaTA0QzQHdW5pMDRDNQd1bmkwNEM2B3VuaTA0QzcHdW5pMDRDOAd1bmkwNEM5B3VuaTA0Q0EHdW5pMDRDQgd1bmkwNENDB3VuaTA0Q0QHdW5pMDRDRQt1bmkwNENGLmFsdAd1bmkwNEQwB3VuaTA0RDEHdW5pMDREMgd1bmkwNEQzB3VuaTA0RDQHdW5pMDRENQd1bmkwNEQ2B3VuaTA0RDcHdW5pMDREOAd1bmkwNEQ5B3VuaTA0REEHdW5pMDREQgd1bmkwNERDB3VuaTA0REQHdW5pMDRERQd1bmkwNERGB3VuaTA0RTAHdW5pMDRFMQd1bmkwNEUyB3VuaTA0RTMHdW5pMDRFNAd1bmkwNEU1B3VuaTA0RTYHdW5pMDRFNwd1bmkwNEU4B3VuaTA0RTkHdW5pMDRFQQd1bmkwNEVCB3VuaTA0RUMHdW5pMDRFRAd1bmkwNEVFB3VuaTA0RUYHdW5pMDRGMAd1bmkwNEYxB3VuaTA0RjIHdW5pMDRGMwd1bmkwNEY0B3VuaTA0RjUHdW5pMDRGNgd1bmkwNEY3B3VuaTA0RjgHdW5pMDRGOQd1bmkwNEZBB3VuaTA0RkIHdW5pMDRGQwd1bmkwNEZEB3VuaTA0RkUHdW5pMDRGRgd1bmkwNTAwB3VuaTA1MDEHdW5pMDUwMgd1bmkwNTAzB3VuaTA1MDQHdW5pMDUwNQd1bmkwNTA2B3VuaTA1MDcHdW5pMDUwOAd1bmkwNTA5B3VuaTA1MEEHdW5pMDUwQgd1bmkwNTBDB3VuaTA1MEQHdW5pMDUwRQd1bmkwNTBGB3VuaTA1MTAHdW5pMDUxMQd1bmkwNTEyB3VuaTA1MTMHdW5pMUVBMAd1bmkxRUExB3VuaTFFQTIHdW5pMUVBMwd1bmkxRUE0B3VuaTFFQTUHdW5pMUVBNgd1bmkxRUE3B3VuaTFFQTgHdW5pMUVBOQd1bmkxRUFBB3VuaTFFQUIHdW5pMUVBQwd1bmkxRUFEB3VuaTFFQUUHdW5pMUVBRgd1bmkxRUIwB3VuaTFFQjEHdW5pMUVCMgd1bmkxRUIzB3VuaTFFQjQHdW5pMUVCNQd1bmkxRUI2B3VuaTFFQjcHdW5pMUVCOAd1bmkxRUI5B3VuaTFFQkEHdW5pMUVCQgd1bmkxRUJDB3VuaTFFQkQHdW5pMUVCRQd1bmkxRUJGB3VuaTFFQzAHdW5pMUVDMQd1bmkxRUMyB3VuaTFFQzMHdW5pMUVDNAd1bmkxRUM1B3VuaTFFQzYHdW5pMUVDNwt1bmkxRUM4LmFsdAd1bmkxRUM5C3VuaTFFQ0EuYWx0B3VuaTFFQ0IHdW5pMUVDQwd1bmkxRUNEB3VuaTFFQ0UHdW5pMUVDRgd1bmkxRUQwB3VuaTFFRDEHdW5pMUVEMgd1bmkxRUQzB3VuaTFFRDQHdW5pMUVENQd1bmkxRUQ2B3VuaTFFRDcHdW5pMUVEOAd1bmkxRUQ5B3VuaTFFREEHdW5pMUVEQgd1bmkxRURDB3VuaTFFREQHdW5pMUVERQd1bmkxRURGB3VuaTFFRTAHdW5pMUVFMQd1bmkxRUUyB3VuaTFFRTMHdW5pMUVFNAd1bmkxRUU1B3VuaTFFRTYHdW5pMUVFNwd1bmkxRUU4B3VuaTFFRTkHdW5pMUVFQQd1bmkxRUVCB3VuaTFFRUMHdW5pMUVFRAd1bmkxRUVFB3VuaTFFRUYHdW5pMUVGMAd1bmkxRUYxB3VuaTFFRjQHdW5pMUVGNQd1bmkxRUY2B3VuaTFFRjcHdW5pMUVGOAd1bmkxRUY5B3VuaTIwQUIHdW5pMDMwRhNjaXJjdW1mbGV4YWN1dGVjb21iE2NpcmN1bWZsZXhncmF2ZWNvbWISY2lyY3VtZmxleGhvb2tjb21iE2NpcmN1bWZsZXh0aWxkZWNvbWIOYnJldmVhY3V0ZWNvbWIOYnJldmVncmF2ZWNvbWINYnJldmVob29rY29tYg5icmV2ZXRpbGRlY29tYhBjeXJpbGxpY2hvb2tsZWZ0CG9uZS5wbnVtB3plcm8ub3MGb25lLm9zBnR3by5vcwh0aHJlZS5vcwdmb3VyLm9zB2ZpdmUub3MGc2l4Lm9zCHNldmVuLm9zCGVpZ2h0Lm9zB25pbmUub3MCZmYHdW5pMjEyMAhUY2VkaWxsYQh0Y2VkaWxsYQVnLmFsdA9nY2lyY3VtZmxleC5hbHQKZ2JyZXZlLmFsdAhnZG90LmFsdBBnY29tbWFhY2NlbnQuYWx0Bkl0aWxkZQdJbWFjcm9uBklicmV2ZQdJb2dvbmVrAklKCUlvdGF0b25vcwRJb3RhDElvdGFkaWVyZXNpcwlhZmlpMTAwNTUJYWZpaTEwMDU2B3VuaTA0QzAHdW5pMDRDRgd1bmkxRUM4B3VuaTFFQ0EAAAAADQCiAAMAAQQJAAAAcgAAAAMAAQQJAAEAEgByAAMAAQQJAAIADACEAAMAAQQJAAMAMgCQAAMAAQQJAAQAIADCAAMAAQQJAAUAGADiAAMAAQQJAAYAHgD6AAMAAQQJAAcApAEYAAMAAQQJAAgAKAG8AAMAAQQJAAsAOAHkAAMAAQQJAAwAXAIcAAMAAQQJAA0AXAJ4AAMAAQQJAA4AVALUAEQAaQBnAGkAdABpAHoAZQBkACAAZABhAHQAYQAgAGMAbwBwAHkAcgBpAGcAaAB0ACAAqQAgADIAMAAxADAALQAyADAAMQAxACwAIABHAG8AbwBnAGwAZQAgAEMAbwByAHAAbwByAGEAdABpAG8AbgAuAE8AcABlAG4AIABTAGEAbgBzAEkAdABhAGwAaQBjADEALgAxADAAOwAxAEEAUwBDADsATwBwAGUAbgBTAGEAbgBzAC0ASQB0AGEAbABpAGMATwBwAGUAbgAgAFMAYQBuAHMAIABJAHQAYQBsAGkAYwBWAGUAcgBzAGkAbwBuACAAMQAuADEAMABPAHAAZQBuAFMAYQBuAHMALQBJAHQAYQBsAGkAYwBPAHAAZQBuACAAUwBhAG4AcwAgAGkAcwAgAGEAIAB0AHIAYQBkAGUAbQBhAHIAawAgAG8AZgAgAEcAbwBvAGcAbABlACAAYQBuAGQAIABtAGEAeQAgAGIAZQAgAHIAZQBnAGkAcwB0AGUAcgBlAGQAIABpAG4AIABjAGUAcgB0AGEAaQBuACAAagB1AHIAaQBzAGQAaQBjAHQAaQBvAG4AcwAuAEEAcwBjAGUAbgBkAGUAcgAgAEMAbwByAHAAbwByAGEAdABpAG8AbgBoAHQAdABwADoALwAvAHcAdwB3AC4AYQBzAGMAZQBuAGQAZQByAGMAbwByAHAALgBjAG8AbQAvAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBhAHMAYwBlAG4AZABlAHIAYwBvAHIAcAAuAGMAbwBtAC8AdAB5AHAAZQBkAGUAcwBpAGcAbgBlAHIAcwAuAGgAdABtAGwATABpAGMAZQBuAHMAZQBkACAAdQBuAGQAZQByACAAdABoAGUAIABBAHAAYQBjAGgAZQAgAEwAaQBjAGUAbgBzAGUALAAgAFYAZQByAHMAaQBvAG4AIAAyAC4AMABoAHQAdABwADoALwAvAHcAdwB3AC4AYQBwAGEAYwBoAGUALgBvAHIAZwAvAGwAaQBjAGUAbgBzAGUAcwAvAEwASQBDAEUATgBTAEUALQAyAC4AMAAAAAEAAAABGdtgGOYOXw889QAJCAAAAAAAyWNIwAAAAADVK8zV/AT92wnZCGIAAgAJAAIAAQAAAAAAAwRrAZAABQAABZoFMwAAAR8FmgUzAAAD0QBmAgAAAAILBgYDBQQCAgTgAALvQAAgWwAAACgAAAAAMUFTQwABACD//QYf/hQAhAiNAlggAAGfAAAAAARIBbYAAAAgAAMKZW5kc3RyZWFtCmVuZG9iagozNiAwIG9iago8PAovTGVuZ3RoIDcwNgovTGVuZ3RoMSA3MDYKPj4Kc3RyZWFtCi9DSURJbml0IC9Qcm9jU2V0IGZpbmRyZXNvdXJjZSBiZWdpbgoxMiBkaWN0IGJlZ2luCmJlZ2luY21hcAovQ0lEU3lzdGVtSW5mbyA8PAogIC9SZWdpc3RyeSAoQWRvYmUpCiAgL09yZGVyaW5nIChVQ1MpCiAgL1N1cHBsZW1lbnQgMAo+PiBkZWYKL0NNYXBOYW1lIC9BZG9iZS1JZGVudGl0eS1VQ1MgZGVmCi9DTWFwVHlwZSAyIGRlZgoxIGJlZ2luY29kZXNwYWNlcmFuZ2UKPDAwMDA+PGZmZmY+CmVuZGNvZGVzcGFjZXJhbmdlCjI5IGJlZ2luYmZjaGFyCjwwMDAzPjwwMDIwPgo8MDAwZj48MDAyYz4KPDAwMTE+PDAwMmU+CjwwMDI4PjwwMDQ1Pgo8MDAyYT48MDA0Nz4KPDAwMzY+PDAwNTM+CjwwMDQ0PjwwMDYxPgo8MDA0Nj48MDA2Mz4KPDAwNDc+PDAwNjQ+CjwwMDQ4PjwwMDY1Pgo8MDA0OT48MDA2Nj4KPDAwNGE+PDAwNjc+CjwwMDRiPjwwMDY4Pgo8MDA0Yz48MDA2OT4KPDAwNGU+PDAwNmI+CjwwMDRmPjwwMDZjPgo8MDA1MD48MDA2ZD4KPDAwNTE+PDAwNmU+CjwwMDUyPjwwMDZmPgo8MDA1Mz48MDA3MD4KPDAwNTU+PDAwNzI+CjwwMDU2PjwwMDczPgo8MDA1Nz48MDA3ND4KPDAwNTg+PDAwNzU+CjwwMDU5PjwwMDc2Pgo8MDA1YT48MDA3Nz4KPDAwNWI+PDAwNzg+CjwwMDVjPjwwMDc5Pgo8MDM5ND48MDA0OT4KZW5kYmZjaGFyCmVuZGNtYXAKQ01hcE5hbWUgY3VycmVudGRpY3QgL0NNYXAgZGVmaW5lcmVzb3VyY2UgcG9wCmVuZAplbmQKZW5kc3RyZWFtCmVuZG9iagozNyAwIG9iago8PAovVHlwZSAvRm9udERlc2NyaXB0b3IKL0ZvbnROYW1lIC9PcGVuU2FucwovRm9udEZpbGUyIDM1IDAgUgovRm9udEJCb3ggWy00OTggLTI2OCAxMjMxIDEwNDhdCi9GbGFncyAzMgovU3RlbVYgMAovSXRhbGljQW5nbGUgMAovQXNjZW50IDEwNjkKL0Rlc2NlbnQgLTI5MwovQ2FwSGVp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AAAANgAAAJoAAACaAAAAmgAAAJoAAACaAAAAmgAAAJoAAACaAAAAmgAAAJoAAAEGAAABBgAAAQYAAAEGAAABBgAAAQYAAAEGAAABBgAAAQYAAAEGAAABBgAAAQYAAAEGAAABBgAAAQYAAAEGAAABRAAAAUQAAAFEAAABRAAAAUQAAAFEAAABRAAAAUQAAAFEAAABRAAAAUQAAAFEAAABRAAAAdQAAAHUAAACOgAAAtgAAANuAAAD+gAABQIAAAV4AAAF2AAABdgAAAXYAAAF/AAABpoAAAcIAAAHegAACAwAAAgMAAAIYAAACOgAAAlkAAAJ1gAACdYAAAnWAAAJ1gAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIAAApCAAAKQgAACkIEzQDBAAAAAAQUAAACFAAAAi0AIQNaANUFKwAzBGgAPQaYAI0FgwBCAeMA1QJ/AE4Cf/9mBGIAwQRoAHUCEv+aAokALwInACEDFP+kBGgAXARoAPIEaP/uBGgAHwRo//wEaAA1BGgAbwRoAH0EaABMBGgAXAInACECJ/+cBGgAcwRoAHUEaABzA4sAogbPAGQEuv+HBN8ARgTJAIcFXgBGBDUARgQCAEYFdwCHBYMARgLN/88CZP6+BK4ARgP4AEYG3QBEBdMARAXNAIcElgBGBc0AhwS2AEYEIQAnBB0AsAV3AJgEjQC6BvwAywR//5EERAC6BET/2QJ3/+UDFADdAnf/cQQtACUDLf9EBG8CHQSiAF4EsAAvA7oAXgSuAF4EMwBeAr7/HwQr/4cEuAAvAjMALwIz/voEOQAvAjMALwcbAC8EuAAvBJYAXgSw/8kErgBeA0QALwOaAA4C8ABcBLgAbwPlAGQGBAB5BAj/qgPs/1YDmP/ZAtEACARoAfIC0f+oBGgAbwIUAAACLf/TBGgAwwRo/+4EaACNBGgAagRoAfID4wAnBG8BqgaoAIMC2QCgBB8AUARoAHUCiQAvBqgAgwOHAG8DbQC8BGgAdQLpAE4C6QBoBG8B/ATF/8kFPQCsAicAlgGk/0QC6QDBAtEApAQfAAoGfQCVBn0AeQaTAGwDi//dBLr/hwS6/4cEuv+HBLr/hwS6/4cEuv+HBtn/hwTJAIcENQBGBDUARgQ1AEYENQBGAs3/zwLN/88Czf/PAs3/zwVeADUF0wBEBc0AhwXNAIcFzQCHBc0AhwXNAIcEaACTBc0AbQV3AJgFdwCYBXcAmAV3AJgERAC6BJYARgTy/v4EogBeBKIAXgSiAF4EogBeBKIAXgSiAF4GvgBeA7oAXgQzAF4EMwBeBDMAXgQzAF4CMwAvAjMALwIzAC8CMwAvBJYAUAS4AC8ElgBeBJYAXgSWAF4ElgBeBJYAXgRoAHUElgAzBLgAbwS4AG8EuABvBLgAbwPs/1YEsP/JA+z/VgS6/4cEogBeBLr/hwSiAF4Euv+HBKIAXgTJAIcDugBeBMkAhwO6AF4EyQCHA7oAXgTJAIcDugBeBV4ARgSuAF4FXgA1BK4AXgQ1AEYEMwBeBDUARgQzAF4ENQBGBDMAXgQ1AEYEMwBeBDUARgQzAF4FdwCHBCv/hwV3AIcEK/+HBXcAhwQr/4cFdwCHBCv/hwWDAEYEuAAvBYMARgS4AC8Czf/PAjMALwLN/88CMwAvAs3/zwIzAC8Czf/PAjP/pgLN/88CMwAvBTH/zwRoAC8CZP6+AjP+/ASuAEYEOQAvBDkALwP4AEYCMwAvA/gARgIz/54D+ABGAjMALwP4AEYC3QAvA/gACgJOAAIF0wBEBLgALwXTAEQEuAAvBdMARAS4AC8FTgAuBdMARAS4AC8FzQCHBJYAXgXNAIcElgBeBc0AhwSWAF4HBgCHBvwAXgS2AEYDRAAvBLYARgNE/5wEtgBGA0QALwQhACcDmgAOBCEAJwOaAA4EIQAnA5oADgQhACcDmgAOBB0AiALwADoEHQCwAvAAXAQdAKgC8AAlBXcAmAS4AG8FdwCYBLgAbwV3AJgEuABvBXcAmAS4AG8FdwCYBLgAbwV3AJgEuABvBvwAywYEAHkERAC6A+z/VgREALoERP/ZA5j/2QRE/9kDmP/ZBET/2QOY/9kCh/8CBGj/8gS6/4kEngBeBtn/hwa+AF4FzQBtBJYAMwQhACcDmgAOBG8BYgRvAaYESAGLBG8BxQIpAUIEngIdAY3/YARvAUYEbwFSBHcCUgR3AYsEuv+HAicAlgTLADQGGwA0A8sAQQYtAE0FbQA0BlIAVwKwAGQEuv+HBN8ARgPpAEYEpv/JBDUARgRE/9kFgwBGBdkAhwLN/88ErgBGBKL/hwbdAEQF0wBEBCf/3QXNAIcFfwBGBJYARgRC/9sEHQCwBEQAugY9AIcEf/+RBjMAvAXT/9kCzf/PBEQAugSyAF4D1QAzBLgALwKwAGQExQB9BLIAXgTJ/8kD4QBIBI8APwPVADMDqgBeBLgALwSDAGICsABkBDkALwQ3/5gExf/JBCcAZAOiAFYElgBeBUIAVASq/8kDqgBeBMsAXgOqAFQExQB9BbwAXgQ3/woGFwCDBjMAXgKwAGQExQB9BJYAXgTFAH0GMwBeBDUARgWiALAD6QBGBMkAhwQhACcCzf/PAs3/zwJk/r4HYv/BB1wARgWiALAEngBGBK4ADAV/AEYEuv+HBKAASATfAEYD6QBGBVz/SgQ1AEYGkf+PBIMAEAXPAEYFzwBGBJ4ARgVa/8EG3QBEBYMARgXNAIcFfwBGBJYARgTJAIcEHQCwBK4ADAY9AIcEf/+RBZgARAU/ANkH1QBEB/4ARAVIALAGjwBGBJYARgTJABcH8ABGBLr/nASiAF4EgQBoBHEAXgO+ACUEqABeBDMAXgct/+MD1wAKBLgAbwS4AG8ENwAvBJz/sgXsACkE2wAvBJYAXgS4AC8EsP/JA7oAXgcbAC8D7P9WBbQAXgQI/6oE2wBtBJoAoAcbAG0HPQBtBRAAWAYZAHUEVAB1A8EAGQZ3AC8Eb//fBDMAXgS4AC8DvgAlA7oAXgOaAA4CMwAvAjMALwIz/voGf/+yBrIANQS4AC8ENwAvA+z/VgS4AG0D6QBGA2IALwb8AMsGBAB5BvwAywYEAHkG/ADLBgQAeQREALoD7P9WA9cALweuAC8HrgAvAy3/LAGJAHcBiQBzAhL/mgGJAOEDIwB3AyMAcwOq/5oD4wDLA/gARAL0AJgGYgElCVYAjQHjANUDWgDVAm0AUAJtAAoEKf//AQb+AgMEAJYEaAAXBGj/8AZSADcEaAAzBisAogQAAGQHtgApBf4AcQXT/9kE9AB1BokAgwbHAFcGzQBkBoUAgQSmAGAEpv/JBe4A2wUMAJ4EaAB1BGQAYgWoAI0DLwASBGgAbwRoAHUEaAB1BGgAdQSqAIME6f8fBOn/HwR3AUwCM/78A+cB+gPnAIsD5wHlAukAewLpAEYC6QBzAukAfwLpAJMC6QBqAukAcwQAAAAIAAAABAAAAAgAAAACqgAAAgAAAAFWAAAEeQAAAjMAAAGaAAAAzQAAAAAAAAAAAAAIAABUCAAAVAIz/vwBiQBzBQwAUgRWALoG7ABkBt0ARAcbAC8Euv+HBKIAXgY7/zICqv+qAqwAzQeL/x8Hi/8fBfIAhwTRAF4F/ACYBVAAbQAA/Q4AAP3MAAD8mwAA/bAAAPyHBDUARgXPAEYEMwBeBLgAbwfnAIsGMQBmBPwAhwSeAEwG/gBGBb4ALwUU/4cEb/+TBw4ARgY5AC8Fj/+sBLr/lgeaAEYGgwAvBIP/tAPh/6IGMwC8BhcAgwXNAIcElgBeBNUAugPyAGIE1QC6A/IAYgmyAIcIQgBeBfwAhwTXAF4H5wCLBmAAXgfnAIsGMQBmBMkAhwO6AF4E3wBvBGABPwSJAVoEiQJqBIkCaAfpACkHpgApBhkARgTVAG0EkwBGBFYAeQSWAEYEsP/JA+UANQNiAAAFEgBGBEIALwb2/48HMf/jBIMAEAPXAAoFJQBEBIcALwSeAEQEPwBIBK4ARgQvAC8FRACwBNUATAXFAEYFCAAvBhkARgWYAC8IHQBGBroALwXNAIcE2QBeBMkAhwO6AF4EHQCwBz0ALwREALoD5QBkBEQAXAPl/9MFCv+RBG//xwZ1ALAFWgBaBYkA1wS6AKAFPwDXBKIAoAU/AEQEuAAvBi0AXgUEADEGLQBeBQQAMQLN/88Gkf+PBy3/4wVIAEYEhwAvBaT/wQTH/7IFgwBGBNsALwXNAEYFCAAvBT8A1wSwALYHJwBEBhsAKQLN/88Euv+HBKIAXgS6/4cEogBeBtn/hwa+AF4ENQBGBDMAXgVIAEwEMwA3BUgATAQzADcGkf+PBy3/4wSDABAD1wAKBFIABgQC/40FzwBGBLgAbwXPAEYEuABvBc0AhwSWAF4FzQCHBJYAXgXNAIcElgBeBMkAFwPBABkErgAMA+z/VgSuAAwD7P9WBK4ADAPs/1YFPwDZBJoAoAPpAEYDYgAvBo8ARgYZAHUD5QApA2IAAATN/5EERv+oBH//kQQI/6oElgBOBK4AXgbHAFIG5QBeBssA3QY7AI8E5wC8BEoApAd//8EGz/+yB74ARgcOAC8FugCHBOEAXgV3ALAFCgBaBIMAXgPVADMFpP/BBOH/sgS6/4cEogBeBLr/hwSiAF4Euv+HBKIAXgS6/4cEogBeBLr/hwSiAF4Euv+HBKIAXgS6/4cEogBeBLr/hwSiAF4Euv+HBKIAXgS6/4cEogBeBLr/hwSiAF4Euv+HBKIAXgQ1AEYEMwBeBDUARgQzAF4ENQBGBDMAXgQ1AEYEMwBeBDUARgQzAF4ENQBGBDMAXgQ1AEYEMwBeBDUARgQzAF4Czf/PAjMALwLN/88CM//rBc0AhwSWAF4FzQCHBJYAXgXNAIcElgBeBc0AhwSWAF4FzQCHBJYAXgXNAIcElgBeBc0AhwSWAF4F8gCHBNEAXgXyAIcE0QBeBfIAhwTRAF4F8gCHBNEAXgXyAIcE0QBeBXcAmAS4AG8FdwCYBLgAbwX8AJgFUABtBfwAmAVQAG0F/ACYBVAAbQX8AJgFUABtBfwAmAVQAG0ERAC6A+z/VgREALoD7P9WBEQAugPs/1YErgAdAAD8MwAA/MkAAPwfAAD8yQAA/MkAAP0IAAD9CAAA/QgAAP0EAaT/YgNtAHwEiQBeAzcANwQf/98EI/+VBFz/xwQr/+AEagBmBBT//wRgAD8EaAAmBWD/HwX8AHcEHQCSAvAAXASuACcErgAnBK4AJwSuACcErgAnAmAARgJgAEYCYABGAmAARgJgAEYCYABGAmAARgJgAEYCYP+0AmAARgTFAEYDBgBBAmAARgBGAEYARgBGAEYARgACAAAAAQAACI39qAAACbL8H/4EChkIAAGzAAAAAAAAAAAAAAAAA6EAAQAAA6gAigAWAFQABQACABAALwBcAAABGgCiAAMAAQACAAD/9AAA/2YAZgAAAAAAAAAAAAAAAAAAAAAAAAAAA6gAAAECAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAEgATABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAIQAiACMAJAAlACYAJwAoACkAKgArAQMALQAuAC8AMAAxADIAMwA0ADUANgA3ADgAOQA6ADsAPAA9AD4APwBAAEEAQgBDAEQARQBGAEcASABJAEoASwBMAE0ATgBPAFAAUQBSAFMAVABVAFYAVwBYAFkAWgBbAFwAXQBeAF8AYABhAKwAowCEAIUAvQCWAOgAhgCOAIsAnQCpAKQBBACKAQUAgwCTAPIA8wCNAJcAiADDAN4A8QCeAKoA9QD0APYAogCtAMkAxwCuAGIAYwCQAGQAywBlAMgAygEGAQcBCAEJAOkAZgDTANAA0QCvAGcA8ACRANYA1ADVAGgA6wDtAIkAagBpAGsAbQBsAG4AoABvAHEAcAByAHMAdQB0AHYAdwDqAHgAegB5AHsAfQB8ALgAoQB/AH4AgACBAOwA7gC6AQoBCwEMAQ0BDgEPAP0A/gEQAREBEgETAP8BAAEUARUBFgEBARcBGAEZARoBGwEcAR0BHgEfASABIQEiAPgA+QEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMA1wE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgDiAOMBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEAsACxAVIBUwFUAVUBVgFXAVgBWQFaAVsA+wD8AOQA5QFcAV0BXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagFrAWwBbQFuAW8BcAFxALsBcgFzAXQBdQDmAOcBdgCmAXcBeAF5AXoBewF8AX0BfgDYAOEA2gDbANwA3QDgANkA3wF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwCbAbgBuQG6AbsBvAG9Ab4BvwHAAcEBwgHDAcQBxQHGAccByAHJAcoBywHMAc0BzgHPAdAB0QHSAdMB1AHVAdYB1wHYAdkB2gHbAdwB3QHeAd8B4AHhAeIB4wHkAeUB5gHnAegB6QHqAesB7AHtAe4B7wHwAfEB8gHzAfQB9QH2AfcB+AH5AfoB+wH8Af0B/gH/AgACAQICAgMCBAIFAgYCBwIIAgkCCgILAgwCDQIOAg8CEAIRAhICEwIUAhUCFgIXAhgCGQIaAhsCHAIdAh4CHwIgAiECIgIjAiQCJQImAicCKAIpAioCKwCyALMCLAItALYAtwDEAi4AtAC1AMUAggDCAIcAqwDGAi8CMAC+AL8CMQC8AjIA9wIzAjQCNQI2AjcCOACMAJ8COQI6AjsCPAI9AJgAqACaAJkA7wClAJIAnACnAI8AlACVALkCPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UDdgN3A3gDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQAsAM8AzADNAM4DngOfA6ADoQD6A6IDowOkA6UDpgOnA6gDqQOqA6sEbnVsbAVJLmFsdAd1bmkwMEFECW92ZXJzY29yZQpJZ3JhdmUuYWx0CklhY3V0ZS5hbHQPSWNpcmN1bWZsZXguYWx0DUlkaWVyZXNpcy5hbHQHQW1hY3JvbgdhbWFjcm9uBkFicmV2ZQZhYnJldmUHQW9nb25lawdhb2dvbmVrC0NjaXJjdW1mbGV4C2NjaXJjdW1mbGV4BENkb3QEY2RvdAZEY2Fyb24GZGNhcm9uBkRjcm9hdAdFbWFjcm9uB2VtYWNyb24GRWJyZXZlBmVicmV2ZQpFZG90YWNjZW50CmVkb3RhY2NlbnQHRW9nb25lawdlb2dvbmVrBkVjYXJvbgZlY2Fyb24LR2NpcmN1bWZsZXgLZ2NpcmN1bWZsZXgER2RvdARnZG90DEdjb21tYWFjY2VudAxnY29tbWFhY2NlbnQLSGNpcmN1bWZsZXgLaGNpcmN1bWZsZXgESGJhcgRoYmFyCkl0aWxkZS5hbHQGaXRpbGRlC0ltYWNyb24uYWx0B2ltYWNyb24KSWJyZXZlLmFsdAZpYnJldmULSW9nb25lay5hbHQHaW9nb25law5JZG90YWNjZW50LmFsdAZJSi5hbHQCaWoLSmNpcmN1bWZsZXgLamNpcmN1bWZsZXgMS2NvbW1hYWNjZW50DGtjb21tYWFjY2VudAxrZ3JlZW5sYW5kaWMGTGFjdXRlBmxhY3V0ZQxMY29tbWFhY2NlbnQMbGNvbW1hYWNjZW50BkxjYXJvbgZsY2Fyb24ETGRvdARsZG90Bk5hY3V0ZQZuYWN1dGUMTmNvbW1hYWNjZW50DG5jb21tYWFjY2VudAZOY2Fyb24GbmNhcm9uC25hcG9zdHJvcGhlA0VuZwNlbmcHT21hY3JvbgdvbWFjcm9uBk9icmV2ZQZvYnJldmUNT2h1bmdhcnVtbGF1dA1vaHVuZ2FydW1sYXV0BlJhY3V0ZQZyYWN1dGUMUmNvbW1hYWNjZW50DHJjb21tYWFjY2VudAZSY2Fyb24GcmNhcm9uBlNhY3V0ZQZzYWN1dGULU2NpcmN1bWZsZXgLc2NpcmN1bWZsZXgMVGNvbW1hYWNjZW50DHRjb21tYWFjY2VudAZUY2Fyb24GdGNhcm9uBFRiYXIEdGJhcgZVdGlsZGUGdXRpbGRlB1VtYWNyb24HdW1hY3JvbgZVYnJldmUGdWJyZXZlBVVyaW5nBXVyaW5nDVVodW5nYXJ1bWxhdXQNdWh1bmdhcnVtbGF1dAdVb2dvbmVrB3VvZ29uZWsLV2NpcmN1bWZsZXgLd2NpcmN1bWZsZXgLWWNpcmN1bWZsZXgLeWNpcmN1bWZsZXgGWmFjdXRlBnphY3V0ZQpaZG90YWNjZW50Cnpkb3RhY2NlbnQFbG9uZ3MKQXJpbmdhY3V0ZQphcmluZ2FjdXRlB0FFYWN1dGUHYWVhY3V0ZQtPc2xhc2hhY3V0ZQtvc2xhc2hhY3V0ZQxTY29tbWFhY2NlbnQMc2NvbW1hYWNjZW50BXRvbm9zDWRpZXJlc2lzdG9ub3MKQWxwaGF0b25vcwlhbm90ZWxlaWEMRXBzaWxvbnRvbm9zCEV0YXRvbm9zDUlvdGF0b25vcy5hbHQMT21pY3JvbnRvbm9zDFVwc2lsb250b25vcwpPbWVnYXRvbm9zEWlvdGFkaWVyZXNpc3Rvbm9zBUFscGhhBEJldGEFR2FtbWEHdW5pMDM5NAdFcHNpbG9uBFpldGEDRXRhBVRoZXRhCElvdGEuYWx0BUthcHBhBkxhbWJkYQJNdQJOdQJYaQdPbWljcm9uAlBpA1JobwVTaWdtYQNUYXUHVXBzaWxvbgNQaGkDQ2hpA1BzaQd1bmkwM0E5EElvdGFkaWVyZXNpcy5hbHQPVXBzaWxvbmRpZXJlc2lzCmFscGhhdG9ub3MMZXBzaWxvbnRvbm9zCGV0YXRvbm9zCWlvdGF0b25vcxR1cHNpbG9uZGllcmVzaXN0b25vcwVhbHBoYQRiZXRhBWdhbW1hBWRlbHRhB2Vwc2lsb24EemV0YQNldGEFdGhldGEEaW90YQVrYXBwYQZsYW1iZGEHdW5pMDNCQwJudQJ4aQdvbWljcm9uA3JobwZzaWdtYTEFc2lnbWEDdGF1B3Vwc2lsb24DcGhpA2NoaQNwc2kFb21lZ2EMaW90YWRpZXJlc2lzD3Vwc2lsb25kaWVyZXNpcwxvbWljcm9udG9ub3MMdXBzaWxvbnRvbm9zCm9tZWdhdG9ub3MJYWZpaTEwMDIzCWFmaWkxMDA1MQlhZmlpMTAwNTIJYWZpaTEwMDUzCWFmaWkxMDA1NA1hZmlpMTAwNTUuYWx0DWFmaWkxMDA1Ni5hbHQJYWZpaTEwMDU3CWFmaWkxMDA1OAlhZmlpMTAwNTkJYWZpaTEwMDYwCWFmaWkxMDA2MQlhZmlpMTAwNjIJYWZpaTEwMTQ1CWFmaWkxMDAxNwlhZmlpMTAwMTgJYWZpaTEwMDE5CWFmaWkxMDAyMAlhZmlpMTAwMjEJYWZpaTEwMDIyCWFmaWkxMDAyNAlhZmlpMTAwMjUJYWZpaTEwMDI2CWFmaWkxMDAyNwlhZmlpMTAwMjgJYWZpaTEwMDI5CWFmaWkxMDAzMAlhZmlpMTAwMzEJYWZpaTEwMDMyCWFmaWkxMDAzMwlhZmlpMTAwMzQJYWZpaTEwMDM1CWFmaWkxMDAzNglhZmlpMTAwMzcJYWZpaTEwMDM4CWFmaWkxMDAzOQlhZmlpMTAwNDAJYWZpaTEwMDQxCWFmaWkxMDA0MglhZmlpMTAwNDMJYWZpaTEwMDQ0CWFmaWkxMDA0NQlhZmlpMTAwNDYJYWZpaTEwMDQ3CWFmaWkxMDA0OAlhZmlpMTAwNDkJYWZpaTEwMDY1CWFmaWkxMDA2NglhZmlpMTAwNjcJYWZpaTEwMDY4CWFmaWkxMDA2OQlhZmlpMTAwNzAJYWZpaTEwMDcyCWFmaWkxMDA3MwlhZmlpMTAwNzQJYWZpaTEwMDc1CWFmaWkxMDA3NglhZmlpMTAwNzcJYWZpaTEwMDc4CWFmaWkxMDA3OQlhZmlpMTAwODAJYWZpaTEwMDgxCWFmaWkxMDA4MglhZmlpMTAwODMJYWZpaTEwMDg0CWFmaWkxMDA4NQlhZmlpMTAwODYJYWZpaTEwMDg3CWFmaWkxMDA4OAlhZmlpMTAwODkJYWZpaTEwMDkwCWFmaWkxMDA5MQlhZmlpMTAwOTIJYWZpaTEwMDkzCWFmaWkxMDA5NAlhZmlpMTAwOTUJYWZpaTEwMDk2CWFmaWkxMDA5NwlhZmlpMTAwNzEJYWZpaTEwMDk5CWFmaWkxMDEwMAlhZmlpMTAxMDEJYWZpaTEwMTAyCWFmaWkxMDEwMwlhZmlpMTAxMDQJYWZpaTEwMTA1CWFmaWkxMDEwNglhZmlpMTAxMDcJYWZpaTEwMTA4CWFmaWkxMDEwOQlhZmlpMTAxMTAJYWZpaTEwMTkzCWFmaWkxMDA1MAlhZmlpMTAwOTgGV2dyYXZlBndncmF2ZQZXYWN1dGUGd2FjdXRlCVdkaWVyZXNpcwl3ZGllcmVzaXMGWWdyYXZlBnlncmF2ZQlhZmlpMDAyMDgNdW5kZXJzY29yZWRibA1xdW90ZXJldmVyc2VkBm1pbnV0ZQZzZWNvbmQJZXhjbGFtZGJsCW5zdXBlcmlvcglhZmlpMDg5NDEGcGVzZXRhBEV1cm8JYWZpaTYxMjQ4CWFmaWk2MTI4OQlhZmlpNjEzNTIJZXN0aW1hdGVkCW9uZWVpZ2h0aAx0aHJlZWVpZ2h0aHMLZml2ZWVpZ2h0aHMMc2V2ZW5laWdodGhzB3VuaUZCMDEHdW5pRkIwMg1jeXJpbGxpY2JyZXZlCGRvdGxlc3NqEGNhcm9uY29tbWFhY2NlbnQLY29tbWFhY2NlbnQRY29tbWFhY2NlbnRyb3RhdGUMemVyb3N1cGVyaW9yDGZvdXJzdXBlcmlvcgxmaXZlc3VwZXJpb3ILc2l4c3VwZXJpb3INc2V2ZW5zdXBlcmlvcg1laWdodHN1cGVyaW9yDG5pbmVzdXBlcmlvcgd1bmkyMDAwB3VuaTIwMDEHdW5pMjAwMgd1bmkyMDAzB3VuaTIwMDQHdW5pMjAwNQd1bmkyMDA2B3VuaTIwMDcHdW5pMjAwOAd1bmkyMDA5B3VuaTIwMEEHdW5pMjAwQgd1bmlGRUZGB3VuaUZGRkMHdW5pRkZGRAd1bmkwMUYwB3VuaTAyQkMHdW5pMDNEMQd1bmkwM0QyB3VuaTAzRDYHdW5pMUUzRQd1bmkxRTNGB3VuaTFFMDAHdW5pMUUwMQd1bmkxRjREB3VuaTAyRjMJZGFzaWFveGlhB3VuaUZCMDMHdW5pRkIwNAVPaG9ybgVvaG9ybgVVaG9ybgV1aG9ybgd1bmkwMzAwB3VuaTAzMDEHdW5pMDMwMwRob29rCGRvdGJlbG93B3VuaTA0MDAHdW5pMDQwRAd1bmkwNDUwB3VuaTA0NUQHdW5pMDQ2MAd1bmkwNDYxB3VuaTA0NjIHdW5pMDQ2Mwd1bmkwNDY0B3VuaTA0NjUHdW5pMDQ2Ngd1bmkwNDY3B3VuaTA0NjgHdW5pMDQ2OQd1bmkwNDZBB3VuaTA0NkIHdW5pMDQ2Qwd1bmkwNDZEB3VuaTA0NkUHdW5pMDQ2Rgd1bmkwNDcwB3VuaTA0NzEHdW5pMDQ3Mgd1bmkwNDczB3VuaTA0NzQHdW5pMDQ3NQd1bmkwNDc2B3VuaTA0NzcHdW5pMDQ3OAd1bmkwNDc5B3VuaTA0N0EHdW5pMDQ3Qgd1bmkwNDdDB3VuaTA0N0QHdW5pMDQ3RQd1bmkwNDdGB3VuaTA0ODAHdW5pMDQ4MQd1bmkwNDgyB3VuaTA0ODMHdW5pMDQ4NAd1bmkwNDg1B3VuaTA0ODYHdW5pMDQ4OAd1bmkwNDg5B3VuaTA0OEEHdW5pMDQ4Qgd1bmkwNDhDB3VuaTA0OEQHdW5pMDQ4RQd1bmkwNDhGB3VuaTA0OTIHdW5pMDQ5Mwd1bmkwNDk0B3VuaTA0OTUHdW5pMDQ5Ngd1bmkwNDk3B3VuaTA0OTgHdW5pMDQ5OQd1bmkwNDlBB3VuaTA0OUIHdW5pMDQ5Qwd1bmkwNDlEB3VuaTA0OUUHdW5pMDQ5Rgd1bmkwNEEwB3VuaTA0QTEHdW5pMDRBMgd1bmkwNEEzB3VuaTA0QTQHdW5pMDRBNQd1bmkwNEE2B3VuaTA0QTcHdW5pMDRBOAd1bmkwNEE5B3VuaTA0QUEHdW5pMDRBQgd1bmkwNEFDB3VuaTA0QUQHdW5pMDRBRQd1bmkwNEFGB3VuaTA0QjAHdW5pMDRCMQd1bmkwNEIyB3VuaTA0QjMHdW5pMDRCNAd1bmkwNEI1B3VuaTA0QjYHdW5pMDRCNwd1bmkwNEI4B3VuaTA0QjkHdW5pMDRCQQd1bmkwNEJCB3VuaTA0QkMHdW5pMDRCRAd1bmkwNEJFB3VuaTA0QkYLdW5pMDRDMC5hbHQHdW5pMDRDMQd1bmkwNEMyB3VuaTA0QzMHdW5pMDRDNAd1bmkwNEM1B3VuaTA0QzYHdW5pMDRDNwd1bmkwNEM4B3VuaTA0QzkHdW5pMDRDQQd1bmkwNENCB3VuaTA0Q0MHdW5pMDRDRAd1bmkwNENFC3VuaTA0Q0YuYWx0B3VuaTA0RDAHdW5pMDREMQd1bmkwNEQyB3VuaTA0RDMHdW5pMDRENAd1bmkwNEQ1B3VuaTA0RDYHdW5pMDRENwd1bmkwNEQ4B3VuaTA0RDkHdW5pMDREQQd1bmkwNERCB3VuaTA0REMHdW5pMDRERAd1bmkwNERFB3VuaTA0REYHdW5pMDRFMAd1bmkwNEUxB3VuaTA0RTIHdW5pMDRFMwd1bmkwNEU0B3VuaTA0RTUHdW5pMDRFNgd1bmkwNEU3B3VuaTA0RTgHdW5pMDRFOQd1bmkwNEVBB3VuaTA0RUIHdW5pMDRFQwd1bmkwNEVEB3VuaTA0RUUHdW5pMDRFRgd1bmkwNEYwB3VuaTA0RjEHdW5pMDRGMgd1bmkwNEYzB3VuaTA0RjQHdW5pMDRGNQd1bmkwNEY2B3VuaTA0RjcHdW5pMDRGOAd1bmkwNEY5B3VuaTA0RkEHdW5pMDRGQgd1bmkwNEZDB3VuaTA0RkQHdW5pMDRGRQd1bmkwNEZGB3VuaTA1MDAHdW5pMDUwMQd1bmkwNTAyB3VuaTA1MDMHdW5pMDUwNAd1bmkwNTA1B3VuaTA1MDYHdW5pMDUwNwd1bmkwNTA4B3VuaTA1MDkHdW5pMDUwQQd1bmkwNTBCB3VuaTA1MEMHdW5pMDUwRAd1bmkwNTBFB3VuaTA1MEYHdW5pMDUxMAd1bmkwNTExB3VuaTA1MTIHdW5pMDUxMwd1bmkxRUEwB3VuaTFFQTEHdW5pMUVBMgd1bmkxRUEzB3VuaTFFQTQHdW5pMUVBNQd1bmkxRUE2B3VuaTFFQTcHdW5pMUVBOAd1bmkxRUE5B3VuaTFFQUEHdW5pMUVBQgd1bmkxRUFDB3VuaTFFQUQHdW5pMUVBRQd1bmkxRUFGB3VuaTFFQjAHdW5pMUVCMQd1bmkxRUIyB3VuaTFFQjMHdW5pMUVCNAd1bmkxRUI1B3VuaTFFQjYHdW5pMUVCNwd1bmkxRUI4B3VuaTFFQjkHdW5pMUVCQQd1bmkxRUJCB3VuaTFFQkMHdW5pMUVCRAd1bmkxRUJFB3VuaTFFQkYHdW5pMUVDMAd1bmkxRUMxB3VuaTFFQzIHdW5pMUVDMwd1bmkxRUM0B3VuaTFFQzUHdW5pMUVDNgd1bmkxRUM3C3VuaTFFQzguYWx0B3VuaTFFQzkLdW5pMUVDQS5hbHQHdW5pMUVDQgd1bmkxRUNDB3VuaTFFQ0QHdW5pMUVDRQd1bmkxRUNGB3VuaTFFRDAHdW5pMUVEMQd1bmkxRUQyB3VuaTFFRDMHdW5pMUVENAd1bmkxRUQ1B3VuaTFFRDYHdW5pMUVENwd1bmkxRUQ4B3VuaTFFRDkHdW5pMUVEQQd1bmkxRURCB3VuaTFFREMHdW5pMUVERAd1bmkxRURFB3VuaTFFREYHdW5pMUVFMAd1bmkxRUUxB3VuaTFFRTIHdW5pMUVFMwd1bmkxRUU0B3VuaTFFRTUHdW5pMUVFNgd1bmkxRUU3B3VuaTFFRTgHdW5pMUVFOQd1bmkxRUVBB3VuaTFFRUIHdW5pMUVFQwd1bmkxRUVEB3VuaTFFRUUHdW5pMUVFRgd1bmkxRUYwB3VuaTFFRjEHdW5pMUVGNAd1bmkxRUY1B3VuaTFFRjYHdW5pMUVGNwd1bmkxRUY4B3VuaTFFRjkHdW5pMjBBQgd1bmkwMzBGE2NpcmN1bWZsZXhhY3V0ZWNvbWITY2lyY3VtZmxleGdyYXZlY29tYhJjaXJjdW1mbGV4aG9va2NvbWITY2lyY3VtZmxleHRpbGRlY29tYg5icmV2ZWFjdXRlY29tYg5icmV2ZWdyYXZlY29tYg1icmV2ZWhvb2tjb21iDmJyZXZldGlsZGVjb21iEGN5cmlsbGljaG9va2xlZnQIb25lLnBudW0HemVyby5vcwZvbmUub3MGdHdvLm9zCHRocmVlLm9zB2ZvdXIub3MHZml2ZS5vcwZzaXgub3MIc2V2ZW4ub3MIZWlnaHQub3MHbmluZS5vcwJmZgd1bmkyMTIwCFRjZWRpbGxhCHRjZWRpbGxhBWcuYWx0D2djaXJjdW1mbGV4LmFsdApnYnJldmUuYWx0CGdkb3QuYWx0EGdjb21tYWFjY2VudC5hbHQGSXRpbGRlB0ltYWNyb24GSWJyZXZlB0lvZ29uZWsCSUoJSW90YXRvbm9zBElvdGEMSW90YWRpZXJlc2lzCWFmaWkxMDA1NQlhZmlpMTAwNTYHdW5pMDRDMAd1bmkwNENGB3VuaTFFQzgHdW5pMUVDQQAAAAAPALoAAwABBAkAAAByAAAAAwABBAkAAQAkAHIAAwABBAkAAgAMAJYAAwABBAkAAwBCAKIAAwABBAkABAAyAOQAAwABBAkABQAYARYAAwABBAkABgAuAS4AAwABBAkABwCkAVwAAwABBAkACAAoAgAAAwABBAkACwA4AigAAwABBAkADABcAmAAAwABBAkADQBcArwAAwABBAkADgBUAxgAAwABBAkAEAASA2wAAwABBAkAEQAeA34ARABpAGcAaQB0AGkAegBlAGQAIABkAGEAdABhACAAYwBvAHAAeQByAGkAZwBoAHQAIACpACAAMgAwADEAMAAtADIAMAAxADEALAAgAEcAbwBvAGcAbABlACAAQwBvAHIAcABvAHIAYQB0AGkAbwBuAC4ATwBwAGUAbgAgAFMAYQBuAHMAIABTAGUAbQBpAEIAbwBsAGQASQB0AGEAbABpAGMAMQAuADEAMAA7ADEAQQBTAEMAOwBPAHAAZQBuAFMAYQBuAHMALQBTAGUAbQBpAEIAbwBsAGQASQB0AGEAbABpAGMATwBwAGUAbgAgAFMAYQBuAHMAIABTAGUAbQBpAEIAbwBsAGQAIABJAHQAYQBsAGkAYwBWAGUAcgBzAGkAbwBuACAAMQAuADEAMABPAHAAZQBuAFMAYQBuAHMALQBTAGUAbQBpAEIAbwBsAGQASQB0AGEAbABpAGMATwBwAGUAbgAgAFMAYQBuAHMAIABpAHMAIABhACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYAIABHAG8AbwBnAGwAZQAgAGEAbgBkACAAbQBhAHkAIABiAGUAIAByAGUAZwBpAHMAdABlAHIAZQBkACAAaQBuACAAYwBlAHIAdABhAGkAbgAgAGoAdQByAGkAcwBkAGkAYwB0AGkAbwBuAHMALgBBAHMAYwBlAG4AZABlAHIAIABDAG8AcgBwAG8AcgBhAHQAaQBvAG4AaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGEAcwBjAGUAbgBkAGUAcgBjAG8AcgBwAC4AYwBvAG0ALwBoAHQAdABwADoALwAvAHcAdwB3AC4AYQBzAGMAZQBuAGQAZQByAGMAbwByAHAALgBjAG8AbQAvAHQAeQBwAGUAZABlAHMAaQBnAG4AZQByAHMALgBoAHQAbQBsAEwAaQBjAGUAbgBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAQQBwAGEAYwBoAGUAIABMAGkAYwBlAG4AcwBlACwAIABWAGUAcgBzAGkAbwBuACAAMgAuADAAaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGEAcABhAGMAaABlAC4AbwByAGcALwBsAGkAYwBlAG4AcwBlAHMALwBMAEkAQwBFAE4AUwBFAC0AMgAuADAATwBwAGUAbgAgAFMAYQBuAHMAUwBlAG0AaQBCAG8AbABkACAASQB0AGEAbABpAGMAAAABAAAAARnbnKlTxF8PPPUACQgAAAAAAMljSJYAAAAA1SvM1fwf/cEKGQhiAAIACQACAAEAAAAAAAMElgJYAAUAAAWaBTMAAAEfBZoFMwAAA9EAZgIAAAACCwcGAwgEAgIE4AAC70AAIFsAAAAoAAAAADFBU0MAAQAg//0GH/4UAIQIjQJYIAABnwAAAAAEUgW2AAAAIAADCmVuZHN0cmVhbQplbmRvYmoKNDEgMCBvYmoKPDwKL0xlbmd0aCA2MTUKL0xlbmd0aDEgNjE1Cj4+CnN0cmVhbQovQ0lESW5pdCAvUHJvY1NldCBmaW5kcmVzb3VyY2UgYmVnaW4KMTIgZGljdCBiZWdpbgpiZWdpbmNtYXAKL0NJRFN5c3RlbUluZm8gPDwKICAvUmVnaXN0cnkgKEFkb2JlKQogIC9PcmRlcmluZyAoVUNTKQogIC9TdXBwbGVtZW50IDAKPj4gZGVmCi9DTWFwTmFtZSAvQWRvYmUtSWRlbnRpdHktVUNTIGRlZgovQ01hcFR5cGUgMiBkZWYKMSBiZWdpbmNvZGVzcGFjZXJhbmdlCjwwMDAwPjxmZmZmPgplbmRjb2Rlc3BhY2VyYW5nZQoyMiBiZWdpbmJmY2hhcgo8MDAwMz48MDAyMD4KPDAwMWQ+PDAwM2E+CjwwMDI3PjwwMDQ0Pgo8MDAzNz48MDA1ND4KPDAwNDQ+PDAwNjE+CjwwMDQ2PjwwMDYzPgo8MDA0Nz48MDA2ND4KPDAwNDg+PDAwNjU+CjwwMDQ5PjwwMDY2Pgo8MDA0YT48MDA2Nz4KPDAwNGI+PDAwNjg+CjwwMDRjPjwwMDY5Pgo8MDA0Zj48MDA2Yz4KPDAwNTA+PDAwNmQ+CjwwMDUxPjwwMDZlPgo8MDA1Mj48MDA2Zj4KPDAwNTM+PDAwNzA+CjwwMDU1PjwwMDcyPgo8MDA1Nj48MDA3Mz4KPDAwNTc+PDAwNzQ+CjwwMDU4PjwwMDc1Pgo8MDA1Yz48MDA3OT4KZW5kYmZjaGFyCmVuZGNtYXAKQ01hcE5hbWUgY3VycmVudGRpY3QgL0NNYXAgZGVmaW5lcmVzb3VyY2UgcG9wCmVuZAplbmQKZW5kc3RyZWFtCmVuZG9iago0MiAwIG9iago8PAovVHlwZSAvRm9udERlc2NyaXB0b3IKL0ZvbnROYW1lIC9PcGVuU2FucwovRm9udEZpbGUyIDQwIDAgUgovRm9udEJCb3ggWy00ODUgLTI4MSAxMjYyIDEwNDhdCi9GbGFncyAzMgovU3RlbVYgMAovSXRhbGljQW5nbGUgMAovQXNjZW50IDEwNjkKL0Rlc2NlbnQgLTI5MwovQ2FwSGVpZ2h0IDE0NjIKPj4KZW5kb2JqCjQzIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvT3BlblNhbnMKL0ZvbnREZXNjcmlwdG9yIDQyIDAgUgovVyBbMzkgWzY3MF0gNzIgWzUyNF0gNjggWzU3OV0gODUgWzQwOF0gMyBbMjU5XSA4NiBbNDUwXSA3MSBbNTg0XSA1NSBbNTE0XSA3NSBbNTg5XSA3NiBbMjc0XSA5MiBbNDkwXSA3MCBbNDY1XSA4MiBbNTczXSA3OSBbMjc0XSA4NyBbMzY3XSA4MSBbNTg5XSA3MyBbMzQyXSA4MCBbODg4XSA3NCBbNTIwXSAyOSBbMjY5XSA4MyBbNTg1XSA4OCBbNTg5XV0KL0NJRFRvR0lETWFwIC9JZGVudGl0eQovRFcgMTAwMAovU3VidHlwZSAvQ0lERm9udFR5cGUyCi9DSURTeXN0ZW1JbmZvCjw8Ci9TdXBwbGVtZW50IDAKL1JlZ2lzdHJ5IChBZG9iZSkKL09yZGVyaW5nIChJZGVudGl0eS1IKQo+Pgo+PgplbmRvYmoKNDQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUwCi9Ub1VuaWNvZGUgNDEgMCBSCi9CYXNlRm9udCAvT3BlblNhbnMKL0VuY29kaW5nIC9JZGVudGl0eS1ICi9EZXNj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DkAAAA5AAAAOQAAADkAAAA5AAAAOQAAADkAAAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA5+AAAOfgAADn4AAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OAAAOzgAADs4AAA7OBM0AwQAAAAAEFAAAAhQAAAIjAJgDNQCFBSsAMwSTAIMGlgBoBdcAcQHFAIUCXgBSAl4APQRqAFYEkwBoAfYAPwKTAFQCIQCYAvAAFASTAGYEkwC8BJMAZASTAF4EkwArBJMAhQSTAHUEkwBeBJMAaASTAGoCIQCYAiEAPwSTAGgEkwB3BJMAaANvABsHMQB5BRAAAAUvAMkFDAB9BdUAyQRzAMkEIQDJBdMAfQXnAMkCqgBUAiP/YATpAMkEJwDJBzkAyQYIAMkGOwB9BNEAyQY7AH0E8gDJBGQAagRtABIF0wC6BMMAAAdoABsEngAIBHsAAASRAFICogCmAvAAFwKiADMEVgAxA5b//ASeAYkEcwBeBOcAsAPPAHME5wBzBH0AcwK2AB0EYgAnBOkAsAIGAKICBv+RBDMAsAIGALAHcQCwBOkAsATVAHME5wCwBOcAcwNEALAD0QBqAtMAHwTpAKQEAgAABjkAFwQxACcECAACA74AUgMIAD0EaAHuAwgASASTAGgCFAAAAiMAmASTAL4EkwA/BJMAewSTAB8EaAHuBCEAewSeATUGqABkAtUARgP6AFIEkwBoApMAVAaoAGQEAP/6A20AfwSTAGgCxwAxAscAIQSeAYkE9ACwBT0AcQIhAJgB0QAlAscATAMAAEID+gBQBj0ASwY9AC4GPQAaA28AMwUQAAAFEAAABRAAAAUQAAAFEAAABRAAAAb8//4FDAB9BHMAyQRzAMkEcwDJBHMAyQKqADwCqgBUAqr//wKqADwFxwAvBggAyQY7AH0GOwB9BjsAfQY7AH0GOwB9BJMAhQY7AH0F0wC6BdMAugXTALoF0wC6BHsAAATjAMkE+gCwBHMAXgRzAF4EcwBeBHMAXgRzAF4EcwBeBt0AXgPPAHMEfQBzBH0AcwR9AHMEfQBzAgb/2gIGAKkCBv+zAgb/7ATFAHEE6QCwBNUAcwTVAHME1QBzBNUAcwTVAHMEkwBoBNUAcwTpAKQE6QCkBOkApATpAKQECAACBOcAsAQIAAIFEAAABHMAXgUQAAAEcwBeBRAAAARzAF4FDAB9A88AcwUMAH0DzwBzBQwAfQPPAHMFDAB9A88AcwXVAMkE5wBzBccALwTnAHMEcwDJBH0AcwRzAMkEfQBzBHMAyQR9AHMEcwDJBH0AcwRzAMkEfQBzBdMAfQRiACcF0wB9BGIAJwXTAH0EYgAnBdMAfQRiACcF5wDJBOkAsAXnAAAE6QAUAqr/4gIG/5ACqgAqAgb/2gKqAB4CBv/MAqoAVAIGADUCqgBUAgYAsATNAFQEDACiAiP/YAIG/5EE6QDJBDMAsAQlALAEJwDJAgYAowQnAMkCBgBZBCcAyQIGALAEJwDJAoMAsAQvAB0CF//8BggAyQTpALAGCADJBOkAsAYIAMkE6QCwBXMAAQYIAMkE6QCwBjsAfQTVAHMGOwB9BNUAcwY7AH0E1QBzB2IAfQeJAHEE8gDJA0QAsATyAMkDRABgBPIAyQNEAIIEZABqA9EAagRkAGoD0QBqBGQAagPRAGoEZABqA9EAagRtABIC0wAfBG0AEgLTAB8EbQASAtMAHwXT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ABoAGwAcAB0AHgAfACAAIQAiACMAJAAlACYAJwAoACkAKgArAQMALQAuAC8AMAAxADIAMwA0ADUANgA3ADgAOQA6ADsAPAA9AD4APwBAAEEAQgBDAEQARQBGAEcASABJAEoASwBMAE0ATgBPAFAAUQBSAFMAVABVAFYAVwBYAFkAWgBbAFwAXQBeAF8AYABhAKwAowCEAIUAvQCWAOgAhgCOAIsAnQCpAKQBBACKAQUAgwCTAPIA8wCNAJcAiADDAN4A8QCeAKoA9QD0APYAogCtAMkAxwCuAGIAYwCQAGQAywBlAMgAygEGAQcBCAEJAOkAZgDTANAA0QCvAGcA8ACRANYA1ADVAGgA6wDtAIkAagBpAGsAbQBsAG4AoABvAHEAcAByAHMAdQB0AHYAdwDqAHgAegB5AHsAfQB8ALgAoQB/AH4AgACBAOwA7gC6AQoBCwEMAQ0BDgEPAP0A/gEQAREBEgETAP8BAAEUARUBFgEBARcBGAEZARoBGwEcAR0BHgEfASABIQEiAPgA+QEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMA1wE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgDiAOMBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEAsACxAVIBUwFUAVUBVgFXAVgBWQFaAVsA+wD8AOQA5QFcAV0BXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagFrAWwBbQFuAW8BcAFxALsBcgFzAXQBdQDmAOcBdgCmAXcBeAF5AXoBewF8AX0BfgDYAOEA2gDbANwA3QDgANkA3wF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwCbAbgBuQG6AbsBvAG9Ab4BvwHAAcEBwgHDAcQBxQHGAccByAHJAcoBywHMAc0BzgHPAdAB0QHSAdMB1AHVAdYB1wHYAdkB2gHbAdwB3QHeAd8B4AHhAeIB4wHkAeUB5gHnAegB6QHqAesB7AHtAe4B7wHwAfEB8gHzAfQB9QH2AfcB+AH5AfoB+wH8Af0B/gH/AgACAQICAgMCBAIFAgYCBwIIAgkCCgILAgwCDQIOAg8CEAIRAhICEwIUAhUCFgIXAhgCGQIaAhsCHAIdAh4CHwIgAiECIgIjAiQCJQImAicCKAIpAioCKwCyALMCLAItALYAtwDEAi4AtAC1AMUAggDCAIcAqwDGAi8CMAC+AL8CMQC8AjIA9wIzAjQCNQI2AjcCOACMAJ8COQI6AjsCPAI9AJgAqACaAJkA7wClAJIAnACnAI8AlACVALkCPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UDdgN3A3gDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOeA58ALADPAMwAzQDOA6ADoQOiA6MA+gOkA6UDpgOnA6gDqQOqA6sDrAOtBG51bGwFSS5hbHQHdW5pMDBBRAlvdmVyc2NvcmUKSWdyYXZlLmFsdApJYWN1dGUuYWx0D0ljaXJjdW1mbGV4LmFsdA1JZGllcmVzaXMuYWx0B0FtYWNyb24HYW1hY3JvbgZBYnJldmUGYWJyZXZlB0FvZ29uZWsHYW9nb25lawtDY2lyY3VtZmxleAtjY2lyY3VtZmxleARDZG90BGNkb3QGRGNhcm9uBmRjYXJvbgZEY3JvYXQHRW1hY3JvbgdlbWFjcm9uBkVicmV2ZQZlYnJldmUKRWRvdGFjY2VudAplZG90YWNjZW50B0VvZ29uZWsHZW9nb25lawZFY2Fyb24GZWNhcm9uC0djaXJjdW1mbGV4C2djaXJjdW1mbGV4BEdkb3QEZ2RvdAxHY29tbWFhY2NlbnQMZ2NvbW1hYWNjZW50C0hjaXJjdW1mbGV4C2hjaXJjdW1mbGV4BEhiYXIEaGJhcgpJdGlsZGUuYWx0Bml0aWxkZQtJbWFjcm9uLmFsdAdpbWFjcm9uCklicmV2ZS5hbHQGaWJyZXZlC0lvZ29uZWsuYWx0B2lvZ29uZWsOSWRvdGFjY2VudC5hbHQGSUouYWx0AmlqC0pjaXJjdW1mbGV4C2pjaXJjdW1mbGV4DEtjb21tYWFjY2VudAxrY29tbWFhY2NlbnQMa2dyZWVubGFuZGljBkxhY3V0ZQZsYWN1dGUMTGNvbW1hYWNjZW50DGxjb21tYWFjY2VudAZMY2Fyb24GbGNhcm9uBExkb3QEbGRvdAZOYWN1dGUGbmFjdXRlDE5jb21tYWFjY2VudAxuY29tbWFhY2NlbnQGTmNhcm9uBm5jYXJvbgtuYXBvc3Ryb3BoZQNFbmcDZW5nB09tYWNyb24Hb21hY3JvbgZPYnJldmUGb2JyZXZlDU9odW5nYXJ1bWxhdXQNb2h1bmdhcnVtbGF1dAZSYWN1dGUGcmFjdXRlDFJjb21tYWFjY2VudAxyY29tbWFhY2NlbnQGUmNhcm9uBnJjYXJvbgZTYWN1dGUGc2FjdXRlC1NjaXJjdW1mbGV4C3NjaXJjdW1mbGV4DFRjb21tYWFjY2VudAx0Y29tbWFhY2NlbnQGVGNhcm9uBnRjYXJvbgRUYmFyBHRiYXIGVXRpbGRlBnV0aWxkZQdVbWFjcm9uB3VtYWNyb24GVWJyZXZlBnVicmV2ZQVVcmluZwV1cmluZw1VaHVuZ2FydW1sYXV0DXVodW5nYXJ1bWxhdXQHVW9nb25lawd1b2dvbmVrC1djaXJjdW1mbGV4C3djaXJjdW1mbGV4C1ljaXJjdW1mbGV4C3ljaXJjdW1mbGV4BlphY3V0ZQZ6YWN1dGUKWmRvdGFjY2VudAp6ZG90YWNjZW50BWxvbmdzCkFyaW5nYWN1dGUKYXJpbmdhY3V0ZQdBRWFjdXRlB2FlYWN1dGULT3NsYXNoYWN1dGULb3NsYXNoYWN1dGUMU2NvbW1hYWNjZW50DHNjb21tYWFjY2VudAV0b25vcw1kaWVyZXNpc3Rvbm9zCkFscGhhdG9ub3MJYW5vdGVsZWlhDEVwc2lsb250b25vcwhFdGF0b25vcw1Jb3RhdG9ub3MuYWx0DE9taWNyb250b25vcwxVcHNpbG9udG9ub3MKT21lZ2F0b25vcxFpb3RhZGllcmVzaXN0b25vcwVBbHBoYQRCZXRhBUdhbW1hB3VuaTAzOTQHRXBzaWxvbgRaZXRhA0V0YQVUaGV0YQhJb3RhLmFsdAVLYXBwYQZMYW1iZGECTXUCTnUCWGkHT21pY3JvbgJQaQNSaG8FU2lnbWEDVGF1B1Vwc2lsb24DUGhpA0NoaQNQc2kHdW5pMDNBORBJb3RhZGllcmVzaXMuYWx0D1Vwc2lsb25kaWVyZXNpcwphbHBoYXRvbm9zDGVwc2lsb250b25vcwhldGF0b25vcwlpb3RhdG9ub3MUdXBzaWxvbmRpZXJlc2lzdG9ub3MFYWxwaGEEYmV0YQVnYW1tYQVkZWx0YQdlcHNpbG9uBHpldGEDZXRhBXRoZXRhBGlvdGEFa2FwcGEGbGFtYmRhB3VuaTAzQkMCbnUCeGkHb21pY3JvbgNyaG8Gc2lnbWExBXNpZ21hA3RhdQd1cHNpbG9uA3BoaQNjaGkDcHNpBW9tZWdhDGlvdGFkaWVyZXNpcw91cHNpbG9uZGllcmVzaXMMb21pY3JvbnRvbm9zDHVwc2lsb250b25vcwpvbWVnYXRvbm9zCWFmaWkxMDAyMwlhZmlpMTAwNTEJYWZpaTEwMDUyCWFmaWkxMDA1MwlhZmlpMTAwNTQNYWZpaTEwMDU1LmFsdA1hZmlpMTAwNTYuYWx0CWFmaWkxMDA1NwlhZmlpMTAwNTgJYWZpaTEwMDU5CWFmaWkxMDA2MAlhZmlpMTAwNjEJYWZpaTEwMDYyCWFmaWkxMDE0NQlhZmlpMTAwMTcJYWZpaTEwMDE4CWFmaWkxMDAxOQlhZmlpMTAwMjAJYWZpaTEwMDIxCWFmaWkxMDAyMglhZmlpMTAwMjQJYWZpaTEwMDI1CWFmaWkxMDAyNglhZmlpMTAwMjcJYWZpaTEwMDI4CWFmaWkxMDAyOQlhZmlpMTAwMzAJYWZpaTEwMDMxCWFmaWkxMDAzMglhZmlpMTAwMzMJYWZpaTEwMDM0CWFmaWkxMDAzNQlhZmlpMTAwMzYJYWZpaTEwMDM3CWFmaWkxMDAzOAlhZmlpMTAwMzkJYWZpaTEwMDQwCWFmaWkxMDA0MQlhZmlpMTAwNDIJYWZpaTEwMDQzCWFmaWkxMDA0NAlhZmlpMTAwNDUJYWZpaTEwMDQ2CWFmaWkxMDA0NwlhZmlpMTAwNDgJYWZpaTEwMDQ5CWFmaWkxMDA2NQlhZmlpMTAwNjYJYWZpaTEwMDY3CWFmaWkxMDA2OAlhZmlpMTAwNjkJYWZpaTEwMDcwCWFmaWkxMDA3MglhZmlpMTAwNzMJYWZpaTEwMDc0CWFmaWkxMDA3NQlhZmlpMTAwNzYJYWZpaTEwMDc3CWFmaWkxMDA3OAlhZmlpMTAwNzkJYWZpaTEwMDgwCWFmaWkxMDA4MQlhZmlpMTAwODIJYWZpaTEwMDgzCWFmaWkxMDA4NAlhZmlpMTAwODUJYWZpaTEwMDg2CWFmaWkxMDA4NwlhZmlpMTAwODgJYWZpaTEwMDg5CWFmaWkxMDA5MAlhZmlpMTAwOTEJYWZpaTEwMDkyCWFmaWkxMDA5MwlhZmlpMTAwOTQJYWZpaTEwMDk1CWFmaWkxMDA5NglhZmlpMTAwOTcJYWZpaTEwMDcxCWFmaWkxMDA5OQlhZmlpMTAxMDAJYWZpaTEwMTAxCWFmaWkxMDEwMglhZmlpMTAxMDMJYWZpaTEwMTA0CWFmaWkxMDEwNQlhZmlpMTAxMDYJYWZpaTEwMTA3CWFmaWkxMDEwOAlhZmlpMTAxMDkJYWZpaTEwMTEwCWFmaWkxMDE5MwlhZmlpMTAwNTAJYWZpaTEwMDk4BldncmF2ZQZ3Z3JhdmUGV2FjdXRlBndhY3V0ZQlXZGllcmVzaXMJd2RpZXJlc2lzBllncmF2ZQZ5Z3JhdmUJYWZpaTAwMjA4DXVuZGVyc2NvcmVkYmwNcXVvdGVyZXZlcnNlZAZtaW51dGUGc2Vjb25kCWV4Y2xhbWRibAluc3VwZXJpb3IJYWZpaTA4OTQxBnBlc2V0YQRFdXJvCWFmaWk2MTI0OAlhZmlpNjEyODkJYWZpaTYxMzUyCWVzdGltYXRlZAlvbmVlaWdodGgMdGhyZWVlaWdodGhzC2ZpdmVlaWdodGhzDHNldmVuZWlnaHRocwd1bmlGQjAxB3VuaUZCMDINY3lyaWxsaWNicmV2ZQhkb3RsZXNzahBjYXJvbmNvbW1hYWNjZW50C2NvbW1hYWNjZW50EWNvbW1hYWNjZW50cm90YXRlDHplcm9zdXBlcmlvcgxmb3Vyc3VwZXJpb3IMZml2ZXN1cGVyaW9yC3NpeHN1cGVyaW9yDXNldmVuc3VwZXJpb3INZWlnaHRzdXBlcmlvcgxuaW5lc3VwZXJpb3IHdW5pMjAwMAd1bmkyMDAxB3VuaTIwMDIHdW5pMjAwMwd1bmkyMDA0B3VuaTIwMDUHdW5pMjAwNgd1bmkyMDA3B3VuaTIwMDgHdW5pMjAwOQd1bmkyMDBBB3VuaTIwMEIHdW5pRkVGRgd1bmlGRkZDB3VuaUZGRkQHdW5pMDFGMAd1bmkwMkJDB3VuaTAzRDEHdW5pMDNEMgd1bmkwM0Q2B3VuaTFFM0UHdW5pMUUzRgd1bmkxRTAwB3VuaTFFMDEHdW5pMUY0RAd1bmkwMkYzCWRhc2lhb3hpYQd1bmlGQjAzB3VuaUZCMDQFT2hvcm4Fb2hvcm4FVWhvcm4FdWhvcm4HdW5pMDMwMAd1bmkwMzAxB3VuaTAzMDMEaG9vawhkb3RiZWxvdwd1bmkwNDAwB3VuaTA0MEQHdW5pMDQ1MAd1bmkwNDVEB3VuaTA0NjAHdW5pMDQ2MQd1bmkwNDYyB3VuaTA0NjMHdW5pMDQ2NAd1bmkwNDY1B3VuaTA0NjYHdW5pMDQ2Nwd1bmkwNDY4B3VuaTA0NjkHdW5pMDQ2QQd1bmkwNDZCB3VuaTA0NkMHdW5pMDQ2RAd1bmkwNDZFB3VuaTA0NkYHdW5pMDQ3MAd1bmkwNDcxB3VuaTA0NzIHdW5pMDQ3Mwd1bmkwNDc0B3VuaTA0NzUHdW5pMDQ3Ngd1bmkwNDc3B3VuaTA0NzgHdW5pMDQ3OQd1bmkwNDdBB3VuaTA0N0IHdW5pMDQ3Qwd1bmkwNDdEB3VuaTA0N0UHdW5pMDQ3Rgd1bmkwNDgwB3VuaTA0ODEHdW5pMDQ4Mgd1bmkwNDgzB3VuaTA0ODQHdW5pMDQ4NQd1bmkwNDg2B3VuaTA0ODgHdW5pMDQ4OQd1bmkwNDhBB3VuaTA0OEIHdW5pMDQ4Qwd1bmkwNDhEB3VuaTA0OEUHdW5pMDQ4Rgd1bmkwNDkyB3VuaTA0OTMHdW5pMDQ5NAd1bmkwNDk1B3VuaTA0OTYHdW5pMDQ5Nwd1bmkwNDk4B3VuaTA0OTkHdW5pMDQ5QQd1bmkwNDlCB3VuaTA0OUMHdW5pMDQ5RAd1bmkwNDlFB3VuaTA0OUYHdW5pMDRBMAd1bmkwNEExB3VuaTA0QTIHdW5pMDRBMwd1bmkwNEE0B3VuaTA0QTUHdW5pMDRBNgd1bmkwNEE3B3VuaTA0QTgHdW5pMDRBOQd1bmkwNEFBB3VuaTA0QUIHdW5pMDRBQwd1bmkwNEFEB3VuaTA0QUUHdW5pMDRBRgd1bmkwNEIwB3VuaTA0QjEHdW5pMDRCMgd1bmkwNEIzB3VuaTA0QjQHdW5pMDRCNQd1bmkwNEI2B3VuaTA0QjcHdW5pMDRCOAd1bmkwNEI5B3VuaTA0QkEHdW5pMDRCQgd1bmkwNEJDB3VuaTA0QkQHdW5pMDRCRQd1bmkwNEJGC3VuaTA0QzAuYWx0B3VuaTA0QzEHdW5pMDRDMgd1bmkwNEMzB3VuaTA0QzQHdW5pMDRDNQd1bmkwNEM2B3VuaTA0QzcHdW5pMDRDOAd1bmkwNEM5B3VuaTA0Q0EHdW5pMDRDQgd1bmkwNENDB3VuaTA0Q0QHdW5pMDRDRQt1bmkwNENGLmFsdAd1bmkwNEQwB3VuaTA0RDEHdW5pMDREMgd1bmkwNEQzB3VuaTA0RDQHdW5pMDRENQd1bmkwNEQ2B3VuaTA0RDcHdW5pMDREOAd1bmkwNEQ5B3VuaTA0REEHdW5pMDREQgd1bmkwNERDB3VuaTA0REQHdW5pMDRERQd1bmkwNERGB3VuaTA0RTAHdW5pMDRFMQd1bmkwNEUyB3VuaTA0RTMHdW5pMDRFNAd1bmkwNEU1B3VuaTA0RTYHdW5pMDRFNwd1bmkwNEU4B3VuaTA0RTkHdW5pMDRFQQd1bmkwNEVCB3VuaTA0RUMHdW5pMDRFRAd1bmkwNEVFB3VuaTA0RUYHdW5pMDRGMAd1bmkwNEYxB3VuaTA0RjIHdW5pMDRGMwd1bmkwNEY0B3VuaTA0RjUHdW5pMDRGNgd1bmkwNEY3B3VuaTA0RjgHdW5pMDRGOQd1bmkwNEZBB3VuaTA0RkIHdW5pMDRGQwd1bmkwNEZEB3VuaTA0RkUHdW5pMDRGRgd1bmkwNTAwB3VuaTA1MDEHdW5pMDUwMgd1bmkwNTAzB3VuaTA1MDQHdW5pMDUwNQd1bmkwNTA2B3VuaTA1MDcHdW5pMDUwOAd1bmkwNTA5B3VuaTA1MEEHdW5pMDUwQgd1bmkwNTBDB3VuaTA1MEQHdW5pMDUwRQd1bmkwNTBGB3VuaTA1MTAHdW5pMDUxMQd1bmkwNTEyB3VuaTA1MTMHdW5pMUVBMAd1bmkxRUExB3VuaTFFQTIHdW5pMUVBMwd1bmkxRUE0B3VuaTFFQTUHdW5pMUVBNgd1bmkxRUE3B3VuaTFFQTgHdW5pMUVBOQd1bmkxRUFBB3VuaTFFQUIHdW5pMUVBQwd1bmkxRUFEB3VuaTFFQUUHdW5pMUVBRgd1bmkxRUIwB3VuaTFFQjEHdW5pMUVCMgd1bmkxRUIzB3VuaTFFQjQHdW5pMUVCNQd1bmkxRUI2B3VuaTFFQjcHdW5pMUVCOAd1bmkxRUI5B3VuaTFFQkEHdW5pMUVCQgd1bmkxRUJDB3VuaTFFQkQHdW5pMUVCRQd1bmkxRUJGB3VuaTFFQzAHdW5pMUVDMQd1bmkxRUMyB3VuaTFFQzMHdW5pMUVDNAd1bmkxRUM1B3VuaTFFQzYHdW5pMUVDNwt1bmkxRUM4LmFsdAd1bmkxRUM5C3VuaTFFQ0EuYWx0B3VuaTFFQ0IHdW5pMUVDQwd1bmkxRUNEB3VuaTFFQ0UHdW5pMUVDRgd1bmkxRUQwB3VuaTFFRDEHdW5pMUVEMgd1bmkxRUQzB3VuaTFFRDQHdW5pMUVENQd1bmkxRUQ2B3VuaTFFRDcHdW5pMUVEOAd1bmkxRUQ5B3VuaTFFREEHdW5pMUVEQgd1bmkxRURDB3VuaTFFREQHdW5pMUVERQd1bmkxRURGB3VuaTFFRTAHdW5pMUVFMQd1bmkxRUUyB3VuaTFFRTMHdW5pMUVFNAd1bmkxRUU1B3VuaTFFRTYHdW5pMUVFNwd1bmkxRUU4B3VuaTFFRTkHdW5pMUVFQQd1bmkxRUVCB3VuaTFFRUMHdW5pMUVFRAd1bmkxRUVFB3VuaTFFRUYHdW5pMUVGMAd1bmkxRUYxB3VuaTFFRjQHdW5pMUVGNQd1bmkxRUY2B3VuaTFFRjcHdW5pMUVGOAd1bmkxRUY5B3VuaTIwQUIHdW5pMDMwRhNjaXJjdW1mbGV4YWN1dGVjb21iE2NpcmN1bWZsZXhncmF2ZWNvbWISY2lyY3VtZmxleGhvb2tjb21iE2NpcmN1bWZsZXh0aWxkZWNvbWIOYnJldmVhY3V0ZWNvbWIOYnJldmVncmF2ZWNvbWINYnJldmVob29rY29tYg5icmV2ZXRpbGRlY29tYhBjeXJpbGxpY2hvb2tsZWZ0EWN5cmlsbGljYmlnaG9va1VDEWN5cmlsbGljYmlnaG9va0xDCG9uZS5wbnVtB3plcm8ub3MGb25lLm9zBnR3by5vcwh0aHJlZS5vcwdmb3VyLm9zB2ZpdmUub3MGc2l4Lm9zCHNldmVuLm9zCGVpZ2h0Lm9zB25pbmUub3MCZmYHdW5pMjEyMAhUY2VkaWxsYQh0Y2VkaWxsYQVnLmFsdA9nY2lyY3VtZmxleC5hbHQKZ2JyZXZlLmFsdAhnZG90LmFsdBBnY29tbWFhY2NlbnQuYWx0Bkl0aWxkZQdJbWFjcm9uBklicmV2ZQdJb2dvbmVrAklKCUlvdGF0b25vcwRJb3RhDElvdGFkaWVyZXNpcwlhZmlpMTAwNTUJYWZpaTEwMDU2B3VuaTA0QzAHdW5pMDRDRgd1bmkxRUM4B3VuaTFFQ0EAAAAADQCiAAMAAQQJAAAAcgAAAAMAAQQJAAEAEgByAAMAAQQJAAIADgCEAAMAAQQJAAMANACSAAMAAQQJAAQAIgDGAAMAAQQJAAUAGADoAAMAAQQJAAYAIAEAAAMAAQQJAAcApAEgAAMAAQQJAAgAKAHEAAMAAQQJAAsAOAHsAAMAAQQJAAwAXAIkAAMAAQQJAA0AXAKAAAMAAQQJAA4AVALcAEQAaQBnAGkAdABpAHoAZQBkACAAZABhAHQAYQAgAGMAbwBwAHkAcgBpAGcAaAB0ACAAqQAgADIAMAAxADAALQAyADAAMQAxACwAIABHAG8AbwBnAGwAZQAgAEMAbwByAHAAbwByAGEAdABpAG8AbgAuAE8AcABlAG4AIABTAGEAbgBzAFIAZQBnAHUAbABhAHIAMQAuADEAMAA7ADEAQQBTAEMAOwBPAHAAZQBuAFMAYQBuAHMALQBSAGUAZwB1AGwAYQByAE8AcABlAG4AIABTAGEAbgBzACAAUgBlAGcAdQBsAGEAcgBWAGUAcgBzAGkAbwBuACAAMQAuADEAMABPAHAAZQBuAFMAYQBuAHMALQBSAGUAZwB1AGwAYQByAE8AcABlAG4AIABTAGEAbgBzACAAaQBzACAAYQAgAHQAcgBhAGQAZQBtAGEAcgBrACAAbwBmACAARwBvAG8AZwBsAGUAIABhAG4AZAAgAG0AYQB5ACAAYgBlACAAcgBlAGcAaQBzAHQAZQByAGUAZAAgAGkAbgAgAGMAZQByAHQAYQBpAG4AIABqAHUAcgBpAHMAZABpAGMAdABpAG8AbgBzAC4AQQBzAGMAZQBuAGQAZQByACAAQwBvAHIAcABvAHIAYQB0AGkAbwBuAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBhAHMAYwBlAG4AZABlAHIAYwBvAHIAcAAuAGMAbwBtAC8AaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGEAcwBjAGUAbgBkAGUAcgBjAG8AcgBwAC4AYwBvAG0ALwB0AHkAcABlAGQAZQBzAGkAZwBuAGUAcgBzAC4AaAB0AG0AbABMAGkAYwBlAG4AcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAEEAcABhAGMAaABlACAATABpAGMAZQBuAHMAZQAsACAAVgBlAHIAcwBpAG8AbgAgADIALgAwAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBhAHAAYQBjAGgAZQAuAG8AcgBnAC8AbABpAGMAZQBuAHMAZQBzAC8ATABJAEMARQBOAFMARQAtADIALgAwAAAAAQAAAAEZ24vBckRfDzz1AAkIAAAAAADJNTGLAAAAANUrzNX7mv3VCaIIYgAAAAkAAgABAAAAAAADBLYBkAAFAAAFmgUzAAABHwWaBTMAAAPRAGYB8QgCAgsGBgMFBAICBOAAAu9AACBbAAAAKAAAAAAxQVNDAEAAIP/9Bh/+FACECI0CWCAAAZ8AAAAABEgFtgAAACAAAwplbmRzdHJlYW0KZW5kb2JqCjQ2IDAgb2JqCjw8Ci9MZW5ndGggNzMyCi9MZW5ndGgxIDczMgo+PgpzdHJlYW0KL0NJREluaXQgL1Byb2NTZXQgZmluZHJlc291cmNlIGJlZ2luCjEyIGRpY3QgYmVnaW4KYmVnaW5jbWFwCi9DSURTeXN0ZW1JbmZvIDw8CiAgL1JlZ2lzdHJ5IChBZG9iZSkKICAvT3JkZXJpbmcgKFVDUykKICAvU3VwcGxlbWVudCAwCj4+IGRlZgovQ01hcE5hbWUgL0Fkb2JlLUlkZW50aXR5LVVDUyBkZWYKL0NNYXBUeXBlIDIgZGVmCjEgYmVnaW5jb2Rlc3BhY2VyYW5nZQo8MDAwMD48ZmZmZj4KZW5kY29kZXNwYWNlcmFuZ2UKMzEgYmVnaW5iZmNoYXIKPDAwMDM+PDAwMjA+CjwwMDEwPjwwMDJkPgo8MDAxMj48MDAyZj4KPDAwMTM+PDAwMzA+CjwwMDE1PjwwMDMyPgo8MDAxNj48MDAzMz4KPDAwMTc+PDAwMzQ+CjwwMDI2PjwwMDQzPgo8MDAyYT48MDA0Nz4KPDAwMmQ+PDAwNGE+CjwwMDJlPjwwMDRiPgo8MDAyZj48MDA0Yz4KPDAwMzA+PDAwNGQ+CjwwMDM2PjwwMDUzPgo8MDAzYT48MDA1Nz4KPDAwNDQ+PDAwNjE+CjwwMDQ2PjwwMDYzPgo8MDA0OD48MDA2NT4KPDAwNGE+PDAwNjc+CjwwMDRiPjwwMDY4Pgo8MDA0Yz48MDA2OT4KPDAwNGY+PDAwNmM+CjwwMDUxPjwwMDZlPgo8MDA1Mj48MDA2Zj4KPDAwNTU+PDAwNzI+CjwwMDU2PjwwMDczPgo8MDA1Nz48MDA3ND4KPDAwNTg+PDAwNzU+CjwwMDU5PjwwMDc2Pgo8MDA1Yz48MDA3OT4KPDAwYWY+PDAwZWQ+CmVuZGJmY2hhcgplbmRjbWFwCkNNYXBOYW1lIGN1cnJlbnRkaWN0IC9DTWFwIGRlZmluZXJlc291cmNlIHBvcAplbmQKZW5kCmVuZHN0cmVhbQplbmRvYmoKNDcgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvT3BlblNhbnMKL0ZvbnRGaWxlMiA0NSAwIFIKL0ZvbnRCQm94IFstNTUwIC0yNzEgMTIwNCAxMDQ4XQovRmxhZ3MgMzIKL1N0ZW1WIDAKL0l0YWxpY0FuZ2xlIDAKL0FzY2VudCAxMDY5Ci9EZXNjZW50IC0yOTMKL0NhcEhlaWdodCAxNDYyCj4+CmVuZG9iago0OCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL09wZW5TYW5zCi9Gb250RGVzY3JpcHRvciA0NyAwIFIKL1cgWzQ2IFs2MTNdIDkyIFs1MDNdIDc5IFsyNTJdIDcyIFs1NjFdIDMgWzI1OV0gNDggWzkwMl0gODIgWzYwNF0gODEgWzYxM10gODcgWzM1M10gNjggWzU1Nl0gNzQgWzU0N10gODggWzYxM10gNDcgWzUxOV0gNzYgWzI1Ml0gNDIgWzcyOF0gODUgWzQwOF0gNDUgWzI2N10gODYgWzQ3N10gNzUgWzYxM10gNTQgWzU0OF0gNTggWzkyNV0gNzAgWzQ3Nl0gMTc1IFsyNTJdIDM4IFs2MzBdIDg5IFs1MDBdIDIyIFs1NzFdIDE5IFs1NzFdIDE4IFszNjddIDIzIFs1NzFdIDIxIFs1NzFdIDE2IFszMjFdXQovQ0lEVG9HSURNYXAgL0lkZW50aXR5Ci9EVyAxMDAwCi9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0NJRFN5c3RlbUluZm8KPDwKL1N1cHBsZW1lbnQgMAovUmVnaXN0cnkgKEFkb2JlKQovT3JkZXJpbmcgKElkZW50aXR5LUgpCj4+Cj4+CmVuZG9iago0OSAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTAKL1RvVW5pY29kZSA0NiAwIFIKL0Jhc2VGb250IC9PcGVuU2FucwovRW5jb2RpbmcgL0lkZW50aXR5LUgKL0Rlc2NlbmRhbnRGb250cyBbNDggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDExIDAgUgovRjIgMTIgMCBSCi9GMyAxMyAwIFIKL0Y0IDE0IDAgUgovRjUgMTUgMCBSCi9GNiAxNiAwIFIKL0Y3IDE3IDAgUgovRjggMTggMCBSCi9GOSAxOSAwIFIKL0YxMCAyMCAwIFIKL0YxMSAyMSAwIFIKL0YxMiAyMiAwIFIKL0YxMyAyMyAwIFIKL0YxNCAyNCAwIFIKL0YxNSAyOSAwIFIKL0YxNiAzNCAwIFIKL0YxNyAzOSAwIFIKL0YxOCA0NCAwIFIKL0YxOSA0OSAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjUwIDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMS41LjMpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyMDEwMDkxMTQ4MTgrMDEnMDAnKQo+PgplbmRvYmoKNTEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9PcGVuQWN0aW9uIFszIDAgUiAvRml0SCBudWxsXQovUGFnZUxheW91dCAvT25lQ29sdW1uCj4+CmVuZG9iagp4cmVmCjAgNTIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDE0OTEzIDAwMDAwIG4gCjAwMDAxMjA0MjAgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTI0IDAwMDAwIG4gCjAwMDAwMDA0MzIgMDAwMDAgbiAKMDAwMDAwMDU0MSAwMDAwMCBuIAowMDAwMDAxODExIDAwMDAwIG4gCjAwMDAwMDE5MjAgMDAwMDAgbiAKMDAwMDAwMzE5MyAwMDAwMCBuIAowMDAwMDAzMzAzIDAwMDAwIG4gCjAwMDAwMTQ5ODggMDAwMDAgbiAKMDAwMDAxNTExNCAwMDAwMCBuIAowMDAwMDE1MjQ1IDAwMDAwIG4gCjAwMDAwMTUzNzkgMDAwMDAgbiAKMDAwMDAxNTUxNyAwMDAwMCBuIAowMDAwMDE1NjQxIDAwMDAwIG4gCjAwMDAwMTU3NzAgMDAwMDAgbiAKMDAwMDAxNTkwMiAwMDAwMCBuIAowMDAwMDE2MDM4IDAwMDAwIG4gCjAwMDAwMTYxNjYgMDAwMDAgbiAKMDAwMDAxNjI5MyAwMDAwMCBuIAowMDAwMDE2NDIyIDAwMDAwIG4gCjAwMDAwMTY1NTUgMDAwMDAgbiAKMDAwMDAxNjY1NyAwMDAwMCBuIAowMDAwMDE2NzUzIDAwMDAwIG4gCjAwMDAwMzM5MTggMDAwMDAgbiAKMDAwMDAzNDQ5NCAwMDAwMCBuIAowMDAwMDM0NjkzIDAwMDAwIG4gCjAwMDAwMzUwNDkgMDAwMDAgbiAKMDAwMDAzNTE5NCAwMDAwMCBuIAowMDAwMDUxNTg3IDAwMDAwIG4gCjAwMDAwNTIwOTcgMDAwMDAgbiAKMDAwMDA1MjI5MyAwMDAwMCBuIAowMDAwMDUyNTk4IDAwMDAwIG4gCjAwMDAwNTI3NDAgMDAwMDAgbiAKMDAwMDA3Mzc1NyAwMDAwMCBuIAowMDAwMDc0NTI4IDAwMDAwIG4gCjAwMDAwNzQ3MTkgMDAwMDAgbiAKMDAwMDA3NTE5MyAwMDAwMCBuIAowMDAwMDc1MzI5IDAwMDAwIG4gCjAwMDAwOTU4MTQgMDAwMDAgbiAKMDAwMDA5NjQ5NCAwMDAwMCBuIAowMDAwMDk2Njg1IDAwMDAwIG4gCjAwMDAwOTcwOTUgMDAwMDAgbiAKMDAwMDA5NzIzMSAwMDAwMCBuIAowMDAwMTE4ODA0IDAwMDAwIG4gCjAwMDAxMTk2MDEgMDAwMDAgbiAKMDAwMDExOTc5MiAwMDAwMCBuIAowMDAwMTIwMjg0IDAwMDAwIG4gCjAwMDAxMjA3MzMgMDAwMDAgbiAKMDAwMDEyMDgxOSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUyCi9Sb290IDUxIDAgUgovSW5mbyA1MCAwIFIKL0lEIFsgPDA0QjNDODdGQkQ1NDI2NTQ2QTZGRThDMkEwN0QyMjAxPiA8MDRCM0M4N0ZCRDU0MjY1NDZBNkZFOEMyQTA3RDIyMDE+IF0KPj4Kc3RhcnR4cmVmCjEyMDkyMwolJUVPRg==";
        lowerPage.append(iframe);



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

        const helpContent = document.createElement('div');
        helpContent.classList.add('privacy__text');
        helpContent.innerText = "{% t diary.rd2 %}";

        const {rightButton} = renderStepController(document.body, 5, helpContent);
        rightButton.innerText = '{% t diary.rd3 %}';

    }

    const renderPreviewDiaryPage = (canvasId, display) => {

        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.classList.add('preview-canvas');
        canvas.style.display = display ? 'block' : 'none';
        document.getElementById('pageContainer').appendChild(canvas);
        
        return canvas;
    }

    const displayPreviewCanvas = (canvasId) => {
        document.getElementById(canvasId).style.display = 'block';
    }

    const hidePreviewCanvas = (canvasId) => {
        document.getElementById(canvasId).style.display = 'none';
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

        renderDiaryHeader(document.body, "#5/5", false);

        const content = document.createElement('div');
        content.classList.add('content');
        document.body.appendChild(content);

        const upperPage = document.createElement('div');
        //upperPage.classList.add('upper-page');
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

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'row';
        centerContainer.append(buttonContainer);
                
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('secondary');
        downloadButton.style.margin = 'auto';
        downloadButton.innerText = '{% t diary.dd3 %}';
        downloadButton.addEventListener('click', e => {
            try {
                window.fathom.trackGoal('ZNO1KYRF', 0);
            } catch (e) {
                console.log('Fathom disabled')
            }
            eventHandler(e, {type: 'download-diary'});
        });
        buttonContainer.appendChild(downloadButton);

    }

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
        title.innerText = 'Your diary is ready!';
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
        displayPreviewCanvas,
        hidePreviewCanvas,

        renderUploadErrorModal,

        renderPreviewWithDataUri,
    }
}

export default DiaryUI;