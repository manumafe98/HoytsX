import "@fontsource-variable/montserrat";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HoytsX } from "./HoytsX";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HoytsX />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
