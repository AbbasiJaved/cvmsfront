import React from "react";
import { Button, Space, Switch, Table, Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { DeleteButton } from "../../../components";
import Timetable from "../../../models/Timetable.model";
import { useNotification } from "../../../providers/NotificationProvider";

const ViewableSwitch = ({
  timetable,
  onSuccess,
}: {
  timetable: Timetable;
  onSuccess: () => void;
}) => {
  const notification = useNotification();

  const [saveTimetableState, saveTimetable] = useApi<Timetable>({
    endPoint: `/timetables/${timetable.id}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Timetable viewable state updated successfully",
      });

      onSuccess();
    },
  });

  const handleChange = (checked: boolean) => {
    saveTimetable({
      programId: timetable.programId,
      semesterId: timetable.semesterId,
      name: timetable.name,
      viewable: checked,
    });
  };

  const noOfCourses = timetable.program?.courses?.length || 0;
  const expectedNoOfMeetings = noOfCourses * 6;

  const isViewable = timetable.meetings?.length === expectedNoOfMeetings;

  return (
    <Tooltip
      title={
        isViewable
          ? "This is the viewable state of the timetable. If it is not viewable, it will not be shown to lecturers."
          : "This timetable is not viewable because it does not have the expected number of meetings."
      }
    >
      <Switch
        checked={timetable.viewable}
        onChange={handleChange}
        loading={saveTimetableState.loading}
        disabled={!isViewable}
      />
    </Tooltip>
  );
};

const getColumns = ({
  refresh,
}: {
  refresh: () => void;
}): ColumnsType<Timetable> => [
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
    render: (_, record) => (
      <Button href={`/admin/semesters/${record.semesterId}`} type="link">
        {record.semester?.name}
      </Button>
    ),
    align: "center",
  },
  {
    title: "Program",
    dataIndex: "program",
    key: "program",
    render: (_, record) => (
      <Button href={`/admin/programs/${record.programId}`} type="link">
        {record.program?.name}
      </Button>
    ),
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      const noOfCourses = record.program?.courses?.length || 0;
      const expectedNoOfMeetings = noOfCourses * 6;

      if (record.meetings?.length !== expectedNoOfMeetings) {
        return (
          <Tooltip
            title={
              "This timetable is incomplete. It is missing some meetings. Please add the missing meetings."
            }
          >
            <Tag
              color="red"
              style={{
                cursor: "none",
              }}
            >
              <Typography.Text type="danger">Incomplete</Typography.Text>
            </Tag>
          </Tooltip>
        );
      } else {
        return (
          <Tag color="green">
            <Typography.Text type="success">Complete</Typography.Text>
          </Tag>
        );
      }
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Tag color="blue">{new Date(record.createdAt).toLocaleString()}</Tag>
    ),
    sorter: (a: Timetable, b: Timetable) => {
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
    sorter: (a: Timetable, b: Timetable) => {
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
        <ViewableSwitch onSuccess={refresh} timetable={record} />
        <Button href={`/admin/meetings?timetableId=${record.id}`}>
          Meetings
        </Button>
        <Button href={`/admin/timetables/${record.id}`}>View/Edit</Button>
        <DeleteButton
          id={record.id}
          resource="timetables"
          onSuccess={refresh}
        />
      </Space>
    ),
    fixed: "right",
    align: "center",
  },
];

export const AdminTimetables: React.FC = () => {
  const [timetables, fetchTimetables] = useApi<Timetable[]>({
    endPoint: "/timetables",
  });

  const columns: ColumnsType<Timetable> = React.useMemo(
    () =>
      getColumns({
        refresh: fetchTimetables,
      }),
    [fetchTimetables]
  );

  return (
    <div>
      <Helmet>
        <title>Timetables</title>
      </Helmet>
      <Table
        columns={columns}
        dataSource={timetables.value}
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
            <Button
              href="/admin/timetables/new"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add a timetable
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
