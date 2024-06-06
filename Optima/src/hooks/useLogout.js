import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const navigator = useNavigate();
  const { dispatch } = useAuthContext();
  const Logout = () => {
    dispatch({ type: "Logout" });
    localStorage.removeItem("user");
    // clearNotificationsAndUnregisterServiceWorkers();
    navigator("/login");
    // cleanNotifications();
  };
  return { Logout };
};
