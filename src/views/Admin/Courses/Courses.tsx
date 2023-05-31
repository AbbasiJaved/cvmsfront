import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { DeleteButton } from "../../../components";
import CourseModel from "../../../models/Course.model";

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<CourseModel> => [
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
    title: "Pending Approval Lecturer",
    dataIndex: "pendingLecturer",
    key: "pendingLecturer",
    render(_, record) {
      return (
        <span>
          {record?.pendingLecturer?.firstName}{" "}
          {record.pendingLecturer?.lastName}
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
      return (
        <Button href={`/admin/venues/${record.preferredVenueId}`} type="link">
          {record.preferredVenue?.name}
        </Button>
      );
    },
    align: "center",
  },
  {
    title: "Program",
    dataIndex: "program",
    key: "program",
    render(_, record) {
      return (
        <Button href={"/admin/programs/" + record.programId} type="link">
          {record.program?.name}
        </Button>
      );
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
    sorter: (a: CourseModel, b: CourseModel) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA.getTime() - dateB.getTime();
    },
    align: "center",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.updatedAt).toLocaleString()}</Tag>
    ),
    sorter: (a: CourseModel, b: CourseModel) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);

      return dateA.getTime() - dateB.getTime();
    },
    align: "center",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button href={`/admin/courses/${record.id}`}>View/Edit</Button>
        <DeleteButton id={record.id} resource="courses" onSuccess={refresh} />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const AdminCourses: React.FC = () => {
  const [courses, fetchCourses] = useApi<CourseModel[]>({
    endPoint: "/courses",
  });

  const columns: ColumnsType<CourseModel> = React.useMemo(
    () =>
      getColumns({
        refresh: fetchCourses,
      }),
    [fetchCourses]
  );

  return (
    <div>
      <Helmet>
        <title>Courses</title>
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
            <Typography.Title level={3}>Courses</Typography.Title>
            <Button
              href="/admin/courses/new"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a course
            </Button>
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
