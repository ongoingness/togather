import { jsPDF } from "jspdf";
import loadPdfFonts from "../shared/pdfFontsLoader.js";
import { showImportError } from "../shared/import-controls.js";
import Diary from "./diary.js";


/**
 * Entry point for webpack.
 * @author Luis Carvalho
 */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadPdfFonts(jsPDF);
        Diary();
    } catch (error) {
        console.error('Initialization failed', error.name, error.message);
        document.querySelector('.loader')?.remove();
        showImportError(error);
    }
});
