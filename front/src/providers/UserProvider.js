import { createContext, useEffect, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

import LoadingScreen from "components/basics/LoadingScreen";
import { useJWT } from "hooks/authentication";
import { getCurrentUser } from "api/user";

import history from "./RouterProvider/history";
import ErrorScreen from "components/basics/ErrorScreen";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [jwt, , invalidateJWT] = useJWT();
  const toast = useToast();

  const logout = ({
    title = "Logged out",
    description = "You will be redirected to the home page.",
    status = "info",
    nextURL = "/",
  }) => {
    toast({
      title,
      description,
      status,
      duration: 1000,
    });

    invalidateJWT();
    setTimeout(() => history.replace(nextURL), 1000);
  };

  useEffect(() => {
    jwt &&
      (async () => {
        try {
          const { data } = await getCurrentUser(jwt);
          setUser(data);
        } catch (error) {
          const reason = error.response.data;
          setError(reason);

          logout({
            status: "error",
            description: "You will be redirected to the authentication page",
            nextURL: "/auth",
          });
        }
      })();
    // ignore missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  return error ? (
    <ErrorScreen title={error} />
  ) : !user ? (
    <LoadingScreen title="Fetching your data from the server, please wait." />
  ) : (
    <UserContext.Provider
      value={{
        user,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
