import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Tfmars420 from "./tfmars420";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tfmars420 />
  </StrictMode>
);
