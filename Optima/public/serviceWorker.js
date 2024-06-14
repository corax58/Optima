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
  console.log("Sending subscription");
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
    userId = event.data.userId;
  }
});

function timeout(ms, errorMessage = "time out") {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage)), ms)
  );
}
function withTimeOut(promise, ms) {
  return Promise.race([promise, timeout(ms)]);
}

self.addEventListener("activate", async (e) => {
  const applicationServerKey = urlBase64ToUint8Array(
    "BFZg97OJ5GsuX1flh9yomVTzWm_fBraeWeSzunuzcYhKnubE-8rP7rWEp8uOoK3YWOMQdriZqf50caB06UE_wZ8"
  );

  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  // withTimeOut(subscription, 7000)
  //   .then((data) => {
  //     console.log("data", data);
  //   })
  //   .catch((error) => console.log("Error: ", error.message));

  console.table({ subscription, userId });
  const response = await saveSubscription(subscription, userId);
  console.log(response);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Optima", {
    body: e.data.text(),
  });
});

// Uncomment and ensure notification click handling if needed
// self.addEventListener("notificationclick", (e) => {
//   e.notification.close();
//   e.waitUntil(
//     clients.matchAll({
//       type: "window",
//       includeUncontrolled: true,
//     }).then((clientsArr) => {
//       if (clientsArr.length > 0) {
//         clientsArr[0].focus();
//       } else {
//         clients.openWindow("/");
//       }
//     })
//   );
// });
