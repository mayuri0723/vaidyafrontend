import React from 'react'
import { Container } from 'react-bootstrap'
import '../banner.css'

function Banner() {
    return (
        <>
            <div className='pa-banner'>
                <Container>
                    <div className='row'>
                        <div className="col-lg-6 offset-lg-6">
                            <div className="pa-banner-text">
                                <h3 className="pa-banner-category">विशेष चिकित्सा  </h3>
                                <h2>
                                सुखायु आयुर्वेद क्लिनिक</h2>
                                <p>विद्धकर्म, अग्निकर्म और पंचकर्म केंद्र</p>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        </>
        // <div>

        //     {/* <head>
        //             <title>Responsive SVG Banner</title>
        //             {/* <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'> 
        //         </head> */}

        //     <section class="responsive-banner-wrap">
        //         <a href="#">
        //             <h2 id="responsive-banner">this banner adapts to any width</h2>
        //         </a>
        //         <div class="svg-wrap">
        //             <svg viewBox=".5 0 244.824 43" version="1.1" xmlns="http://www.w3.org/2000/svg">

        //                 <path class="banner-svg" stroke-miterlimit="10" d="M245.324,0.053c-0.021,40.823-81.43,7.879-122.43,41.307l0,0
        //                 C81.895,7.931,0.553,40.876,0.5,0"/>

        //             </svg>
        //             {/* <img src="https://assets.codepen.io/195953/rocket-white.svg" />
        //             <img src="https://assets.codepen.io/195953/rocket-white.svg" />
        //             <img src="https://assets.codepen.io/195953/rocket-white.svg" />
        //             <img src="https://assets.codepen.io/195953/rocket-white.svg" /> */}
        //         </div>
        //     </section>


        // </div>
    )
}

export default Banner