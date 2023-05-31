import React from "react";
import { Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../hooks";
import CourseModel from "../../models/Course.model";
import { useAuth } from "../../providers/AuthProvider";

const columns: ColumnsType<CourseModel> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    align: "center",
  },
  {
    title: "Lecturer",
    dataIndex: "lecturer",
    key: "lecturer",
    render(_, record) {
      return (
        <span>
          {record?.lecturer?.firstName} {record.lecturer?.lastName}
        </span>
      );
    },
    align: "center",
  },
  {
    title: "Preferred Venue",
    dataIndex: "preferredVenue",
    key: "preferredVenue",
    render(_, record) {
      return record.preferredVenue?.name;
    },
    align: "center",
  },
  {
    title: "Program",
    dataIndex: "program",
    key: "program",
    render(_, record) {
      return record.program?.name;
    },
    align: "center",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          href={`/schedule?courseId=${record.id}&programId=${record.programId}`}
        >
          My Schedule
        </Button>
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const UserCourses: React.FC = () => {
  let [courses] = useApi<CourseModel[]>({
    endPoint: "/courses",
  });

  const auth = useAuth();

  courses.value = courses.value?.filter(
    (course) => course.lecturerId === auth.user?.id
  );

  return (
    <div>
      <Helmet>
        <title>My Courses</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={courses.value}
        loading={courses.loading}
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
            <Typography.Title level={3}>My Courses</Typography.Title>
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
