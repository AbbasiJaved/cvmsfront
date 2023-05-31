import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import SemesterModel from "../../../models/Semester.model";
import { useApi } from "../../../hooks";
import { useNotification } from "../../../providers/NotificationProvider";
import dayjs from "dayjs";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

export const AdminSemester = () => {
  const params = useParams();
  const [form] = Form.useForm();

  const id = params.id;

  const notification = useNotification();

  const [semester] = useApi<SemesterModel>({
    endPoint: "/semesters/" + id,
    triggerOnMount: id !== "new",
  });

  const [saveSemesterState, saveSemester] = useApi<SemesterModel>({
    endPoint: `/semesters/${id !== "new" ? id : ""}`,
    method: "POST",
    triggerOnMount: false,
    onSuccess: () => {
      notification.success({
        message: "Semester saved successfully",
      });

      if (id === "new") {
        form.resetFields();
      }
    },
  });

  const onFinish = (values: any) => {
    saveSemester(values);
  };

  return (
    <div>
      <Helmet>
        <title>{id === "new" ? "Add" : "Edit"} Semester</title>
      </Helmet>
      <Typography.Title level={3}>
        {id === "new" ? "Add" : "Edit"} Semester
      </Typography.Title>
      <Spin
        size="large"
        spinning={semester.loading || saveSemesterState.loading}
      >
        {id !== "new" && semester.loading ? null : (
          <Form onFinish={onFinish} {...formLayout} form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Semester name!",
                },
              ]}
              initialValue={semester.value?.name}
              tooltip="The name of the semester"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="Start date"
              rules={[
                {
                  required: true,
                  message: "Please select Semester start date!",
                },
              ]}
              initialValue={dayjs(semester.value?.startDate)}
              tooltip="The code of the semester"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End date"
              rules={[
                {
                  required: true,
                  message: "Please select Semester end date!",
                },
              ]}
              initialValue={dayjs(semester.value?.endDate)}
              tooltip="The end of the semester"
            >
              <DatePicker />
            </Form.Item>

            <Form.List
              name="holidays"
              initialValue={semester.value?.holidays.map((holiday) => ({
                startDate: dayjs(holiday.startDate),
                endDate: dayjs(holiday.endDate),
                type: holiday.type,
                name: holiday.name,
              }))}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <Space>
                        <Typography.Title level={5}>
                          Holiday #{i + 1}
                        </Typography.Title>
                        <DeleteOutlined onClick={() => remove(name)} />
                      </Space>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        label="Name"
                        rules={[
                          {
                            required: true,
                            message: "Enter holiday name!",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        label="Type"
                        rules={[
                          {
                            required: true,
                            message: "Enter holiday type!",
                          },
                        ]}
                      >
                        <Select>
                          <Select.Option value="public">
                            Public Holiday
                          </Select.Option>
                          <Select.Option value="exam">Exams</Select.Option>
                          <Select.Option value="revision">
                            Revision Week
                          </Select.Option>
                          <Select.Option value="others">Others</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "startDate"]}
                        label="Start date"
                        rules={[
                          {
                            required: true,
                            message: "Enter holiday start date!",
                          },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "endDate"]}
                        label="End date"
                        rules={[
                          {
                            required: true,
                            message: "Enter holiday end date!",
                          },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item {...formTailLayout}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add a holiday
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
