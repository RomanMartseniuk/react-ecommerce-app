import { Route, Routes } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/saved" element={<FavouritesPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Route>
    </Routes>
  );
};

export default Root;
