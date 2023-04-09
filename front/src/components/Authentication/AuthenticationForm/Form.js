import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Stack,
} from "@chakra-ui/react";

import { EmailIcon } from "@chakra-ui/icons";
import { LockIcon } from "@chakra-ui/icons";
import { UnlockIcon } from "@chakra-ui/icons";

const Form = ({ type, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const title = type === "login" ? "Welcome back" : "Welcome";
  const submitTitle = type === "login" ? "Login" : "Register";

  const isValid = username.length >= 4 && password.length >= 8;

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const cancel = (e) => e.preventDefault();

  return (
    <Box width="100%" maxWidth={600}>
      <Heading as="h3" paddingBottom="40px" textAlign="center">
        {title}
      </Heading>
      <Stack as="form" spacing={8} width="100%" onSubmit={cancel}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <Input
              placeholder={`Enter your username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputRightAddon padding="0 11px">
              <EmailIcon />
            </InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder={`Enter your password`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightAddon padding={0}>
              <IconButton
                aria-label="Toggle password visibility"
                icon={passwordVisible ? <UnlockIcon /> : <LockIcon />}
                onClick={togglePasswordVisibility}
              >
                Hello world
              </IconButton>
            </InputRightAddon>
          </InputGroup>
        </FormControl>

        <Box display="flex" justifyContent="space-between">
          <Checkbox
            isChecked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            Remember me
          </Checkbox>
          {type === "login" && (
            <Link as={RouterLink} color="teal.500" cursor="not-allowed">
              Password Recovery
            </Link>
          )}
        </Box>

        <Button
          isDisabled={!isValid}
          type="submit"
          colorScheme="telegram"
          onClick={() => onSubmit({ username, password, rememberMe })}
        >
          {submitTitle}
        </Button>
      </Stack>

      <Divider margin="12px 0" />

      {type === "login" ? (
        <Link
          as={RouterLink}
          color="teal.500"
          to="/auth/register"
          display="block"
          textAlign="center"
        >
          New ? Register here.
        </Link>
      ) : (
        <Link
          as={RouterLink}
          color="teal.500"
          to="/auth"
          display="block"
          textAlign="center"
        >
          I already have an account.
        </Link>
      )}
    </Box>
  );
};

export default Form;
