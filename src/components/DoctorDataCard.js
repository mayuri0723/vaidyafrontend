import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import '../doctorDataCard.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { listDoctors} from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'


const DoctorDataCard = () => {
    const dispatch = useDispatch()


    const options = {
        loop: true,
        margin: 30,
        items: 1,
        center: true,
        autoplay: true,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: false,
        navigationText: ["", ""],
        slideSpeed: 1000,
        singleItem: true,
    };


 //doctor data
 const doctorList = useSelector((state) => state.doctorList)
 const { loading, error, doctors } = doctorList;

 useEffect(() => {
    // Dispatch the list doctors action and fill our state
    dispatch(listDoctors())
  
  }, [dispatch])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="m-auto col-md-8">
                 
                       {/* <h1>{option.name}</h1> 
                       <h1>{option.qualification}</h1>  
                 */}
                  {/* <img src={option.profilePictureURL}  /> */}
                         
                        
                        <OwlCarousel className="owl-theme" {...options}>
                        {doctors?.map((option) => (
                        <>
                            {/* 1st */}
                            {/* id="testimonial-slider" className="owl-carousel" {...options}> */}
                            <div className="testimonial">
                                <div className="pic">
                                    <img src={option.profilePictureURL} alt="" className="img-responsive" />
                                </div>

                                <h3 className="testimonial-info">
                                {option.name}
                                <small>{option.qualification}</small>
                                    {/* <small>Urology</small>
                                    <small>6+ Experience</small> */}
                                </h3>
                                <p className="description">

                                    Consultation Charges are
                                    <p style={{ fontSize: "15px" }}>₹ {option.consultation_fee}</p>

                                </p>
                            </div>
                           
                              </>
                         ))}
                        </OwlCarousel>
                      
                    </div>
                </div>
            </div>
        </>

    );
};

export default DoctorDataCard;


