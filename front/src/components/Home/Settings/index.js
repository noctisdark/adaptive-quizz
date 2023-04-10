import { Divider, Stack } from "@chakra-ui/react";

import ProfileImageSection from "./ProfileImageSection";
import PasswordSection from "./PasswordSection";

const Section = ({ ...props }) => (
  <Stack
    as="section"
    padding="10px 0"
    alignItems="center"
    position="relative"
    {...props}
  />
);

const LogoutOrDeleteSection = () => {};

const Settings = () => {
  return (
    <div>
      <ProfileImageSection />
      <Divider />
      <Section></Section>
      <Divider />
      <LogoutOrDeleteSection />
    </div>
  );
};

export default Settings;
