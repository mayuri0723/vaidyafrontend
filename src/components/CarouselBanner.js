import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CarouselBanner = () => {

    const options = {
        margin: 30,
        items: 1,
        animateOut: 'fadeOut',
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: true,
        responsiveClass: true,
        nav: true,
        navText: ["Prev", "Next"],
        smartSpeed: 1000,
        loop: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 1,
            },
            700: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        },
    };

    return (
        <>

            <OwlCarousel className="slider-items owl-carousel" {...options}>
                <div className="owlitem">
                    <img src={"/images/ayurvedbaneer2.jpg"} width="800px" height="400px" />
                </div>
                <div className="owlitem">

                    <img src={"/images/ayurvedbanner1.jpg"} width="800px" height="400px"/>
                    </div>


            </OwlCarousel>
        </>

    )
}

export default CarouselBanner