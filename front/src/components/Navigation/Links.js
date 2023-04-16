import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Tooltip, Button, Stack, Avatar } from "@chakra-ui/react";

import PlayIcon from "components/icons/PlayIcon";
import { useUser } from "providers/UserProvider";
import history from "providers/RouterProvider/history";

import ProfileMenu from "./PorfileMenu";

const NavigationLink = ({ label, as = RouterLink, to, children, ...props }) => (
  <Tooltip label={label}>
    <Button variant="ghost" as={as} to={to} {...props}>
      {children}
    </Button>
  </Tooltip>
);

const FeatureContainer = styled(Stack)`
  & > * {
    height: 100% !important;
    padding: 0 20px !important;
    border-radius: 0px !important;
  }
`;

// Todo only enable the edit button on home

const Links = () => {
  const {
    user: { imageURL },
  } = useUser();

  const { pathname } = useLocation();
  const isHome = pathname === "/home";

  const onPlayClicked = () => {
    
    isHome ? document
      .getElementById("public-quizzes")
      ?.scrollIntoView?.({ behavior: "smooth" }) : history.push("/home");
  }

  const onEditClicked = () =>
    document
      .getElementById("my-quizzes")
      ?.scrollIntoView?.({ behavior: "smooth" });

  return (
    <FeatureContainer
      direction="row"
      alignItems="center"
      spacing={0}
      marginTop="0px !important"
    >
      {isHome && (
        <NavigationLink
          label="Edit your quizzes"
          as={null}
          onClick={onEditClicked}
        >
          <EditIcon />
        </NavigationLink>
      )}
      <NavigationLink label="Play a quiz" as={null} onClick={onPlayClicked}>
        <PlayIcon />
      </NavigationLink>
      <NavigationLink label="Create a new quiz" to="/home/new">
        <AddIcon />
      </NavigationLink>

      <ProfileMenu button={<Avatar src={imageURL} size="sm" />} />
    </FeatureContainer>
  );
};

export default Links;
