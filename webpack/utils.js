

/**
 * Checks which is the user's browser.
 * @author Luis Carvalho
 * @returns {BrowserCheck} object containing individual checks for each browser.
 */
const checkBrowser = () => {

    const ua = navigator.userAgent;

    const hasMozilla = ua.includes('Mozilla');
    const hasGecko = ua.includes('Gecko');
    const hasFirefox = ua.includes('Firefox');
    const hasAppleWebKit = ua.includes('AppleWebKit');
    const hasChrome = ua.includes('Chrome');
    const hasSafari = ua.includes('Safari');
    const hasEdge = ua.includes('Edg');
    const hasVersion = ua.includes('Version');
    const hasOpera = ua.includes('OPR');

    const isFirefox = hasMozilla && hasGecko && hasFirefox;
    const isChrome = hasMozilla && hasAppleWebKit && hasChrome && hasSafari;
    const isEdge = isChrome && hasEdge;
    const isSafari = hasMozilla && hasAppleWebKit && hasVersion && hasSafari;
    const isOpera = isChrome && hasOpera;

    return { isFirefox, isChrome, isEdge, isSafari, isOpera }

}

module.exports = {
    checkBrowser,
}