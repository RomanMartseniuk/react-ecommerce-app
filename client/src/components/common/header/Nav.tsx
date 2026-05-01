import { Link } from "react-router";
import { ThemeButton } from "../basic/ThemeButton";

import { CartButton } from "../basic/CartButton";

export const Nav = () => {
  return (
    <nav>
      <ThemeButton />
      <CartButton />
      <Link to=""></Link>
    </nav>
  );
};
