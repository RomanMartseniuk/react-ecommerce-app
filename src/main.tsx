import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import Root from "./Root.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Root />
  </Router>
);
