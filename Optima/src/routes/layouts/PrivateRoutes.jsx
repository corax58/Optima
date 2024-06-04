import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
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
  console.log("1");
  const registration = await navigator.serviceWorker.register(
    "/serviceWorker.js"
  );
  console.log("2");

  // Wait for the service worker to be activated
  const serviceWorkerStateChange = (serviceWorker) =>
    new Promise((resolve) => {
      serviceWorker.addEventListener("statechange", function () {
        if (this.state === "activated") resolve();
      });
    });

  if (registration.installing) {
    await serviceWorkerStateChange(registration.installing);
  } else if (registration.waiting) {
    await serviceWorkerStateChange(registration.waiting);
  }

  console.log("3");
  // Retrieve userId from localStorage safely
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).userId : null;
  if (userId && registration.active) {
    // Send userId to the service worker
    registration.active.postMessage({ type: "SET_USER_ID", userId });
  }
  console.log("4");
  return registration;
};

const Notif = async () => {
  try {
    await checkPermissions();
    console.log("Service worker permission is supported");
    await requestNotificationPermission();
    console.log("Notification permission allowed");
    await registerServiceWorker();
    console.log("Service worker registered");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

const PrivateRoutes = () => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to={"/login"} />;
  if (user) {
    console.log("starting the notif fun");
    Notif();
  }
  return <Outlet />;
};

export default PrivateRoutes;
