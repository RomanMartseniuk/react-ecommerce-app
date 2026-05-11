import { Route, Routes, Navigate } from "react-router";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@/contexts/themeContext";

export const Root = () => {
  useTheme();

  return (
    
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Navigate to="/" />} />
          <Route path="home" element={<Navigate to="/" />} />

          <Route path="categories" element={<div>Categories</div>}>
            <Route path=":categoryId" element={<div>Category Detail</div>} />
          </Route>

          <Route
            path="product/:productId"
            element={<div>Product Detail</div>}
          />

          <Route path="cart" element={<div>Cart</div>} />
          <Route path="wishlist" element={<div>Wishlist</div>} />
          <Route path="profile" element={<div>Profile</div>} />
        </Route>

        <Route path="/admin" element={<div>Admin Dashboard</div>} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
};
