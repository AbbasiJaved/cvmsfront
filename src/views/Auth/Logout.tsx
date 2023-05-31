import { Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsync } from "react-use";
import { API_URL } from "../../utils/constants";

export function Logout() {
  const navigate = useNavigate();

  const state = useAsync(async () => {
    await fetch(API_URL + "/auth/logout", {
      credentials: "include",
    });
  }, []);

  React.useEffect(() => {
    if (!state.loading) {
      window.location.href = "/login";
    }
  }, [state.loading, navigate]);

  return (
    <Spin
      size="large"
      spinning={state.loading}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
