const cacheName = "v1";

const cacheAssets = ["index.html", "main.js", "style.css", "chewie.jpg"];

self.addEventListener("install", async (e) => {
  console.log("installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("ServiceWorker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", async (e) => {
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

self.addEventListener("fetch", (event) => {
  console.log("ServiceWorker: Fetching 22");
  const url = new URL(event.request.url);
  let arr = url.pathname.split("/");

  if (arr[arr.length - 1] == "fake.css") {
    let res = new Response("/*CSS*/", {
      headers: {
        "content-type": "application/css",
      },
    });
    event.respondWith(res);
  } else if (arr[arr.length - 1] == "fake.html") {
    let res = new Response("/*HTML*/", {
      headers: {
        "content-type": "application/html",
      },
    });
    event.respondWith(res);
  } else if (arr[arr.length - 1] == "fake.json") {
    let res = new Response("/*JSON*/", {
      headers: {
        "content-type": "application/json",
      },
    });
    event.respondWith(res);
  }
});

self.addEventListener("fetch", async (e) => {
  console.log("ServiceWorker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));

  let client = await clients.get(e.clientId);

  if (client) {
    client.postMessage("Besked fra SW");
  }
});
