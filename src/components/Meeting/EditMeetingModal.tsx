import * as React from "react";
import { useAsyncFn } from "react-use";
import { Modal, Form, Select, DatePicker, Space, Button, Switch } from "antd";
import { useNotification } from "../../providers/NotificationProvider";
import { api } from "../../utils/api";
import TimetableModel from "../../models/Timetable.model";
import MeetingModel from "../../models/Meeting.model";
import VenueModel from "../../models/Venue.model";
import dayjs, { Dayjs } from "dayjs";
import { useApi } from "../../hooks";

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const formTailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export const EditMeetingModal: React.FC<{
  timetable: TimetableModel;
  meeting: MeetingModel | null;
  open: boolean;
  date: Date | null;
  onCancel: () => void;
  onSuccess: () => void;
}> = ({ open, date, onCancel, onSuccess, timetable, meeting }) => {
  const notification = useNotification();

  const [venues] = useApi<VenueModel[]>({
    endPoint: "/venues",
  });

  const [updateMeetingState, updateMeeting] = useAsyncFn(
    async (values) => {
      try {
        const response = await api("/meetings/" + meeting?.id, {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        notification.success({
          message: "Success",
          description: "Meeting updated successfully",
        });

        onSuccess();

        return (await response.json()) as TimetableModel;
      } catch (error) {
        notification.error({
          message: "Error",
          description: (error as Error).message,
        });
      }
    },
    [notification, meeting?.id]
  );

  const onFinish = async ({
    programId,
    semesterId,
    online,
    ...values
  }: any) => {
    await updateMeeting({
      ...values,
      online: Boolean(online),
    });
  };

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(date) || null
  );

  const availableVenues = venues.value?.filter((venue) => {
    // Check if venue is available on selected date
    // if (!selectedDate?.isSame(date)) {
    //   const isAvailable = venue?.meetings?.every((meeting) => {
    //     return !dayjs(meeting.date).isSame(selectedDate, "day");
    //   });

    //   return isAvailable;
    // }

    return true;
  });

  return (
    <Modal
      title="Edit meeting"
      open={open}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form onFinish={onFinish} style={{ padding: 12 }} {...formLayout}>
        <Form.Item
          label="Timetable"
          name="timetableId"
          initialValue={timetable.id}
          rules={[{ required: true }]}
        >
          <Select disabled>
            <Select.Option value={timetable.id}>
              {timetable?.name}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semesterId"
          initialValue={timetable.semesterId}
          rules={[{ required: true }]}
        >
          <Select disabled>
            <Select.Option value={timetable.semesterId}>
              {timetable?.semester?.name}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Program"
          name="programId"
          initialValue={timetable.programId}
          rules={[{ required: true }]}
        >
          <Select disabled>
            <Select.Option value={timetable.programId}>
              {timetable?.program?.name}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Course"
          name="courseId"
          initialValue={meeting?.courseId}
          rules={[{ required: true }]}
        >
          <Select disabled>
            {timetable.program?.courses?.map((course) => (
              <Select.Option key={course.id} value={course.id}>
                {`${course.name} [${course.code}]`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          initialValue={selectedDate}
          rules={[{ required: true, message: "Please set a date" }]}
        >
          <DatePicker onChange={setSelectedDate} />
        </Form.Item>
        <Form.Item
          label="Venue"
          name="venueId"
          rules={[{ required: true, message: "Please select a Venue" }]}
          initialValue={meeting?.venueId}
        >
          <Select allowClear>
            {availableVenues?.map((venue) => (
              <Select.Option key={venue.id} value={venue.id}>
                {venue.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Online" name="online">
          <Switch defaultChecked={meeting?.online} />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMeetingState.loading}
            >
              Save
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
