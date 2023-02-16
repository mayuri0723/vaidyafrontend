import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {
    productListReducer,
    productDetailsReducer,
    doctorListReducer,
    createDoctorReducer,
    updateDoctorReducer,
    updateAppointmentReducer,
    cancelAppointmentDateReducer,
    createDoctorDataReducer
  
} from './reducers/productReducers'
import {  consultationListReducer,
    createAppointmentReducer,
    updateConsultationReducer,
    consultantDetailsReducer,updateConsultationLinkReducer,
    cancelAppointmentsReducer,
    updatePrescriptionReducer
} from './reducers/consultationReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userInfoDetailsReducer,
    userResetPasswordReducer,
    userInfoDescReducer,
    userUpdateStatusReducer
} from './reducers/userReducers'
import {
    createOrderReducer,
    orderDetailsReducer,
    orderListUserReducer,
    orderPayReducer,
    updateOrderReducer,
    allOrdersReducer
} from './reducers/orderReducers'

import{
    createTherapyReducer
} from './reducers/therapyReducers'

import {medicinesListReducer,dietChartDetailReducer,prescriptionDetailReducer,
    getPrescriptionDataReducer,getDietChartDataReducer,getPrescriptionDetailsReducer,
    getPatientPrescriptionDetailReducer} from './reducers/prescriptionReducer'
import {createInquiryReducer} from './reducers/inquiryReducers'


import {createDashboardAppointmentReducer,getPatientAppointmentDetailsReducer} from './reducers/dashboardReducers'

const reducer = combineReducers({
    productList: productListReducer,
    doctorList: doctorListReducer,
    updateDoctor:updateDoctorReducer,
    consultationList:consultationListReducer,
    updateConsultation:updateConsultationReducer,
    consultationLink:updateConsultationLinkReducer,
    consultantDetails: consultantDetailsReducer,
    cancelAppointments:cancelAppointmentsReducer,
    updatePrescriptionData:updatePrescriptionReducer,
    productDetails: productDetailsReducer,
    createDoctor: createDoctorReducer,
    createDoctorData:createDoctorDataReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userInfoDetails:userInfoDetailsReducer,
    userResetPassword:userResetPasswordReducer,
    createOrder: createOrderReducer,
    createAppointment: createAppointmentReducer,
    updateAppointments:updateAppointmentReducer,
    cancelAppointmentDates:cancelAppointmentDateReducer,
    updateOrder:updateOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListUser: orderListUserReducer,
    allOrders: allOrdersReducer,
    createTherapy:createTherapyReducer,
    createInquiry:createInquiryReducer,
    getLatestUSer:userInfoDescReducer,
    getallMedicineList:medicinesListReducer,
    addPatientDietChart:dietChartDetailReducer,
    addPatientPrescription:prescriptionDetailReducer,
    getPrescriptionDetails:getPrescriptionDataReducer,
    getDietData:getDietChartDataReducer,
    getPrescripionList:getPrescriptionDetailsReducer,
    getPatientPrescriptionList:getPatientPrescriptionDetailReducer,
    patientAppointment:createDashboardAppointmentReducer,
    getAppointmentPatients:getPatientAppointmentDetailsReducer,
    updateUserStatus:userUpdateStatusReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

// Load initial state when the application is loaded
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
