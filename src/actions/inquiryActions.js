import {
    INQUIRY_ADD_REQUEST,
    INQUIRY_ADD_SUCCESS,
    INQUIRY_ADD_FAIL,
}
 from '../constants/inquiryConstants'
import axios from 'axios'

export const createInquiry = (  
    inquiryName,
    inquirycontact,
    inquiryemail,
    inquirySubject,
    inquiryreference) => async (dispatch) => {

    try {
        dispatch({
            type: INQUIRY_ADD_REQUEST,
        })
       
        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.post(
            'http://192.168.1.20:8000/api/inquiry/',
            { inquiryName,
                inquirycontact,
                inquiryemail,
                inquirySubject,
                inquiryreference},
            config
        )

        // Dispatch user register success after making the request
        dispatch({
            type: INQUIRY_ADD_SUCCESS,
            payload: data,
        })
        alert('Inquiry Data Successfully!');
        // Login in the user as well after registering
        dispatch({
            type: INQUIRY_ADD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INQUIRY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}