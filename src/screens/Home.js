import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card } from 'react-bootstrap'
// Redux
import AyurvedInfo from '../components/AyurvedInfo'
import Banner from '../components/Banner'
import CarouselBanner from '../components/CarouselBanner'
import SuccessStories from '../components/SuccessStories'
import MedicineCards from '../components/MedicineCards'

const Home = () => {
  const baseUrl = process.env.REACT_APP_API__BASE_URL;

  // Whatever is put inside the useEffect function will run as soon as the component loads.



  return (
    <>

      
        {/* <img className='center'
          src={"images/vaidyalogo3.png"} width="546px"
          height=" 425px" /> */}
        <div style={{ marginTop: "2rem" }}>
          <Banner />
          </div>
          <div >
          <MedicineCards />
          </div>
          <Container>
          <div>
          <AyurvedInfo />
          </div>
          <div>
            <SuccessStories />
          </div>
          </Container>

    
    </>
  )
}


export default Home
