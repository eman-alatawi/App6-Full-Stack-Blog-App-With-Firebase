import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { serverTimestamp } from "firebase/firestore";
import React from "react";
import PostForm from "../components/form/PostForm";
import { useAuth } from "../hooks/auth/useAuth";
import { useCreatePost } from "../hooks/post/postMutations";

const CreatePost = () => {

  const currentUser= useAuth();
  const {mutateAsync, isLoading} = useCreatePost();

  const handleOnSubmit = async (postData) =>{
    const postDoc = {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      author: {
        id: currentUser.uid,
        name: currentUser.displayName,
        photoURL: currentUser.photoURL
      }
    }

    // mutateAsync of create mutation
    mutateAsync(postDoc)
  }

  return (
    <Flex h="80vh" alignItems="center" justifyContent="center">
      <Box w="50%" p={4} borderWidth="1px" borderRadius="lg">
        <Center>
          <Heading mb={4}>Create Post</Heading>
        </Center>
        <PostForm handleOnSubmit={handleOnSubmit} isLoading={isLoading}/>
      </Box>
    </Flex>
  );
};

export default CreatePost;
