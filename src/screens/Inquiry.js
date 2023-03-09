import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'
import '../demoreg.css'
import '../register.css'
import { Button, Form } from 'react-bootstrap';
import { createInquiry } from '../actions/inquiryActions';


const Inquiry = () => {
  const defaultData = {
    name: "",
    contact: "",
    email: "",
    inquirySubject: "",
    reference: ""
  }
  const [inquiryForm, setInquiryForm] = useState(defaultData)
  const dispatch = useDispatch();

  const addInquiry = useSelector((state) => state.createInquiry)
  const { loading, error, success, inquiryData } = addInquiry

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log("thrapy", inquiryForm);
    dispatch(createInquiry(
      inquiryForm.name,
      inquiryForm.contact,
      inquiryForm.email,
      inquiryForm.inquirySubject,
      inquiryForm.reference,))
    setInquiryForm(defaultData)

  }

  const resetHandler = (e) => {
    setInquiryForm(defaultData)
  }

  return (
    <>
      <div className='col-md-8'>
        <h1 style={{ marginLeft: "44px" }}>Inquiry</h1>
        <Form onSubmit={submitHandler} className='registerform w-100'>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label> Name</label>
                </td>
                <td colSpan={5}>
                  <Form.Group controlId='name' >
                    <Form.Control
                      type='text'
                      placeholder='Full Name'
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Contact No.
                  </label>
                </td>
                <td colSpan={5}>
                  <Form.Group controlId='contact' >
                    <Form.Control
                      type='text'
                      maxLength="10"
                      placeholder='10 digit mobile number'
                      value={inquiryForm.contact}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, contact: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email Id</label>
                </td>
                <td colSpan={5}>
                  <Form.Group controlId='email' >
                    <Form.Control
                      type='email'
                      placeholder='email@example.com'
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <label>For What?
                  </label>
                </td>
                <td colSpan={5}>
                  <Form.Group controlId="Inquiry" >

                    <Form.Control as="textarea" rows={2}
                      type='text'
                      placeholder='Inquiry Subject'
                      value={inquiryForm.inquirySubject}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, inquirySubject: e.target.value })}
                    />
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Reference of Vaidya Manager?
                  </label>
                </td>
                <td colSpan={5}>
                  <Form.Group controlId='reference'>
                    <Form.Control
                      as="select"
                      type='text'
                      placeholder='Reference for vaidya manager?'
                      value={inquiryForm.reference}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, reference: e.target.value })}

                    >
                      <option value="">Select</option>
                      <option value="Newspaper">Newspaper</option>
                      <option value="Internet">Internet</option>
                      <option value="Call Center">Call Center</option>
                      <option value="Friend/Relative">Friend/Relative</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td></td>
                <td colSpan={5}>  <Button type='submit' variant='primary'>
                  Save
                </Button>

                  <Button style={{ marginLeft: "5px" }} onClick={resetHandler} variant='primary'>
                    Reset
                  </Button></td>
              </tr>
            </tbody>
          </table>
        </Form >
      </div>
    </>
  )
}

export default Inquiry