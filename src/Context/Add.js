import React, { useState } from 'react'

const initialState = {
  Name: '',
  id: '',
  Details: '',
}
export default function Add() {
  const [state, setState] = useState(initialState)
  const [campusarr, setCampusArr] = useState([])


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })

  }

  const handleCampus = (e) => {
    e.preventDefault()
    let { title, location, description } = state
    console.log(state);
  }
  return (
    <>
      <button type="button" className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-plus"></i> Add</button>
      {/* -- Button trigger modal -- */}
      <div className="container mt-5">
        <div className="row">
          <div className="col">

            {/* ---------- Model ---------- */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Campus</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleCampus}>
                      <div className="mb-3">
                        <label htmlFor="campus-name" className="col-form-label">Campus Name :</label>
                        <input type="text" className="form-control" id="campus-name" name='Name' onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="id" className="col-form-label">ID :</label>
                        <input type="text" className="form-control" id="id" name='id' onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="detail-text" className="col-form-label">Details :</label>
                        <textarea className="form-control" id="detail-text" name='Datails' onChange={handleChange} ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                        <button type="button" className="btn btn-primary" >add Campus</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
