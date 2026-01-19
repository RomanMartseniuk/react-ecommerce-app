import { Link, NavLink } from "react-router";
import HeartIcon from "../../../assets/icons/HeartIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import SquaresIcon from "../../../assets/icons/SquaresIcon";
import TooltipedComponent from "@/components/common/TooltipedComponent";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-1 h-15">
      <Link to="/">
        <img src="./logo.svg" alt="Logo" />
      </Link>

      <nav className="flex gap-2">
        <NavLink to="/categories">
          <TooltipedComponent tooltipText="Categories">
            <SquaresIcon />
          </TooltipedComponent>
        </NavLink>
        <NavLink to="/saved">
          <TooltipedComponent tooltipText="Saved Products">
            <HeartIcon />
          </TooltipedComponent>
        </NavLink>
        <NavLink to="/cart">
          <TooltipedComponent tooltipText="Products Cart">
            <ShoppingCartIcon />
          </TooltipedComponent>
        </NavLink>
        <NavLink to="/profile">
          <TooltipedComponent tooltipText="User Account">
            <UserIcon />
          </TooltipedComponent>
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
