import {

    CONSULTANTS_LIST_SUCCESS,
    CONSULTANTS_LIST_FAIL,
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_CREATE_FAIL,
    APPOINTMENT_CREATE_RESET,
    CONSULTANTS_UPDATE_REQUEST,
    CONSULTANTS_UPDATE_SUCCESS,
    CONSULTANTS_UPDATE_FAIL,
    CONSULTANTS_UPDATE_RESET,
    CONSULTANTS_DETAILS_REQUEST,
    CONSULTANTS_DETAILS_SUCCESS,
    CONSULTANTS_DETAILS_FAIL,
    CONSULTANTS_LINK_SUCCESS,
    CONSULTANTS_LINK_FAIL,
    CONSULTANTS_LINK_REQUEST,
    CONSULTANTS_LINK_RESET,
    CONSULTANTS_DELETE_SUCCESS,
    CONSULTANTS_DELETE_FAIL,
    CONSULTANTS_DELETE_REQUEST,
    CONSULTANTS_DELETE_RESET,
    CONSULTANTS_PRESCRIPTION_SUCCESS,
    CONSULTANTS_PRESCRIPTION_FAIL,
    CONSULTANTS_PRESCRIPTION_REQUEST,
    CONSULTANTS_PRESCRIPTION_RESET
} from '../constants/consultationConstants'
import axios from 'axios'


export const createAppointment = (appointment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: APPOINTMENT_CREATE_REQUEST,
        })

        // Get user login and user info
        const {
            userLogin: { userInfo },
        } = getState()

        // console.log("${userInfo.token}", userInfo);

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        // console.log("appointment", appointment)
        // Make request to server and get the response data
        const { data } = await axios.post(`/api/consultants/`, appointment, config)

        // Dispatch user order success after making the request
        dispatch({
            type: APPOINTMENT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: APPOINTMENT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listConsultants = () => async (dispatch) => {
    try {
        dispatch({
            type: CONSULTANTS_LIST_SUCCESS,
        })
        const { data } = await axios.get('/api/consultants/myconsultants')

        dispatch({
            type: CONSULTANTS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CONSULTANTS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//update api 
export const updateConsultation = (id, updatedConsultant) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: CONSULTANTS_UPDATE_REQUEST,
        })

        // Get user login to get the bearer token
        const {
            userLogin: { userInfo },
        } = getState()

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.put(
            `/api/consultants/${id}/updateconsultant`,
            updatedConsultant,
            config
        )
        // Dispatch user order pay success after making the request
        dispatch({
            type: CONSULTANTS_UPDATE_SUCCESS,
            payload: data,
        })
        alert("Prescription uploaded Successfully");
        // console.log("Presceription source", data);
    } catch (error) {
        // console.log("Prescription Update err", error)
        dispatch({
            type: CONSULTANTS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}


export const getConsultantDetails = (id) => async (dispatch, getState) => {
    // console.log("id", id)
    try {
        dispatch({
            type: CONSULTANTS_DETAILS_REQUEST,
        })

        // Get user login to get the bearertoken
        const {
            userLogin: { userInfo },
        } = getState()

        // Header to send with the request
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.get(`/api/consultants/${id}`, config)

        // Dispatch user order success after making the request
        dispatch({
            // type:CONSULTANTS_LIST_SUCCESS,
            type: CONSULTANTS_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONSULTANTS_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}


export const consultationLink = (id, consultationLink) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: CONSULTANTS_LINK_REQUEST,
        })

        // Get user login to get the bearer token
        const {
            userLogin: { userInfo },
        } = getState()

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
const dataLink ={
    consultationLink
}
        // Make request to server and get the response data
        const { data } = await axios.put(
            `/api/consultants/${id}/link`,
            dataLink,
            config
        )
        // Dispatch  success after making the request
        dispatch({
            type: CONSULTANTS_LINK_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONSULTANTS_LINK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}


export const cancelAppointments = (id) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: CONSULTANTS_DELETE_REQUEST,
        })

        // Get user login to get the bearer token
        const {
            userLogin: { userInfo },
        } = getState()

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.delete(
            `/api/consultants/${id}/delete`,
            config
        )
        // Dispatch  success after making the request
        dispatch({
            type: CONSULTANTS_DELETE_SUCCESS,
            payload: data,
        })
        alert("Appointment is Cancelled Successfully!")
    } catch (error) {
        dispatch({
            type: CONSULTANTS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}


export const updatePrescriptionData = (id, updatePrescription) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: CONSULTANTS_PRESCRIPTION_REQUEST,
        })

        // Get user login to get the bearer token
        const {
            userLogin: { userInfo },
        } = getState()

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.put(
            `/api/consultants/${id}/prescription`,
            updatePrescription,
            config
        )
        // Dispatch user order pay success after making the request
        dispatch({
            type: CONSULTANTS_PRESCRIPTION_SUCCESS,
            payload: data,
        })
        alert("Prescription uploaded Successfully");
        // console.log("Presceription source", data);
    } catch (error) {
        // console.log("Prescription Update err", error)
        dispatch({
            type: CONSULTANTS_PRESCRIPTION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}
