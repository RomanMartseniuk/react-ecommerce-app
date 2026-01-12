import React, { createContext, useState, useMemo } from "react";
import type { User } from "../types/User";
import type { Product } from "../types/Product";
import { userService } from "../api/userService";

interface UserContextValue {
  user: User | null;
  favorites: Product[];

  isAuth: () => Promise<boolean>;

  login: (user: User) => void;
  logout: () => void;

  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setFavorites([]);
  };

  const isAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      logout();
      return false;
    }

    try {
      const profile = await userService.getProfile();
      setUser(profile);
      return true;
    } catch {
      try {
        await userService.refreshToken();
        const profile = await userService.getProfile();
        setUser(profile);
        return true;
      } catch {
        logout();
        return false;
      }
    }
  };

  const addToFavorites = (product: Product) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  const value = useMemo(
    () => ({
      user,
      favorites,
      isAuth,
      login,
      logout,
      addToFavorites,
      removeFromFavorites,
    }),
    [user, favorites]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
