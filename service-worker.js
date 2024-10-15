self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                'https://gokul-sami.github.io/AD_Asssign/',
                'https://gokul-sami.github.io/AD_Asssign/index.html',
                'https://gokul-sami.github.io/AD_Asssign/style.css',
                'https://gokul-sami.github.io/AD_Asssign/images/tadow.jpg'
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

self.addEventListener('activate', event => {
    const cacheWhitelist = ['v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});