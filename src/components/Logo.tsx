import * as React from "react";
import logo from "../assets/logo.png";

export const Logo = () => (
  <div
    style={{
      height: 32,
      margin: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img src={logo} width={30} height={30} alt="logo" />
  </div>
);
