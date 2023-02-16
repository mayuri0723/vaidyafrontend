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

 export const createDashboardAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_APPOINTMNET_REQUEST:
            return {
                loading: true,
            }
        case DASHBOARD_APPOINTMNET_SUCCESS:
            return {
                loading: false,
                appointmentData: action.payload,
            }
        case DASHBOARD_APPOINTMNET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DASHBOARD_APPOINTMNET_RESET:
            return {}
        default:
            return state
    }
}

//get prescription
export const getPatientAppointmentDetailsReducer = (state = { appointmentsData: [] }, action) => {
    switch (action.type) {
        case DASHBOARD_GETAPPOINTMNET_REQUEST:
            return {
                loadingapp: true,
                appointmentsData: [],
            }
        case DASHBOARD_GETAPPOINTMNET_SUCCESS:
            return {
                loadingapp: false,
                appointmentsData: action.payload,
            }
        case DASHBOARD_GETAPPOINTMNET_FAIL:
            return {
                loadingapp: false,
                errorapp: action.payload,
            }
        case DASHBOARD_GETAPPOINTMNET_SUCCESS:
            return {
                loadingapp: false,
                appointmentsData: action.payload,
            }
        case DASHBOARD_GETAPPOINTMNET_FAIL:
            return {
                loadingapp: false,
                errorapp: action.payload,
            }
        default:
            return state
    }
}