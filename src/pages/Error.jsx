import { Center, Flex, Image } from "@chakra-ui/react";
import React from "react";
import ErrorImg from "../assets/404-Error.png";
const Error = () => {
  return (
    <Center mt={10}>
      <Flex w="40rem" direction="column" alignItems="center" padding={3}>
        <Image src={ErrorImg} />
      </Flex>
    </Center>
  );
};

export default Error;
