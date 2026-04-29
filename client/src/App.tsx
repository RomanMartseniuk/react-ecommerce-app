import { useEffect } from "react";
import MainLayout from "./layout/MainLayout";

function App() {
  useEffect(() => {
    // 1. Create the media query selector
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    // 2. Define the handler function
    const applyTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // 3. Apply the theme immediately on load
    applyTheme(darkThemeMq);

    // 4. Listen for system-level changes (e.g., sunset/sunrise auto-switch)
    darkThemeMq.addEventListener("change", applyTheme);

    // Clean up listener on unmount
    return () => darkThemeMq.removeEventListener("change", applyTheme);
  }, []);
  return <>
    <MainLayout />
  </>;
}

export default App;
