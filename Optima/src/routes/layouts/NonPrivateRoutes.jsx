import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const NonPrivateRoutes = () => {
const {state}= useAuthContext();

if(state) <Navigate to={'/'}/>
  return (
    <Outlet/>
  )
}

export default NonPrivateRoutes