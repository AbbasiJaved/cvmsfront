import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import TimetableModel from "../../../models/Timetable.model";
import { useApi } from "../../../hooks";
import { useNotification } from "../../../providers/NotificationProvider";
import SemesterModel from "../../../models/Semester.model";
import ProgramModel from "../../../models/Program.model";

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};

const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const AdminTimetable = () => {
  const params = useParams();
  const [form] = Form.useForm();

  const id = params.id;

  const notification = useNotification();

  const [semesters] = useApi<SemesterModel[]>({
    endPoint: "/semesters",
  });

  const [programs] = useApi<ProgramModel[]>({
    endPoint: "/programs",
  });

  const [timetable] = useApi<TimetableModel>({
    endPoint: "/timetables/" + id,
    triggerOnMount: id !== "new",
  });

  const [saveTimetableState, saveTimetable] = useApi<TimetableModel>({
    endPoint: `/timetables/${id !== "new" ? id : ""}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Timetable saved successfully",
      });

      if (id === "new") {
        form.resetFields();
      }
    },
  });

  const onFinish = (values: any) => {
    saveTimetable({
      ...values,
      viewable: Boolean(values.viewable),
    });
  };

  const noOfCourses = timetable.value?.program?.courses?.length || 0;
  const expectedNoOfMeetings = noOfCourses * 6;

  const isComplete = timetable.value?.meetings?.length === expectedNoOfMeetings;

  return (
    <div>
      <Helmet>
        <title>{id === "new" ? "Add" : "Edit"} Timetable</title>
      </Helmet>
      <Typography.Title level={3}>
        {id === "new" ? "Add" : "Edit"} Timetable
      </Typography.Title>
      <Spin
        size="large"
        spinning={timetable.loading || saveTimetableState.loading}
      >
        {id !== "new" && timetable.loading ? null : (
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
                initialValue={timetable.value?.name}
                tooltip="The name of the timetable"
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="semesterId"
                label="Semester"
                rules={[
                  {
                    required: true,
                    message: "Please select a semester!",
                  },
                ]}
                initialValue={timetable.value?.semesterId}
                tooltip="The semester of the timetable"
              >
                <Select>
                  {semesters.value?.map((semester) => (
                    <Select.Option key={semester.id} value={semester.id}>
                      {semester.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="programId"
                label="Program"
                rules={[
                  {
                    required: true,

                    message: "Please select a program!",
                  },
                ]}
                initialValue={timetable.value?.programId}
                tooltip="The program of the timetable"
              >
                <Select>
                  {programs.value?.map((program) => (
                    <Select.Option key={program.id} value={program.id}>
                      {program.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Viewable"
                name="viewable"
                tooltip={
                  isComplete
                    ? "Whether the timetable is viewable by lecturers"
                    : "Timetable is not viewable because it is not complete"
                }
                initialValue={timetable.value?.viewable}
              >
                <Switch disabled={!isComplete} />
              </Form.Item>
              {!isComplete && (
                <Form.Item
                  label="Auto generate meetings"
                  name="auto"
                  initialValue={false}
                  tooltip="Whether to auto generate meetings"
                >
                  <Switch />
                </Form.Item>
              )}
              <Form.Item {...formTailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Spin>
    </div>
  );
};
