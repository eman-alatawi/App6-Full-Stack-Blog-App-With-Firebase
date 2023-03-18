import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LightGallery from "lightgallery/react";
// import lightgallery styles and plugins
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import lgZoom from "lightgallery/plugins/zoom";

import { BsFillPersonFill } from "react-icons/bs";
import {SlCalender} from "react-icons/sl"
import moment from "moment";
import { usePost } from "../hooks/post/postQueries";
import CircleSpinner from "../components/spinner/CircleSpinner";

const PostDetails = () => {
  const {id} = useParams();
  const {data: post, isLoading} = usePost(id)

  if(isLoading) return <CircleSpinner/>

  return (
    <Flex h="80vh" p={10}>
      <Box px={10}>
        <Heading>{post.title}</Heading>
        <LightGallery speed={500} plugins={[lgZoom]}>
          <Image h="30rem" boxShadow="lg" my={8} src={post.photo} />
        </LightGallery>

        <HStack fontSize="lg" spacing={10}>
          <HStack>
            <BsFillPersonFill />
            <Text>
              Posted by <Text as="b">{post.author.name}</Text>
            </Text>
          </HStack>

          <HStack>
            <SlCalender/>
            <Text as="i">{moment(post?.createdAt?.toDate()).fromNow()}</Text>
          </HStack>

          <HStack>
            {post.isEdited && (
              <Badge p={1} colorScheme="teal">
                Edited {moment(post?.updatedAt?.toDate()).fromNow()}
              </Badge>
            )}
          </HStack>
        </HStack>
      </Box>
      <Divider orientation="vertical" />
      <Box w="50vw" p={10} overflowY="scroll">
        <Text textAlign="justify">{post.content}</Text>
      </Box>
    </Flex>
  );
};

export default PostDetails;
