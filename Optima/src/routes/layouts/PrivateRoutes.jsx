import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const checkPermissions = async () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
};

const registerServiceWorker = async () => {
  const registration = await navigator.serviceWorker.register(
    "/serviceWorker.js"
  );

  // Wait for the service worker to be activated
  const serviceWorkerStateChange = (serviceWorker) =>
    new Promise((resolve) => {
      serviceWorker.addEventListener("statechange", function () {
        if (this.state === "activated") resolve();
      });
    });

  const userr = localStorage.getItem("user");
  const userrId = userr ? JSON.parse(userr).userId : null;
  if (userrId && registration.active) {
    // Send userId to the service worker
    registration.active.postMessage({ type: "SET_USER_ID", userrId });
  }

  if (registration.installing) {
    await serviceWorkerStateChange(registration.installing);
  } else if (registration.waiting) {
    await serviceWorkerStateChange(registration.waiting);
  }

  // Retrieve userId from localStorage safely
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).userId : null;
  if (userId && registration.active) {
    // Send userId to the service worker
    registration.active.postMessage({ type: "SET_USER_ID", userId });
  }

  return registration;
};

const Notif = async () => {
  try {
    await checkPermissions();
    await requestNotificationPermission();
    await registerServiceWorker();
  } catch (error) {}
};

const PrivateRoutes = () => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to={"/login"} />;
  if (user) {
    Notif();
  }
  return <Outlet />;
};

export default PrivateRoutes;
