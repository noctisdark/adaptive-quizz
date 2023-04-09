import axios from "axios";

import history from "providers/RouterProvider/history";
import { localJWT } from "hooks/authentication";

const instance = axios.create();

instance.interceptors.request.use(
  (req) => {
    // authorization by default
    if ( req.skipAuthorization ) return req;

    const jwt = localJWT();
    if (jwt) {
      req.headers["Authorization"] = "Bearer " + jwt;
      return req;
    }

    if ( req.allowAnonymous ) return req;
    
    // redirect to auth and cancel request
    // !TODO!: continue when the users logs back
    history.replace('/auth');
    throw new axios.Cancel('Not authenticated'); 
  },
  (err) => Promise.reject(err)
);

export default instance;