import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {useAuthContext} from '../Context/AuthContext'
import Auth from './Auth'
import Frontend from './Frontend'
import Privateroute from '../components/Privateroute'
export default function Index() {
  const {isAuth} = useAuthContext()
  return (
    <>
    <Routes>
      <Route path='/*' element={<Privateroute Component={Frontend} />} />
      <Route path='/auth/*' element={!isAuth? <Auth/> : <Navigate to='/'/> } />
    </Routes>
    </>
  )
}
