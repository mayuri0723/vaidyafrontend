

import {
    DASHBOARD_APPOINTMNET_FAIL,
    DASHBOARD_APPOINTMNET_RESET,
    DASHBOARD_APPOINTMNET_REQUEST,
    DASHBOARD_APPOINTMNET_SUCCESS,
    DASHBOARD_GETAPPOINTMNET_REQUEST,
    DASHBOARD_GETAPPOINTMNET_SUCCESS,
    DASHBOARD_GETAPPOINTMNET_FAIL,
    DASHBOARD_GETAPPOINTMNET_RESET
}
    from '../constants/dasboardConstants'
import axios from 'axios'

export const createDashboardAppointment = (
    appointmentDate,
    appointmentTime,
    patientName,
    patientContact,
) => async (dispatch) => {

    try {
        dispatch({
            type: DASHBOARD_APPOINTMNET_REQUEST,
        })


        // Make request to server and get the response data
        const { data } = await axios.post(
            'https://vaidyabackend.vercel.app/api/dashboard/appointment',
            {
                appointmentDate,
                appointmentTime,
                patientName,
                patientContact
            },

        )

        // Dispatch user register success after making the request
        dispatch({
            type: DASHBOARD_APPOINTMNET_SUCCESS,
            payload: data,
        })
        alert('Dasboard Data Successfully!');
        // Login in the user as well after registering
        dispatch({
            type: DASHBOARD_APPOINTMNET_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DASHBOARD_APPOINTMNET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


//getting appointment list
export const getPatientppointments = () => async (dispatch) => {

    try {
        dispatch({
            type: DASHBOARD_GETAPPOINTMNET_SUCCESS,
        })
        const { data } = await axios.get('https://vaidyabackend.vercel.app/api/dashboard/getappointment')

        dispatch({
            type: DASHBOARD_GETAPPOINTMNET_SUCCESS,
            payload: data,
        })
       
    } catch (error) {
        dispatch({
            type: DASHBOARD_GETAPPOINTMNET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}