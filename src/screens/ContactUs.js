import React, { useState } from 'react'
import { Container, Row, Card, Button, } from 'react-bootstrap'
import "../contact.css"
import Breadcrumb from '../components/Breadcrumb'

const ContactUs = ({ history }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Breadcrumb />
      <Container>
        <section className="contact-page-sec">
          <div className="contactcontainer">
            <div className="row">
              <div className="col-md-4  d-flex">
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-map-marked"></i>
                    </div>
                    <div className="contact-info-text">
                      <h2> Clinic Address</h2>
                      <span style={{padding:"5px"}}> Awadh Pride, 2nd Floor, Metro Pillar no. Opposite 139, Nirant Chowk, Vastral, Ahmedabad-18</span>
           
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4  d-flex">
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-info-text  flex-fill" >
                      <h2>E-mail</h2>
                  
                      <span>sukhayu7@gmail.com</span>
                  
                      <span> Mobile No: 9165731657</span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4  d-flex">
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-info-text" >
                      <h2>Clinic time</h2>
                 
                      <span>Morning - 10:30 am - 2.00 pm</span>
                      <span>Evening - 5:00 pm - 8:00 pm</span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="pa-contact-form">
                <h5 className='contact-heading'>Please Fill the Form</h5>
                <form>
                  <input type="text" placeholder="Enter your name" name="full_name" id="full_name" className="require" />
                  <input type="text" placeholder="Enter your email" name="email" id="email" className="require" data-valid="email" data-error="Email should be valid." />
                  <input type="text" placeholder="Enter your subject" name="subject" id="subject" className="require" />
                  <textarea placeholder="Message here" name="message" id="message" className="require"></textarea>
                  <button type="button" className="pa-btn submitForm">submit</button>
                  <div className="response"></div>
                </form>
              </div>
            </div>
          </div> */}
        </section>

      </Container>
    </>
  )
}

export default ContactUs
