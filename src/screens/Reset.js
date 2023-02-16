import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import M from 'materialize-css'



const Reset = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = (e) => {
        // console.log("hi postdata reset")
        e.preventDefault()
        console.log(email)
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch('http://localhost:8000/api/users/resetpassword', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
          
            body: JSON.stringify({
                email
                
            })
            
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // console.log("object")
                    alert("Please Check your mail")
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    alert('Please Check Your Mail')
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    // history.push('/login')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
      <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img 
                            // src={"images/undrawl.png"}
                            src={"http://localhost:3000/images/undrawl.png"}
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <Form onSubmit={PostData}>
                                <div className="form-outline mb-4">
                                    <input type="email"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        controlId='email'
                                        placeholder='email@example.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <Button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }}
                                 
                                 >
                                    Reset Password
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}


export default Reset