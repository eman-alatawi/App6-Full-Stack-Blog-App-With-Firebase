import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import ProfileCard from '../components/profile/ProfileCard'
import NewPostBtn from "../components/post/button/NewPostBtn"
import { useUserPosts } from '../hooks/post/postQueries'
import CircleSpinner from "../components/spinner/CircleSpinner"
import PostsList from '../components/post/PostsList'

const Profile = () => {
  const {data, isLoading} = useUserPosts();
  return (
    <Flex w="100vw" direction="column" alignItems="center" justifyContent="center" py={5}>
      <ProfileCard/>
      <Heading mt={20} mb={5} color="teal">My Posts</Heading>
      <NewPostBtn/>
      {isLoading && <CircleSpinner/>}
      <PostsList postsList={data}/>
    </Flex>
  )
}

export default Profile