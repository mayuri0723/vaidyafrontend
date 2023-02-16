import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ChangePassword from './ChangePassword';
import StaffAccount from './StaffAccount';

const Setting = () => {

  return (
    <div style={{ marginTop: "4rem" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {/* <Nav.Item>
                <Nav.Link eventKey="first">Basic Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Companies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Branches</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Change Password</Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="fifth">Staff Account</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="sixth"> Account</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {/* <Tab.Pane eventKey="first">
                fdf
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                second
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                third
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
             <ChangePassword/>
              </Tab.Pane> */}
              <Tab.Pane eventKey="fifth">

                <StaffAccount />
              </Tab.Pane>
              {/* <Tab.Pane eventKey="sixth">
                sixth
              </Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Setting