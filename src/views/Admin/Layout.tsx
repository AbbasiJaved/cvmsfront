import React from "react";
import {
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  CiCircleOutlined,
} from "@ant-design/icons";
import { Layout as AntLayout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { BackButton, Logo } from "../../components";

const { Header, Content, Sider } = AntLayout;

const items = [
  {
    key: "/admin",
    label: "Lecturers",
    icon: <UserOutlined />,
  },
  {
    key: "/admin/semesters",
    label: "Semesters",
    icon: <CalendarOutlined />,
  },
  {
    key: "/admin/programs",
    label: "Programs",
    icon: <CalendarOutlined />,
  },
  {
    key: "/admin/courses",
    label: "Courses",
    icon: <BookOutlined />,
  },
  {
    key: "/admin/venues",
    label: "Venues",
    icon: <CiCircleOutlined />,
  },
  {
    key: "/admin/timetables",
    label: "Timetables",
    icon: <CiCircleOutlined />,
  },
  {
    key: "/admin/meetings",
    label: "Meetings",
    icon: <CalendarOutlined />,
  },
  {
    key: "/logout",
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

export const AdminLayout: React.FC<{
  children?: React.ReactNode;
}> = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useLocalStorage(
    "admin-layout-collapsed",
    false
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

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
            display: "flex",
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
