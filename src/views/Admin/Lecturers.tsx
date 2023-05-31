import React from "react";
import { Button, Space, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAsyncFn } from "react-use";
import { Helmet } from "react-helmet";
import { api } from "../../utils/api";

import UserModel from "../../models/User.model";
import { useApi } from "../../hooks";
import { useNotification } from "../../providers/NotificationProvider";
import { DeleteButton } from "../../components";

const ManageLecturerStatus = ({
  user,
  onApprove,
  onReject,
}: {
  user: UserModel;
  onApprove: () => void;
  onReject: () => void;
}) => {
  const notification = useNotification();

  const [approveApplicationState, approveApplication] = useAsyncFn(async () => {
    try {
      const response = await api(`/lecturers/${user.id}/approve`, {
        method: "PUT",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      onApprove();
    } catch (error) {
      notification.error({
        message: "Error",
        description: (error as Error).message,
      });
    }
  }, [user, onApprove]);

  const [rejectApplicationState, rejectApplication] = useAsyncFn(async () => {
    try {
      const response = await api(`/lecturers/${user.id}/reject`, {
        method: "PUT",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      onReject();
    } catch (error) {
      notification.error({
        message: "Error",
        description: (error as Error).message,
      });
    }
  }, [user, onReject]);

  const status = user.status;

  if (approveApplicationState.loading || rejectApplicationState.loading) {
    return <Spin />;
  }

  if (status === "pending") {
    return (
      <Space>
        <Button
          type="primary"
          onClick={approveApplication}
          loading={approveApplicationState.loading}
        >
          Approve
        </Button>
        <Button
          danger
          onClick={rejectApplication}
          loading={rejectApplicationState.loading}
        >
          Reject
        </Button>
      </Space>
    );
  }

  return null;
};

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<UserModel> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    align: "center",
  },
  {
    title: "Staff ID",
    dataIndex: "staffId",
    key: "staffId",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Pending Courses",
    dataIndex: "pendingCourses",
    key: "pendingCourses",
    render: (_, record) => (
      <Space direction="vertical" wrap>
        {Array.isArray(record.pendingCourses) &&
        record.pendingCourses.length > 0 ? (
          record?.pendingCourses?.map((course) => (
            <Button
              key={course.id}
              type="link"
              href={`/admin/courses/${course.id}`}
            >
              {course.name}-{course.code}
            </Button>
          ))
        ) : (
          <Tag>-</Tag>
        )}
      </Space>
    ),
    align: "center",
  },
  {
    title: "Courses",
    dataIndex: "courses",
    key: "courses",
    render: (_, record) => (
      <Space direction="vertical" wrap>
        {Array.isArray(record.courses) && record.courses.length > 0
          ? record.courses.map((course) => (
              <Button
                key={course.id}
                type="link"
                href={`/admin/courses/${course.id}`}
              >
                {course.name} - {course.code}
              </Button>
            ))
          : null}
      </Space>
    ),
    align: "center",
  },
  {
    title: "Email verified",
    dataIndex: "emailVerified",
    key: "emailVerified",
    render: (_, record) => (
      <Tag color={record.emailVerified ? "green" : "red"}>
        {record.emailVerified ? "Yes" : "No"}
      </Tag>
    ),
    align: "center",
  },
  {
    title: "Last Login",
    dataIndex: "lastLogin",
    key: "loginAt",
    render: (_, record) => {
      return (
        <Tag color="blue">
          {record.loginAt ? new Date(record.loginAt).toLocaleString() : "-"}
        </Tag>
      );
    },
  },
  {
    title: "Application Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      let color = "";
      let text = "";
      switch (record.status) {
        case "approved":
          color = "green";
          text = "Approved";
          break;
        case "pending":
          color = "yellow";
          text = "Pending";
          break;
        case "rejected":
          color = "red";
          text = "Rejected";
          break;
        default:
          color = "white";
          text = "Unknown";
          break;
      }

      return <Tag color={color}>{text}</Tag>;
    },
    align: "center",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.createdAt).toLocaleString()}</Tag>
    ),
    align: "center",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.updatedAt).toLocaleString()}</Tag>
    ),
    sorter: (a: UserModel, b: UserModel) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);

      return dateA.getTime() - dateB.getTime();
    },
    align: "center",
  },
  {
    title: "Actions",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <ManageLecturerStatus
          user={record}
          onApprove={refresh}
          onReject={refresh}
        />
        <DeleteButton id={record.id} resource="lecturers" onSuccess={refresh} />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const Lecturers: React.FC = () => {
  const [lecturers, refetchLecturers] = useApi<UserModel[]>({
    endPoint: "/lecturers",
  });

  const columns = React.useMemo(
    () =>
      getColumns({
        refresh: refetchLecturers,
      }),
    [refetchLecturers]
  );

  return (
    <div>
      <Helmet>
        <title>Lecturers</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={lecturers.value}
        loading={lecturers.loading}
        showHeader
        title={() => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Title level={3}>Lecturers</Typography.Title>
          </div>
        )}
        bordered
        scroll={{ x: "auto" }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};
