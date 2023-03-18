import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/auth/useAuth";

const NavBarMenu = () => {

  const {signUserOut} = useContext(AuthContext);
  const currentUser = useAuth();

  return (
    <Menu>
      <MenuButton>
        <Avatar
          border="2px solid white"
          boxShadow="lg"
          bg="teal.500"
          src={currentUser?.photoURL}
        />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/profile" m={0} fontSize="md">
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={signUserOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavBarMenu;
