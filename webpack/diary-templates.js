import jsPDF from 'jspdf'
import loadPdfFonts from './pdfFontsLoader.js'

const DiaryTemplates = () => {

    loadPdfFonts(jsPDF);

    const generatePDF = async(diary, topicLimit = -1) => {

        let doc = new jsPDF();
        doc = coverPages(doc, diary, true);

        for(let i = 0; i <= ( (topicLimit != -1 && topicLimit < diary.topics.length) ? topicLimit : diary.topics.length-1); i++) {
            doc = topicPage(doc, diary.topics[i]);
            doc = await messagePages(doc, diary.topics[i].selectedMessages);
        }
        
    
        return doc;
    }

    const generatePreview = async(diary, topicLimit = -1) => {

        let doc = new jsPDF();
        doc = coverPages(doc, diary, true);

        for(let i = 0; i <= ( (topicLimit != -1 && topicLimit < diary.topics.length) ? topicLimit : diary.topics.length-1); i++) {
            doc = topicPage(doc, diary.topics[i]);
            doc = await messagePages(doc, diary.topics[i].selectedMessages, true);
        }
    
        return doc;

    }

    const coverPages = (doc, data, firstPage = false) => {

        if(!firstPage)
            doc.addPage('a4', 'portrait');

        const nameSplit = data.who.split(" ");

        const lineCharLimit = 19;
        let lineLength = 1;

        const lines = ['', ''];
        let fullname = '';
        let currentLine = 0;

        if(data.title != undefined && data.title != "") {
           
            const titleSplit = data.title.split(" ");
            for(let i = 0; i < titleSplit.length && currentLine < 2; i++) {
                if(lineLength + titleSplit[i].length > lineCharLimit) {
                    currentLine += 1;
                    lineLength = 0;
                }

                if(currentLine < 2) {
                    lines[currentLine] += `${titleSplit[i]} `;
                    lineLength += titleSplit[i].length;
                }
            }

            let lineLengthName = 0;
            let currentLineName = 0
            for(let i = 0; i < nameSplit.length; i++) {
                if(lineLengthName + nameSplit[i].length > lineCharLimit) {
                    currentLineName  += 1;
                    lineLengthName = 0;
                }

                if(currentLine < 2) {
                    fullname += `${nameSplit[i]} `;
                }
            }

        } else { 
            const forS = '{% t templates.c1 %}';
            lineLength = forS.length + 1;
            lines[0] += `${forS} `;
            for(let i = 0; i < nameSplit.length && currentLine < 2; i++) {
                if(lineLength + nameSplit[i].length > lineCharLimit) {
                    currentLine += 1;
                    lineLength = 0;
                }

                if(currentLine < 2) {
                    lines[currentLine] += `${nameSplit[i]} `;
                    lineLength += nameSplit[i].length;
                    fullname += `${nameSplit[i]} `;
                }
            }
        }
        for(let i = 0; i < lines.length; i++)
            lines[i] = lines[i].trim();

        fullname = fullname.trim();
        
        let headerHeight = 27.174;
        if(lines[1].length > 0)
            headerHeight = (headerHeight * 2) - 8;

        doc.setDrawColor(0);
        doc.setFillColor(0, 121, 125);
        doc.rect(0, 33.826, 210, headerHeight, 'F'); 
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(42);
        //doc.setFontType('normal');
        doc.setFont(/*'Oswald-Regular'*/ 'RobotoCondensed-Regular', 'normal');
        doc.text(`${lines[0]}`.toUpperCase(), 105, 54, 'center');

        if(lines[1].length > 0)
            doc.text(`${lines[1]}`.toUpperCase(), 105, 74, 'center');

        doc.setTextColor(0, 121, 125);
        doc.setFontSize(30);
        doc.setFont('Oswald-ExtraLight');
        doc.text('TOGATHER', 105, 250, 'center');

        doc.addPage('a4', 'portrait');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        //doc.setFontType('bolditalic');
        doc.setFont('OpenSans', 'bolditalic');
        doc.text(`{% t templates.c4 %} ${fullname}`, 105, 40, 'center');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        //doc.setFontType('bolditalic');
        doc.setFont('OpenSans', 'bolditalic');
        doc.text('{% t templates.c2 %}', 105, 80, 'center');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        //doc.setFontType('normal');
        doc.setFont('OpenSans', 'normal');
        let i = 0;
        let userY = 100;
        for(const [hash, user] of Object.entries(data.users)) {
            if(user.visible) {
                doc.text(`${user.name}`, i % 2 === 0 ? 70 : 140, userY, 'center');
                if(i%2 === 1) userY += 10;
                i++;
            }
        }

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        //doc.setFontType('bolditalic');
        doc.setFont('OpenSans', 'bolditalic');
        doc.text('{% t templates.c3 %}', 105, 237, 'center');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        //doc.setFontType('normal');
        doc.setFont('OpenSans', 'normal');
        const startDate = new Date(data.startDate);
        const startDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
        const startMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(startDate);
        const startYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDate);
        const endDate = new Date(data.endDate);
        const endDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(endDate);
        const endMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(endDate);
        const endYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(endDate);
        doc.text(`${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`, 105, 257, 'center');

        return doc;
    }

    const topicPage = (doc, data, firstPage = false) => {

        if(!firstPage)
            doc.addPage('a4', 'portrait');

        doc.setDrawColor(0);
        doc.setFillColor(data.color);
        doc.rect(0, 33.826, 210, 27.174, 'F'); 
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(42);
        //doc.setFontType('normal');
        doc.setFont('Oswald-Regular', 'normal');

        const date = new Date(data.timestamp);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        const month = new Intl.DateTimeFormat('{% t global.lang-code %}', { month: 'long' }).format(date)
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        doc.text((data.part === 0 ? `${day} ${month} ${year}` : `${day} ${month} ${year} - {% t templates.tp2 %} ${data.part}`).toUpperCase(), 45, 54);
        //doc.text((data.part === 0 ? `{% t templates.tp1 %} ${data.day}` : `{% t templates.tp1 %} ${data.day} - {% t templates.tp2 %} ${data.part}`).toUpperCase(), 45, 54);
 
        
        doc.setTextColor(0, 0, 0);
        //const date = new Date(data.timestamp);
        //const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        //const month = new Intl.DateTimeFormat('{% t global.lang-code %}', { month: 'long' }).format(date)
        //const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        doc.setFont('Oswald-ExtraLight');
        doc.setFontSize(40);
       // doc.text((`${day} ${month} ${year}`).toUpperCase(), 45, 83);
        
                
        doc.setFontSize(18);
        //doc.setFontType('italic');
        doc.setFont('OpenSans', 'italic');
        doc.text(data.text, 42, /*127.021*/ 100, {maxWidth: 126});

        return doc;
    }

    const messagePages = async(doc, messages, preview = false) => {

        const topMargin = 11;
        const bottomMargin = 286;
        const leftColumnLeftMargin = 53;
        const leftColumnRightMargin = 5;
        const rightColumnLeftMargin = 148.875;
        const rightColumnRightMargin = 5;
        const lineLength = 87.77;
        const lineHeight = 5;

        const leftColumnContentMargin = 4.838;
        const rightColumnContentMargin = 117.23;

        let yLeft = topMargin;
        let yRight = topMargin;

        let yHeaderLeft = yLeft;
        let yHeaderRight = yRight;

        const addMessage = async (doc, data, column) => {

            let createdPage = false;

            let expectedSize = column === 'l' ? yLeft : yRight;
            expectedSize +=  11 + 7;

            if(expectedSize > bottomMargin && !createdPage) {
                doc = newPage(doc);
                createdPage = true;
            }

            let splittedLines = [];
            for(let i = 0; i < data.text.length; i++) {
                const splittedLinesTemp = doc.splitTextToSize(data.text[i]/*.replace(/[^\x20-\x7E]/g, '')*/, lineLength).filter(line => line != '');
                expectedSize += splittedLinesTemp.length * lineHeight;
                if(i === 0 && expectedSize > bottomMargin && !createdPage) {
                    doc = newPage(doc);
                    createdPage = true;
                }
                splittedLines = splittedLines.concat(splittedLinesTemp);
            }

            if(!createdPage && splittedLines.length == 0) {
                let mediaSizes = await getMediaSizes(data.files);
                if(mediaSizes.length > 0) {
                    expectedSize += mediaSizes[0].h;
                    if(expectedSize > bottomMargin) {
                        doc = newPage(doc);
                        createdPage = true;
                    }
                }
            }

            doc.setDrawColor(0);
            doc.setFillColor(data.color);
            doc.rect(column === 'l' ? 5 : 99.25, column === 'l' ? yLeft : yRight, 106, 11, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            //doc.setFontType('normal');
            doc.setFont(/*'Oswald-Regular'*/'RobotoCondensed-Regular', 'normal');
            doc.text(`${data.user}`.toUpperCase(),
                      column === 'l' ? leftColumnLeftMargin : rightColumnLeftMargin, 
                      (column === 'l' ? yLeft : yRight) + 7.5,
                      'center'
            );
        
            if(column === 'l') {
                yHeaderLeft = yLeft + 11; 
                yLeft += 11 + 7;
            } else {
                yHeaderRight = yRight + 11; 
                yRight += 11 + 7;
            }
        
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            //doc.setFontType('normal');
            doc.setFont('OpenSans', 'normal');

            for(let line of splittedLines) {

                if((column === 'l' && yLeft + lineHeight > bottomMargin) || (column === 'r' && yRight + lineHeight > bottomMargin))
                    doc = newPage(doc);

                doc.text(line, column === 'l' ? leftColumnContentMargin :  rightColumnContentMargin, column === 'l' ? yLeft : yRight, {maxWidth: lineLength});
                if(column === 'l') 
                    yLeft += lineHeight;
                else 
                    yRight += lineHeight;

            }

           
            if(!preview)
                doc = await addMedia(doc, data.files, column);

            return doc;
        
        }

        const getMediaSizes = async (files) => {

            const sizes = [];

            for(let media of files) {
            
                if(media.type.includes('image')) {
                    sizes.push(fitDimensions(media.data));
                } else if (media.type.includes('video')) {
                    const frame = await getFrameFromVideo(media);
                    sizes.push(fitDimensions(frame.data));
                }
            
            }

            return sizes;
        }

        const addMedia = async(doc, files, side) => {

            for(let media of files) {

                if(media.type.includes('image')) {
                    
                    const {w,h} = fitDimensions(media.data);
                    if((side === 'l' ? yLeft : yRight) + h > bottomMargin) doc = newPage(doc);
                    doc.addImage(media.data, 'PNG', side === 'l' ? leftColumnContentMargin : rightColumnContentMargin, side === 'l' ? yLeft : yRight, w, h);
                    if(side === 'l') yLeft += h; else yRight += h;

                } else if (media.type.includes('video')) {
     
                    const frame = await getFrameFromVideo(media, 0.1)//await getFilmRollFromVideoAsync(media, 3,3);               
                    const {w,h} = await fitDimensions2(frame.data);
                    if((side === 'l' ? yLeft : yRight) + h > bottomMargin) doc = newPage(doc);
                    doc.addImage(frame.data, 'PNG', side === 'l' ? leftColumnContentMargin : rightColumnContentMargin, side === 'l' ? yLeft : yRight, w, h);
                    if(side === 'l') yLeft += h; else yRight += h;
                     
                }

            }
            return doc;
        }
        
        const fitDimensions = (media, lineWidth = lineLength) => {

            let img = new Image();
            img.src = media;

            let mmWidth = Math.floor(img.width * 0.264583);
            let mmHeight =  Math.floor(img.height * 0.264583);

            if(mmWidth > lineWidth) {
                const ratio = lineWidth / mmWidth;
                mmWidth = lineWidth;
                mmHeight *= ratio; 
            }

            return {w: mmWidth, h: mmHeight};
        }

        const fitDimensions2 = async(media, lineWidth = lineLength) => {

            let img = new Image();

            const loadImage = new Promise( (resolve, reject) => {
                img.onload = () => {

                    let mmWidth = Math.floor(img.width * 0.264583);
                    let mmHeight =  Math.floor(img.height * 0.264583);
        
                    if(mmWidth > lineWidth) {
                        const ratio = lineWidth / mmWidth;
                        mmWidth = lineWidth;
                        mmHeight *= ratio; 
                    }

                    resolve({w: mmWidth, h: mmHeight});

                };
            });
            img.src = media;
            const result = await loadImage;
            return result;
        }

        const getFrameFromVideo = (media, time=0.0) => {

            const video = document.createElement('video');
            video.style.display = 'none';
            const source = document.createElement('source');
            source.src = media.data;
            video.appendChild(source);
            document.body.append(video);
            
            const canvas = document.createElement('canvas');
            canvas.id = 'canvas-element';
            canvas.style.display = 'none';
            document.body.append(canvas);

            video.addEventListener('loadedmetadata', function() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;           
            });

            video.currentTime = time;

            return new Promise((resolve, reject) => {
                
                let done = false;

                video.oncanplay = (e) => {
                    if(!done) {
                        done = true;
                        canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                        const result = canvas.toDataURL()
                        canvas.remove();
                        video.remove();
                        resolve({data: result, w: video.videoWidth, h: video.videoHeight, time});
                    }
                }
            });
        }

        const getFramesAsync = async(media, columns, rows) => {

            console.time('frameAsync');

            const video = document.createElement('video');
            video.style.display = 'none';
            const source = document.createElement('source');
            source.src = media.data;
            video.appendChild(source);
            document.body.append(video);

            return new Promise ((resolve, reject) => {

                video.oncanplay = async(e) => {
                    const framePromises = [];
                    const sliceLength = video.duration / (columns * rows);

                    for(let i = 0.01 ; i < video.duration; i += sliceLength) {
                        framePromises.push(getFrameFromVideo(media, i));
                    }
                    const result = await Promise.all(framePromises);
                    video.remove();
                    console.timeEnd('frameAsync');
                    resolve(result);
                }
            });
   
        }

        const getFramesSync = async(media, columns, rows) => {

            console.time('frameSync');

            const video = document.createElement('video');
            video.style.display = 'none';
            const source = document.createElement('source');
            source.src = media.data;
            video.appendChild(source);
            document.body.append(video);

            return new Promise ((resolve, reject) => {

                video.oncanplay = async(e) => {
                    const frames = [];
                    const sliceLength = video.duration / (columns * rows);

                    for(let i = 0.01 ; i < video.duration; i += sliceLength) {
                        const frame = await getFrameFromVideo(media, i);
                        frames.push(frame);
                    }
        
                    console.timeEnd('frameSync');
                    resolve(frames);
                }
            });
   
        }

        const getFilmRollFromVideo = async(media, columns, rows) => {
            
            console.time('roll');

            const video = document.createElement('video');
            video.style.display = 'none';
            const source = document.createElement('source');
            source.src = media.data;
            video.appendChild(source);
            document.body.append(video);

            const canvas = document.createElement('canvas');
            canvas.id = 'film-roll-canvas';
            canvas.style.display = 'none';
            document.body.append(canvas);

            return new Promise ((resolve, reject) => {

                video.oncanplay = async(e) => {

                    const sliceLength = video.duration / (columns * rows);

                    let x = 0;
                    let y = 0;

                    let index = 0;

                    for(let i = 0.01 ; i < video.duration; i += sliceLength) {
                       const frame = await getFrameFromVideo(media, i);

                        if(i === 0.01) {
                            canvas.width = frame.w * columns;
                            canvas.height = frame.h * rows;
                        }

                        const img = new Image;
                        const loadImage = new Promise( (resolve, reject) => {
                            img.onload = () => {
                                canvas.getContext("2d").drawImage(img, x, y, frame.w, frame.h);
                                if(index != 0 && (index + 1) % columns === 0) {
                                    x = 0;
                                    y += frame.h;
                                } else {
                                    x += frame.w;
                                }
                                index++;
                                resolve(true);
                            };
                        });
                        img.src = frame.data;
                        await loadImage;
                    }
                    const imageDataUrl = canvas.toDataURL();
                    canvas.remove();
                    video.remove();
                    console.timeEnd('roll');
                    resolve(imageDataUrl);
          
                }

            });
        }

        const getFilmRollFromVideoAsync = async(media, columns, rows) => {
        
            console.time('rollAsync');

            const canvas = document.createElement('canvas');
            canvas.id = 'film-roll-canvas';
            canvas.style.display = 'none';
            document.body.append(canvas);

            const frames = await getFramesAsync(media, columns, rows);
        
            if(frames.length === 0)
                return undefined;

            canvas.width = frames[0].w * columns;
            canvas.height = frames[0].h * rows;

            let x = 0;
            let y = 0;
            const img = new Image;
            const loadImage = (i) => new Promise( (resolve, reject) => {
                img.onload = () => {
                    canvas.getContext("2d").drawImage(img, x, y, frames[i].w, frames[i].h);
                    if(i != 0 && (i + 1) % columns === 0) {
                        x = 0;
                        y += frames[i].h;
                    } else {
                        x += frames[i].w;
                    }
                    resolve(true);
                };
            });

            for(let i = 0 ; i < frames.length; i++) {
                img.src = frames[i].data;
                await loadImage(i);
            }
            
            const imageDataUrl = canvas.toDataURL();
            canvas.remove();
            console.timeEnd('rollAsync');
            return imageDataUrl;
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

            if(yLeft >= bottomMargin || yRight  >= bottomMargin ) {
                doc = newPage(doc);
            }

            if(lastElemPositon === '') {
                doc = await addMessage(doc, message, 'l');
                lastElemPositon = 'l';
            } else if(lastElemPositon === 'l') {

                if(yRight > yLeft) {
                    yLeft += 15;
                    doc = await addMessage(doc, message, 'l');
                    lastElemPositon = 'l';
                } else {
                    
                    if(yRight < yHeaderLeft + 15)
                        yRight = yHeaderLeft + 15;
                    else
                        yRight += 15;
                
                    doc = await addMessage(doc, message, 'r');
                    lastElemPositon = 'r';

                }

            } else if (lastElemPositon === 'r') {

                if(yLeft > yRight) {
                    yRight += 15;
                    doc = await addMessage(doc, message, 'r');
                    lastElemPositon = 'r';
                } else {

                    if(yLeft < yHeaderRight + 15)
                        yLeft = yHeaderRight + 15;
                    else
                        yLeft += 15;
                    
                    doc = await addMessage(doc, message, 'l');
                    lastElemPositon = 'l';
                }

            }

        }

        return doc;
    }
 
    /*
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
        
    }*/

    const previewPdf = (doc, pageNum, canvas) => {

        const pdfData = doc.output('arraybuffer');
        
        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = "{{ '/assets/scripts/pdf.worker.js' | prepend: site.baseurl_root }}";
        
        // Asynchronous download of PDF
        var loadingTask = pdfjsLib.getDocument(pdfData);
        loadingTask.promise.then(function(pdf) {
          
          var pageNumber = pageNum > pdf.numPages || pageNum < 1 || pageNum === undefined ? pdf.numPages : pageNum;
          pdf.getPage(pageNumber).then(function(page) {

            var context = canvas.getContext('2d');
        
            var viewport = page.getViewport({scale: 10});
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            //canvas.style.height = "100%";

            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
            
            });
          });
        }, function (reason) {
          // PDF loading error
          console.error(reason);
        });
        
    }

    const startPreviewPdfWorker = (doc) => {
        const pdfData = doc.output('arraybuffer');
        
        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = "{{ '/assets/scripts/pdf.worker.js' | prepend: site.baseurl_root }}";
        
        return pdfjsLib.getDocument(pdfData);
    }

    const destroyPreviewPdfWorker = (worker) => worker.destroy(); 

    const previewPdf2 = (doc, pageNum, canvas, loadingTask) => {

  
        return loadingTask.promise.then(function(pdf) {
          
          const pageNumber = pageNum > pdf.numPages || pageNum < 1 || pageNum === undefined ? pdf.numPages : pageNum;
          pdf.getPage(pageNumber).then(function(page) {

            const context = canvas.getContext('2d');
        
            const viewport = page.getViewport({scale: 10});
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            //canvas.style.height = "100%";

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            const renderTask = page.render(renderContext);

            renderTask.promise.then(function () {
            
            });
          });
        }, function (reason) {
          // PDF loading error
          console.error(reason);
        });
        
    }

    const previewPdf3 = async (doc, pageNum, canvas, worker) => {

       

        const promise = new Promise( (resolve, error) => {
            
            worker.promise.then( async(pdf) => {

                const renderPromises = {};
          
                for(let i = 1; i < pdf.numPages; i++) {

                    /*
                    pdf.getPage(i).then( (page) => {
      
                        const context = canvas.getContext('2d');
                    
                        const viewport = page.getViewport({scale: 10});
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        //canvas.style.height = "100%";
            
                        const renderContext = {
                          canvasContext: context,
                          viewport: viewport
                        };
            
                        //const renderTask = page.render(renderContext);
                        renderPromises[i] = {renderFunction: page.render, renderContext};
                      });*/

                    const page = await pdf.getPage(i);
                    const context = canvas.getContext('2d');
                    
                    const viewport = page.getViewport({scale: 10});
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    //canvas.style.height = "100%";
        
                    const renderContext = {
                      canvasContext: context,
                      viewport: viewport
                    };
        
                    //const renderTask = page.render(renderContext);
                    renderPromises[i] = {renderFunction: page.render, renderContext};

                }
                resolve(renderPromises);

            }, function (reason) {
            // PDF loading error
            console.error(reason);
            });



        });

        const result = await promise;

        return result ;
        
    }

    const previewPdf4 = async (worker) => {

        const promise = new Promise( (resolve, error) => {
            
            worker.promise.then( async(pdf) => {

                const renderPages= {};
          
                for(let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    renderPages[i] = page;
                }
                resolve(renderPages);

            }, function (reason) {
            // PDF loading error
            console.error(reason);
            });



        });


        const result = await promise;

        return result ;
        
    }

    const renderPageToCanvas = (page, canvas) => {
        const context = canvas.getContext('2d');
        
        const viewport = page.getViewport({scale: 10});
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        //canvas.style.height = "100%";

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        const renderTask = page.render(renderContext);
        return renderTask.promise;
    }

    const downloadPdf = (doc, filename) => {
        doc.save(filename);
    }

    const getDataUriStringPdf = (doc) => {
        return doc.output('datauristring');
    }

    return {
        generatePDF,
        generatePreview,

        previewPdf,
        previewPdf2,
        previewPdf3,

        previewPdf4,
        renderPageToCanvas,

        downloadPdf,
        getDataUriStringPdf,


        startPreviewPdfWorker,
        destroyPreviewPdfWorker,

    }
}

export default DiaryTemplates