const DataCollection = () => {

    const sendFeedback = async (feedback, consent) => {

        const timestamp = new Date().getTime();
        const encodedFeedback = encodeURI(feedback);
        const formattedConsent = consent === true ? 'Yes' : 'No'; 

        const url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdw_WWspET__96jlzz10F9k3jVDMET4A5usgc2sy0__weo5JA/formResponse?entry.1072679508=${timestamp}&entry.1394507410=${encodedFeedback}&entry.1668565519=${formattedConsent}`;
        var x = new XMLHttpRequest();
        x.open('POST', url);

        return new Promise( (resolve, reject) => {

            x.onload = () => resolve('done');
            x.onerror = () => resolve('done');
            
            x.send();
           
        });

    }

    return {
        sendFeedback,
    }
}

export default DataCollection;