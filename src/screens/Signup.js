import React from 'react'
import { Button, Image, Form, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Signup() {
    return (
        <div style={{ marginTop: "3rem" }}>
        <div>
            Signup
            <div class="row justify-content-center">
                <div class="col-4">
                <Form.Group controlId='name'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Full Name'
                                       
                                    ></Form.Control>
                                </Form.Group>
                </div>
                <div class="col-4">
                <Form.Group controlId='Date' >
                                    <div >
                                        <DatePicker
                                      
                                        
                                            peekNextMonth
                                            showMonthDropdown
                                            dropdownMode="select"
                                            placeholderText="Date"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                        />
                                    </div>
                                </Form.Group>
                </div>
            </div>


        </div>
        </div>
    )
}

export default Signup