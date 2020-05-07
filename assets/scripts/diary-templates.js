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