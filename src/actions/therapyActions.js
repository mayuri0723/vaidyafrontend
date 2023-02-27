
import {
    THERAPY_ADD_REQUEST,
    THERAPY_ADD_SUCCESS,
    THERAPY_ADD_FAIL,
}
    from '../constants/therapyConstants'
import axios from 'axios'

export const createTherapy = (patientName,
    therapycontact,
    therapyemail,
    therapyName,
    therapyFees,
    patientReview,
    therapistName,
    therapyreference) => async (dispatch) => {
        try {
            
            dispatch({
                type: THERAPY_ADD_REQUEST,
            })

            // Header to send with the request
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            // Make request to server and get the response data
            const { data } = await axios.post(
                `http://192.168.1.20/api/therapy/`,
                {
                    patientName,
                    therapycontact,
                    therapyemail,
                    therapyName,
                    therapyFees,
                    patientReview,
                    therapistName,
                    therapyreference
                },
                config
            )

            // Dispatch user register success after making the request
            dispatch({
                type: THERAPY_ADD_SUCCESS,
                payload: data,
            })
            alert('Therapy Data Successfully!');
            // Login in the user as well after registering
            dispatch({
                type: THERAPY_ADD_SUCCESS,
                payload: data,
            })

        } catch (error) {
            dispatch({
                type: THERAPY_ADD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })

        }
    }