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

const saveSubscription = async (subscription, userId) => {
  const response = await fetch("http://localhost:4000/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription, userId }),
  });
  return response.json();
};

let userId = null;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_USER_ID") {
    console.log("hello this is where the useid should be");
    userId = event.data.userId;
  }
});

self.addEventListener("activate", async (e) => {
  console.log(e);
  const applicationServerKey = urlBase64ToUint8Array(
    "BLH9JhcYK7KsY8cUxW5JLIoOBuBw7h0jiGJsM2OLlt1Zir_cJTLwFqT3sY_8CuNFk5e2OQJNfmCghPzlr-vxuZc"
  );
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
  console.table({ subscription, userId });
  const response = await saveSubscription(subscription, userId);
  console.log(response);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Optima", {
    body: e.data.text(),
  });
});

// self.addEventListener("notificationclick", (e) => {
//   e.notification.close();
//   e.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//         includeUncontrolled: true,
//       })
//       .then((clientsArr) => {
//         if (clientsArr.length > 0) {
//           clientsArr[0].focus();
//         } else {
//           clients.openWindow("/");
//         }
//       })
//   );
// });

// Public Key:
// BLH9JhcYK7KsY8cUxW5JLIoOBuBw7h0jiGJsM2OLlt1Zir_cJTLwFqT3sY_8CuNFk5e2OQJNfmCghPzlr-vxuZc

// Private Key:
// d-KibqxzHtoXkyTk0m9EGbwxDfpxUxreLRNM1Uv6eVI
