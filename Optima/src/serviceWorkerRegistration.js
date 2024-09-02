// src/serviceWorkerRegistration.js

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const register = async () => {
  // Check if service workers are supported

  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((registration) => {
        return registration.pushManager
          .getSubscription()
          .then(async (subscription) => {
            if (subscription) {
              return subscription;
            }

            const applicationServerKey = urlBase64ToUint8Array(
              "BAUsHKAEDtyQgjcAWOXAA3gcsJizoHr9H7kQdO8MHAX26jIgGtd2ZkF1XAjGYWdImgcZLlMFByPzgAW7BijJ1YA"
            );

            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey,
            });
          });
      })
      .then((subscription) => {
        // Send the subscription to your server
        fetch(`${import.meta.env.VITE_SERVER_API_URL}subscribe`, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
