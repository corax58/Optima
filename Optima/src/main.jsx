import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/serviceWorker.js").then(
//       (registration) => {
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       },
//       (err) => {
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }

const querClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={querClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
