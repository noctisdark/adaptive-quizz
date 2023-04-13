import api from "api";

export const uploadFile = (fileForm) =>
  api.post("/upload", fileForm, {
    multipartFormData: true,
  });
