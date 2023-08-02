import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Student from './Student'
import Campus from './Campus'
import Dashboard from './Dashboard'
import Fees from './Fees'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default function index() {
  return (
    <>
    <Header/>
    <main>
    <Routes>
      <Route path='/'  element={<Dashboard/>}/>
      <Route path='/campus'  element={<Campus/>}/>
      <Route path='/fees'  element={<Fees/>}/>
      <Route path='/student'  element={<Student/>}/>
      <Route path='*'  element={<h1 className='text-center mt-5'>error 404</h1>}/>
    </Routes>
    </main>
    <Footer/>
    </>
  )
}
