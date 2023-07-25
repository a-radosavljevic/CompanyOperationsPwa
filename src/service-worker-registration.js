export function register() {
  console.log(process.env.PUBLIC_URL);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        alert("Registred")
      }).catch(err => {
        alert('Neka greska');
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

export async function requestPermission() {
  const permission = await window.Notification.requestPermission();

  if (permission === 'denied') {
    throw new Error('Permission not granted for Notification!');
  }
  else if (permission === 'default') {
    setTimeout(async () => await requestPermission(), 1000)
  }
  else {
    console.log("User has granted permission for push notifications.")
  }
}