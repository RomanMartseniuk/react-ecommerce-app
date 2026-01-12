import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { UserProvider } from "./store/userContext";

const Root = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="products/" element={<HomePage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<div>Shopping Cart Page</div>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<div>Register Page</div>} />
            <Route path="user" element={<div>User Profile Page</div>} />
            <Route path="saved" element={<div>Saved Items Page</div>} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </UserProvider>
    </Provider>
  );
};

export default Root;
