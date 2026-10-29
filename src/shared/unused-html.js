// Togather exports text and validated images directly; HTML-to-PDF plugins are intentionally disabled.
export default function unsupportedHTML() { throw new Error('HTML conversion is not enabled'); }
export const Canvg = { fromString: unsupportedHTML };
