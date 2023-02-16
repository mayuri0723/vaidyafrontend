import {
    THERAPY_ADD_REQUEST,
    THERAPY_ADD_SUCCESS,
    THERAPY_ADD_FAIL,
    THERAPY_ADD_RESET
}
 from '../constants/therapyConstants'

 export const createTherapyReducer = (state = {}, action) => {
    switch (action.type) {
        case THERAPY_ADD_REQUEST:
            return {
                loading: true,
            }
        case THERAPY_ADD_SUCCESS:
            return {
                loading: false,
                therapyData: action.payload,
            }
        case THERAPY_ADD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case THERAPY_ADD_RESET:
            return {}
        default:
            return state
    }
}

