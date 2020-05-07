---
---

const DiaryTemplates = () => {

    const topicPage = () => {

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
        dayBanner.innerText = 'Day 1';
        pageContainer.appendChild(dayBanner);

        const topicDate = document.createElement('div');
        topicDate.classList.add('topic-date');
        topicDate.innerText = '15 April 2020';
        pageContainer.appendChild(topicDate);

        const topicDescription = document.createElement('div');
        topicDescription.classList.add('topic-description');
        topicDescription.innerText = '“Here we can place the description of the challenge they will be writing about for this day, but people can of course also add things that they just want to add. The challenges are mainly there for inspiration to capture something each day”';
        pageContainer.appendChild(topicDescription);

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

    const messagesPage = () => {

    }

    const render = () => {

    }

    const print = () => {

    }


    return {
        topicPage,
        messagesPage,
        render,
        print,
    }
}

export default DiaryTemplates