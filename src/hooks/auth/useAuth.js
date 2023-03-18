import { useEffect, useState } from "react"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../../firebase/firebase.config";

export const useAuth = () =>{
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      // console.log(user);
      setCurrentUser(user);
    })
  } , [])

  return currentUser;
}