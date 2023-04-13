import { createContext, useEffect, useContext, useState } from "react";

import LoadingScreen from "components/basics/LoadingScreen";
import ErrorScreen from "components/basics/ErrorScreen";
import { useJWT } from "hooks/authentication";
import { getCurrentUser } from "api/users";
import { toast } from "./ToastProvider";

import history from "./RouterProvider/history";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [jwt, , invalidateJWT] = useJWT();

  const logout = ({
    useToast = true,
    title = "Logged out",
    description = "You will be redirected to the home page...",
    status = "info",
    nextURL = "/",
    duration = 1000,
  }) => {
    if (useToast)
      toast({
        title,
        description,
        status,
        duration,
      });

    invalidateJWT();
    setTimeout(() => history.replace(nextURL), duration);
  };

  const updateImage = (imageURL) => setUser({ ...user, imageURL });

  const updateUsername = (username) => setUser({ ...user, username });

  useEffect(() => {
    jwt &&
      (async () => {
        try {
          const { data: user } = await getCurrentUser();
          setUser(user);
        } catch (error) {
          setError(error.response?.data || "Unexpected error.");
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
        updateImage,
        updateUsername,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
