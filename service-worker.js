self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/AD_Assign/',
                '/AD_Assign/index.html',
                '/AD_Assign/style.css',
                '/AD_Assign/images/tadow.jpg'
            ]).catch(error => {
                console.error('Failed to cache resources:', error);
            });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(error => {
            console.error('Fetching failed:', error);
            // Optionally provide a fallback response
        })
    );
});

