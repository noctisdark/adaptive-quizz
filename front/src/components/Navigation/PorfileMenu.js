import { Link as RouterLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { LockIcon, SettingsIcon } from "@chakra-ui/icons";

import { useUser } from "providers/UserProvider";

const ProfileMenu = ({ button }) => {
  const { logout } = useUser();

  return (
    <Menu placement="top-end">
      <Tooltip label="Account settings">
        <MenuButton as={Button} variant="ghost">
          {button}
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem as={RouterLink} icon={<SettingsIcon />} to="/home/settings">
          Settings
        </MenuItem>
        <MenuItem onClick={logout} icon={<LockIcon />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
