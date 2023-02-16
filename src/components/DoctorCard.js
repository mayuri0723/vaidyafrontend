import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function DoctorCard() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const isAdmin = userInfo?.isAdmin;

  const getPath = () => {
    if (isLogin) {
      window.location.href = "/consultation"
    }
    else {
      window.location.href = "/login"
    }
  }

  return (
    <>
      <div className='responsive'>
        <div className='home-banner-bg-parten'>
          <img width="100%" src='./images/consultant.png' />

        </div>
        {
          isAdmin ? <>
            <button
              className='doc-card-button'
              onClick={getPath}>Video Consultation</button>
          </> :
            <button
              className='doc-card-button'
              onClick={getPath}>Book Consultation</button>
        }
      </div>

    </>
  )
}

export default DoctorCard