import React, { useState } from 'react'
import { Container, Row, Card, Button } from 'react-bootstrap'


const RefundPolicy = ({ history }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Card className="text-center">
        <Card.Header>Refund Policy</Card.Header>
        <Card.Body>
          <Card.Title >
            <strong style={{ lineHeight: "2.2" }}>
              Welcome
            </strong>
          </Card.Title>
          <Card.Text style={{ marginTop: "-12px" }}>
            Sorry, these medications are non-refundable and non-exchangeable.
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
    </>
  )
}

export default RefundPolicy