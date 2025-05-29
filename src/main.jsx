import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={Router} />
  </StrictMode>
);
