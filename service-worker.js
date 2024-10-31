// service-worker.js
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("static-cache").then((cache) => {
        return cache.addAll([
          "/", // Cache the root
          "/index.html", // Cache the main HTML
          "/css/style.css", // Cache CSS file
          "/js/script.js", // Cache JS file
          "/path/to/icon-192x192.png", // Cache icons
          "/path/to/icon-512x512.png"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  