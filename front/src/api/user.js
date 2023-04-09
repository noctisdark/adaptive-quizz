import api from 'api';

export const getCurrentUser = async (jwt) => {
  const result = await api.post(
    "/users/me",
    jwt,
  );

  return result;
};
