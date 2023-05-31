import * as React from "react";
import { useAsyncFn } from "react-use";
import { useNotification } from "../providers/NotificationProvider";
import { api } from "../utils/api";

export function useApi<T, V = any>({
  endPoint,
  method = "GET",
  onSuccess,
  onError,
  triggerOnMount = true,
  showErrorNotification = true,
}: {
  endPoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  triggerOnMount?: boolean;
  showErrorNotification?: boolean;
}) {
  const notification = useNotification();

  const result = useAsyncFn(async (values?: V) => {
    try {
      const response = await api(endPoint, {
        method,
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            window.location.href = "/login";
            break;
          case 403:
            window.location.href = "/403";
            break;
          case 404:
            window.location.href = "/404";
            break;
          case 500:
            // window.location.href = "/500";
            break;
        }

        const error = await response.json();
        throw new Error(error.message);
      }

      const data = (await response.json()) as T;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error) {
      if (showErrorNotification) {
        notification.error({
          type: "error",
          message: (error as Error).message,
        });
      }

      if (onError) {
        onError(error as Error);
      }
    }
  });

  const [, fetchData] = result;

  const triggeredRef = React.useRef(false);

  if (triggerOnMount && !triggeredRef.current) {
    triggeredRef.current = true;

    fetchData();
  }

  return result;
}
