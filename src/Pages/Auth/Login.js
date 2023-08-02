import React, { useState } from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { message } from 'antd';
const initialState = { firstName: "",lastName: "", email: "", password: "" }
export default function Login() {
  const { dispatch } = useAuthContext()
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useState(initialState)
  const handlechange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const massegeAlert = (typ, msg) => {
    return (
      messageApi.open({
        type: typ,
        content: msg,
        className: 'custom-class',
        style: {
          display: 'inline-block',
          position: 'absolute',
          zIndex: '1'

        },
      })
    )
  }
  const handleLogin = e => {
    e.preventDefault()
    const { firstName, lastName, email, password } = state
    
    if (firstName.length < 3) {
      return (
        massegeAlert('warning', 'Plz! Enter fullname')
      )
    }
    if (lastName.length < 3) {
      return (
        massegeAlert('warning', 'Plz! Enter lastname')
      )
    }
    if (!email) {
      return (
        massegeAlert('warning', 'Plz! Enter Email')
      )
    }
    if (password.length < 6) {
      return (
        massegeAlert('warning', 'Enter password minimum 6 character')
      )
    }
    let user = { firstName, lastName, email, password }
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(user))
      dispatch({ type: "SET_LOGGED_IN", payload: { user } })
      setState(initialState)
    }, 100)
  };

  return (
    <>
      {contextHolder}
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6 col-md-6 m-auto ">
            <div className="card p-3 ">
              <h1 className='text-center'>Login</h1>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="firstname" className="form-label">Firstname</label>
                  <input type="text" className="form-control" id='firstname' name='firstName' value={state.firstName} onChange={handlechange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastname" className="form-label">Lastname</label>
                  <input type="text" className="form-control" id='lastname' name='lastName' value={state.lastName} onChange={handlechange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id='inputEmail' name='email' value={state.email} onChange={handlechange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id='inputPassword' name='password' value={state.password} onChange={handlechange} />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary w-50" onClick={handleLogin}>Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
