import axios from "axios";

import history from "providers/RouterProvider/history";
import { localJWT } from "hooks/authentication";

const instance = axios.create();

// only valid in dev environments
instance.defaults.baseURL = 'http://localhost:5000';

instance.interceptors.request.use(
  (req) => {
    req.headers["Content-Type"] = "application/json";
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
  (err) => Promise.reject(err)
);

export default instance;