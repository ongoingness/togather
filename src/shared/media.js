import { LIMITS, ImportError } from './whatapp-chat-parser.js';
export async function fitImage(data, maxWidth) {
    const image = new Image();
    let timer;
    try {
        await new Promise((resolve, reject) => {
            timer = setTimeout(() => reject(new ImportError('unreadable-file')), 15000);
            image.onload = resolve; image.onerror = () => reject(new ImportError('unsupported-image'));
            image.src = data;
        });
        if (!image.naturalWidth || image.naturalWidth * image.naturalHeight > LIMITS.imagePixels) throw new ImportError('image-too-large');
        const ratio = Math.min(1, maxWidth / (image.naturalWidth * 0.264583));
        return { w: image.naturalWidth * 0.264583 * ratio, h: image.naturalHeight * 0.264583 * ratio };
    } finally { clearTimeout(timer); image.src = ''; }
}
export async function videoFrame(media, time) {
    const video = document.createElement('video');
    video.preload = 'auto'; video.muted = true; video.playsInline = true;
    let timer;
    try {
        await new Promise((resolve, reject) => {
            timer = setTimeout(() => reject(new ImportError('unreadable-file')), 15000);
            video.onerror = () => reject(new ImportError('unreadable-file'));
            video.onloadeddata = resolve; video.src = media.data; video.load();
        });
        if (!video.videoWidth || video.videoWidth * video.videoHeight > LIMITS.imagePixels) throw new ImportError('image-too-large');
        const seek = Math.min(time, Math.max(0, video.duration - 0.01));
        if (seek > 0) await new Promise((resolve, reject) => {
            clearTimeout(timer); timer = setTimeout(() => reject(new ImportError('unreadable-file')), 15000);
            video.onseeked = resolve; video.currentTime = seek;
        });
        const canvas = document.createElement('canvas');
        const ratio = Math.min(1, 1600 / Math.max(video.videoWidth, video.videoHeight));
        canvas.width = Math.max(1, Math.round(video.videoWidth * ratio)); canvas.height = Math.max(1, Math.round(video.videoHeight * ratio));
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        return { data: canvas.toDataURL('image/png'), w: canvas.width, h: canvas.height, time: seek };
    } finally { clearTimeout(timer); video.removeAttribute('src'); video.load(); }
}
