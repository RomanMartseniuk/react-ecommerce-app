import { Link } from "react-router";

import { useTheme } from "@/hooks/useTheme";

import UserDarkIcon from "@/assets/icons/user_light_theme_icon.svg?react";
import UserLightIcon from "@/assets/icons/user_dark_theme_icon.svg?react";
import { cn } from "@/lib/utils";

export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <Link to="/account" className={cn(className, "")}>
      {useTheme().theme === "dark" ? (
        <UserLightIcon className="scale-[1.1]" />
      ) : (
        <UserDarkIcon className="scale-[1.1]" />
      )}
    </Link>
  );
};
