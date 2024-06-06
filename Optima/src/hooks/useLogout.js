import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const clearNotificationsAndUnregisterServiceWorkers = async () => {
  try {
    // Clear all notifications
    if (window.Notification && window.Notification.permission === "granted") {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const notifications = await registration.getNotifications();
        for (const notification of notifications) {
          notification.close();
        }
      }
    }

    // Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const success = await registration.unregister();
        if (success) {
          console.log("Service worker unregistered successfully");
        }
      }
    }
  } catch (error) {
    console.error(
      "Error clearing notifications or unregistering service workers:",
      error
    );
  }
};

export const useLogout = () => {
  const navigator = useNavigate();
  const { dispatch } = useAuthContext();
  const Logout = () => {
    // dispatch({ type: "Logout" });
    localStorage.removeItem("user");
    // clearNotificationsAndUnregisterServiceWorkers();
    navigator("/login");
    // cleanNotifications();
  };
  return { Logout };
};
