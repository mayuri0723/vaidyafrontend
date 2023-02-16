import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
    ORDER_LIST_USER_REQUEST,
    ORDER_LIST_USER_SUCCESS,
    ORDER_LIST_USER_FAIL,
    ORDER_LIST_USER_RESET,
    ORDER_CREATE_RESET,
    ORDER_UPDATE_RESET,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_REQUEST,
    ORDER_ALL_REQUEST,
    ORDER_ALL_SUCCESS,
    ORDER_ALL_FAIL,
    ORDER_ALL_RESET

} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderListUserReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_LIST_USER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case ORDER_LIST_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_LIST_USER_RESET:
            return {
                orders: [],
            }
        default:
            return state
    }
}
export const allOrdersReducer = (state = { allorder: [] }, action) => {
    switch (action.type) {
        case ORDER_ALL_REQUEST:
            return {
                ...state,
                loadingOrder: true,
            }
        case ORDER_ALL_SUCCESS:
            return {
                loadingOrder: false,
                allorder: action.payload,
            }
        case ORDER_ALL_FAIL:
            return {
                loadingOrder: false,
                errorOrder: action.payload,
            }
        case ORDER_ALL_RESET:
            return {
                allorder: [],
            }
        default:
            return state
    }
}

export const updateOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case ORDER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

//all users order
