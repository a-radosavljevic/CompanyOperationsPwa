import { SubscriptionDTO } from "./api/models.ts";
import { Buffer } from 'buffer';
import http from './api/http.js'
import { urlBase64ToUint8Array } from './utils/helper-methods.js'

const webPushPublicKey = process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY;

export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(async reg => {
        console.log("Service worker registrovan");
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

export async function requestPermissionAndSubscribe(userId) {
  const permission = await window.Notification.requestPermission();

  if (permission === 'denied') {
    unregister();
    throw new Error('Korisnik nije odobrio rad sistema obaveštavanja');
  }
  else if (permission === 'default') {
    setTimeout(async () => await requestPermissionAndSubscribe(userId), 1000)
  }
  else {
    console.log("Korisnik je odobrio rad sistema obaveštavanja");
    navigator.serviceWorker.getRegistrations().then(async registrations => {
      for (let registration of registrations) {
        if (registration.active && registration.active.state === 'activated') {
          let applicationServerKey = urlBase64ToUint8Array(webPushPublicKey);
          const subscription = await registration.pushManager.subscribe({ applicationServerKey, userVisibleOnly: true });
          subscribeToServer(subscription, userId)
        }
        else {
          setTimeout(async () => await requestPermissionAndSubscribe(userId), 1000)
        }
      }
    });
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
  console.log('Korisnik povezan za izvor obaveštenja');
}
