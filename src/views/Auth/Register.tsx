import React from "react";
import { Button, Form, Input, Card, Space, Alert } from "antd";
import { useAsyncFn } from "react-use";
import { Select } from "antd";
import { Helmet } from "react-helmet";
import { API_URL } from "../../utils/constants";

import Course from "../../models/Course.model";
import { useNotification } from "../../providers/NotificationProvider";
import { useApi } from "../../hooks";

export const Register: React.FC = () => {
  const notification = useNotification();

  const [courses] = useApi<Course[]>({
    endPoint: "/courses",
  });

  const [registration, register] = useAsyncFn(async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      notification.success({
        message: "Success",
        description:
          "Registration successful!, please check your email to verify your account.",
      });

      return await response.json();
    } catch (error) {
      notification.error({
        message: "Error",
        description: (error as Error).message,
      });
    }
  });

  const onFinish = async (values: any) => {
    await register(values);
  };

  const options = courses.value
    ?.filter((course) => !course.lecturerId)
    .map((course) => ({
      label: course.name + " - " + course.code,
      value: course.id,
    }));

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
        }}
        title="Create an account"
        loading={registration.loading}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please enter your First name!",
              },
              {
                pattern: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
                message: "Please enter a valid First name!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: "Please enter your Last name!" },
              {
                pattern: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
                message: "Please enter a valid Last name!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="staffId"
            label="Staff ID"
            rules={[{ required: true, message: "Please enter your Staff ID!" },{
              pattern: /^([a-zA-Z0-9@!\.]+\s)*[a-zA-Z0-9@!\.]+$/,
              message: "Please enter a valid Staff Id!",
            },
          ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            rules={[
              { required: true, message: "Please enter your Password again!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="courses"
            label="Courses"
            rules={[
              {
                required: true,
                message: "Please select your courses!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select your courses"
              loading={courses.loading}
              options={options}
              filterOption={(input, option) => {
                if (option) {
                  return (
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }
                return false;
              }}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button htmlType="reset">Reset</Button>
              Or
              <Button type="link" href="/login" style={{ paddingLeft: 0 }}>
                Log in now!
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
