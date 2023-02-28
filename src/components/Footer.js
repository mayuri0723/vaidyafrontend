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
          </div>
        

            <div className='row'>
              <div className="col-md-6 offset-md-5">
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
   
  )
};

export default Footer;

