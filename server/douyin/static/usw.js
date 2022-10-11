
// 卸载;
var scriptURL;
if (self.serviceWorker) scriptURL = self.serviceWorker.scriptURL;
else {
    console.log("==serviceWorker==", self);
}

console.log("workbox work", scriptURL);

self.addEventListener('install', function (e) {
    console.log("workbox install", scriptURL);
    self.skipWaiting();
    console.log("workbox install skipWaiting end", scriptURL);
});

self.addEventListener('activate', function (e) {
    console.log("workbox activate", scriptURL);
});

self.caches.keys()
    .then(keys => {
        return Promise.all(
            keys.map(async key => {
                if (!key.includes("media")) {
                    let ok = await self.caches.delete(key);
                    console.log("workbox caches.delete", key, ok);
                }
            }));
    }).then(async () => {
        self.registration.unregister()
            .then(function (ok) {
                console.log("workbox unregister", scriptURL);
                return self.clients.matchAll();
            })
            .then(function (clients) {
                clients.forEach(client => {
                    console.log("workbox client navigate ", client, client.url);
                    client.navigate(client.url);
                });
            })
            .then(() => console.log("workbox unregister done", scriptURL))
            .catch(console.error);
    });