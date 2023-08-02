import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card/Card'

export default function Dashboard() {
  const [totalStudent, setTotalStudent] = useState()
  const [totalCampus, setTotalCampus] = useState()
  useEffect(() => {
    let stdnumbers = JSON.parse(localStorage.getItem("students")) || [];
    const totalstudent = stdnumbers.reduce((total, _, index) => 1 + index, 0);
    let campnumbers = JSON.parse(localStorage.getItem("campuses")) || [];
    const totalcamp = campnumbers.reduce((total, _, index) => 1 + index, 0);
    setTotalStudent(totalstudent)
    setTotalCampus(totalcamp)
  }, []);

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let fees = students.map((std) => Number(std.fee));
  var totalfee = fees.reduce((accumulator, currentValue) => accumulator + currentValue, 0);





  return (
    <>
      <div className="dashboard">

        <div className="container my-5">
          <div className="row">
            <div className="col">
              <div className="dashboard-section  p-4">
                <h1>DASHBOARD</h1>
                <p className='text-center'>Welcome to School Fees Management System</p>
                <div className="row align-items-center justify-content-center">
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <Card color="bg-info text-white" icon="fa-solid fa-building-columns" text="Campus" num={totalCampus} />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <Card color="bg-secondary text-white" icon="fa-solid fa-users" text="STUDENTS" num={totalStudent} />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <Card color="bg-warning text-white" icon="fa-solid fa-file-lines" text="TOTAL FEE" num={totalfee} />
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
