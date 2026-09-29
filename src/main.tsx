import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/index.css";

const root = document.getElementById("root") as HTMLElement;
// The initial HTML is complete for crawlers. Let React own its metadata on mount
// so client navigation cannot retain the previous page's static canonical/schema.
document.querySelectorAll('[data-prerender]').forEach(tag => tag.remove());
ReactDOM.createRoot(root).render(
  <React.StrictMode><HelmetProvider><App /></HelmetProvider></React.StrictMode>
);
