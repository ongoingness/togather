/**
 * Collection of type definitions.
 * @author Luis Carvalho
 */

/**
 * @typedef {Object} InputFile
 * @property {File} file file object with metadata.
 * @property {string} fileContent content of the file as base64.
 */

/**
 * @typedef {Object} DiaryFile
 * @property {string} name name of the file.
 * @property {string} type type of the file.
 * @property {string} data content of the file as base64.
 */

/**
 * @typedef {Object} ParserUser
 * @property {name} name name of user.
 */

/**
 * @typedef {Object.<string, ParserUser>} Users
 * @property {[string]} numbers phone number of users.
 */

/**
 * @typedef {Object} Message
 * @property {number} index unique number associated to the message.
 * @property {number} fulltimestamp time of message in milliseconds.
 * @property {number} user hash of the that send this message.
 * @property {string} text formatted text of the message.
 * @property {[number]} files hashes of the files associated to this message.
 * @property {number} hash unique identifier of this message.
 * @property {string} rawText raw test of thee message.
 * @property {[string]} atUser names or phones numbers of users referenced in this message.
 * @property {[string]} links http link found in the message.
 */

/**
 * @typedef {Object} WhatsAppChat
 * @property {Map<string, Message>} messageMap map containing all messages, keys are the hashes of the message.
 * @property {Map<string, DiaryFile} files map containing all files, keys are the hashes of the files.
 * @property {Users} users list of users identified with hashes.
 */


/**
 * @typedef {Object} Topic
 * @property {number} day
 * @property {number} part
 * @property {string} hash
 * @property {string} text
 * @property {[string]} messages
 * @property {[string]} selectedMessages 
 * @property {[string]} files
 */

/**
 * @typedef {Object} TopicWithMessages
 * @property {string} color hex color of the topic.
 * @property {number} day relative day of the topic.
 * @property {number} part topic part in case there are more topic in a day.
 * @property {number} hash hash of this topic. 
 * @property {string} text text of the topic.
 * @property {[Message]} selectedMessages list of messages associated with this topic. 
 * @property {[string]} files list of files assoicated with this topic.
 * @property {number} timestamp time in milliseconds of this topic.
 * @property {number} totalOfTopics total number of existing topics.
 */

/**
 * @typedef {Object} MediaDimensions
 * @property {number} w the width of a media file in pixels.
 * @property {number} h the height of a media file in pixels.
 */

/**
 * @typedef {Object} FrameData
 * @property {string} data frame in base64.
 * @property {number} w width of the frame.
 * @property {number} h height of the frame.
 * @property {number} time time of the frame in seconds.
 */


/**
 * @typedef {Object} StepControllerButtons
 * @property {HTMLButtonElement} leftButton button on the left of the controller.
 * @property {Function} leftButtonListener function called when the left button is pressed.
 * @property {HTMLButtonElement} rightButton button on the right of the controller.
 * @property {Function} rightButtonListener function called when the right button is pressed.
 * @property {HTMLButtonElement} helpButton button in the center of the controller.
 */

/**
 * @typedef {Object} ShareModalFunctions
 * @property {() => void} openShareModal function to open the share modal.
 * @property {() => void} closeShareModal function to close the share modal.
 */

/**
 * @typedef {Object} BrowserCheck
 * @property {boolean} isFirefox true if it is firefox.
 * @property {boolean} isChrome true if it is chrome.
 * @property {boolean} isEdge true if it is edge.
 * @property {boolean} isSafari true if it is safari.
 * @property {boelan} isOpera true if it is opera.
 */