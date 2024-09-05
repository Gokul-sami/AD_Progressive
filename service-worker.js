self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/AD_Asssign/index.html',
                '/AD_Asssign/style.html',
            ]).catch(error => {
                console.error('Failed to cache resources:', error);
            });
        })
    );
});
 
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
});
