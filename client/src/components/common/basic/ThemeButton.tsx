import { useTheme } from "@/hooks/useTheme";

import lightThemeIcon from "@/assets/icons/light_theme_icon.svg";
import darkThemeIcon from "@/assets/icons/dark_theme_icon.svg";
import { cn } from "@/lib/utils";

export const ThemeButton = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleTheme();
      }}

      className={cn(className, "")}
    >
      {theme === "dark" ? (
        <img
          src={lightThemeIcon}
          className="scale-[1.1]"
          alt="Light Theme Icon"
        />
      ) : (
        <img
          src={darkThemeIcon}
          className="scale-[1.1]"
          alt="Dark Theme Icon"
        />
      )}
    </button>
  );
};
