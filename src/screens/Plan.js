import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap Components
import { Row, Col, Image, Carousel, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Accordion } from "react-bootstrap";
// Components
import Rating from '../components/Rating'
// Redux Actions
import { listProductDetails } from '../actions/productActions'
import { listUserOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import moment from 'moment';
// import dayjs from 'dayjs'

const PlanScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [planNumber, setPlanNumber] = useState(0);
    const baseUrl = `${process.env.REACT_APP_SERVER__BASE_URL}videos/video`;
    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    // Get user token from Redux store
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const isSubscriber = userInfo?.isSubscriber;
    const isSubscriberUser = isSubscriber ? isSubscriber : false;

    // Get user orders from Redux store
    const orderListUser = useSelector((state) => state.orderListUser)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListUser

    let planActivationDate;
    let planExpiryDate;
    let planValidity;
    let planStatus;

    if (orders) {
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i].orderItems.forEach((order) => {
                if (order.product === match.params.id) {
                    planActivationDate = order.activationDate
                    planExpiryDate = order.expiryDate
                    planValidity = order.validity
                    planStatus = order.planStatus
                }
            })
        }
    }

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
        dispatch(listUserOrders())
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
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
                            {isSubscriberUser && product.countInStock > 0 ?
                                <Carousel>
                                    {product?.videos.map((item) =>
                                        <Carousel.Item>
                                            <div>
                                                <video controls muted autoPlay crossOrigin="anonymous" controlsList="nodownload" >
                                                    <source src={item.vid} type="video/mp4" style={{ height: "100px" }} />
                                                </video>
                                            </div>
                                            <Carousel.Caption >
                                                <h3>{item.name.substr(0, 7)}</h3>
                                                <p>{item.name} </p>
                                            </Carousel.Caption >
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                                :
                                <Carousel>
                                    <Carousel.Item>
                                        <Image
                                            src={product.image}
                                            alt={product.image}
                                            fluid
                                        ></Image>
                                    </Carousel.Item>
                                </Carousel>

                            }
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
                                    Plan Name: <p className="display-linebreak">{product?.brand}</p>
                                </ListGroup.Item>
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
                                    {loadingOrders ? (
                                        <Loader />
                                    ) : errorOrders ? (
                                        <Message variant='danger'>{errorOrders}</Message>
                                    ) : (
                                        <>
                                            {product.countInStock > 0 ?
                                                <>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Plan Activation:</Col>
                                                            <Col>{planActivationDate}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Plan Expiry</Col>

                                                            <Col>{planExpiryDate}</Col>

                                                        </Row>
                                                    </ListGroup.Item>
                                                </> : ""}
                                        </>

                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Validity:</Col>
                                            <Col>
                                                {planValidity}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {planStatus}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                    {
                                        isSubscriberUser && product.validity > 0 ?
                                            <ListGroup.Item>
                                                Subscription Active
                                            </ListGroup.Item> :

                                            <ListGroup.Item>
                                                {planStatus ?
                                                    <>
                                                        {
                                                            planStatus !== 'Expired' ?
                                                                <Button
                                                                    disabled={true}
                                                                    className='btn-block'
                                                                    type='button'
                                                                    onClick={addToCartHandler}
                                                                >
                                                                    Renew
                                                                </Button> :
                                                                <Button
                                                                    className='btn-block'
                                                                    type='button'
                                                                    onClick={addToCartHandler}
                                                                >
                                                                    Renew
                                                                </Button>
                                                        }
                                                    </>
                                                    :
                                                    <Button
                                                        className='btn-block'
                                                        type='button'
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                }
                                            </ListGroup.Item>
                                    }

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <h6>Description</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <p className="display-linebreak">{product?.description}</p>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <h6>Highlights</h6>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <p className="display-linebreak">{product.highlights}</p></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </>
            )
            }
        </>
    )
}

export default PlanScreen