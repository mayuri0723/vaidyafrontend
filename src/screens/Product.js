import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap Components
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel } from 'react-bootstrap'
import { Accordion } from "react-bootstrap";
// Components
import Rating from '../components/Rating'
// Redux Actions
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    // const [postalCode, setPostalCode] = useState();

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails;
    const baseUrl = process.env.REACT_APP_API__BASE_URL;
    // console.log("product", product);
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    // Handler that logs in the user
    const submitHandler = (e) => {
        e.preventDefault()
        // console.log("postalCode", postalCode);
        // Check if passwords are the same
        // if (postalCode !== confirmPassword) {
        //     setMessage('Passwords do not match')
        // } else {
        //     // Dispatch update profile reducer
        //     dispatch(updateUserProfile({ id: user._id, name, email, phone, password }))
        // }
    }
   

    return (
        <>
            <Link className='btn btn-secondary my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <> 
                    <Row>
                        <Col md={6}>

                        <Carousel >

                                <Carousel.Item >
                                    <Image
                                        src={product.image}
                                        alt={product.image}
                                        fluid
                                    ></Image>
                                </Carousel.Item>

                                {product.name === "Pink Desire" ? <Carousel.Item>  
                                     <Image
                                    src={baseUrl + "images/Pink2.png"}
                                    alt="image2"
                                    fluid
                                >
                                </Image>
                                </Carousel.Item> :
                                    <Carousel.Item > 
                                        <Image
                                        src={baseUrl + "images/Rock2.png"}
                                        alt="image2"
                                        fluid
                                    ></Image> 
                                    </Carousel.Item>
                                }

                                <Carousel.Item>
                                    {product.name === "Pink Desire" ? <Image
                                        src={baseUrl + "images/Pink3.jpg"}

                                        alt="image2"
                                        fluid
                                    ></Image>
                                        :
                                        <Image
                                            src={baseUrl + "images/Rock3.jpg"}
                                            alt="image2"
                                            fluid
                                        ></Image>
                                    }
                                </Carousel.Item>

                                <Carousel.Item>
                                    {product.name === "Pink Desire" ? <Image
                                        src={baseUrl + "images/Pink3.jpg"}

                                        alt="image2"
                                        fluid
                                    ></Image>
                                        :
                                        <Image
                                            src={baseUrl + "images/Rock3.jpg"}
                                            alt="image2"
                                            fluid
                                        ></Image>
                                    }
                                </Carousel.Item>


                                {/* {product?.images[0] !== undefined && (
    product?.images.map((dara) => (
                        <Carousel.Item>
                        <Image
                             src={product.image}
                             alt={product.image}
                             fluid
                         ></Image>
                      </Carousel.Item>
                    ))
)} */}
                            </Carousel>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ₹{product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Offer Price: ₹ {product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    You will Save: ₹ {product.price}
                                </ListGroup.Item>
                                {/* <ListGroup.Item>
                                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='postalCode'>
                        <Form.Label>  <i className='fa fa-map-marker fa-lg'></i> Delivery Option</Form.Label>
                        <Form.Control
                            type='postalCode'
                            placeholder='Enter pincode here'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                
                    <Button type='submit' variant='primary'>
                        Check
                    </Button>
                </Form>
                                </ListGroup.Item> */}
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>₹{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(e.target.value)
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((p) => (
                                                            <option
                                                                key={p + 1}
                                                                value={p + 1}
                                                            >
                                                                {p + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            disabled={product.countInStock === 0}
                                            className='btn-block'
                                            type='button'
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Accordion>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <h6> Delivery Details:</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <p className="display-linebreak">You see the estimated delivery date before you place the order.</p>

                                            <p className="display-linebreak"> <strong>In Mumbai:</strong>
                                                Mindvein deliver orders placed in three or more days after they ship. </p>
                                            <p className="display-linebreak"><strong>PAN India:</strong>
                                                Mindvein deliver orders placed in eight or more days after they ship.</p></Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <h6> Discription & Direction</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <p className="display-linebreak">{product.description}</p>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="2">
                                        <h6>Ingredients</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <p className="display-linebreak">{product?.ingredients}</p>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        <h6>Highlights</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            <p className="display-linebreak">{product.highlights}</p></Card.Body>
                                    </Accordion.Collapse>
                                </Card>



                            </Accordion>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen