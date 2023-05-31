import * as React from "react";
import { Button, Popconfirm } from "antd";
import { useAsyncFn } from "react-use";
import { api } from "../utils/api";
import { useNotification } from "../providers/NotificationProvider";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteButton = ({
  id,
  resource,
  onSuccess,
}: {
  id: string;
  resource: string;
  onSuccess?: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const notification = useNotification();

  const [deleteState, deleteResource] = useAsyncFn(async () => {
    try {
      const response = await api(`/${resource}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      if (onSuccess) {
        onSuccess();
      }

      notification.success({
        message: "Success",
        description: "Deleted successfully",
      });

      setOpen(false);

      setConfirmLoading(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: (error as Error).message,
      });
    }
  }, [id, notification, onSuccess, resource]);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    deleteResource();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Confirm to delete?"
      description="Are you sure you want to delete?"
      okText="Yes"
      cancelText="No"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button
        danger
        onClick={showPopconfirm}
        loading={deleteState.loading}
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </Popconfirm>
  );
};
