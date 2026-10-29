// The previous worker cached no assets. Remove it without touching other projects' caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([caches.delete('togather-v1'), self.registration.unregister()]));
});
