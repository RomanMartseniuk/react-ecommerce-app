import { Nav } from "@/components/common/header/Nav";
import React from "react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header block absolute top-0 left-0 w-full">
      <div className="container m-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="./favicon.svg" alt="Logo" />
          <h1>Shop</h1>
        </Link>
        <div>Search</div>
        <Nav />
      </div>
    </header>
  );
};
