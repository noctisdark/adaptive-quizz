import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";

import { Tooltip, Button, Stack, Avatar } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import PlayIcon from "components/icons/PlayIcon";
import ProfileMenu from "./PorfileMenu";

const NavigationLink = ({ label, as = RouterLink, to, children }) => (
  <Tooltip label={label}>
    <Button variant="ghost" as={as} to={to}>
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

const Links = () => (
  <FeatureContainer
    direction="row"
    alignItems="center"
    spacing={0}
    marginTop="0px !important"
  >
    <NavigationLink label="Play a quiz" to="/play">
      <PlayIcon />
    </NavigationLink>
    <NavigationLink label="Create a new quiz" to="/new">
      <AddIcon />
    </NavigationLink>
    <NavigationLink label="Edit your quizzes" to="/edit">
      <EditIcon />
    </NavigationLink>
    <ProfileMenu button={<Avatar src="/default_profile.png" size="sm" />} />
  </FeatureContainer>
);

export default Links;
