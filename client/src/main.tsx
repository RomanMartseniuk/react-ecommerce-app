
import { BrowserRouter as Router } from "react-router";
import { createRoot } from "react-dom/client";

import "./styles/variables.css";
import "./styles/index.css";

import { Root } from "./routes/Root.tsx";



createRoot(document.getElementById("root")!).render(
  <Router>
    <Root />
  </Router>,
);
