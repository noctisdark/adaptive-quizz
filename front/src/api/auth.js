import api from "api";

export const register = async ({ username, password, rememberMe }) => {
  const result = await api.post(
    "/users/register",
    { username, password, rememberMe },
    { skipAuthorization: true }
  );

  return result;
};

export const login = async ({ username, password, rememberMe }) => {
  const result = await api.post(
    "/users/login",
    { username, password, rememberMe },
    { skipAuthorization: true }
  );

  return result;
};
