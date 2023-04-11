import { useState } from "react";
import {
  Stack,
  Box,
  FormControl,
  InputGroup,
  Input,
  InputRightAddon,
  FormLabel,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  IconButton,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EmailIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";

import { useUser } from "providers/UserProvider";
import { changePassword, changeUsername, deleteAccount } from "api/users";
import hash from "utils/hash";

const AccountSection = () => {
  const { user, logout, updateUsername } = useUser();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toast = useToast();

  // !TODO!: Standalone toast
  // !TODO!: Handle basic errors with interceptor
  const onUsernameChange = async () => {
    try {
      await changeUsername(username);
      updateUsername(username);
      toast({
        status: "success",
        description: "Username changed succesfully 🎊",
        duration: 3000,
      });
    } catch (error) {
      toast({
        status: "error",
        description: error.response.data,
        duration: 5000,
      });
    }
  };

  const onPasswordChange = async () => {
    try {
      const passwordHash = await hash(password);
      const oldPasswordHash = await hash(oldPassword);
      await changePassword(passwordHash, oldPasswordHash);
      toast({
        status: "success",
        description: "Password changed succesfully 🎊",
        duration: 3000,
      });
    } catch (error) {
      toast({
        status: "error",
        description: error.response.data,
        duration: 5000,
      });
    }
  };

  const onDeleteAccount = async () => {
    const confirmed = prompt(
      "This action is irreversible, continue ? (y / n)",
      "n"
    );
    if (confirmed !== "y") return;
    try {
      await deleteAccount();
      logout({
        title: "Deleted",
      });
    } catch (error) {
      toast({
        status: "error",
        description: error.response?.data || "Unexpected error",
        duration: 5000,
      });
    }
  };

  return (
    <Stack as="section" padding="10px 0" alignItems="center">
      <Stack as="form" width="600px">
        <Accordion allowMultiple defaultIndex={[1]}>
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Change your username
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel display="flex" gap={4}>
              <FormControl>
                <InputGroup>
                  <Input
                    placeholder={`new_username`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputRightAddon padding="0 11px">
                    <EmailIcon />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="blue"
                isDisabled={user.length < 4 || username === user.username}
                onClick={onUsernameChange}
              >
                Save
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Change your password
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel display="flex" flexDirection="column" gap={4}>
              <FormControl>
                <InputGroup>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder={`new_password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightAddon padding="0 11px">
                    <IconButton
                      aria-label="Toggle password visibility"
                      icon={passwordVisible ? <UnlockIcon /> : <LockIcon />}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Old password</FormLabel>
                <InputGroup>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder={`old_passwod`}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <InputRightAddon padding="0 11px">
                    <IconButton
                      aria-label="Toggle password visibility"
                      icon={passwordVisible ? <UnlockIcon /> : <LockIcon />}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="blue"
                leftIcon={<LockIcon />}
                alignSelf="flex-end"
                isDisabled={password.length < 8}
                onClick={onPasswordChange}
              >
                <Text>Save password</Text>
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Stack>
          <Button colorScheme="gray" leftIcon={<LockIcon />} onClick={logout}>
            Log out
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={onDeleteAccount}
          >
            Delete Account
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccountSection;
