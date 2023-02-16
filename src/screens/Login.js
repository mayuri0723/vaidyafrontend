import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Bootstrap Components
import { Form, Button, Row, Col } from 'react-bootstrap'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// UI Components
import Message from '../components/Message'
// import Loader from '../components/Loader'
import LoadingSpinner from '../components/LoadingSpinner'
import FormContainer from '../components/FormContainer'
// Redux Actions
import { login } from '../actions/userActions'
//css
import "../login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const Login = ({ location, history }) => {
    const [isFetching, setIsFetching] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);

    // useEffect(() => {
    //     setTimeout(function () {
    //         // console.log("Delayed for 5 second.");
    //         setIsFetching(false);
    //     }, 2000);
    //     history.push('/login')
    // }, []);
    const eye = <FontAwesomeIcon icon={faEye} />;
    // State to hold email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    // Get user login info from Redux state
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {
    //     // If there is user info then redirect
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])

    // Handler that logs in the user
    const submitHandler = (e) => {
        e.preventDefault()
        // console.log("trigger")
        // Dispatch login
        dispatch(login(email, password))
        localStorage.setItem('isLogin', true)
    }
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src={"images/undraw_medicine.svg"}
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            {error && <Message variant='danger'>{error}</Message>}
                            {/* {loading && <Loader />} */}
                            <Form onSubmit={submitHandler}>

                                <div className="form-outline mb-4">
                                    <input 
                                       type="email"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        controlid='email'
                                        placeholder='email@example.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <div className="pass-wrapper">
                                        <input
                                            type={passwordShown ? "text" : "password"}
                                            // type="password"
                                            id="form1Example23"
                                            className="form-control form-control-lg"
                                            controlid='password'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <i className="fa fa-eye icons" style={{fontSize:"20px"}} onClick={togglePassword} aria-hidden="true" />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <a href="/reset">Forgot password?</a>
                                </div>
                                <Button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }}
                                >
                                    Sign In
                                </Button>
                                {/* <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div> */}
                                {/* <Button type="submit" className="btn btn-primary btn-lg btn-block" style={{ color:"white",backgroundColor: "#3b5998" }}
                                >
                                    <Link style={{ color:"white"}} to={'/otpscreen'}>
                                    Sign In With Phone No
                                    </Link>
                                </Button> */}
                                {/* <Row className='py-3'>
                                    <Col>
                                        New Customer{' '}
                                        <Link to={"/mastertab"}>
                                            Register
                                        </Link>
                                    </Col>
                                </Row> */}
                            </Form>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Login
