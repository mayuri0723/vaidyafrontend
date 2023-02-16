import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Inquiry from '../screens/Inquiry';
import Register from '../screens/Register';
import Therapy from '../screens/Therapy';

const TabComponent = () => {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="Patient">
                <Row>
                    <Col className='ms-3' sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="Patient">Patient
                                {/* <Link to={'/register'}>
                              Patient
                              </Link> */}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Therapy">Therapy
                                {/* <Link to={'/therapy'}>
                                Therapy
                             </Link> */}
                             </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Inquiry">Inquiry
                                {/* <Link to={'/inquiry'}>
                                Inquiry
                             </Link> */}
                             </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="Patient">
                            <Register/>   
                           
                            </Tab.Pane>
                            <Tab.Pane eventKey="Therapy">
                            <Therapy/>
                        
                            </Tab.Pane>
                            <Tab.Pane eventKey="Inquiry">
                           <Inquiry/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    )
}

export default TabComponent