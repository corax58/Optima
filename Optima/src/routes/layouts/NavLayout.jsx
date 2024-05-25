import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import NabBar from "./NabBar";
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

Notif();

const NavLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  ">
          <Outlet />
        </div>

        <div className="drawer-side m">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu p-4 h-full  w-64 min-h-full bg-base-200 text-base-content">
            <NabBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
