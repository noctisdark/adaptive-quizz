import api from "api";

export const getCurrentUser = async () => {
  const result = await api.post("/users/me");
  return result;
};

export const uploadProfileImage = async (data) => {
  const result = await api.post("/users/me/image", data, {
    multipartFormData: true,
  });
  return result;
};
