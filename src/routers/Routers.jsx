import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePost from "../pages/CreatePost";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import SignUp from "../pages/SignUp";
import UpdatePost from "../pages/UpdatePost";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="post/:title/:id" element={<PostDetails />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Error />} />

      <Route path="/*" element={<ProtectedRoutes/>}>
        <Route path="profile" element={<Profile />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="post/:id" element={<UpdatePost />} />
      </Route>

    </Routes>
  );
};

export default Routers;
