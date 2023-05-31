import React, { useState } from "react";
import {
  CalendarOutlined,
  BookOutlined,
  LogoutOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout as AntLayout, Menu, theme } from "antd";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { BackButton, Logo } from "../../components";

const { Header, Content, Sider } = AntLayout;

const items = [
  {
    key: "/",
    label: "My Courses",
    icon: <BookOutlined />,
  },
  {
    key: "/schedule",
    label: "My Schedule",
    icon: <CalendarOutlined />,
  },
  {
    key: "/timetables",
    label: "Timetables",
    icon: <TableOutlined />,
  },
  {
    key: "/logout",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

export const Layout: React.FC<{
  children?: React.ReactNode;
}> = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          selectable
          items={items}
          onSelect={({ key }) => {
            navigate(key);
          }}
          selectedKeys={[location.pathname]}
        />
      </Sider>
      <AntLayout>
        <Header
          style={{
            padding: 12,
            background: colorBgContainer,
          }}
        >
          <BackButton />
        </Header>
        <Content>
          <div
            style={{
              padding: 12,
              height: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
