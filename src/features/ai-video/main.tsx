import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/nunito/latin-800.css";
import "@fontsource/nunito/latin-900.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import VideoServices from "./video-services";
import "./video-services.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><VideoServices /></StrictMode>,
);
