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
                                    {/* <img src={"/images/herbal.svg"} alt="image" className="img-fluid" /> */}
                                    {/* <h1>We are here with 25 years of experience</h1> */}
                                    <h5>about us</h5>
                                </div>
                                <p align="justify">Welcome to Sukhayu Ayurvedic Chikitsalaya, Agnikarma Viddhakarma Research Center. We specialize in providing a holistic approach to healthcare using traditional Ayurvedic practices. We at Sukhayu offer a range of services, including agnikarma viddhakarma, Panchkarma, and a complete Ayurvedic practice.

                                    Agnikarma viddhakarma is a specialized Ayurvedic treatment that involves using heat to promote healing and relieve pain with different shalaka (stick with specific measurements) made up of metals like Suvarna,Tamra, Rajat, Loh, Panchdhatu, etc. In "Viddha-karma" we use insulin needle on a specific point for management of different diseases like musculoskeletal conditions such as arthritis and back pain, knee joint pain, cervical spondylitis, lumbar spondylitis, sciatica, AVN, allergic rhinitis, infertility, headache, insomnia any many more.

                                    Pancha-karma is a detoxification process that aims to eliminate toxins from the body and restore balance. This procedure is also useful for disease management like asthama, eczema, psoriasis, alopecia, etc. Panchkarma includes Vaman, Virechan, Basti, Nasya, Raktamokshan. Upkarma includes agnikarma, viddhakarma, pracchan karma, etc. Treatment  involves a combination of therapies, including massage, herbal steam therapy, and nasal cleansing, to cleanse the body of impurities.

                                    At our Sukhayu Ayurved clinic, we offer a complete Ayurvedic practice that includes consultation, diagnosis, and treatment. Our experienced Vaidya Dr Megha Akshay Pendkar takes a personalized approach to healthcare, considering each individual's unique constitution, lifestyle, and health goals to develop a customized treatment plan.

                                    Whether you are seeking relief from a specific health condition or looking to maintain overall wellness, our Sukhayu Ayurved clinic is here to support you. Contact us to schedule an appointment or learn more about our services.</p>

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
                            margin: " 0 0 0 15px"
                        }} className="img-fluid" />
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
                        <Row className='sukhayu-about'>
                            <Col>
                                <Row className='sukhayu-about'>
                                    <img className='imgSmall img-fluid' src="images/ayurveda.jpg" />
                                </Row>
                                <Row className='sukhayu-about'>
                                    <img className='imgSmall img-fluid' src="images/aboutcard.jpg" />
                                </Row>
                            </Col>
                            <Col>
                                <img className='imgSmall img-fluid' style={{ height: '810px' }} src="images/panchkarmafront.png" />
                            </Col>
                        </Row>
                        <Row className='sukhayu-about'> 
                            <Col>
                            <img className='imgSmall img-fluid' style={{ height: '400px' }} src="images/10.jpg" />
                            </Col>
                            <Col>
                            <img className='imgSmall img-fluid' style={{ height: '400px' }} src="images/8.jpg" />
                            </Col>
                        </Row>
                        <Row className='sukhayu-about'>
                            <Col>
                            <img className='imgSmall img-fluid' style={{ height: '400px' }} src="images/7.jpg" />
                            </Col>
                            <Col>
                            <img className='imgSmall img-fluid' style={{ height: '400px' }} src="images/9.jpg" />
                            </Col>
                        </Row>
                        <Row className='sukhayu-about'>
                            <img className='imgPanchkarmaback img-fluid' src="images/panchkarmaback.jpg" />
                        </Row>
                  

                    </div>
                </div>
            </div>
        </>
    )
}

export default Abouts