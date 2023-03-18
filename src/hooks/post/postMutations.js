
//CREATE POST

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db, storage } from "../../firebase/firebase.config"

export const useCreatePost = () => {

  const navigate = useNavigate();

  const createPost = async (postDoc) => {

    const postsCollectionRef = collection(db, "posts");
    return await addDoc(postsCollectionRef, postDoc)
  }

  return useMutation({
    mutationFn: (postDoc) => createPost(postDoc),
    onSuccess: () => {
      toast.success("Post Created Successfully");
      navigate("/")
    },
    onError: (error) => {
      console.log(error.message)
    }
  })
}

//UPDATE POST

export const useUpdatePost = () => {

  const navigate = useNavigate();

  const updatePost = async ({ id, postDoc }) => {

    const postDocRef = doc(db, "posts", id);
    return await updateDoc(postDocRef, postDoc)
  }

  return useMutation({
    mutationFn: (postObj) => updatePost(postObj),
    onSuccess: () => {
      toast.success("Post Updated Successfully");
      navigate("/");
    },
    onError: (error) => {
      console.log(error.message)
    }
  })
}


//DELETE POST
export const useDeletePost = () => {

  const queryClient = useQueryClient();

  const deletePost = async ({ id, photoURL }) => {

    const storageRef = ref(storage, photoURL)
    await deleteObject(storageRef).then(async () => {
      const postDocRef = doc(db, "posts", id);
      return await deleteDoc(postDocRef)

    })

  }
  return useMutation({
    mutationFn: (postObj) => deletePost(postObj),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']})
      toast.success("Post Deleted Successfully");
    },
    onError: (error) => {
      console.log(error.message)
    }
  })
}