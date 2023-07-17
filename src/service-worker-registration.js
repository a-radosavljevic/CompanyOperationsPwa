export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((reg) => {
                    alert("Registred")
                })
        })
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

export async function requestPermission() {
    const permission = await window.Notification.requestPermission();

        if(permission === 'denied'){
            throw new Error('Permission not granted for Notification!');
        }
        else if (permission === 'default') {
          setTimeout(async () => await requestPermission(), 1000)
        }
        else {
          alert("User has granted permission for push notifications.")
        }
}