const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listem for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("push", (event) => {
  if (event.data) {
    let notification = JSON.parse(event.data.text());
    event.waitUntil(
      notify(notification.Type, notification.Title, notification.Body, notification.Data, self.registration)
    )
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;
  const notificationType = event.notification.data.type;
  if (url) {
    event.waitUntil(
      clients.openWindow(getNotificationActionURLByType(notificationType, url))
    )
  }
});

function notify(type, title, message, data, serviceWorker) {
  let options = {
    title: 'Company Operations',
    body: message,
    icon: '',
    vibrate: true,
    silent: false,
    data: {
      type: type,
      url: data
    }
  };
  serviceWorker.showNotification(title, options);
}

function getNotificationActionURLByType(type, data) {
  switch (type) {
    case NotificationType.Document:
      return `/preview?id=${data}`;
    case NotificationType.Workflow:
      return `/workflow-task?id=${data}`;
  }
}

const NotificationType = {
  Document: 1,
  Workflow: 2
}