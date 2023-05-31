import {
  Button,
  Form,
  Input,
  Space,
  Spin,
  Typography,
  Collapse,
  List,
} from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useApi } from "../../../hooks";
import { useNotification } from "../../../providers/NotificationProvider";
import ProgramModel from "../../../models/Program.model";

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};

const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const AdminProgram = () => {
  const params = useParams();
  const [form] = Form.useForm();

  const id = params.id;

  const notification = useNotification();

  const [program] = useApi<ProgramModel>({
    endPoint: "/programs/" + id,
    triggerOnMount: id !== "new",
  });

  const [saveProgramState, saveProgram] = useApi<ProgramModel>({
    endPoint: `/programs/${id !== "new" ? id : ""}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Program saved successfully",
      });

      if (id === "new") {
        form.resetFields();
      }
    },
  });

  const onFinish = (values: any) => {
    saveProgram(values);
  };

  return (
    <div>
      <Helmet>
        <title>{id === "new" ? "Add" : "Edit"} Program</title>
      </Helmet>
      <Typography.Title level={3}>
        {id === "new" ? "Add" : "Edit"} Program
      </Typography.Title>
      <Spin size="large" spinning={program.loading || saveProgramState.loading}>
        {id !== "new" && program.loading ? null : (
          <div>
            <Form onFinish={onFinish} {...formLayout} form={form}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Program name!",
                  },
                ]}
                initialValue={program.value?.name}
                tooltip="The name of the program"
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter Program code!",
                  },
                ]}
                initialValue={program.value?.code}
                tooltip="The code of the program"
              >
                <Input type="text" />
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
                <Collapse.Panel header="Courses" key="1">
                  <List>
                    {program.value?.courses?.map((course) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Button
                              type="link"
                              href={"/admin/courses/" + course.id}
                              color="primary"
                            >
                              {course.name}
                            </Button>
                          }
                          description={
                            <div>
                              <div>Code: {course.code}</div>
                              <div>Lecturer: {course.lecturer?.firstName}</div>
                              <div>
                                Pending Lecturer:{" "}
                                {course.pendingLecturer?.firstName}
                              </div>
                              <div>
                                Preferred Venue: {course.preferredVenue?.name}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    ))}
                  </List>
                </Collapse.Panel>
                <Collapse.Panel header="Timetables" key="2">
                  <List>
                    {program.value?.timetables?.map((timetable) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Button
                              type="link"
                              href={"/admin/timetables/" + timetable.id}
                              color="primary"
                            >
                              {timetable.name}
                            </Button>
                          }
                          description={timetable.semester?.name}
                        />
                      </List.Item>
                    ))}
                  </List>
                </Collapse.Panel>
              </Collapse>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};
