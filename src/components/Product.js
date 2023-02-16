import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import "../product.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}




const Product = ({ mindevinProduct }) => {
  return (
    <>
      <Carousel
        howDots={true}
        responsive={responsive}
        infinite={true}
        swipeable={false}
        autoPlay
        autoPlaySpeed={5000}
      >
        {mindevinProduct.map((product) => {
          return (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inners">
                <div className="carousel-item active">
                  <div className="cards-wrappers">
                    <Card className='my-3 p-3 rounded card'>
                      <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image} variant='top' />
                      </Link>

                      <Card.Body>
                        <Link to={`/product/${product._id}`}>
                          <Card.Title as='div'>
                            <strong>{product.name}</strong>
                          </Card.Title>
                        </Link>
                        <Card.Text as='div'>
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                          />
                        </Card.Text>
                        <Card.Text as='h3'>₹{product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              
              </div>
            </div>
          )
        })}
      </Carousel>


    </>

  )
}

export default Product
