import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../demoreg.css'
import '../register.css'
import { Button, Form } from 'react-bootstrap';
import { createTherapy } from '../actions/therapyActions'

const Therapy = ({ location, history }) => {
    const defaultData = {
        patientName: "",
        contact: "",
        email: "",
        therapyname: "",
        therapyfees: "",
        patientreview: "",
        therapistName: "",
        reference: ""
    }

    const [therapyform, setTherapyform] = useState(defaultData);
    const dispatch = useDispatch();

    const addTherapy = useSelector((state) => state.createTherapy)
    const { loading, error, success, therapyData } = addTherapy


    const submitHandler = (e) => {
        e.preventDefault()
        // console.log("thrapy", therapyform);
        dispatch(createTherapy(
            therapyform.patientName,
            therapyform.contact,
            therapyform.email,
            therapyform.therapyname,
            therapyform.therapyfees,
            therapyform.patientreview,
            therapyform.therapistName,
            therapyform.reference))
        setTherapyform(defaultData)
    }


    const resetHandler = (e) => {
        setTherapyform(defaultData)
    }

    useEffect(() => {
        if (success) {
            console.log("sydg")
        }
    }, [history, success])


    return (
        <>

            <div className='col-md-8'>
                <h1 style={{ marginLeft: "44px" }}>Therapy Form</h1>
                <Form onSubmit={submitHandler} className='registerform'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label> Name</label>
                                </td>
                                <td>
                                    <Form.Group controlId='name' >
                                        <Form.Control
                                            type='text'
                                            placeholder='Full Name'
                                            value={therapyform.patientName}
                                            onChange={(e) => setTherapyform({ ...therapyform, patientName: e.target.value })}
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
                                <td >
                                    <Form.Group controlId='contact'>
                                        <Form.Control
                                            type='text'
                                            maxLength="10"
                                            placeholder='10 digit mobile number'
                                            value={therapyform.contact}
                                            onChange={(e) => setTherapyform({ ...therapyform, contact: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email Id</label>
                                </td>
                                <td >
                                    <Form.Group controlId='email' >
                                        <Form.Control
                                            type='email'
                                            placeholder='email@example.com'
                                            value={therapyform.email}
                                            onChange={(e) => setTherapyform({ ...therapyform, email: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> Therapy Name</label>
                                </td>
                                <td >
                                    <Form.Group controlId='Therapy Name' >
                                        <Form.Control
                                            type='text'
                                            placeholder=' Therapy Name'
                                            value={therapyform.therapyname}
                                            onChange={(e) => setTherapyform({ ...therapyform, therapyname: e.target.value })}

                                        ></Form.Control>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> Therapy Fees</label>
                                </td>
                                <td >
                                    <Form.Group controlId='Therapy Fees' >
                                        <Form.Control
                                            type='text'
                                            placeholder='Therapy Fees'
                                            value={therapyform.therapyfees}
                                            onChange={(e) => setTherapyform({ ...therapyform, therapyfees: e.target.value })}

                                        ></Form.Control>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Patient Review
                                    </label>
                                </td>
                                <td >
                                    <Form.Group controlId="Patient Review" >

                                        <Form.Control as="textarea" rows={2}
                                            type='text'
                                            placeholder='Patient Review'
                                            value={therapyform.patientreview}
                                            onChange={(e) => setTherapyform({ ...therapyform, patientreview: e.target.value })}
                                        />
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> Therapist Name</label>
                                </td>
                                <td >
                                    <Form.Group controlId='Therapist'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Therapist Name'
                                            value={therapyform.therapistName}
                                            onChange={(e) => setTherapyform({ ...therapyform, therapistName: e.target.value })}

                                        ></Form.Control>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Reference of Vaidya Manager?
                                    </label>
                                </td>
                                <td>
                                    <Form.Group controlId='reference' >
                                        <Form.Control
                                            as="select"
                                            type='text'
                                            placeholder='Reference for vaidya manager?'
                                            value={therapyform.reference}
                                            onChange={(e) => setTherapyform({ ...therapyform, reference: e.target.value })}

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
                                <td>
                                    <Button type='submit' variant='primary'>
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

export default Therapy