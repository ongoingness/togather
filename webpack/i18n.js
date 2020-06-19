const i18nTools= () => {

    const strings = {

        'en': {

            'create_diary': 'Create Diary',
            'upload_files': 'Upload Files',
            
            'topics_found_header': 'We found the following daily topics you have been messaging about. Is this set complete? Or are there any topics you want to add tho this list?',
            'add_topics': 'ADD TOPICS',
            'thats_all': 'THAT\'S ALL',

            'day': 'Day',

            'add_topic_options_header': 'New Topic From Where?',
            'write_topic': 'Write Topic',
            'or': 'or',
            'select_from_chat': 'Select from chat',
            'back': "back", 

            'write_topic_header': 'Write your own topic and assign it to a date.',
            'type_your_own_topic_here': 'Type your own topic here',
            'done': 'DONE',

            'edit_topic_header': 'Make changes to this topic',

            'read_more': 'Read More',
            'read_less': 'Read Less',
            'select_messages_action_text': 'Select all the messages to go in the diary for this day.',
            'topics': 'TOPICS',
            'finish': 'FINISH DIARY'

        },

        /*
        'pt-PT': {

            'create_diary': 'Criar Diário',
            'upload_files': 'Submeter Ficheiros',

            'topics_found_header': 'Encontramos os seguintes tópicos diários sobre os quais tu tens enviado mensagens. Esta lista está completa? Ou há algum tópico que tu queiras adicionar a esta lista?',
            'add_topics': 'ADICIONAR TÓPICOS',
            'thats_all': 'É TUDO',

        }
        */

        'nl': {

            'create_diary': 'Create Diary',
            'upload_files': 'Upload Files',
            
            'topics_found_header': 'We found the following daily topics you have been messaging about. Is this set complete? Or are there any topics you want to add tho this list?',
            'add_topics': 'ADD TOPICS',
            'thats_all': 'THAT\'S ALL',

            'day': 'Day',

            'add_topic_options_header': 'New Topic From Where?',
            'write_topic': 'Write Topic',
            'or': 'or',
            'select_from_chat': 'Select from chat',
            'back': "back", 

            'write_topic_header': 'Write your own topic and assign it to a date.',
            'type_your_own_topic_here': 'Type your own topic here',
            'done': 'DONE',

            'edit_topic_header': 'Make changes to this topic',

            'read_more': 'Read More',
            'read_less': 'Read Less',
            'select_messages_action_text': 'Select all the messages to go in the diary for this day.',
            'topics': 'TOPICS',
            'finish': 'FINISH DIARY'

        }


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

    return {
        supportsLanguage,
        getStringById,
        getString,
    } 

}

const i18n = i18nTools();

let lang = window.navigator.userLanguage || window.navigator.language;
if(!i18n.supportsLanguage(lang)) {
    lang = 'en';
}

console.log(lang);
