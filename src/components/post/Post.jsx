import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/auth/useAuth";
import PostActionMenu from "./PostActionMenu";

const Post = ({ post }) => {
  const { isAuth } = useContext(AuthContext);
  const currentUser = useAuth();

  return (
    <Card my={2} boxShadow="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={post.author.name}
              src={post.author.photoURL}
              bg="teal.500"
            />
            <Box>
              <Heading size="sm">{post.author.name}</Heading>
              {post.isEdited ? (
                <HStack>
                  <Text color="gray" fontSize="sm">
                    (Edited)
                  </Text>
                  <Text fontSize="sm">
                    {moment(post?.updatedAt?.toDate()).fromNow()}
                  </Text>
                </HStack>
              ) : (
                <Text fontSize="sm">
                  {moment(post?.createdAt?.toDate()).fromNow()}
                </Text>
              )}
            </Box>
          </Flex>
          {isAuth && post.author.id === currentUser?.uid && (
            <PostActionMenu post={post} />
          )}
        </Flex>
      </CardHeader>
      <Link to={`/post/${post.title}/${post.id}`}>
        <CardBody>
          <Heading fontSize="2xl" mb={2}>
            {post.title}
          </Heading>
          <Text noOfLines={1}>{post.content}</Text>
        </CardBody>
        <Center h="20rem">
          <Image
            w="100%"
            h="100%"
            objectFit="contain"
            src={post?.photo}
            alt="post photo"
          />
        </Center>
      </Link>
    </Card>
  );
};

export default Post;
