import { Center, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import WelcomeImg from '../../assets/welcome.png';
import NewPostBtn from "../post/button/NewPostBtn";

const NoPostsYet = () => {
  return (
    <Center mt={10}>
      <Flex w="40rem" direction="column" alignItems="center" padding={3}>
        <Heading color="teal.400" mb={10}>
          No Posts Published Yet
        </Heading>
        <NewPostBtn/>
        <Image src={WelcomeImg}/>
      </Flex>
    </Center>
  );
};

export default NoPostsYet;
