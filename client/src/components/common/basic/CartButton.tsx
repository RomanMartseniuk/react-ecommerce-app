import { Link } from "react-router";

import ShoppingCartLightIcon from "@/assets/icons/shopping_cart_light_theme_icon.svg?react";
import ShoppingCartDarkIcon from "@/assets/icons/shopping_cart_dark_theme_icon.svg?react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";


export const CartButton = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  // Get cart items from context

  const productsInCart: number = 1;

  return (
    <Link to="/cart" className={cn(className, "relative")}>
      {theme === "dark" ? (
        <ShoppingCartDarkIcon className="scale-[1.1]" />
      ) : (
        <ShoppingCartLightIcon className="scale-[1.1]" />
      )}
      {productsInCart !== 0 && (
        <span className="block font-bold text-[10px] absolute right-[-20%] top-[-10%] bg-primary text-primary-foreground px-2 py-0.5 rounded">
          {productsInCart}
        </span>
      )}
    </Link>
  );
};
