import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'
import '../demoreg.css'
import '../register.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import dayjs from 'dayjs'

import FormContainer from '../components/FormContainer'
import { Container, Row, Card, Col, ListGroup, Button, Image, Form } from 'react-bootstrap';

// const useStyles = makeStyles(theme => ({
//     formControl: {
//         //   margin: theme.spacing(1),
//         width: "13vw"
//     },
//     // selectEmpty: {
//     //     marginTop: theme.spacing(1)
//     // },
//     select: {
//         height: "6vh"
//     },
//     inputLabel: {
//         fontSize: "16px",
//         alignSelf: "center"
//     }
// }));

const DemoRegistration = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [dob, setDob] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch();
    // const classes = useStyles();


    // Get user login info from Redux state
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    //calculate the age
    const getAge = (dob) => {
        console.log("do", dob)
        var today = dayjs();
        var birthdate = dayjs(dob)
        var patitentAge = today.diff(birthdate, 'year')
        console.log("patient age is", patitentAge)
        setAge(patitentAge)
    }
    useEffect(() => {
        getAge(dob)
    }, [dob])

    useEffect(() => {
        // If there is user info then redirect
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
    // Handler that logs in the user
    const submitHandler = (e) => {

        e.preventDefault()
        // Check if passwords are the same
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {

            // Dispatch Register
            // dispatch(register(name, email, phone, password, dob, age, gender, false))
        }
    }

    const myFunction = () => {
        var x = document.getElementById("password-field");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }


    return (
        <>

            <div className="wrapper">
                <div className='formContent'>
                    <FormContainer>
                        <h1 style={{marginLeft: "-71px"}}>Sign Up</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler} className='registerform'>
                            <Form.Group controlId='name' className='registerform-group'>
                               
                                <Form.Control
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='DOB' className='registerform-group'>
                                <div >
                                    <DatePicker
                                        selected={dob}
                                        onChange={(date) => setDob(date)}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        placeholderText="DOB"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId='Age' className='registerform-group'>
                                <Form.Control
                                    type='text'
                                    placeholder='Age'
                                    value={age}
                                    onChange={(e) => setEmail(e.target.value)}

                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='Gender' className='registerform-group'>
                                <Form.Control as="select"
                                    value={gender}
                                    type='text'
                                    placeholder='Gender'
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                      <option value="">Select</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="MALE">MALE</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email' className='registerform-group'>
                                <Form.Control
                                    type='email'
                                    placeholder='email@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='phone' className='registerform-group'>
                                <Form.Control
                                    type='phone'
                                    placeholder='10 digit mobile number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password' className='registerform-group-pass'>
                                <Form.Control
                                   type={passwordShown ? "text" : "password"}
                                    // type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                    
                                </Form.Control>
                                
                            </Form.Group>
                    
                            <input type="checkbox" onClick={togglePassword}/>
                            <Form.Group controlId='confirmPassword' className='registerform-group'>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Register
                            </Button>
                        </Form >
                        <Row className='py-3'>
                            <Col style={{ color: "black" }}>
                                Have an Account?{' '}

                                <Link style={{ backgroundColor: "white" }}
                                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                >
                                    Login
                                </Link>

                            </Col>
                        </Row>
                    </FormContainer >

                </div>
            </div>



        </>
    )
}

export default DemoRegistration