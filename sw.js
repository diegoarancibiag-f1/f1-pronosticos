const CACHE_NAME = 'f1-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Agrega aquí tus archivos .css o .js si tienes, por ejemplo:
  // './style.css'
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
