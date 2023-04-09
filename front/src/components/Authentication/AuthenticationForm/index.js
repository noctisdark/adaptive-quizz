import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Stack } from "@chakra-ui/react";

import AppIntro from "./AppIntro";
import Form from "./Form";

const Section = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
`;

const AuthenticationForm = () => {
  const onLogin = ({ username, password, rememberMe }) => {
    console.log("login", username, password, rememberMe);
  };

  const onRegister = ({ username, password, rememberMe }) => {
    console.log("register", username, password, rememberMe);
  };

  return (
    <Stack direction="row" height="100vh" width="100vw" spacing={0}>
      <Section
        backgroundColor="gray.100"
        borderTopRightRadius="8px"
        borderBottomRightRadius="8px"
      >
        <AppIntro />
      </Section>
      <Section>
        <Routes>
          <Route
            path="/register"
            element={<Form type="register" onSubmit={onRegister} />}
          />
          <Route path="/" element={<Form type="login" onSubmit={onLogin} />} />
        </Routes>
      </Section>
    </Stack>
  );
};

export default AuthenticationForm;
