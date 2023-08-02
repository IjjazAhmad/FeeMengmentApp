import React from 'react'

export default function Footer() {
  let year = new Date().getFullYear()
  return (
    <div className="container py-1">
      <div className="row">
        <div className="col">
          <p className="text-center m-0">&copy; {year}. All Right Reserved by <span className=' border-bottom border-2 border-black'> Ijjaz Ahmad</span>.</p>
        </div>
      </div>
    </div>
  )
}
