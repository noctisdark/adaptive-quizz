import { Button } from "@chakra-ui/react";
import Navigation from "components/Navigation";

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
      <Hello />
      <LogoutButton />
    </UserProvider>
  );
};

export default Home;
