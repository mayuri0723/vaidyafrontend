import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'
import '../demoreg.css'
import '../register.css'
import { register } from '../actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Image, Form, InputGroup, Row, Col } from 'react-bootstrap';


const Register = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [reference, setReference] = useState('');
  const [profilePictureURL, setprofilePictureURL] = useState('')
  // const [dob, setDob] = useState();
  const [date, setDate] = useState(new Date());
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  // Get user login info from Redux state
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  //calculate the age
  // const getAge = (dob) => {
  //     // console.log("do", dob)
  //     var today = dayjs();
  //     var birthdate = dayjs(dob)
  //     var patitentAge = today.diff(birthdate, 'year')
  //     // console.log("patient age is", patitentAge)
  //     setAge(parseInt (patitentAge))
  // }
  // useEffect(() => {
  //     getAge(dob)
  // }, [dob])


  // // Handler that logs in the user
  const submitHandler = (e) => {
    e.preventDefault()
    // Check if passwords are the same
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {

      // Dispatch Register
      dispatch(register(name, email, phone, password, address, age, gender, weight, reference, date, false, profilePictureURL))
      toast.success('Registration Successfully!', {
        position: toast.POSITION.TOP_CENTER
      });
      localStorage.setItem('isLogin', true)
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setGender('');
      setAddress('');
      setWeight('');
      setValidated(true);
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <>
      <h1 style={{ marginLeft: "-69px" }}>Sign Up</h1>
      <Form onSubmit={submitHandler} className='registerform' >
        <Row>
          <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='Date'>
              <Form.Label>Date</Form.Label>
              <div className='date-input'>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  peekNextMonth
                  showMonthDropdown
                  dropdownMode="select"
                  placeholderText="Date"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
            </Form.Group>
          </Col>

        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='tel'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

      
        <Row>
          <Col md={6}>
            <Form.Group controlId='Age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='text'
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as='select'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value=''>Choose...</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='Weight'>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type='text'
                placeholder='Weight in Kg'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          
        </Row>
        <Row>
          <Col className='col-md-7 offset-md-3'>
            <Form.Group controlId='reference' >
            <Form.Label>Reference for vaidya manager?</Form.Label>
              <Form.Control
                as="select"
                type='text'
                placeholder='Reference for vaidya manager?'
                value={reference}
                onChange={(e) => setReference(e.target.value)}

              >
                <option value="">Reference</option>
                <option value="Newspaper">Newspaper</option>
                <option value="Internet">Internet</option>
                <option value="Call Center">Call Center</option>
                <option value="Friend/Relative">Friend/Relative</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>
    </>
  )
}

export default Register