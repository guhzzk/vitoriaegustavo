const CACHE_NAME = "gv-love-v3";

const FILES = [
  "https://guhzzk.github.io/vitoriaegustavo/",
  "https://guhzzk.github.io/vitoriaegustavo/index.html",
  "https://guhzzk.github.io/vitoriaegustavo/manifest.json",
  "https://guhzzk.github.io/vitoriaegustavo/icon-192.png",
  "https://guhzzk.github.io/vitoriaegustavo/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
