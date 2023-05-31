import { API_URL } from "./constants";

export async function api(resource: string, options?: RequestInit) {
  return fetch(`${API_URL}${resource}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
