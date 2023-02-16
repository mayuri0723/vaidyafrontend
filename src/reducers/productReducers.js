import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    DOCTORS_LIST_FAIL,
    DOCTORS_LIST_SUCCESS,
    DOCTORS_LIST_REQUEST,
    DOCTORS_CREATE_SUCCESS,
    DOCTORS_CREATE_FAIL,
    DOCTORS_CREATE_RESET,
    DOCTORS_CREATE_REQUEST,
    DOCTORS_UPDATE_SUCCESS,
    DOCTORS_UPDATE_FAIL,
    DOCTORS_UPDATE_REQUEST,
    DOCTORS_APPOINTMENT_SUCCESS,
    DOCTORS_APPOINTMENT_FAIL,
    DOCTORS_APPOINTMENT_REQUEST,
    DOCTORS_DELETE_FAIL,
    DOCTORS_DELETE_REQUEST,
    DOCTORS_DELETE_RESET,
    DOCTORS_DATA_SUCCESS,
    DOCTORS_DATA_FAIL,
    DOCTORS_DATA_REQUEST,
    DOCTORS_DATA_RESET,
    DOCTORS_DELETE_SUCCESS,
 

} from '../constants/productConstants'

// Getting products from server
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const doctorListReducer = (state = { doctors: [] }, action) => {
    switch (action.type) {
        case DOCTORS_LIST_REQUEST:
            return {
                loading: true,
                doctors: [],
            }
        case DOCTORS_LIST_SUCCESS:
            return {
                loading: false,
                doctors: action.payload,
            }
        case DOCTORS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DOCTORS_LIST_SUCCESS:
            return {
                loading: false,
                doctors: action.payload,
            }
        case DOCTORS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

// Get products details
export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

//create doctor appointments
export const createDoctorReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTORS_CREATE_REQUEST:
            return {
                loading: true,
            }
        case DOCTORS_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case DOCTORS_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DOCTORS_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const updateDoctorReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTORS_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case DOCTORS_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                doctors: action.payload,
            }
        case DOCTORS_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DOCTORS_UPDATE_REQUEST:
            return {}
        default:
            return state
    }
}


export const updateAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTORS_APPOINTMENT_REQUEST:
            return {
                loadingAppointment: true,
            }
        case DOCTORS_APPOINTMENT_SUCCESS:
            return {
                loadingAppointment: false,
                success: true,
                appointmentSlot: action.payload,
            }
        case DOCTORS_APPOINTMENT_FAIL:
            return {
                loadingAppointment: false,
                errorAppointments: action.payload,
            }
        case DOCTORS_APPOINTMENT_REQUEST:
            return {}
        default:
            return state
    }
}

export const cancelAppointmentDateReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTORS_DELETE_REQUEST:
            return {
                ...state,
                loadingApp: true,
            }
        case DOCTORS_DELETE_SUCCESS:
            return {
                loadingApp: false,
                success: true,
                appointmentsCancel: action.payload,
            }
        case DOCTORS_DELETE_FAIL:
            return {
                loadingApp: false,
                errorApp: action.payload,
            }
        case DOCTORS_DELETE_RESET:
            return {}
        default:
            return state
    }
}


export const createDoctorDataReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTORS_DATA_REQUEST:
            return {
                loadingdoctordata: true,
            }
        case DOCTORS_DATA_SUCCESS:
            return {
                loadingdoctordata: false,
                success: true,
                doctordata: action.payload,
            }
        case DOCTORS_DATA_FAIL:
            return {
                loadingdoctordata: false,
                errordoctordata: action.payload,
            }
        case DOCTORS_DATA_RESET:
            return {}
        default:
            return state
    }
}
