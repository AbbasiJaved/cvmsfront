import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { DeleteButton } from "../../../components";
import ProgramModel from "../../../models/Program.model";

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<ProgramModel> => [
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
  // {
  //   title: "Timetables",
  //   dataIndex: "timetables",
  //   key: "timetables",
  //   render: (_, record) => (
  //     <Space direction="vertical">
  //       {record.timetables?.map((timetable) => (
  //         <Button type="link" href={`/admin/timetables/${timetable.id}`}>
  //           {timetable.name}
  //         </Button>
  //       ))}
  //     </Space>
  //   ),
  // },
  // {
  //   title: "Courses",
  //   dataIndex: "courses",
  //   key: "courses",
  //   render: (_, record) => (
  //     <Space direction="vertical">
  //       {record.courses?.map((course) => (
  //         <Button type="link" href={`/admin/courses/${course.id}`}>
  //           {course.name}
  //         </Button>
  //       ))}
  //     </Space>
  //   ),
  // },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.createdAt).toLocaleString()}</Tag>
    ),
    sorter: (a: ProgramModel, b: ProgramModel) => {
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
    sorter: (a: ProgramModel, b: ProgramModel) => {
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
        <Button href={`/admin/programs/${record.id}`}>View/Edit</Button>
        <DeleteButton id={record.id} resource="programs" onSuccess={refresh} />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const AdminPrograms: React.FC = () => {
  const [programs, fetchPrograms] = useApi<ProgramModel[]>({
    endPoint: "/programs",
  });

  const columns: ColumnsType<ProgramModel> = React.useMemo(
    () =>
      getColumns({
        refresh: fetchPrograms,
      }),
    [fetchPrograms]
  );

  return (
    <div>
      <Helmet>
        <title>Programs</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={programs.value}
        loading={programs.loading}
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
            <Typography.Title level={3}>Programs</Typography.Title>
            <Button
              href="/admin/programs/new"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a program
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
