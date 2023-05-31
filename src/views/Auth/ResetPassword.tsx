import React from "react";
import { Button, Form, Input, Card, Typography, Space, Result } from "antd";
import { useAsyncFn } from "react-use";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNotification } from "../../providers/NotificationProvider";
import { api } from "../../utils/api";

export const ResetPassword: React.FC = () => {
  const [urlSearchParams] = useSearchParams();
  const notification = useNotification();
  const [success, setSuccess] = React.useState(false);

  const token = urlSearchParams.get("token");

  const [updatePasswordState, updatePassword] = useAsyncFn(async (values) => {
    try {
      if (!token) {
        throw new Error("Invalid token");
      }

      const response = await api("/auth/reset-password/" + token, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      notification.success({
        message: "Success",
        description: "Password updated successfully, please login.",
      });

      setSuccess(true);
    } catch (error) {
      notification.error({
        message: "Error",
        description: (error as Error).message,
      });
    }
  }, []);

  const onFinish = (values: any) => {
    updatePassword(values);
  };

  if (success) {
    return (
      <Result
        status="success"
        title="Password updated successfully!"
        subTitle="Please login with your new password."
        extra={[
          <Button type="primary" key="login" href="/login">
            Login
          </Button>,
        ]}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
        }}
      />
    );
  }

  return (
    <div>
      <Helmet>
        <title>Reset password</title>
      </Helmet>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
        }}
        title={
          <Typography.Title level={5}>Change your password</Typography.Title>
        }
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="password"
            label="New password"
            rules={[
              { required: true, message: "Please enter your new Password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm new password"
            rules={[
              {
                required: true,
                message: "Please enter your new Password again!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={updatePasswordState.loading}
              >
                Change password
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
