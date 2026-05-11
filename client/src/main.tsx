
import { BrowserRouter as Router } from "react-router";
import { createRoot } from "react-dom/client";

import "./styles/variables.css";
import "./styles/index.css";

import { Root } from "./routes/Root.tsx";
import { ThemeProvider } from "./contexts/themeContext.tsx";



createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Router>
      <Root />
    </Router>
  </ThemeProvider>
);
