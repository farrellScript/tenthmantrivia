var staticCacheName = "trivia-v3"
var topLevelNav = ['/, /manage']

self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache){
			return cache.addAll([
                '/',
                '/fonts.css',
                '/static/js/bundle.js',
                '/img/downarrow.svg',
                '/fonts/DSGSans-Black.eot',
                '/fonts/DSGSans-Black.ttf',
                '/fonts/DSGSans-Black.woff',
                '/fonts/DSGSans-Black.woff2',
								'/img/baseballbg.jpg',
								'/css/martial.indigo-pink.min.css',
								'/js/material.min.js',
								'https://fonts.googleapis.com/icon?family=Material+Icons'
			])
		})
	)
})

self.addEventListener('activate', function(event) {
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
		return Promise.all(
		  cacheNames.filter(function(cacheName) {
			return cacheName.startsWith('trivia-') &&
				   cacheName != staticCacheName;
		  }).map(function(cacheName) {
			return caches.delete(cacheName);
		  })
		);
	  })
	);
});

self.addEventListener('fetch',function(event){
	var requestUrl = new URL(event.request.url);
	if (requestUrl.origin === location.origin){
        if(requestUrl.pathname == '/'){
			event.respondWith(caches.match('/'))
			return
        }
        if(requestUrl.pathname == '/manage'){
			event.respondWith(caches.match('/'))
			return
		}
	}
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
	)
})