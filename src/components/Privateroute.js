import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
export default function Privateroute({ Component }) {
  const { isAuth } = useAuthContext()
  const location = useLocation()
  if (!isAuth)
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />

  return (
    <Component />
  )
}
