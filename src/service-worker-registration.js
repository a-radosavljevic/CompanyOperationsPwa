import { SubscriptionDTO } from "./api/models.ts";
import { Buffer } from 'buffer';
import http from './api/http.js'
import { urlBase64ToUint8Array } from './utils/helper-methods.js'

const webPushPublicKey = process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY;

export function register(userId) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(async reg => {
        console.log("Service worker registred");
        requestPermissionAndSubscribe(reg, userId)
      }).catch(err => {
        alert('Neuspešna inicijalizacija sistema za obaveštavanje');
        console.log(err);
      })
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

export async function requestPermissionAndSubscribe(registration, userId) {
  const permission = await window.Notification.requestPermission();

  if (permission === 'denied') {
    throw new Error('Permission not granted for Notification!');
  }
  else if (permission === 'default') {
    setTimeout(async () => await requestPermissionAndSubscribe(registration, userId), 1000)
  }
  else {
    console.log("User granted permission");
    let applicationServerKey = urlBase64ToUint8Array(webPushPublicKey);
    const subscription = await registration.pushManager.subscribe({ applicationServerKey, userVisibleOnly: true });
    subscribeToServer(subscription, userId)
  }
}

async function subscribeToServer(subscription, userId) {
  let data = new SubscriptionDTO();
  data.userId = userId;
  data.endpoint = subscription.endpoint;
  data.p256dh = Buffer.from(subscription.getKey('p256dh')).toString('base64');
  data.auth = Buffer.from(subscription.getKey('auth')).toString('base64');

  let response = await http.post('/notifications/subscribe', data);
  if (response.status !== 200) {
    throw new Error("Neuspešno prijavljivanje na sistem obaveštavanja");
  }
}
