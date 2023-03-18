import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Post from './Post'

const PostsList = ({postsList}) => {
  return (
    <SimpleGrid columns={3} spacing={10} padding={10}>
      {postsList?.map(post => (
        <Post key={post.id} post={post}/>
      ))}
    </SimpleGrid>
  )
}

export default PostsList