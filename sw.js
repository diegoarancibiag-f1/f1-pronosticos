const CACHE_NAME = 'f1-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'sw.js' // Agrégalo también para que se reconozca a sí mismo
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Responder desde el caché cuando no hay red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); // Toma el control de la página inmediatamente
});
