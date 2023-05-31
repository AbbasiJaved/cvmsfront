import * as React from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

const NotificationContext = React.createContext<NotificationInstance | null>(
  null
);

export type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <NotificationContext.Provider value={api}>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export const useNotification = () => {
  const api = React.useContext(NotificationContext);

  if (!api) {
    throw new Error("Notification API is not available");
  }

  return api;
};
