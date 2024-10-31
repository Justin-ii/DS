const CACHE_NAME = "v1";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/assets/css/main.css",
    "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "/assets/js/main.js",
    "/assets/vendor/aos/aos.js",
    "/assets/images/icon-192x192.png",
    "/assets/images/icon-512x512.png"
];

// Install Service Worker and cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Service Worker and clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event to serve cached assets
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
