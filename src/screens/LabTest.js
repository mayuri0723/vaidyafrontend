import React, { useState,useEffect } from 'react'
import { Container, Row, Card, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const LabTest = ({  location,history }) => {
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.REACT_APP_API__BASE_URL;
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    // If there is user info then redirect
    if (userInfo) {
        history.push(redirect)
    }
}, [history, userInfo, redirect])

  return (
    <Container>
      <Card className="text-center">
        <Card.Header>Lab Test</Card.Header>
        <Card.Body>
          <Card.Title>


          </Card.Title>
          <Card.Text>
            We have team of health experts like Psychiatrist (Medical Council of India-MCI, registered), Sexologist, Child Psychiatrist, Clinical Psychologist (Council of India-RCI registered), Occupational Therapist, Speech Therapist, Remedial/Special Educators who mindfully listen, understand and guide you with the quality and intense awareness throughout the process of consultation and therapy. We strongly believe in the natural elements for health and wellness hence we emphasis more on it.
          </Card.Text>
          <Card.Text>
            <Row className='py-3'>
              <Col>
                Have an Account?{' '}

                <Link style={{ backgroundColor: "white" }}
                  to={redirect ? `/login?redirect=${redirect}` : '/login'}
                >
                  Login
                </Link>

              </Col>
            </Row>
            {/* <Image
              src={baseUrl + "images/coming-soon-banner.png"} alt="coming-soon"
              fluid
            ></Image> */}
          </Card.Text>
        </Card.Body>
        {/* <Card.Footer className="text-muted">
              <p>
            &copy; {currentYear} <strong>Mindvein</strong> - Medicine online Store
          </p>
          </Card.Footer> */}
      </Card>
      <p className="footer-links">
        <a
          href="#"
          target="_blank"
        >
        </a>
      </p>
    </Container>
  )
}

export default LabTest
