---
---

const i18nTools= () => {

    const strings = {

        'en': {% include en.json %}

    }

    const supportsLanguage = (lang) => strings[lang] != undefined

    const getStringById = (id) => getString(lang, id);

    const getString = (lang, id) => {
        
        if(!supportsLanguage(lang)) {
            console.error(`${lang} - language not supported`);
            return '';
        }

        const string = strings[lang][id];
        if(string == undefined) {
            console.error(`${id} - id not valid`);
            return '';
        }
        
        return string;
    }

    const translatePage = (page, lang) => {

        console.log()

        const stringList = strings[lang][page];

        for(const key in stringList) {
            document.getElementById(key).innerHTML = stringList[key];
            console.log(key);
        }

        console.log(stringList);
    }
 
    return {
        supportsLanguage,
        getStringById,
        getString,
        translatePage,
    } 

}

