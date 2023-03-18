import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import NewPostBtn from "../components/post/button/NewPostBtn";
import PostsList from "../components/post/PostsList";
import CircleSpinner from "../components/spinner/CircleSpinner";
import NoPostsYet from "../components/welcome/NoPostsYet";
import { AuthContext } from "../context/AuthContext";
import { useAllPosts } from "../hooks/post/postQueries";

const Home = () => {
  const {isAuth} = useContext(AuthContext)
  const { data, isLoading } = useAllPosts();

  if (isLoading)
    return (
      <Box h="75vh">
        <CircleSpinner />
      </Box>
    );

  return (
    <Flex w="100vw" direction="column" py={5}>
      {data?.length > 0 ? (
        <>
          {isAuth && <NewPostBtn />}
          <PostsList postsList={data} />
        </>
      ) : (
        <NoPostsYet />
      )}
    </Flex>
  );
};

export default Home;
