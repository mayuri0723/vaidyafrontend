import React, { useState, useEffect } from 'react'
import '../mainpage.css'
import { Form, Card, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// Redux Actions
import { login } from '../actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = ({ location, history }) => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // Get user login info from Redux state
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    toast.success('Login Successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
    localStorage.setItem('isLogin', true)

    history.push('/home');

  }
  return (
    <div>
      
        <div className="Auth-form-container">
        <div class="Auth-form-wrapper">
          <Form className="Auth-form" onSubmit={submitHandler}>
            <div className="Auth-form-content">
              {/* <h3 className="Auth-form-title">Sign In</h3> */}
              <div className="text-center">

                <span className="link-primary" >
                  <h4>Sign in</h4>
                </span>
              </div>
              <div className="form-group mt-3">
                <label className='authlabel'>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label className='authlabel'>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

              </div>
              <ToastContainer />
              {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MainPage