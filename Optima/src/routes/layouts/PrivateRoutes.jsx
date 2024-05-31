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
    throw new Error("notification permission not granted");
  }
};

const registerServiceWorker = async () => {
  const registration = await navigator.serviceWorker.register(
    "/serviceWorker.js"
  );

  // Wait for the service worker to be activated
  if (registration.installing) {
    await new Promise((resolve) => {
      registration.installing.addEventListener("statechange", function () {
        if (this.state === "activated") resolve();
      });
    });
  } else if (registration.waiting) {
    await new Promise((resolve) => {
      registration.waiting.addEventListener("statechange", function () {
        if (this.state === "activated") resolve();
      });
    });
  } else if (registration.active) {
    // The service worker is already active
  }

  // Retrieve userId from localStorage
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  if (userId && registration.active) {
    // Send userId to the service worker
    registration.active.postMessage({ type: "SET_USER_ID", userId });
  }

  return registration;
};

const Notif = async () => {
  await checkPermissions();
  await requestNotificationPermission();
  await registerServiceWorker();
};
const PrivateRoutes = () => {
  const { state } = useAuthContext();

  const user = localStorage.getItem("user");
  if (!user) return <Navigate to={"/login"} />;
  if (user) {
    Notif();
  }
  return <Outlet />;
};

export default PrivateRoutes;
