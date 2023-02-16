import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import '../newMedicines.css'

const NewMedicine = () => {
  return (
    <div>
      <table>
        <Row>
          <span>Medicine:</span>
          <Col>

            <select className='p-input'>
              <option selected value="">Select</option>
              <option value="Capsule">Capsule</option>
              <option value="Drops">Drops</option>
              <option value="Tablet">Tablet</option>
              <option value="Liquid">Liquid</option>
            </select>
          </Col>
          <Col >
            <input className='p-input' type="text" placeholder="name" />
          </Col>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input className='p-input' type="text" placeholder="Stock in Gm" style={{ margin: "0 14px 9px 0" }} />
            <input className='p-input' type="text" placeholder="Stock in Unit" />

          </div>
        </Row>
        <Row>
        Company Name:
          <Col>
            
            <select className='p-input'>
              <option selected value="">Select</option>
              <option value="Self">Self</option>
              <option value="Other">Other</option>
            </select>
          </Col>
          <Col>
            <input className='p-input' type="text" placeholder="Supplier Name" />
          </Col>
          <Col>
            <input className='p-input' type="text" placeholder="Number" />
          </Col>
        </Row>
        <br/>
        <Row>
        Amount:
          <Col>
          
            <input className='p-input' type="text" placeholder="Amount" />
          </Col>
          <Col>
            <input className='p-input' type="text" placeholder="Invoice No" />
          </Col>
        </Row>
        <br/>
        <Row>
        Med Receiver Name:
          <Col>
            <input className='p-input' type="text" placeholder="Med Receiver Name" />
          </Col>
        </Row>
        <br/>
        <Row>
          Add to at:
          <Col>
          <div style={{ display: "flex"  }}>
          <input className="med-input" type="radio" name="company" style={{margin:" 0px 3px -2px 40px"}} />
          <label> <h6>Company</h6></label>
          <input className="med-input" type="radio" name="clinic" style={{margin:" 0px 3px -2px 40px"}} />
          <label> <h6>Clinic</h6></label>
          </div>
          </Col>
          
         
        </Row>
        <Row>
          Want to Pay:
          <Col>
          <div style={{ display: "flex"}}>
            <input className="med-input"  type="radio" name="yes" style={{margin:" 0px 3px -2px 40px"}} />
            <label> <h6>Yes</h6></label>
            <input  className="med-input"type="radio" name="no"  style={{margin:" 0px 3px -2px 40px"}}/>
            <label>
              <h6>No</h6></label>
              </div>
          </Col>
        </Row>
        <Row>
          Paid Amount:
          <input className='p-input' type="text" placeholder="Rs." />
        </Row>
        <Row>
        Pay Receiver Name:
          <input className='p-input' type="text" placeholder="Pay Receiver Name" />
        </Row>
    <br/>
   
    <div style={{ display: "flex"}} >
    <Button style={{margin: "0 19px -1px -3px"}}>Save</Button>
        <Button>Reset</Button>
    </div>
 
      </table>

    </div>
  )
}

export default NewMedicine