import * as React from "react";
import { useAsync } from "react-use";
import { API_URL } from "../utils/constants";

type User = {
  id: string;
  role: string;
  email: string;
};

type IAuthContext = {
  user?: User;
  loading: boolean;
  error?: Error;
};

const AuthContext = React.createContext<IAuthContext>({
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const state = useAsync(async (): Promise<User> => {
    const response = await fetch(API_URL + "/auth/whoami", {
      credentials: "include",
    });

    const data = await response.json();

    return data.user;
  });

  const value = React.useMemo(
    () => ({
      user: state.value,
      loading: state.loading,
      error: state.error,
    }),
    [state.loading, state.error, state.value]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
