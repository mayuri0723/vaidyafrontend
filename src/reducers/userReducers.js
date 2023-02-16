import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_INFO_DETAILS_REQUEST,
    USER_INFO_DETAILS_SUCCESS,
    USER_INFO_DETAILS_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,
    USER_LATEST_REQUEST,
    USER_LATEST_SUCCESS,
    USER_LATEST_FAIL,
    USER_LATEST_RESET,
    USER_STATUS_REQUEST,
    USER_STATUS_SUCCESS,
    USER_STATUS_FAIL,
    USER_STATUS_RESET

} from '../constants/userConstants'

// Getting a user from server
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_DETAILS_RESET:
            return {
                user: {},
            }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

//to get all users
export const userInfoDetailsReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_INFO_DETAILS_REQUEST:
            return {
                loadingUsers: true,
                users: [],
            }
        case USER_INFO_DETAILS_SUCCESS:
            return {
                loadingUsers: false,
                users: action.payload,
            }
        case USER_INFO_DETAILS_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        case USER_INFO_DETAILS_SUCCESS:
            return {
                loadingUsers: false,
                users: action.payload,
            }
        case USER_INFO_DETAILS_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        default:
            return state
    }
}

//reset password
export const userResetPasswordReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return {
                loadingUsers: true,
                users: [],
            }
        case USER_UPDATE_PASSWORD_SUCCESS:
            return {
                loadingUsers: false,
                users: action.payload,
            }
        case USER_UPDATE_PASSWORD_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        case USER_UPDATE_PASSWORD_SUCCESS:
            return {
                loadingUsers: false,
                userspassword: action.payload,
            }
        case USER_UPDATE_PASSWORD_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        default:
            return state
    }
}

//to get all users
export const userInfoDescReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LATEST_REQUEST:
            return {
                loadingUsers: true,
                userdesc: [],
            }
        case USER_LATEST_SUCCESS:
            return {
                loadingUsers: false,
                userdesc: action.payload,
            }
        case USER_LATEST_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        case USER_LATEST_SUCCESS:
            return {
                loadingUsers: false,
                userdesc: action.payload,
            }
        case USER_LATEST_FAIL:
            return {
                loadingUsers: false,
                errorUsers: action.payload,
            }
        default:
            return state
    }
}

export const userUpdateStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_STATUS_REQUEST:
            return {
                loading: true,
            }
        case USER_STATUS_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
