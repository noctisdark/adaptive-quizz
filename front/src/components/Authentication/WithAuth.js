import { Navigate } from "react-router-dom";

import { authenticated } from "hooks/authentication";

const WithAuth = ({ children }) => {
  if (!authenticated()) return <Navigate to="/auth" />;
  return children;
};

export default WithAuth;
