---
---

const DiaryTemplates = () => {


   
    const doCORSRequestForBlob = async (url) => {

        const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
        var x = new XMLHttpRequest();
        x.open('GET', cors_api_url + url);
        x.responseType = 'blob';

        return new Promise( (resolve, reject) => {

            x.onload = function() {
        
                var reader = new FileReader();
                reader.readAsDataURL(x.response); 
                reader.onloadend = () => resolve(reader.result);
        
            }

            x.send();
        });    
    }
      


    const generatePDF = async(topics) => {

        let doc = new jsPDF();

        for(let topic of topics) {
            doc = topicPage(doc, topic);
            doc = await messagePages(doc, topic.selectedMessages);
        }

        /*
        const link = await getSpotifyCode("https://open.spotify.com/track/'7CH99b2i1TXS5P8UUyWtnM?si=ZMlavzVYQLSMSCfOiJX8LA");
        
        
        doc.addImage(link, 'PNG', 10, 10, 100, 100);
        */
        return doc;

    }

    const topicPage = (doc, data) => {

        doc.addPage('a4', 'portrait');

        doc.setDrawColor(0);
        doc.setFillColor(data.color);
        doc.rect(0, 33.826, 210, 27.174, 'F'); 
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(52);
        doc.setFontType('normal');
        doc.setFont('OstrichSans-Black');
        doc.text(`Day ${data.day}`, 45, 54);
          
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
        
            const lines = data.text//splitTextInLines(data.text, 30); 
            
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
            
            const lines =  data.text//splitTextInLines(data.text, 30); 
        
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
            const url = `https://scannables.scdn.co/uri/plain/png/000000/white/640/spotify:track:7CH99b2i1TXS5P8UUyWtnM${musicCode}`;

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

    const previewPdf = (doc, pageNum) => {

        const pdfData = doc.output('arraybuffer');
        
        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js';
        
        // Asynchronous download of PDF
        var loadingTask = pdfjsLib.getDocument(pdfData);
        loadingTask.promise.then(function(pdf) {
          console.log('PDF loaded');
          
          // Fetch the first page

          console.log(pageNum);
          
          var pageNumber = pageNum > pdf.numPages || pageNum < 1 || pageNum === undefined ? pdf.numPages : pageNum;
          pdf.getPage(pageNumber).then(function(page) {
            console.log('Page loaded');

            var canvas = document.getElementById('preview');
            var context = canvas.getContext('2d');
        
            var viewport = page.getViewport({scale: 10});
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.height = "100%";

            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              console.log('Page rendered');
            });
          });
        }, function (reason) {
          // PDF loading error
          console.error(reason);
        });
        
    }

    const downloadPdf = (doc) => {
        doc.save('test');
    }

    return {
        generatePDF,
        previewPdf,
        downloadPdf,
    }
}

export default DiaryTemplates