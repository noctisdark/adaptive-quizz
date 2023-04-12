import api from "api";

export const uploadFile = async (data) =>
  await api.post("/upload", data, {
    multipartFormData: true,
  });
