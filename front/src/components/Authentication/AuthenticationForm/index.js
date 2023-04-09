import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import { Box, Stack, useColorMode, useToast } from "@chakra-ui/react";

import hash from "utils/hash";
import history from "providers/RouterProvider/history";
import { useJWT } from "hooks/authentication";
import { login, register } from "api/auth";

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
  const [, saveJWT] = useJWT();
  const toast = useToast();
  // why not ?
  const { colorMode } = useColorMode();

  const redirectHome = () =>
    setTimeout(() => {
      history.push("/home");
    }, 3000);

  const onRegister = async ({ username, password, rememberMe }) => {
    password = await hash(password);
    try {
      const result = await register({ username, password, rememberMe });
      saveJWT(result.data);
      toast({
        title: "Registered.",
        description: "Thank you for believing in our service, redirecting...",
        status: "success",
        duration: 3000,
      });
      redirectHome();
    } catch ({ response: { data } }) {
      toast({
        title: "Error.",
        description: data || "Unexpected error",
        status: "error",
        duration: 10000,
      });
    }
  };

  const onLogin = async ({ username, password, rememberMe }) => {
    password = await hash(password);
    try {
      const result = await login({ username, password, rememberMe });
      saveJWT(result.data);
      toast({
        title: "Logged in.",
        description: "Thank you for believing in our service, redirecting...",
        status: "success",
        duration: 3000,
      });
      redirectHome();
    } catch ({ response: { data } }) {
      toast({
        title: "Error.",
        description: data || "Unexpected error",
        status: "error",
        duration: 10000,
      });
    }
  };

  return (
    <Stack direction="row" height="100vh" width="100vw" spacing={0}>
      <Section
        backgroundColor={colorMode === "light" ? "gray.100" : "gray.900"}
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
