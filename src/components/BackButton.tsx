import * as React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const BackButton: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button type="primary" onClick={goBack} icon={<ArrowLeftOutlined />}>
      Back
    </Button>
  );
};
