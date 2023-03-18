import { useMutation } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth, db, storage } from "../../firebase/firebase.config"
import { getError } from "../../utils/firebaseErrors"


//SIGN UP
export const useSignUpWithEmailAndPassword = () => {

  const navigate = useNavigate();

  const signUpUser = async (userData) => {

    const email = userData.email;
    const password = userData.password;
    const username = userData.username;
    const photo = userData?.photo[0];
    const photoName = photo?.name;

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);

      if (photo) {
        //1-save photo to storage
        const storageRef = ref(storage, `users/${username}/${photoName + Date.now()}`)

        const uploadTask = uploadBytesResumable(storageRef, photo);

        uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          console.log("Upload task has an error", error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //2-if success: update user profile (photoURL, displayName)
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL
            })
            //3- save user to db 
            await setDoc(userRef, {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL
            })
          });
        })
      } else {
        //1-update user profile (displayName)
        updateProfile(user, {
          displayName: username,
        })
        //2- save user to db 
        setDoc(userRef, {
          uid: user.uid,
          displayName: username,
          email,
        })
      }

      console.log(user)
    })


  }

  return useMutation({
    mutationFn: (userData) => signUpUser(userData),
    onSuccess: () => {
      toast.success("Account Created Successfully");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = getError(error.message);
      // console.log(errorMessage);
      toast.error(errorMessage)
    }
  })
}


//SIGN IN 
export const useSignInWithEmailAndPassword = () => {

  const navigate = useNavigate();

  const signInUser = async (userData) => {
    const email = userData.email;
    const password = userData.password;
    await signInWithEmailAndPassword(auth, email, password)
  }

  return useMutation({
    mutationFn: (userData) => signInUser(userData),
    onSuccess: () => {
      toast.success("Logged In Successfully");
      navigate("/");
    },
    onError: (error) => {
      const errorMessage = getError(error.message);
      toast.error(errorMessage)
    }
  })
}


//SEND EMAIL FOR RESETTING PASSWORD
export const useResetPassword = () => {
  const navigate = useNavigate();

  const sendResetPasswordEmail = async (userEmail) => {
    await sendPasswordResetEmail(auth, userEmail).then(() => {
      toast.success("Check your email for a reset link");
    })

  }

  return useMutation({
    mutationFn: (userEmail) => sendResetPasswordEmail(userEmail),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = getError(error.message);
      toast.error(errorMessage)
    }
  })
}