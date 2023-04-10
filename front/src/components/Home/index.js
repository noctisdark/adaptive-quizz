import { Routes, Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import BasicLayout from "components/Layouts/BasicLayout";
import Navigation from "components/Navigation";
import Settings from "./Settings";

import UserProvider, { useUser } from "providers/UserProvider";

const Hello = () => {
  const { user } = useUser();
  return `Hello ${user.username}.`;
};

const LogoutButton = () => {
  const { logout } = useUser();
  return <Button onClick={logout}>Logout</Button>;
};

const Home = () => {
  return (
    <UserProvider>
      <Navigation />
      <BasicLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hello /> <LogoutButton />
              </>
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BasicLayout>
    </UserProvider>
  );
};

export default Home;
