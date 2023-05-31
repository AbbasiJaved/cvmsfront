import { Spin } from "antd";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const AuthManager: React.FC = () => {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return <Outlet />;
};
