import React from 'react'
import '../about.css'
import Breadcrumb from '../components/Breadcrumb'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Abouts = () => {
    return (
        <>
            <Breadcrumb />
            <div className="pa-about spacer-top spacer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="pa-about-img">
                                <img src={"images/sukhayumarathi.png"} alt="image" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="pa-about-content">
                                <div className="pa-heading">
                                    <img src={"/images/herbal.svg"} alt="image" className="img-fluid" />
                                    <h1>We are here with 25 years of experience</h1>
                                    <h5>about us</h5>
                                </div>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pa-team">
                <div className="container">
                    <div className="pa-heading">
                    </div>
                    <div>
                        <img src={"images/margadarshan.jpg"} style={{
                            width: "100%",
                            height: "550px",
                            margin: " 0 0 0 15px"
                        }} className="img-fluid"/>
                    </div>
                </div>
            </div>
            <div className="pa-counter spacer-top spacer-bottom">
                <div className="container">
                    <div className="pa-heading">
                        <img src={"images/herbal.svg"} alt="image" className="img-fluid" />
                        <h1>Benefit from choosing the best</h1>
                    </div>
                    
                    <div>
                        <Row>
                            <Col>
                                <Row>
                                    <img className='imgSmall img-fluid' src="images/ayurveda.jpg" />
                                </Row>
                                <Row>
                                    <img className='imgSmall img-fluid' src="images/aboutcard.jpg" />
                                </Row>
                            </Col>
                            <Col>
                                <img className='imgSmall img-fluid' style={{ height: '810px' }} src="images/panchkarmafront.png" />
                            </Col>
                        </Row>
                        <Row>
                            <img className='imgPanchkarmaback img-fluid' src="images/panchkarmaback.jpg" />
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Abouts