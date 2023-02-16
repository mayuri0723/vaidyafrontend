import {

    CONSULTANTS_LIST_SUCCESS,
    CONSULTANTS_LIST_FAIL,
    CONSULTANTS_LIST_REQUEST,
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


export const createAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_CREATE_REQUEST:
            return {
                loading: true,
            }
        case APPOINTMENT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                appointment: action.payload,
            }
        case APPOINTMENT_CREATE_FAIL:
            return {
                loading: false,
                errorAppointment: action.payload,
            }
        case APPOINTMENT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const consultationListReducer = (state = { consultants: [] }, action) => {
    switch (action.type) {
        case CONSULTANTS_LIST_REQUEST:
            return {
                loadingConsultant: true,
                consultants: [],
            }
        case CONSULTANTS_LIST_SUCCESS:
            return {
                loadingConsultant: false,
                consultants: action.payload,
            }
        case CONSULTANTS_LIST_FAIL:
            return {
                loadingConsultant: false,
                errorConsultant: action.payload,
            }
        case CONSULTANTS_LIST_SUCCESS:
            return {
                loadingConsultant: false,
                consultants: action.payload,
            }
        case CONSULTANTS_LIST_FAIL:
            return {
                loadingConsultant: false,
                errorConsultant: action.payload,
            }
        default:
            return state
    }
}

export const updateConsultationReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULTANTS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONSULTANTS_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                consultant: action.payload,
            }
        case CONSULTANTS_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CONSULTANTS_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const consultantDetailsReducer = (
    state = {}, action
) => {
    switch (action.type) {
        case CONSULTANTS_DETAILS_REQUEST:
            return {
                ...state,
                loadingConsultants: true,
            }
        case CONSULTANTS_DETAILS_SUCCESS:
            return {
                loadingConsultants: false,
                consultant: action.payload,
            }
        case CONSULTANTS_DETAILS_FAIL:
            return {
                loadingConsultants: false,
                errorConsultants: action.payload,
            }

        default:
            return state
    }
}


export const updateConsultationLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULTANTS_LINK_REQUEST:
            return {
                ...state,
                loadingLink: true,
            }
        case CONSULTANTS_LINK_SUCCESS:
            return {
                loadingLink: false,
                success: true,
                link: action.payload,
            }
        case CONSULTANTS_LINK_FAIL:
            return {
                loadingLink: false,
                errorLink: action.payload,
            }
        case CONSULTANTS_LINK_RESET:
            return {}
        default:
            return state
    }
}

export const cancelAppointmentsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULTANTS_DELETE_REQUEST:
            return {
                ...state,
                loadingApp: true,
            }
        case CONSULTANTS_DELETE_SUCCESS:
            return {
                loadingApp: false,
                success: true,
                appointments: action.payload,
            }
        case CONSULTANTS_DELETE_FAIL:
            return {
                loadingApp: false,
                errorApp: action.payload,
            }
        case CONSULTANTS_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const updatePrescriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSULTANTS_PRESCRIPTION_REQUEST:
            return {
                ...state,
                loadingPrescription: true,
            }
        case CONSULTANTS_PRESCRIPTION_SUCCESS:
            return {
                loadingPrescription: false,
                success: true,
                prescription: action.payload,
            }
        case CONSULTANTS_PRESCRIPTION_FAIL:
            return {
                loadingPrescription: false,
                errorPrescription: action.payload,
            }
        case CONSULTANTS_PRESCRIPTION_RESET:
            return {}
        default:
            return state
    }
}