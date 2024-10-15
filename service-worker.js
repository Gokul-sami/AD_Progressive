self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                'https://gokul-sami.github.io/AD_Progressive',
                'https://gokul-sami.github.io/AD_Progressive/index.html',
                'https://gokul-sami.github.io/AD_Progressive/style.css',
                'https://gokul-sami.github.io/AD_Progressive/images/tadow.jpg'
            ]).catch(error => {
                console.error('Failed to cache resources:', error);
            });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open('v1').then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(error => {
            console.error('Fetching failed:', error);
            // Optionally provide a fallback response here
        })
    );
});
