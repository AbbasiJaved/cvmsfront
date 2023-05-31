import React from "react";
import { Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../hooks";
import Timetable from "../../models/Timetable.model";

const columns: ColumnsType<Timetable> = [
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
    title: "Semester",
    dataIndex: "semester",
    key: "semester",
    render: (_, record) => record.semester?.name,
    align: "center",
  },
  {
    title: "Program",
    dataIndex: "program",
    key: "program",
    render: (_, record) => record.program?.name,
    align: "center",
  },
  {
    title: "Actions",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" href={`/schedule?timetableId=${record.id}`}>
          My Schedule
        </Button>
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const UserTimetables: React.FC = () => {
  const [timetables] = useApi<Timetable[]>({
    endPoint: "/timetables",
  });

  const viewableTimetables = timetables.value?.filter(
    (timetable) => timetable.viewable
  );

  return (
    <div>
      <Helmet>
        <title>Timetables</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={viewableTimetables}
        loading={timetables.loading}
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
            <Typography.Title level={3}>Timetables</Typography.Title>
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
