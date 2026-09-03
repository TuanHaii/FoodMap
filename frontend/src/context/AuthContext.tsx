import React, {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  User,
  LoginRequest,
  RegisterRequest,
  ProfileUpdateInput,
} from "../domain/user/types";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOwner: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileUpdateInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() =>
    authService.getCurrentUser(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      await authService.login(credentials);
      setUser(await authService.getProfile());
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      setUser(await authService.getProfile());
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: ProfileUpdateInput) => {
    const updated = await authService.updateProfile(data);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isOwner: user?.role === "restaurant_owner" || user?.role === "admin",
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
