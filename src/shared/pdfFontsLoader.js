// Original embedded PDF fonts, now shared files rather than duplicated source strings.
const fonts = [["OpenSans-normal.ttf", "OpenSans", "normal"], ["OpenSans-bolditalic.ttf", "OpenSans", "bolditalic"], ["OpenSans-italic.ttf", "OpenSans", "italic"], ["Oswald-Regular-normal.ttf", "Oswald-Regular", "normal"], ["Oswald-ExtraLight-normal.ttf", "Oswald-ExtraLight", "normal"], ["Roboto-Regular-normal.ttf", "Roboto-Regular", "normal"], ["RobotoCondensed-Regular-normal.ttf", "RobotoCondensed-Regular", "normal"]];
let pending;
export default function loadPdfFonts(jsPDF) {
    return pending ||= Promise.all(fonts.map(async ([name, family, style]) => {
        const response = await fetch(`/togather/assets/fonts/${name}`);
        if (!response.ok) throw new Error('Font download failed');
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = '';
        for (let i = 0; i < bytes.length; i += 32768) binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
        const font = btoa(binary);
        jsPDF.API.events.push(['addFonts', function () {
            this.addFileToVFS(name, font);
            this.addFont(name, family, style);
        }]);
    }));
}
