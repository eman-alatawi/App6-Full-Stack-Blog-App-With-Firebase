import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PostForm from "../components/form/PostForm";
import CircleSpinner from "../components/spinner/CircleSpinner";
import { useUpdatePost } from "../hooks/post/postMutations";
import { usePost } from "../hooks/post/postQueries";

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = usePost(id);

  const {mutateAsync, isLoading: isUpdating} = useUpdatePost();
  const queryClient = useQueryClient();

  if (isLoading) return <CircleSpinner />;

  const handleOnSubmit = async (postData) => {
    const postDoc = {
      ...postData,
      updatedAt: serverTimestamp(),
      isEdited: true,
    };

    const postObj = {
      id,
      postDoc
    }
    // mutateAsync of update mutation
    mutateAsync(postObj, {
      onSuccess: () =>{
        queryClient.invalidateQueries({queryKey: ['post', id]})
      }
    })
  };

  return (
    <Flex h="80vh" alignItems="center" justifyContent="center">
      <Box w="50%" p={4} borderWidth="1px" borderRadius="lg">
        <Center>
          <Heading mb={4}>Update Post</Heading>
        </Center>
        <PostForm post={post} handleOnSubmit={handleOnSubmit} isLoading={isUpdating}/>
      </Box>
    </Flex>
  );
};

export default UpdatePost;
