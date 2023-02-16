import React, { useState, useEffect } from 'react'
// Bootstrap Components
import { Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Redux
import { useDispatch, useSelector } from 'react-redux'
// UI Components
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Redux Actions
import { register } from '../actions/userActions'
//Packages
import dayjs from 'dayjs'
//css
// import '../register.css'
import { createDoctorData } from '../actions/productActions'
import axios from 'axios'


const Role = ({ location, history }) => {
    // State to hold email and password
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [role, setRole] = useState('');
    const [dob, setDob] = useState();
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [fee, setFee] = useState();
    const [file, setFile] = useState()
    // const [isAdmin, setIsAdmin] = useState();
    const dispatch = useDispatch()

    // Get user login info from Redux state
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister
    // console.log("user is", userInfo)s

    const redirect = location.search ? location.search.split('=')[1] : '/'

    var isAdmin = false

    //calculate the age
    const getAge = (dob) => {
        // console.log("do", dob)
        var today = dayjs();
        var birthdate = dayjs(dob)
        var patitentAge = today.diff(birthdate, 'year')
        // console.log("patient age is",patitentAge)
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

    // Handler that logs in the user
    const submitHandler = (e, userInfo) => {
        e.preventDefault()

        // console.log(role)
        // Check if passwords are the same
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }
        else {
            // Dispatch Register
            if (role === "Doctor") {
                isAdmin = true
                console.log("first", isAdmin)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const data = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    dob: dob,
                    age: age,
                    gender: gender,
                    isAdmin: isAdmin
                }
                axios
                    .post(`https://vaidyabackend.vercel.app/api/users`, data)
                    .then((response) => {
                        console.log(response.data)

                        dispatch(createDoctorData({
                            name: response.data.name,
                            qualification: qualification,
                            experience: experience,
                            email_id: response.data.email,
                            phone_no: response.data.phone,
                            consultation_fee: fee,
                            profilePictureURL: file
                        }))
                        setFee('')
                        setQualification('')
                        setExperience('')
                        setEmail('')
                        setPhone('')
                        setFile('')
                    })
                    .catch((err) => console.error(err));
            }
            else {
                console.log("Second")
                dispatch(register(name, email, phone, password, dob, age, gender, false))
            }

        }


    }

    const handleImageUpload = (file) => {
        // const base64 = imageConvertor(file)
        // setFile(base64)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {

            console.log(fileReader.result)
            setFile(fileReader.result)
        }
    }

  
 

    return (
        <>
            <div className="wrapper">
                <div className='formContent'>
                    <FormContainer>
                        <h1>Sign Up</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler} >
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='Role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select"
                                    value={role}
                                    type='text'
                                    placeholder='Optional'
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                </Form.Control>
                            </Form.Group>
                            {role === "Doctor" ?
                                <>
                                    <Form.Group controlId='qualification'>
                                        <Form.Label>Qualification</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='qualification'
                                            value={qualification}
                                            onChange={(e) => setQualification(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='experience'>
                                        <Form.Label>Experience</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Experience'
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='fee'>
                                        <Form.Label>Consulation fee</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='e.g. 1000.00'
                                            value={fee}
                                            onChange={(e) => setFee(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Default file input example</Form.Label>
                                        <Form.Control
                                            style={{ color: "black" }}
                                            type="file"
                                            // value={file}
                                            // onChange={(e) => setFile(e.target.value)}
                                            onChange={(e) => handleImageUpload(e.target.files[0])}
                                        />

                                    </Form.Group>
                                </> :
                                <>
                                    {role === "Patient" ?
                                        <>
                                            <Form.Group controlId='DOB'>
                                                <Form.Label>Date of Birth</Form.Label>
                                                <div >
                                                    <DatePicker
                                                        selected={dob}
                                                        onChange={(date) => setDob(date)}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        placeholderText="DOB(Optional)"
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group controlId='Age'>
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Optional'
                                                    value={age}
                                                    onChange={(e) => setEmail(e.target.value)}

                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='Gender'>
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control as="select"
                                                    value={gender}
                                                    type='text'
                                                    placeholder='Optional'
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value="FEMALE">FEMALE</option>
                                                    <option value="MALE">MALE</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </> : null
                                    }
                                </>
                            }
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='email@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='phone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='phone'
                                    placeholder=' 10 digit mobile number'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
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

                    </FormContainer >

                </div>
            </div>

        </>
    )
}

export default Role
