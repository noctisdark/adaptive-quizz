import axios from "axios";

import history from "providers/RouterProvider/history";
import { clearJWT, localJWT } from "hooks/authentication";
import { toast } from "providers/ToastProvider";

const instance = axios.create({ errorDuration: 3000, describeError: toast });

// only valid in dev environments, !TODO!: use env variable
instance.defaults.baseURL = "http://localhost:5000";

instance.interceptors.request.use(
  (req) => {
    if (req.multipartFormData)
      req.headers["Content-Type"] = "multipart/form-data";
    else req.headers["Content-Type"] = "application/json";
    return req;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.request.use(
  (req) => {
    // authorization by default
    if (req.skipAuthorization) return req;

    const jwt = localJWT();
    if (jwt) {
      req.headers["Authorization"] = "Bearer " + jwt;
      return req;
    }

    if (req.allowAnonymous) return req;

    // redirect to auth and cancel request
    // !TODO!: continue when the users logs back
    history.replace("/auth");
    throw new axios.Cancel("Not authenticated");
  },
  (error) => Promise.reject(error)
);

// automatically toast errors and logout user if not connected
// forward the error nontheless
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.config.preventDefault === false) return Promise.reject(error);

    const isForbidden = error.response?.status === 403;
    error.config.describeError?.({
      status: "error",
      title: isForbidden ? "Logged out." : null,
      description: error.response?.data,
      duration: error.config.errorDuration,
    });

    if (isForbidden) {
      clearJWT();
      setTimeout(() => history.replace("/auth"), error.config.errorDuration);
    }

    return Promise.reject(error);
  }
);

export default instance;
