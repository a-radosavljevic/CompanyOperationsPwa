const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Keš memorija otvorena");
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
  console.log('Service worker je aktiviran')
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

self.addEventListener("push", (event) => {
  if (event.data) {
    let notification = JSON.parse(event.data.text());
    event.waitUntil(
      notify(notification.Type, notification.Title, notification.Body, notification.Data)
    )
  }
});

function notify(type, title, message, data) {
  const origin = self.location.origin;

  let options = {
    title: 'Company Operations',
    body: message,
    icon: `${origin}/images/attachment_126654181.png`,
    badge: `${origin}/images/attachment_126654181.png`,
    vibrate: true,
    silent: false,
    data: {
      type: type,
      url: data
    },
    actions: [
      { action: 'open', title: 'Prikaži' }
    ]
  };
  self.registration.showNotification(title, options);
}

function getNotificationActionURLByType(type, data) {
  const origin = self.location.origin;

  switch (type) {
    case NotificationType.Document:
      return `${origin}/preview?id=${data}`;
    case NotificationType.Workflow:
      return `${origin}/workflow-task?id=${data}`;
  }
}

const NotificationType = {
  Document: 1,
  Workflow: 2
}