import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { DeleteButton } from "../../../components";
import VenueModel from "../../../models/Venue.model";

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<VenueModel> => [
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
    title: "Location",
    dataIndex: "location",
    key: "location",
    align: "center",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.createdAt).toLocaleString()}</Tag>
    ),
    sorter: (a: VenueModel, b: VenueModel) => {
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
    sorter: (a: VenueModel, b: VenueModel) => {
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
        <Button href={`/admin/venues/${record.id}`}>View/Edit</Button>
        <DeleteButton id={record.id} resource="venues" onSuccess={refresh} />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const AdminVenues: React.FC = () => {
  const [venues, fetchCourses] = useApi<VenueModel[]>({
    endPoint: "/venues",
  });

  const columns: ColumnsType<VenueModel> = React.useMemo(
    () =>
      getColumns({
        refresh: fetchCourses,
      }),
    [fetchCourses]
  );

  return (
    <div>
      <Helmet>
        <title>Venues</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={venues.value}
        loading={venues.loading}
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
            <Typography.Title level={3}>Venues</Typography.Title>
            <Button
              href="/admin/venues/new"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a venue
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
