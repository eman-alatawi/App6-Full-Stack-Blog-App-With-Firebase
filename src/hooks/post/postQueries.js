import { useQuery } from "@tanstack/react-query"
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase.config"

// GET ALL POSTS
export const useAllPosts = () => {

  const getPosts = async () => {

    const postCollectionRef = collection(db, "posts")

    const data = await getDocs(query(postCollectionRef, orderBy("updatedAt", "desc")));

    const posts = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return posts;
  }

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    onError: (error) => {
      console.log(error.message)
    }
  })
}

//GET ONE POST 
export const usePost = (id) => {

  const getPost = async (id) => {

    const postDocRef = doc(db, "posts", id)
    const postData = await getDoc(postDocRef);
    const post = postData.data();
    return post;
  }


  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    onError: (error) => {
      console.log(error.message)
    }
  })
}


//GET POSTS RELATED TO A USER

export const useUserPosts = () => {

  const getUserPosts = async () => {

    const postCollectionRef = collection(db, "posts")

    const data = await getDocs(query(postCollectionRef, where("author.id", "==", auth.currentUser?.uid), orderBy("updatedAt", "desc")));

    const posts = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return posts;
  }

  return useQuery({
    queryKey: ['posts', auth.currentUser?.displayName],
    queryFn: () => getUserPosts(),
    onError: (error) => {
      console.log(error.message)
    }
  })
}