import "@fontsource-variable/montserrat";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HoytsX } from "./HoytsX";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<HoytsX />} />
    </Routes>
  </BrowserRouter>
);
