import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = () => {

  const {isAuth} = useContext(AuthContext);

  return isAuth ? <Outlet/> : <Navigate to="/login"/>
  
}

export default ProtectedRoutes