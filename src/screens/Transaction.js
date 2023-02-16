import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const Transaction = ({ location, history }) => {
    const [txnid, setTxnid] = useState('')
    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [productinfo, setProductinfo] = useState('');
    const [udf1, setUdf1] = useState('');
    const [udf2, setUdf2] = useState('');
    const [udf3, setUdf3] = useState('');
    const [udf4, setUdf4] = useState('');
    const [udf5, setUdf5] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [sub_merchant_id, setSub_merchant_id] = useState('');
    const [unique_id, setUnique_id] = useState('');
    const [split_payments, setSplit_payments] = useState('');
    const [udf6, setUdf6] = useState('');
    const [udf7, setUdf7] = useState('');
    const [udf8, setUdf8] = useState('');
    const [udf9, setUdf9] = useState('');
    const [udf10, setUdf10] = useState('');
    const [customer_authentication_id, setCustomer_authentication_id] = useState('');
    const [token, setToken] = useState('');
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const submitHandler = (e) => {
        e.preventDefault()
        const transactionData = {
            txnid,
            amount,
            name,
            email,
            phone,
            productinfo,
            surl: process.env.REACT_APP_SURL,
            furl: process.env.REACT_APP_FURL,
            udf1,
            udf2,
            udf3,
            udf4,
            udf5,
            address1,
            address2,
            city,
            state,
            country,
            zipcode,
            sub_merchant_id,
            unique_id,
            split_payments,
            customer_authentication_id,
            udf6,
            udf7,
            udf8,
            udf9,
            udf10
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        // console.log("object", transactionData, config)
        axios.post("http://localhost:5000/api/easebuzz/initiate_payment", transactionData, config)
            .then((response) => {
                // console.log("Response is", response.data)
                window.location.href = response.data
                
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className="grid-container">
                <header className="wrapper">
                    <div className="hedding">
                        <h2><a className="highlight" href="./Consultation.js">Back</a></h2>
                    </div>
                </header>
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='txnid'>
                        <Form.Label>Transaction ID</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='T31Q6JT8HB'
                            value={txnid}
                            onChange={(e) => setTxnid(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='125.25'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}

                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='name'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
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
                            placeholder='10 digit mobile number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='productinfo'>
                        <Form.Label>Product Information</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product'
                            value={productinfo}
                            onChange={(e) => setProductinfo(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <h3>Optional Parameters</h3>
                    <hr />
                    {/* <Form.Group controlId='productinfo'>
                                <Form.Label>Success URL</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Product'
                                    value={productinfo}
                                    onChange={(e) => setProductinfo(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='productinfo'>
                                <Form.Label>Success URL</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Product'
                                    value={productinfo}
                                    onChange={(e) => setProductinfo(e.target.value)}
                                ></Form.Control>
                            </Form.Group> */}
                    <Form.Group controlId='udf1'>
                        <Form.Label>UDF1</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='User description1'
                            value={udf1}
                            onChange={(e) => setUdf1(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='udf2'>
                        <Form.Label>UDF2</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='User description2'
                            value={udf2}
                            onChange={(e) => setUdf2(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='udf3'>
                        <Form.Label>UDF3</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='User description3'
                            value={udf3}
                            onChange={(e) => setUdf3(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='udf4'>
                        <Form.Label>UDF4</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='User description4'
                            value={udf4}
                            onChange={(e) => setUdf4(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='udf5'>
                        <Form.Label>UDF5</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='User description5'
                            value={udf5}
                            onChange={(e) => setUdf5(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='address1'>
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='address2'>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Pune'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='state'>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Maharashtra'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='country'>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='India'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='zipcode'>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='sub_merchant_id'>
                        <Form.Label>Sub-Merchant ID</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            value={sub_merchant_id}
                            onChange={(e) => setSub_merchant_id(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='unique_id'>
                        <Form.Label>Unique ID</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Customer unique Id'
                            value={unique_id}
                            onChange={(e) => setUnique_id(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='split_payments'>
                        <Form.Label>Split payment </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='{ "axisaccount" : 100, "hdfcaccount" : 100}'
                            value={split_payments}
                            onChange={(e) => setSplit_payments(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='customer_authentication_id'>
                        <Form.Label> Customer Authentication Id</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='customer authentication number'
                            value={customer_authentication_id}
                            onChange={(e) => setCustomer_authentication_id(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Submit
                    </Button>
                </Form >
            </div>

        </>
    )
}

export default Transaction
