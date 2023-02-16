import React from 'react'
import { Container, Row, Card, Button, Col, Image, } from 'react-bootstrap'
import '../footer2.css'

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};



const Footer = () => {
  const currentYear = new Date().getFullYear();
  // const shareUrl = "www.mindvein.com";
  // const baseUrl = process.env.REACT_APP_API__BASE_URL;

  const title = "Title"
  return (
    <>
      <div className="pa-footer-three">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-3 col-md-6">
              <div className="pa-foot-box">
                <h2 className="pa-foot-title">Top Products</h2>
                <ul>
                  <li>
                    <a href="">Black Organic Tea</a>
                  </li>
                  <li>
                    <a href="">Loose Leaf Tea</a>
                  </li>
                  <li>
                    <a href="">Oolong Tea</a>
                  </li>
                  <li>
                    <a href="">Green Tea</a>
                  </li>
                  <li>
                    <a href="">Sencha Tea</a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-lg-3 col-md-6">
              <div className="pa-foot-box">
                <h2 className="pa-foot-title">Legal Information</h2>
                <ul>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  {/* <li>
                    <a href="">Privacy Policy</a>
                  </li> */}
                  {/* <li>
                    <a href="">Terms &amp; Conditions</a>
                  </li> */}
                  <li>
                    <a href="/contact-us">Contact us</a>
                  </li>
                  <li>
                    <a href="/refund-policy">Return Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="pa-foot-box pa-foot-subscribe">
                <img src={"/images/herbal.svg"} alt="image" className="img-fluid" />
                <div className="pa-newsletter">
                  <form>
                    <input type="text" placeholder="Subscribe newsletter" />
                    <button className="pa-btn">Subscribe now</button>
                  </form>
                </div>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
              </div>
            </div> */}
          </div>
        

            <div className='row'>
              <div class="col-md-6 offset-md-5">
                {/* social */}
                {/* style={{ marginTop: "51px", display: "flex", justifyContent: "center" }} */}
                <div >
                  <a href="" target="_blank">
                    <img style={{ marginRight: "15px" }}
                      // src="images/facebook.svg"
                      src={"http://localhost:2000/images/facebook.svg"}
                    />
                  </a>
                  <a href="" target="_blank">
                    <img style={{ marginRight: "15px" }}
                      // src="images/instagram.svg" 
                      src={"http://localhost:2000/images/instagram.svg"}
                    />
                  </a>
                  {/* <a href="" target="_blank">
                    <img style={{ marginRight: "15px" }}
                      // src="images/linkedin.svg" 
                      src={"http://localhost:2000/images/linkedin.svg"}
                    />
                  </a> */}
                  {/* <a href="" target="_blank">
                    <img style={{ marginRight: "15px" }}
                      // src="images/twitter.svg" 
                      src={"http://localhost:2000/images/twitter.svg"}
                    />
                  </a> */}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="pa-copyright pa-copyright-two">
          <div className="container">
            <p>Copyright © 2022. All right reserved. <a href=""></a></p>
          </div>
        </div>
      </>
    // <footer className='ftrg'>
    //   <>

    //     <Card className="text-center">
    //       <Card.Body>
    //         <Row>
    //           {/* <div className="col-md-3">
    //             <img style={{
    //               width: "100%",
    //               margin: "auto"
    //             }}
    //               //  src="images/india-map.png" 
    //               src={"http://localhost:2000/images/image-india.png"}
    //             />
    //           </div> */}
    //           {/* links */}
    //           <div className='col-md-3'>
    //             <ul style={{ listStyle: "none outside none" }}>
    //               <li className='ftli'>
    //                 <a href='/about' className="gtm-footer-link"> About Us
    //                 </a>
    //               </li>
    //               <li className='ftli'>
    //                 <a href='/' className="gtm-footer-link">Privacy & Policy
    //                 </a>
    //               </li >
    //               <li className='ftli'>
    //                 <a href='/' className="gtm-footer-link">Contact Us
    //                 </a>
    //               </li>
    //               <li className='ftli'>
    //                 <a href='/' className="gtm-footer-link">Terms & Conditions
    //                 </a>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="col-md-6">
    //             <Row>
    //               <div className="col-md-12">
    //                 <Container style={{
    //                   display: "flex", justifyContent: "space-around",
    //                   flexWrap: "wrap"
    //                 }}>
    //                   <img height="60px" width="115px"
    //                     //  src="images/fssai_1.png"
    //                     src={"http://localhost:2000/images/fssai_1.png"}
    //                   />
    //                   <img height="60px" width="115px"
    //                     // src="images/fssai_2.png"
    //                     src={"http://localhost:2000/images/fssai_2.png"}
    //                   />
    //                   <img height="65px" width="124px"
    //                     // src="images/makeinindia-logo.png"
    //                     src={"http://localhost:2000/images/makeinindia-logo.png"}
    //                   />
    //                   <img height="80px" width="100px"
    //                     //  src="images/who-logo-vector.png"
    //                     src={"http://localhost:2000/images/who-logo-vector.png"}
    //                   />
    //                 </Container>
    //               </div>
    //               {/* images */}
    //               <div className="col-md-12" style={{ marginTop: "3rem", fontFamily: "Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>
    //                 <Row>
    //                   <Col className='footer-imgs'>
    //                     <Image
    //                       src={"http://localhost:2000/images/handshake.png"}
    //                       // src={"images/handshake.png"}
    //                       alt="imagehand"
    //                       fluid
    //                     ></Image>
    //                     <strong style={{ fontSize: "12px" }}>We Promies</strong>
    //                   </Col>
    //                   <Col className='footer-imgs'>
    //                     <Image
    //                       src={"http://localhost:2000/images/shield.png"}
    //                       // src={"images/shield.png"}
    //                       alt="sheild"
    //                       fluid
    //                     ></Image>
    //                     <strong style={{ fontSize: "12px" }}>Secure</strong>
    //                   </Col>
    //                   <Col className='footer-imgs'>
    //                     <Image
    //                       src={"http://localhost:2000/images/hidden.png"}
    //                       // src={"images/hidden.png"}
    //                       alt="hide"
    //                       fluid
    //                     ></Image>
    //                     <strong style={{ fontSize: "12px" }}> Discreet Shipping</strong>
    //                   </Col>
    //                   <Col className='footer-imgs'>
    //                     <Image
    //                       src={"http://localhost:2000/images/delivery-truck.png"}
    //                       // src={"images/delivery-truck.png"}
    //                       alt="deliver"
    //                       fluid
    //                     ></Image>
    //                     <strong style={{ fontSize: "12px" }}> Express Checkout</strong>
    //                   </Col>
    //                 </Row>
    //               </div>
    //             </Row>
    //           </div>
    //         </Row>
    //         {/* social */}
    //         <div style={{ marginTop: "51px", display: "flex", justifyContent: "center" }}>
    //           <a href="" target="_blank">
    //             <img className="gtm-footer-link" style={{ marginRight: "15px" }}
    //               // src="images/facebook.svg"
    //               src={"http://localhost:2000/images/facebook.svg"}
    //             />
    //           </a>
    //           <a href="" target="_blank">
    //             <img className="gtm-footer-link" style={{ marginRight: "15px" }}
    //               // src="images/instagram.svg" 
    //               src={"http://localhost:2000/images/instagram.svg"}
    //             />
    //           </a>
    //           <a href="" target="_blank">
    //             <img className="gtm-footer-link" style={{ marginRight: "15px" }}
    //               // src="images/linkedin.svg" 
    //               src={"http://localhost:2000/images/linkedin.svg"}
    //             />
    //           </a>
    //           <a href="" target="_blank">
    //             <img className="gtm-footer-link" style={{ marginRight: "15px" }}
    //               // src="images/twitter.svg" 
    //               src={"http://localhost:2000/images/twitter.svg"}
    //             />
    //           </a>
    //         </div>


    //       </Card.Body>
    //       {/* <Card.Footer className="text-muted" >
    //         <Card.Text style={{ textAlign: "center" }}>&nbsp;
    //           D e v e l o p e d &nbsp; b y &nbsp;  L o g i x &nbsp; T e c h n o l o g i e s,&nbsp;  P u n e .
    //         </Card.Text>
    //         <p>
    //           &copy; {currentYear} <strong>Mindvein Healthcare LLP</strong> - Online Medicine Store & Video Streaming
    //         </p></Card.Footer> */}
    //     </Card>
    //     <p className="footer-links">
    //       <a
    //         href="#"
    //         target="_blank"
    //       >
    //       </a>
    //     </p>
    //   </>
    // </footer>
  )
};

export default Footer;

