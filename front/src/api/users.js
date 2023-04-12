import api from "api";

export const getCurrentUser = async () => await api.post("/users/me");

export const changeUsername = async (newUsername) =>
  await api.post("/users/me/username", newUsername);

export const changePassword = async (password, oldPassword) =>
  await api.post("/users/me/password", { password, oldPassword });

export const deleteAccount = async () => await api.post("/users/me/delete");
