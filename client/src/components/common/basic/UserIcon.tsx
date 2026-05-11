import { Link } from "react-router";

import { useTheme } from "@/hooks/useTheme";

import UserDarkIcon from "@/assets/icons/user_light_theme_icon.svg?react";
import UserLightIcon from "@/assets/icons/user_dark_theme_icon.svg?react";

export const UserIcon = () => {
  return (
    <Link to="/account">
      {useTheme().theme === "dark" ? (
        <UserLightIcon className="scale-[1.1]" />
      ) : (
        <UserDarkIcon className="scale-[1.1]" />
      )}
    </Link>
  );
};
