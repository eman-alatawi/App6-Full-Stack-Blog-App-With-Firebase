import { AddIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NewPostBtn = () => {
  return (
    <Center>
      <Link to="/createpost">
        <Button leftIcon={<AddIcon />} colorScheme="teal" boxShadow="lg">
          New Post
        </Button>
      </Link>
    </Center>
  );
};

export default NewPostBtn;
