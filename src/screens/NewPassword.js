import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
// Bootstrap Components
import { Form, Button,Component } from 'react-bootstrap'
import '../bootstrap.min.css'
import Toast from 'react-bootstrap/Toast';
import M from 'materialize-css'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// UI Components
import Message from '../components/Message'
import Loader from '../components/Loader'

//css
import "../login.css"

const NewPassword = ({ location, history }) => {
    // State to hold email and password
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [position, setPosition] = useState('top-center');
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const {token} = useParams()
    // console.log(token)
    // Get user login info from Redux state
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        // If there is user info then redirect
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const PostData = (e)=>{
        e.preventDefault()
        if (password !== confirmPassword) {
        
            // setMessage('Passwords do not match')
            alert("Password do no match")
        }
         else {
            // Dispatch Register
            fetch("https://vaidyabackend.vercel.app/api/users/new-password",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    token
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
               if(data.error){
                alert("Please Check your mail")
                  M.toast({html: data.error,classes:"#c62828 red darken-3"})
               }
               else{
                   M.toast({html:data.message,classes:"#43a047 green darken-1"})
                   history.push('/login')
               
               }
            }).catch(err=>{
                console.log(err)
            })
        }
       
    }
    // Handler that logs in the user
    
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src={"http://localhost:3000/images/undrawl.png"}
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Loader />}
                            <Form 
                            onSubmit={PostData}
                            >
                                <div className="form-outline mb-4">
                                    <input type="password"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        controlId='password'
                                        placeholder='New Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        controlId='confirmPassword'
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <Button type="submit" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }}
                                //  onClick={()=>PostData()}
                                 >
                                    Update Password
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewPassword


