import { Button, Form, Input, Select, Space, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import CourseModel from "../../../models/Course.model";
import ProgramModel from "../../../models/Program.model";
import VenueModel from "../../../models/Venue.model";
import { useApi } from "../../../hooks";
import { useNotification } from "../../../providers/NotificationProvider";

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const AdminCourse = () => {
  const params = useParams();
  const [form] = Form.useForm();

  const id = params.id;

  const notification = useNotification();

  const [course] = useApi<CourseModel>({
    endPoint: "/courses/" + id,
    triggerOnMount: id !== "new",
  });

  const [saveCourseState, saveCourse] = useApi<CourseModel>({
    endPoint: `/courses/${id !== "new" ? id : ""}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Course saved successfully",
      });

      if (id === "new") {
        form.resetFields();
      }
    },
  });

  const [programs] = useApi<ProgramModel[]>({
    endPoint: "/programs/",
  });

  const [venues] = useApi<VenueModel[]>({
    endPoint: "/venues/",
  });

  const onFinish = (values: any) => {
    saveCourse(values);
  };

  return (
    <div>
      <Helmet>
        <title>{id === "new" ? "Add" : "Edit"} Course</title>
      </Helmet>
      <Typography.Title level={3}>
        {id === "new" ? "Add" : "Edit"} Course
      </Typography.Title>
      <Spin size="large" spinning={course.loading || saveCourseState.loading}>
        {id !== "new" && course.loading ? null : (
          <Form onFinish={onFinish} {...formLayout} form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Course name!",
                },
              ]}
              initialValue={course.value?.name}
              tooltip="The name of the course"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="code"
              label="Code"
              rules={[
                {
                  required: true,
                  message: "Please select Course code!",
                },
              ]}
              initialValue={course.value?.code}
              tooltip="The code of the course"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="lecturerId"
              label="Lecturer"
              initialValue={course.value?.lecturerId}
              tooltip="The lecturer who is currently teaching this course"
            >
              <Select disabled>
                <Select.Option value={course.value?.lecturerId}>
                  {course.value?.lecturer
                    ? course.value?.lecturer?.firstName +
                      " " +
                      course.value?.lecturer?.lastName
                    : "N/A"}
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="pendingLecturerId"
              label="Pending approval lecturer"
              initialValue={course.value?.pendingLecturerId}
              tooltip="The lecturer who registered to teach this course"
            >
              <Select disabled>
                <Select.Option value={course.value?.pendingLecturerId}>
                  {course.value?.pendingLecturer
                    ? course.value?.pendingLecturer?.firstName +
                      " " +
                      course.value?.pendingLecturer?.lastName
                    : "N/A"}
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="programId"
              label="Program"
              initialValue={course.value?.programId}
              rules={[
                {
                  required: true,
                  message: "Please select Program!",
                },
              ]}
              tooltip="The program this course belongs to"
            >
              <Select allowClear>
                {programs.value?.map((program) => (
                  <Select.Option value={program.id}>
                    {program.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="preferredVenueId"
              label="Preferred venue"
              initialValue={course.value?.preferredVenueId}
              tooltip="This is the preferred venue for this course. If the venue is not available, the system will automatically assign a venue."
              rules={[
                {
                  required: true,
                  message: "Please select a Venue!",
                },
              ]}
            >
              <Select allowClear>
                {venues.value?.map((venue) => (
                  <Select.Option value={venue.id}>{venue.name}</Select.Option>
                ))}
              </Select>
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
        )}
      </Spin>
    </div>
  );
};
