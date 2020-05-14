---
---

const DiaryTemplates = () => {


    const generatePDF = async(topics) => {

        /*
        const printSection = document.createElement('body');
        printSection.id = 'printSection';

        var linkNode = document.getElementsByTagName('link')[2];
        linkNode.parentNode.removeChild(linkNode);

        const tempBody = document.body;
        document.body = printSection;
*/

        //document.getElementById('baseContainer').style.display = 'none';


      

        let doc = new jsPDF();

        console.log(topics);

        for(let topic of topics) {
            doc = topicPage(doc, topic);
            doc = await messagePages(doc, topic.selectedMessages);
        }

        const link = await getSpotifyCode("https://open.spotify.com/track/'7CH99b2i1TXS5P8UUyWtnM?si=ZMlavzVYQLSMSCfOiJX8LA");
        
        
        doc.addImage(link, 'PNG', 10, 10, 100, 100);

        doc.save('test');

    }

/*
    const topicPage = (node, data) => {

        const link = document.createElement( 'link' );
        link.href="{{ '/assets/css/template.css' | prepend: site.baseurl }}" 
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName( "head" )[0].appendChild( link );

        const pageContainer = document.createElement('div');
        pageContainer.id = 'pageContainer';
        pageContainer.classList.add('page-container');
        document.body.appendChild(pageContainer);

        const dayBanner = document.createElement('div');
        dayBanner.classList.add('day-banner');
        dayBanner.innerText = `Day ${data.id + 1}`;
        pageContainer.appendChild(dayBanner);

        const date = new Date(data.timestamp);
        const topicDate = document.createElement('div');
        topicDate.classList.add('topic-date');
        topicDate.innerText = date.toLocaleDateString();
        pageContainer.appendChild(topicDate);

        const topicDescription = document.createElement('div');
        topicDescription.classList.add('topic-description');
        topicDescription.innerText = data.text;
        pageContainer.appendChild(topicDescription);

        const print = document.createElement('button');
        print.addEventListener('click', async(e)=> {
            await printPages(1, 'a');
            
            const filename  = 'ThisIsYourPDFFilename.pdf';

            html2canvas(document.getElementById('pageContainer')).then(canvas => {
                let pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                pdf.save(filename);
            });
        });
        pageContainer.appendChild(print);

    }
    */

    const topicPage = (doc, data) => {

        doc.addPage('a4', 'portrait');

        doc.setDrawColor(0);
        doc.setFillColor(0, 122, 125);
        doc.rect(0, 33.826, 210, 27.174, 'F'); 
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(52);
        doc.setFontType('normal');
        doc.setFont('OstrichSans-Black');
        doc.text(`Day ${data.index + 1}`, 45, 54);
          
        doc.setTextColor(0, 0, 0);
        const date = new Date(data.timestamp);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        doc.setFont('ostrich-regular');
        doc.text(`${day} ${month} ${year}`, 45, 83);
                
        doc.setFontSize(18);
        doc.setFontType('italic');
        doc.setFont('OpenSans');
        doc.text(data.text, 42, 127.021, {maxWidth: 126});

        return doc;
    }

    const messagePages = async(doc, messages) => {

        let yLeft = 11;
        let yRight = 11;

        let yHeaderLeft = yLeft;
        let yHeaderRight = yRight;

        console.log(messages);

        const messageLeft = async (doc, data) => {

            doc.setDrawColor(0);
            //doc.setFillColor(0, 122, 125);
            doc.setFillColor(data.color);
            doc.rect(5, yLeft, 106, 11, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFontType('normal');
            doc.setFont('OstrichSans-Black');
            doc.text(`${data.user}`, 53, yLeft + 7.5, 'center');
        
            yHeaderLeft = yLeft + 11; 
            yLeft += 11 + 7;
           
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFontType('normal');
            doc.setFont('OpenSans');
        
            const lines = splitTextInLines(data.text, 30); 
            doc.text(lines, 4.838, yLeft, {maxWidth: 87.77});
            yLeft += lines.length * 4;

            await addMedia(data.files, 'l');
 
            return doc;
        }


        const addMedia = async(files, side) => {

            for(let media of files) {

                if(media.type.includes('image')) {
                    
                    const {w,h} = fitDimensions(media.data);
                    doc.addImage(media.data, 'PNG', side === 'l' ? 4.838 : 117.23, side === 'l' ? yLeft : yRight, w, h);
                    if(side === 'l') yLeft += h; else yRight += h;

                } else if (media.type.includes('video')) {

                    const frame = await getFrameFromVideo(media);
                    const {w,h} = fitDimensions(frame);
                    doc.addImage(frame, 'PNG', side === 'l' ? 4.838 : 117.23, side === 'l' ? yLeft : yRight, w, h);
                    if(side === 'l') yLeft += h; else yRight += h;
                       
                }
            }

        }
        
        const fitDimensions = (media) => {
            let img = new Image();
            img.src = media;

            let mmWidth = Math.floor(img.width * 0.264583);
            let mmHeight =  Math.floor(img.height * 0.264583);

            if(mmWidth > 87.77) {
                const ratio = 87.77 / mmWidth;
                mmWidth = 87.77;
                mmHeight *= ratio; 
            }

            return {w: mmWidth, h: mmHeight};
        }

        const getFrameFromVideo = (media) => {

            const video = document.createElement('video');
            video.autoplay = true;
            //video.style.display = 'none';
            const source = document.createElement('source');
            source.src = media.data;
            video.appendChild(source);
            document.body.append(video);

            const canvas = document.createElement('canvas');
            canvas.id = 'canvas-element';
            //canvas.style.display = 'none';
            document.body.append(canvas);
        
            video.addEventListener('loadedmetadata', function() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;           
            });

            return new Promise((resolve, reject) => {
                video.oncanplay = (e) => {
                    canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    resolve(canvas.toDataURL());
                }
            });
        }

  
        const messageRight = async(doc, data) => {
        
            doc.setDrawColor(0);
            doc.setFillColor(data.color);
            doc.rect(99.25, yRight, 106, 11, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFontType('normal');
            doc.setFont('OstrichSans-Black');
            doc.text(`${data.user}`, 49.625 + 99.25, yRight + 7.5, 'center');
        
            yHeaderRight = yRight + 11; 
            yRight += 11 + 7;
        
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFontType('normal');
            doc.setFont('OpenSans');
            
            const lines = splitTextInLines(data.text, 30); 
        
            let breakPoint = -1;
            for(let i = 0; i < lines.length && breakPoint === -1; i++)
                breakPoint = lines.length * i + yRight > 297 ? i : -1;

            if(breakPoint != -1) {
                const sliceA = lines.slice(0,breakPoint);
                doc.text(sliceA, 117.23, yRight, {maxWidth: 87.77});

                const sliceB = lines.slice(breakPoint, lines.length);
                doc = newPage(doc);
                doc.text(sliceB, 117.23, yRight, {maxWidth: 87.77});
                yRight += (lines.length - breakPoint) * 4;
                lastElemPositon = 'Right';

            } else {
                doc.text(lines, 117.23, yRight, {maxWidth: 87.77});
                yRight += lines.length * 4;
            }

            await addMedia(data.files, 'r');

            return doc;
        
        }

        const newPage = (doc) => {
            doc.addPage('a4', 'portrait');
            yLeft = 11;
            yRight = 11;
            yHeaderLeft = yLeft;
            yHeaderRight = yRight;

            doc.setFillColor(0, 0, 0);
            for(let y = 0.0; y < 297.529; y+=5)
                doc.ellipse(105, y, 0.8, 0.8, 'F');
            return doc
        }
        doc = newPage(doc);

        let lastElemPositon = '';

        for(let message of messages) {

            if(yLeft >= 297 || yRight  >= 297) {
                doc = newPage(doc);
            }

            if(lastElemPositon === '') {
                doc = await messageLeft(doc, message);
                lastElemPositon = 'left';
            } else if(lastElemPositon === 'left') {

                if(yRight > yLeft) {
                    yLeft += 15;
                    doc = await messageLeft(doc, message);
                    lastElemPositon = 'left';
                } else {
                    yRight = yHeaderLeft + 15;
                    doc = await messageRight(doc, message);
                    lastElemPositon = 'right';
                }

            } else if (lastElemPositon === 'right') {

                if(yLeft > yRight) {
                    yRight += 15;
                    doc = await messageRight(doc, message);
                    lastElemPositon = 'right';
                } else {
                    yLeft = yHeaderRight + 15;
                    doc = await messageLeft(doc, message);
                    lastElemPositon = 'left';
                }

            }

        }

        return doc;
    }


    const getSpotifyCode = async(link) => {

        const result = RegExp('https:\/\/open.spotify.com\/track\/([^\?]*)\?').exec(link);
        if(result != undefined) {
            const musicCode = result[1];
            const url = `https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:track:${musicCode}`;

            let response = await fetch(url);
            let blob = await response.blob();
  
            const getImageFromBlob = (blob) => {

                var reader = new FileReader();
                reader.readAsDataURL(blob); 

                return new Promise((resolve, reject) => {

                    reader.onloadend = () => resolve(reader.result);
                    
                });
            }
            const r = getImageFromBlob(blob);
            return r;
        }
    
        return null;
        /*

        https://www.spotifycodes.com/downloadCode.php?uri=jpeg%2F000000%2Fwhite%2F640%2Fspotify%3Atrack%3A 2NDJAS0IlvK0UswjMzsac5

        https://www.spotifycodes.com/downloadCode.php?uri=jpeg%2F000000%2Fwhite%2F640%2Fspotify%3Atrack%3A 7CH99b2i1TXS5P8UUyWtnM
        
        https://open.spotify.com/track/ 7CH99b2i1TXS5P8UUyWtnM ?si=ZMlavzVYQLSMSCfOiJX8LA
        */

    }

    const splitTextInLines = (text, lineSize) => {

        const lines = [];
    
        const words = text.split(' ');
    
        let tempSize = 0;
        let line = [];
    
        for(let word of words) {
            if(word.length + 1 + tempSize > lineSize) {
                lines.push(line.join(' '));
                line = [];
                tempSize = 0;
            } 
            line.push(word);
            tempSize+= word.length + 1;
            
        }
        lines.push(line.join(' '));
    
        return lines;
    }

    const messagesTwoUsersPage = (data) => {

        const link = document.createElement( 'link' );
        link.href="{{ '/assets/css/template.css' | prepend: site.baseurl }}" 
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName( "head" )[0].appendChild( link );

        const pageContainer = document.createElement('div');
        pageContainer.id = 'pageContainer';
        pageContainer.classList.add('page-container');
        document.body.appendChild(pageContainer);

        const nameBanner1 = document.createElement('div');
        nameBanner1.classList.add('name-banner');
        nameBanner1.classList.add('first');
        nameBanner1.innerText = 'Linnea';
        pageContainer.appendChild(nameBanner1);

        const messageText1 = document.createElement('div');
        messageText1.classList.add('message-text');
        messageText1.classList.add('first');
        messageText1.innerText = 'Vocaequit? Fuluteliusa imus Ahachui sendees patis conondest? Num tus fue factari sentrioris. Scio es confec orevirmilica Ser ute dum num plingula virterum sero crisses soltus consunum hoca; ina virisul tiemquam men adducto tus? quam mis am iu vehenatumul hocultus fachus horae, sum hiliam, eses eo, ses Muliae tea cris. Vivis opublibunum elinunti caedo, nit vivehen ternimus coti se, conequi deravent? Edees verenit; nocchilicis fuit. Uppl. Mare me fortimi hinveri sultus omneste nihilis ia vidiis.Tum publin te, Ti. Satquod iendeti patia? Nihicae mandiem sendiem aucest? Ces mentem fortem is, nos es? Mae fure nestris fordin vehem tintiemque ';
        pageContainer.appendChild(messageText1);

        const messageMedia1 = document.createElement('div');
        messageMedia1.classList.add('topic-description');
        pageContainer.appendChild(messageMedia1);

        const nameBanner2 = document.createElement('div');
        nameBanner2.classList.add('name-banner');
        nameBanner2.classList.add('second');
        nameBanner2.innerText = 'Luis';
        pageContainer.appendChild(nameBanner2);

        const messageText2 = document.createElement('div');
        messageText2.classList.add('message-text');
        messageText2.classList.add('second');
        messageText2.innerText = 'Vocaequit? Fuluteliusa imus Ahachui sendees patis conondest? Num tus fue factari sentrioris. Scio es confec orevirmilica Ser ute dum num plingula virterum sero crisses soltus consunum hoca; ina virisul tiemquam men adducto tus? quam mis am iu vehenatumul hocultus fachus horae, sum hiliam, eses eo, ses Muliae tea cris. Vivis opublibunum elinunti caedo, nit vivehen ternimus coti se, conequi deravent? Edees verenit; nocchilicis fuit. Uppl. Mare me fortimi hinveri sultus omneste nihilis ia vidiis.Tum publin te, Ti. Satquod iendeti patia? Nihicae mandiem sendiem aucest? Ces mentem fortem is, nos es? Mae fure nestris fordin vehem tintiemque ';
        pageContainer.appendChild(messageText2);

        const messageMedia2 = document.createElement('div');
        messageMedia2.classList.add('topic-description');
        pageContainer.appendChild(messageMedia2);

        const print = document.createElement('button');
        print.addEventListener('click', e=> {
            const filename  = 'ThisIsYourPDFFilename.pdf';

            html2canvas(document.getElementById('pageContainer')).then(canvas => {
                let pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                pdf.save(filename);
            });
        });
        pageContainer.appendChild(print);

    }

    return {
        generatePDF,
    }
}

export default DiaryTemplates