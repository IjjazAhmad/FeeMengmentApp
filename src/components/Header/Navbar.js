import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthContext'
export default function Navbar() {
  const { isAuth, dispatch } = useAuthContext()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch({ type: "SET_LOGGED_OUT" })
    localStorage.removeItem("user")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-tranparents">
        <div className="container">
          <Link to="/" className="navbar-brand" >FMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
              <li className="nav-link">
                <Link to="/" className="nav-link" aria-current="page" ><i className="fa-solid fa-vr-cardboard"></i> Dashboard</Link>
              </li>
              <li className="nav-link">
                <Link to='/campus' className="nav-link" ><i className="fa-solid fa-building-columns"></i> Campus</Link>
              </li>
              <li className="nav-link">
                <Link to='/student' className="nav-link" ><i className="fa-solid fa-user-tie"></i> Students</Link>
              </li>
            </ul>
            <div className="d-flex">

              {
                !isAuth ? <Link to='/login' className='btn btn-outline-success'>Login</Link> : <Link  onClick={handleLogout}>Logout</Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
