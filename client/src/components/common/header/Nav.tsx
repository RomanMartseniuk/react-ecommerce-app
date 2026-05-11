import { ThemeButton } from "../basic/ThemeButton";
import { CartButton } from "../basic/CartButton";
import { UserIcon } from "../basic/UserIcon";

const hoverEffect = "transition-all hover:translate-y-0.5";

export const Nav = () => {
  return (
    <nav className="flex items-center ">
      <ThemeButton className={hoverEffect} />
      <CartButton className={hoverEffect} />
      <UserIcon className={hoverEffect} />
    </nav>
  );
};
