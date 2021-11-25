import { request } from "./request";

export function adminLogin(name, password) {
  return request({
    method: "POST",
    url: "/adminlogin",
    data: {
      name,
      password
    }
  });
}
