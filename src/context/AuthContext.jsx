import { signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase/firebase.config";
import {
  useResetPassword,
  useSignInWithEmailAndPassword,
  useSignUpWithEmailAndPassword,
} from "../hooks/auth/authMutations";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const navigate = useNavigate();

  const signUpMutation = useSignUpWithEmailAndPassword();
  const signInMutation = useSignInWithEmailAndPassword();
  const resetPasswordMutation = useResetPassword();

  //Sign Up
  const signUp = (userData) => {
    signUpMutation.mutateAsync(userData);
  };

  //Login
  const signIn = (userData) => {
    signInMutation.mutateAsync(userData, {
      onSuccess: () => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
      },
    });
  };

  //login with google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  //reset password
  const resetPassword = (userEmail) => {
    resetPasswordMutation.mutateAsync(userEmail);
  };

  //logout
  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      localStorage.clear();
      toast.success("Logged Out Successfully");
      navigate("/login");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signUp,
        signIn,
        signUserOut,
        signInWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
