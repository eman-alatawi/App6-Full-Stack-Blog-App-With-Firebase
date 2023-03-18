import { Button, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import "./NavBar.css";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/auth/useAuth";

const NavBar = () => {

  const {isAuth} = useContext(AuthContext);

  const currentUser = useAuth();

  return (
    <nav>
      <Link to="/">
        <HStack>
          <FaBlog />
          <Heading color="white">Blog</Heading>
        </HStack>
      </Link>

      {isAuth ? (
        <HStack>
          <Text fontSize="xl" color="white" as="b" mx={2}>
            Hi, {currentUser?.displayName}
          </Text>
          <NavBarMenu />
        </HStack>
      ) : (
        <Link to="/login">
          <Button color="black">Login</Button>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
