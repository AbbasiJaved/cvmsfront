import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { DeleteButton } from "../../../components";
import SemesterModel from "../../../models/Semester.model";

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<SemesterModel> => [
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
    title: "Start date",
    dataIndex: "startDate",
    key: "startDate",
    render: (_, record) => (
      <Tag color="green">{new Date(record.startDate).toLocaleDateString()}</Tag>
    ),
    sorter: (a: SemesterModel, b: SemesterModel) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      return dateA.getTime() - dateB.getTime();
    },
    align: "center",
  },
  {
    title: "End date",
    dataIndex: "endDate",
    key: "endDate",
    render: (_, record) => (
      <Tag color="green">{new Date(record.endDate).toLocaleDateString()}</Tag>
    ),
    sorter: (a: SemesterModel, b: SemesterModel) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);

      return dateA.getTime() - dateB.getTime();
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
    sorter: (a: SemesterModel, b: SemesterModel) => {
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
    sorter: (a: SemesterModel, b: SemesterModel) => {
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
        <Button href={`/admin/semesters/${record.id}`}>View/Edit</Button>
        <DeleteButton id={record.id} resource="semesters" onSuccess={refresh} />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const AdminSemesters: React.FC = () => {
  const [semesters, fetchSemesters] = useApi<SemesterModel[]>({
    endPoint: "/semesters",
  });

  const columns: ColumnsType<SemesterModel> = React.useMemo(
    () =>
      getColumns({
        refresh: fetchSemesters,
      }),
    [fetchSemesters]
  );

  return (
    <div>
      <Helmet>
        <title>Semesters</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={semesters.value}
        loading={semesters.loading}
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
            <Typography.Title level={3}>Semesters</Typography.Title>
            <Button
              href="/admin/semesters/new"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a semester
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
