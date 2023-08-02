import React, { useEffect, useRef, useState } from 'react'
import { Modal,message } from 'antd';
import del from '../../../assets/audio/notify.mp3'
import popup from '../../../assets/audio/popup.mp3'
import newcampusalert from '../../../assets/audio/newcampus.mp3'
const initialState = {
  campusName: '',
  id: '',
  detail: '',
}

export default function Campus() {
  const [state, setState] = useState(initialState)
  const [campus, setCampus] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const delnotice = useRef(null)
  const popupnotice = useRef(null)
  const campusalert = useRef(null)
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })

  }
  // ----------------------- get item from localStorage 
  useEffect(() => {
    let campuses = JSON.parse(localStorage.getItem("campuses")) || []
    setCampus(campuses)

  }, [state])
  //  --------------- add campus --------------in localstorage
  const handleCampus = () => {
    let {campusName, id, detail}= state
    let campusObj = { ...state ,campusName, id, detail}
    campusObj.randomId = Math.floor(Math.random() * 10000)
    if(campusName.length<3){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter name correctly',
        })
      )
    }
    if(id.length<1){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter id',
        })
      )
    }
    if(detail.length<10){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter datail minimum 10 words',
        })
      )
    }
    let campuses = JSON.parse(localStorage.getItem("campuses")) || [];
    campuses.push(campusObj)
    localStorage.setItem("campuses", JSON.stringify(campuses))
    messageApi.open({
      type: 'success',
      content: 'Add campus successfully',
    });
    campusalert.current.play()
    setState(initialState)
  }

 
  // ------------------ delete campus 
  const handleDelete = (camp) => {
    let filterCampus = campus.filter((oldcamp) => {
      return (oldcamp.randomId !== camp.randomId)
    })
    setCampus(filterCampus)
    localStorage.setItem("campuses", JSON.stringify(filterCampus))
    messageApi.open({
      type: 'error',
      content: 'Delete campus successfully',
    });
    delnotice.current.play()

  }

  // --------------------- delete campus end

  // --------------------- Update campus data


  const handleOk = () => {
    let { campusName, id, detail, randomId } = state
    let camp = { ...state, campusName, id, detail, randomId }
    if(campusName.length<3){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter name correctly',
        })
      )
    }
    if(id.length<1){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter id',
        })
      )
    }
    if(detail.length<10){
      delnotice.current.play()
      return(
        messageApi.open({
          type: 'warning',
          content: 'Plz Enter datail minimum 10 words',
        })
      )
    }
    const updateCampus = campus.map((oldcamp) => {
      if (oldcamp.randomId === camp.randomId) {
        return camp
      }
      return oldcamp
    })

    setCampus(updateCampus)
    localStorage.setItem("campuses", JSON.stringify(updateCampus))
    setIsModalOpen(false);
    messageApi.open({
      type: 'success',
      content: 'Update campus successfully',
    });
    popupnotice.current.play()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    {contextHolder}
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <audio src={del} ref={delnotice}></audio>
            <audio src={popup} ref={popupnotice}></audio>
            <audio src={newcampusalert} ref={campusalert}></audio>
            <div className="card">
              <div className="cardHead p-3 border-bottom border-primary border-5 ">
                <h1 className='d-inline'>Campus</h1>
                <div className="btn-group float-end">
                  <button type="button" className="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-plus"></i>Add New Campus</button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="cardHead p-2 ">
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Campus Name</th>
                        <th scope="col">Id</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        campus.map((camp, i) => {
                          return (
                            <tr key={i}>
                              <th >{i + 1}</th>
                              <td>{camp.campusName}</td>
                              <td>{camp.id}</td>
                              <td>{camp.detail}</td>
                              <td><i className="fa-solid fa-trash-can fs-5 mb-1 ms-2" onClick={() => handleDelete(camp)}></i><i className="fa-solid fa-pen-to-square fs-5 ms-2" onClick={() => { setState(camp); setIsModalOpen(true) }} ></i></td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
                    <form >
                      <div className="mb-3">
                        <label htmlFor="campus-name" className="col-form-label">Campus Name :</label>
                        <input type="text" className="form-control" id="campus-name" name='campusName' value={state.campusName} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="id" className="col-form-label">ID :</label>
                        <input type="number" className="form-control" id="id" name='id' value={state.id} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="detail-text" className="col-form-label">Details :</label>
                        <textarea className="form-control" id="detail-text" name='detail' value={state.detail} onChange={handleChange} ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleCampus} >Add</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    
      <Modal title="Update Campus" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="modal-content">
          <div className="modal-body">
            <form >
              <div className="mb-3">
                <label htmlFor="campus-name" className="col-form-label">Campus Name :</label>
                <input type="text" className="form-control" id="campus-name" name='campusName' value={state.campusName} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="id" className="col-form-label">ID :</label>
                <input type="number" className="form-control" id="id" name='id' value={state.id} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="detail-text" className="col-form-label">Details :</label>
                <textarea className="form-control" id="detail-text" name='detail' value={state.detail} onChange={handleChange} ></textarea>
              </div>
            </form>
          </div>
        </div>
      </Modal>

    </>
  )
}
