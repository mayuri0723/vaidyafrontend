import {
    INQUIRY_ADD_REQUEST,
    INQUIRY_ADD_SUCCESS,
    INQUIRY_ADD_FAIL,
    INQUIRY_ADD_RESET
}
 from '../constants/inquiryConstants'

 export const createInquiryReducer = (state = {}, action) => {
    switch (action.type) {
        case INQUIRY_ADD_REQUEST:
            return {
                loading: true,
            }
        case INQUIRY_ADD_SUCCESS:
            return {
                loading: false,
                inquiryData: action.payload,
            }
        case INQUIRY_ADD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INQUIRY_ADD_RESET:
            return {}
        default:
            return state
    }
}
