import * as React from "react";
import { Navigate } from "react-router-dom";
import { Unauthorized } from "./Unauthorized";
import { useAuth } from "../providers/AuthProvider";

export const AdminProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== "admin") {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const PublicRoute: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuth();

  if (auth.user) {
    const role = auth.user.role;
    if (role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};
