import { Button } from "@chakra-ui/react";
import UserProvider, { useUser } from "providers/UserProvider";

const Hello = () => {
  const {user} = useUser();
  return `Hello ${user.username}.`
}

const LogoutButton = () => {
  const { logout } = useUser();
  return <Button onClick={logout}>Logout</Button>
}

const Home = () => {
  return (
    <UserProvider>
      <Hello />
      <LogoutButton />
    </UserProvider>
  );
};

export default Home;
