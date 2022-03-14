const cacheName = "v1";

const cacheAssets = ["index.html", "main.js", "style.css", "chewie.jpg"];

self.addEventListener("install", async e => {
  console.log("installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("ServiceWorker: Caching files");
        cache.addAll(cacheAssets);
      }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", async e => {
  console.log("Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("ServiceWorker: Clearing old caches");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", async e => {
  console.log("ServiceWorker: Fetching")
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));

  let client = await clients.get(e.clientId);

  if (client) {
    client.postMessage("Besked fra SW");
  }
});


self.addEventListener("fetch", async event => {
  console.log("ServiceWorker: Fetching")

  const fileName = event.request.url.spilt("/").pop()

  if(fileName === "fake.css") {
    event.respondWith(
      new Response()
    )
}
});



