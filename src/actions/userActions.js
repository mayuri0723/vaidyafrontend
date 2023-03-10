import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_INFO_DETAILS_REQUEST,
    USER_INFO_DETAILS_SUCCESS,
    USER_INFO_DETAILS_FAIL,
    USER_LATEST_REQUEST,
    USER_LATEST_SUCCESS,
    USER_LATEST_FAIL,
    USER_STATUS_REQUEST,
    USER_STATUS_SUCCESS,
    USER_STATUS_FAIL,


} from '../constants/userConstants'
import { ORDER_LIST_USER_RESET } from '../constants/orderConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.post(
            'http://192.168.1.20:8000/api/users/login',
            { email, password }, config)

        // Dispatch user login success after making the request
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        // Set user data to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({
        type: USER_LOGOUT,
    })

    dispatch({
        type: USER_DETAILS_RESET,
    })

    dispatch({
        type: ORDER_LIST_USER_RESET,
    })
}

export const register = (name, email, phone, password, address, age, gender, weight, reference, date, isAdmin, profilePictureURL) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
        // console.log(isAdmin)
        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.post(
            'http://192.168.1.20:8000/api/users',
            { name, email, phone, password, address, age, gender, weight, reference, date, isAdmin, profilePictureURL },
            config
        )

        // Dispatch user register success after making the request
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
        // alert('Register Successfully!');
        // Login in the user as well after registering
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // })

        // Set user data to local storage
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        // Get user login and user info
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
        const { data } = await axios.get(`http://192.168.1.20:8000/api/users/${id}`, config)

        // Dispatch user register success after making the request
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        // Get user login and user info
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
        const { data } = await axios.put(`http://192.168.1.20:8000/api/users/profile`, user, config)

        // Dispatch user register success after making the request
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        // console.log("get users",data)
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//userinfo action api

export const getUserInfoDetails = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_INFO_DETAILS_REQUEST,
        })
        const { data } = await axios.get('http://192.168.1.20:8000/api/users/userInfo')

        dispatch({
            type: USER_INFO_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_INFO_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

//GET USER DETAILS IN DESCENDING ORDER
export const getUserDesc = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LATEST_REQUEST,
        })
        const { data } = await axios.get('http://192.168.1.20:8000/api/users/latest-patient')

        dispatch({
            type: USER_LATEST_SUCCESS,
            payload: data,
        })
        // console.log("get latest user")
    } catch (error) {
        dispatch({
            type: USER_LATEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
        // console.log("get latest user Failed")
    }

}

export const updateUserStaff = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_STATUS_REQUEST,
        })

        // Get user login and user info
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
        const { data } = await axios.put(`http://192.168.1.20:8000/api/users/${id}/updateStatus`, user, config)

        // Dispatch user register success after making the request
        dispatch({
            type: USER_STATUS_SUCCESS,
            payload: data,
        })
        // console.log("user is")
    } catch (error) {
        dispatch({
            type: USER_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
