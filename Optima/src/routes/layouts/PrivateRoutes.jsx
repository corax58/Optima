import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
const {state}= useAuthContext();

if(!state) <Navigate to={'/login'}/>
  return (
    <Outlet/>
  )
}

export default PrivateRoutes