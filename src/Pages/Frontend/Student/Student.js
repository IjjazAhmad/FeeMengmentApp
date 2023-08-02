import React, { useEffect, useRef, useState } from 'react'
import images from '../../../assets/image/index'
import del from '../../../assets/audio/notify.mp3'
import popup from '../../../assets/audio/popup.mp3'
import newstudentalert from '../../../assets/audio/newstudent.mp3'
// --------- upload image  code  
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// ----------- uploading image code end
const initialState = {
  fullName: '',
  fatherName: '',
  email: '',
  phoneNumber: '',
  dob: '',
  gender: '',
  studentClass: '',
  address: '',
  fee: ''
}
export default function Student() {
  const [state, setState] = useState(initialState)
  const [classState, setClassState] = useState('All')
  const [student, setStudnt] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const delnotice = useRef(null)
  const popupnotice = useRef(null)
  const studentalert = useRef(null)
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })

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
  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || []
    setStudnt(students)

  }, [state])
    
    useEffect(()=>{
      let students = JSON.parse(localStorage.getItem("students")) || []
      if (classState !== "All") {
        let filterstd = students.filter((std) => {
          return (
            std.studentClass === classState
          )
        })
        setStudnt(filterstd)
      }
      else {
        setStudnt(students)
      }
    },[classState])

  // -------------------- add student 
  const handleStudent = (e) => {
    e.preventDefault()
    let { fullName, fatherName, email, phoneNumber, dob, gender, studentClass, address, fee } = state
    let student = { ...state, fullName, fatherName, email, phoneNumber, dob, gender, studentClass, address, fee }
    const students = JSON.parse(localStorage.getItem("students")) || []
    if (fullName.length < 3) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter name correctly')
      )
    }
    if (fatherName.length < 3) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter name correctly')
      )
    }
    if (!email) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter email correctly')
      )
    }
    if (phoneNumber.length < 11) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter mobile no. correctly')
      )
    }
    if (!dob) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter Date of Birth')
      )
    }
    if (!gender) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz select gender')
      )
    }
    if (!studentClass) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz select class')
      )
    }
    if (address.length < 10) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter minimum 10 words')
      )
    }
    if (!fee) {
      delnotice.current.play()
      return (
        massegeAlert('warning', 'Plz Enter Fee')
      )
    }
    student.id = Math.floor(Math.random() * 10000)
    students.push(student)
    localStorage.setItem("students", JSON.stringify(students))
    massegeAlert('success', 'student successfully added')
    studentalert.current.play()
    setState(initialState)
  }
  //  ---------------------------- end
  // ------------------------------ delete student

  const handleDelete = (std) => {
    let filterStudents = student.filter((oldstd) => {
      return oldstd.id !== std.id
    })
    setStudnt(filterStudents)
    localStorage.setItem("students", JSON.stringify(filterStudents))
    massegeAlert('error', 'Delete student successfully')

    delnotice.current.play()
  }

  // --------------------- Update student data


  const handleOk = (e) => {
    e.preventDefault()
    let { fullName, fatherName, email, phoneNumber, dob, gender, studentClass, address, fee,id } = state
    let std = { ...state, fullName, fatherName, email, phoneNumber, dob, gender, studentClass, address, fee,id }
    const updatestudent = student.map((oldstd) => {
      if (oldstd.id === std.id) {
        return std
      }
      return oldstd
    })
    setStudnt(updatestudent)
    localStorage.setItem("students", JSON.stringify(updatestudent))
    massegeAlert('success', 'Update student successfully')
    popupnotice.current.play()
    setState(initialState)
    setIsModalOpen(false);
  };
  const handleCancl = () => {
    setIsModalOpen(false);
  };


  // -------------------- upload image code 
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleImage = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // --------------- upload image code end
  return (
    <>
      {contextHolder}
      <div className="studentContainer ">
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <audio src={del} ref={delnotice}></audio>
              <audio src={popup} ref={popupnotice}></audio>
              <audio src={newstudentalert} ref={studentalert}></audio>
              <div className="card">
                <div className="p-3 border-bottom border-primary border-5 ">
                  <h1 className='d-inline'> Students</h1>
                  <div className="btn-group float-end">
                    <select className="form-select" aria-label="Default select example" value={classState} onChange={e=>setClassState(e.target.value)}>
                      <option value="All">All</option>
                      <option value="9">9th</option>
                      <option value="10">10th</option>
                      <option value="11">1st Year</option>
                      <option value="12">2nd Year</option>
                    </select>
                  </div>
                  <div>
                    <button type="button" className="btn btn-outline-primary float-end px-3 m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-plus"></i> Add Student</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {
              student.map((std, i) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={i}>
                    <div className="card p-3 my-2">
                      <span>{i + 1}</span>
                      <div className="text-center">
                        <div className="imageDiv">
                          <img src={images.image1} alt="" className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false" />
                        </div>
                      </div>
                      <span className="fw-normal"><b>Name :</b> {std.fullName} </span>
                      <span className="fw-normal"><b>Father Name :</b> {std.fatherName} </span>
                      <span className="fw-normal"><b>Class :</b> {std.studentClass} </span>
                      <span className="fw-normal"><b>Fee :</b> {std.fee} </span>
                      <span className="fw-normal"><b>gender :</b> {std.gender} </span>
                      <span className="fw-normal"><b>DOB :</b> {std.dob} </span>
                      <span className="fw-normal"><b>Email :</b> {std.email} </span>
                      <span className="fw-normal"><b>Whatsapp No :</b> <a href="https://wa.me/+923267876344" target='blank'>{std.phoneNumber}</a></span>
                      <span className="fw-normal"><b>Address :</b> {std.address} </span>
                      <span className="fw-normal"><b>ID :</b> {std.id} </span>
                      <div >
                        <i className="fa-solid fa-trash-can ms-2 fs-5 float-end" onClick={() => handleDelete(std)} ></i><i className="fa-solid fa-pen-to-square ms-2 fs-5 float-end" onClick={() => { setState(std); setIsModalOpen(true) }}></i>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>


      {/* -- Button trigger modal -- */}
      <div className="container mt-5">
        <div className="row">
          <div className="col">

            {/* ---------- Model ---------- */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Student</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-2">
                            <label htmlFor="campus-name" className="col-form-label">Full Name :</label>
                            <input type="text" className="form-control" id="campus-name" value={state.fullName} name='fullName' onChange={handleChange} />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="campus-name" className="col-form-label">Father Name :</label>
                            <input type="text" className="form-control" id="campus-name" name='fatherName' value={state.fatherName} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="my-2">
                            <Upload
                              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture-circle"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={handleImage}
                            >
                              {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                              <img
                                alt="example"
                                style={{
                                  width: '100%',
                                }}
                                src={previewImage}
                              />
                            </Modal>
                            {/* upload image------------- */}

                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-2">
                            <label htmlFor="campus-name" className="col-form-label">Email:</label>
                            <input type="email" className="form-control" id="campus-name" value={state.email} name='email' onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-2">
                            <label htmlFor="campus-name" className="col-form-label">Mobile No. :</label>
                            <input type="number" max="11" className="form-control" value={state.phoneNumber} id="campus-name" name='phoneNumber' onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="mb-2">
                            <label htmlFor="campus-name" className="col-form-label">DOB:</label>
                            <input type="date" className="form-control" id="campus-name" value={state.dob} name='dob' onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mt-1">
                            <label htmlFor="campus-name" className="col-form-label">Gender:</label> <br />
                            <input type="radio" name="gender" id='male' value="male" checked={state.gender === "male"} onChange={handleChange} />Male
                            <input type="radio" className='ms-3' name="gender" id='female' value="female" checked={state.gender === "female"} onChange={handleChange} />Female
                          </div>

                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="fee" className="col-form-label">Class :</label>
                          <select className="form-select" aria-label="Default select example" name='studentClass' value={state.studentClass} onChange={handleChange}>
                            <option value="9">9th</option>
                            <option value="10">10th</option>
                            <option value="11">1st Year</option>
                            <option value="12">2nd Year</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <label htmlFor="fee" className="col-form-label">Fee :</label>
                          <input type="number" className="form-control" id="fee" value={state.fee} name='fee' onChange={handleChange} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="my-2">
                            <textarea className="form-control" style={{ height: "20px" }} id="detail-text" name='address' value={state.address} onChange={handleChange} placeholder='Type address'></textarea>
                          </div>
                        </div>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleStudent} >Add</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ------------------ update modal -------- */}
      <Modal title="Update Campus" open={isModalOpen} onOk={handleOk} onCancel={handleCancl}>
        <div className="modal-content">
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-6">
                  <div className="mb-2">
                    <label htmlFor="campus-name" className="col-form-label">Full Name :</label>
                    <input type="text" className="form-control" id="campus-name" value={state.fullName} name='fullName' onChange={handleChange} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="campus-name" className="col-form-label">Father Name :</label>
                    <input type="text" className="form-control" id="campus-name" name='fatherName' value={state.fatherName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="my-2">
                    <Upload
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleImage}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt="example"
                        style={{
                          width: '100%',
                        }}
                        src={previewImage}
                      />
                    </Modal>
                    {/* upload image------------- */}

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-2">
                    <label htmlFor="campus-name" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" id="campus-name" value={state.email} name='email' onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2">
                    <label htmlFor="campus-name" className="col-form-label">Mobile No. :</label>
                    <input type="number" max="11" className="form-control" value={state.phoneNumber} id="campus-name" name='phoneNumber' onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-2">
                    <label htmlFor="campus-name" className="col-form-label">DOB:</label>
                    <input type="date" className="form-control" id="campus-name" value={state.dob} name='dob' onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-1">
                    <label htmlFor="campus-name" className="col-form-label">Gender:</label> <br />
                    <input type="radio" name="gender" id='male' value="male" checked={state.gender === "male"} onChange={handleChange} />Male
                    <input type="radio" className='ms-3' name="gender" id='female' value="female" checked={state.gender === "female"} onChange={handleChange} />Female
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="class" className="col-form-label">Class :</label>
                  <select className="form-select" aria-label="Default select example" name='studentClass' value={state.studentClass} onChange={handleChange}>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">1st Year</option>
                    <option value="12">2nd Year</option>
                  </select>
                </div>
                <div className="col-6">
                  <label htmlFor="fee" className="col-form-label">Fee :</label>
                  <input type="number" className="form-control" id="fee" value={state.fee} name='fee' onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="my-2">
                    <textarea className="form-control" style={{ height: "20px" }} id="detail-text" name='address' value={state.address} onChange={handleChange} placeholder='Type address'></textarea>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
