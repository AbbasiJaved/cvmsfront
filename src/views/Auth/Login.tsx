import React from "react";
import { LockOutlined, RedEnvelopeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Space, Alert } from "antd";
import { Helmet } from "react-helmet";
import { useAsyncFn } from "react-use";
import { API_URL } from "../../utils/constants";

type LoginValues = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [loginState, login] = useAsyncFn(async (values: LoginValues) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(values),
      credentials:"include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    window.location.reload();
  }, []);

  const onFinish = async (values: LoginValues) => {
    await login(values);
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
        }}
        title="Log in"
        loading={loginState.loading}
      >
        <Form onFinish={onFinish}>
          {loginState.error && (
            <Form.Item>
              <Alert message={loginState.error.message} type="error" showIcon />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please type your Email!" },
              { type: "email", message: "Please type a valid Email!" },
            ]}
          >
            <Input
              prefix={<RedEnvelopeOutlined />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Button type="link" href="/forgot-password" style={{ padding: 0 }}>
            Forgot password
          </Button>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              Or
              <Button type="link" href="/register" style={{ paddingLeft: 0 }}>
                Register now!
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
