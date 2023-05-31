import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import VenueModel from "../../../models/Venue.model";
import { useApi } from "../../../hooks";
import { useNotification } from "../../../providers/NotificationProvider";

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};

const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const AdminVenue = () => {
  const params = useParams();
  const [form] = Form.useForm();

  const id = params.id;

  const notification = useNotification();

  const [venue] = useApi<VenueModel>({
    endPoint: "/venues/" + id,
    triggerOnMount: id !== "new",
  });

  const [saveVenueState, saveVenue] = useApi<VenueModel>({
    endPoint: `/venues/${id !== "new" ? id : ""}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Venue saved successfully",
      });

      if (id === "new") {
        form.resetFields();
      }
    },
  });

  const onFinish = (values: any) => {
    saveVenue(values);
  };

  const events = venue.value?.meetings?.map((meeting) => ({
    title: meeting.course?.name,
    date: meeting.date,
  }));

  return (
    <div>
      <Helmet>
        <title>{id === "new" ? "Add" : "Edit"} Venue</title>
      </Helmet>
      <Typography.Title level={3}>
        {id === "new" ? "Add" : "Edit"} Venue
      </Typography.Title>
      <Spin size="large" spinning={venue.loading || saveVenueState.loading}>
        {id !== "new" && venue.loading ? null : (
          <div>
            <Form onFinish={onFinish} {...formLayout} form={form}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Venue name!",
                  },
                ]}
                initialValue={venue.value?.name}
                tooltip="The name of the venue"
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: "Please enter Venue location!",
                  },
                ]}
                initialValue={venue.value?.location}
                tooltip="The location of the venue"
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[
                  {
                    required: true,
                    message: "Please enter Venue capacity!",
                  },
                ]}
                initialValue={venue.value?.capacity}
                tooltip="The capacity of the venue"
              >
                <InputNumber type={"number"} />
              </Form.Item>
              <Form.Item {...formTailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Form>
            {id !== "new" && (
              <Collapse>
                <Collapse.Panel header="Meetings" key="1">
                  <FullCalendar
                    plugins={[dayGridPlugin, listPlugin]}
                    events={events}
                    initialView="dayGridMonth"
                    initialDate={new Date()}
                    headerToolbar={{
                      left: "prev,next",
                      center: "title",
                      right: "dayGridDay,dayGridWeek,dayGridMonth",
                    }}
                  />
                </Collapse.Panel>
              </Collapse>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};
