import React from "react";
import { RedEnvelopeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Typography, Space } from "antd";
import { useAsyncFn } from "react-use";
import { Helmet } from "react-helmet";
import { api } from "../../utils/api";
import { useNotification } from "../../providers/NotificationProvider";

export const ForgotPassword: React.FC = () => {
  const notification = useNotification();

  const [forgotPasswordState, forgotPassword] = useAsyncFn(
    async (values) => {
      try {
        const response = await api("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        notification.success({
          message: "Success",
          description:
            "Check your email for instructions on how to reset your password.",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: (error as Error).message,
        });
      }
    },
    [notification]
  );

  const onFinish = (values: any) => {
    forgotPassword(values);
  };

  return (
    <div>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
        }}
        title={
          <Typography.Title level={5}>Forgot your password?</Typography.Title>
        }
      >
        <Form onFinish={onFinish} layout="vertical">
          <Typography.Paragraph>
            No problem! Just enter the email address that you signed up with to
            reset it.
          </Typography.Paragraph>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<RedEnvelopeOutlined />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={forgotPasswordState.loading}
            >
              Send reset instructions
            </Button>
            <Button type="link" href="/login">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
