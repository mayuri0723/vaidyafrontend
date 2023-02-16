import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
// import Loader from './components/Loader'
// import LoadingSpinner from './components/LoadingSpinner'

// Screens
import HomeScreen from './screens/Home'
import ProductScreen from './screens/Product'
import CartScreen from './screens/Cart'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import ProfileScreen from './screens/Profile'
import ShippingScreen from './screens/Shipping'
import PaymentScreen from './screens/Payment'
import PlaceOrderScreen from './screens/PlaceOrder'
import OrderScreen from './screens/Order'
import Zoom from './screens/Zoom'
import Reset from './screens/Reset'
import NewPassword from './screens/NewPassword'
import PrescriptionTemplate from './screens/PrescriptionTemplate'

// History
import history from './utils/history'
import PlanScreen from './screens/Plan'
import Consultation from './screens/Consultation'
import LabTest from './screens/LabTest'
import RefundPolicy from './screens/RefundPolicy'
import PrivacyPolicy from './screens/PrivacyPolicy'
import TermsAndConditions from './screens/TermsAndConditions'
import ContactUs from './screens/ContactUs'
import ReviewOrder from './screens/ReviewOrder'
import Prescription from './screens/Prescription'
import Transaction from './screens/Transaction'
import Role from './screens/Role'
import Appointment from './screens/Appointment'
import DemoRegistration from './screens/DemoRegistration'
import Therapy from './screens/Therapy'
import Inquiry from './screens/Inquiry'
import TabComponent from './components/TabComponent'
import MasterTab from './components/MasterTab'
import Banner from './components/Banner'
import CarouselBanner from './components/CarouselBanner'
import Breadcrumb from './components/Breadcrumb'
import About from './screens/Abouts'
import MedicineCards from './components/MedicineCards'
import SearchSymptom from './screens/SearchSymptom'
import OldMasterTab from './components/OldMasterTab'
import Inventory from './components/Inventory'
import OldPrescriptions from './components/OldPrescriptions'
import Dashboard from './screens/Dashboard'
import Analytics from './screens/Analytics'
import Setting from './screens/Setting'
import VisitingCards from './screens/VisitingCards'
import MainPage from './screens/MainPage'
import PrescriptionData from './screens/PrescriptionData'


const App = () => {

    return (
        <Router history={history}>
            <Header />

            <main className='py-3'>
            <Route path='/' component={MainPage} exact />
                <Route path='/home' component={HomeScreen}  />
                <Route path='/demoReg' component={DemoRegistration} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/therapy' component={Therapy} />
                <Route path='/inquiry' component={Inquiry} />
                <Route path='/breadcrumb' component={Breadcrumb} />
                <Route path='/about' component={About} />
                <Route path='/contact-us' component={ContactUs} />
                <Route path='/dashboard' component={Dashboard} />
                {/* <Route path='/mainpage'  component={MainPage} /> */}
                <Container>
                    <Route path='/tab' component={TabComponent} />
                    <Route path='/mastertab' component={MasterTab} />
                    <Route path='/old-mastertab' component={OldMasterTab} />
                    <Route path='/inventory' component={Inventory} />
                    <Route path='/analytics' component={Analytics} />
                    {/* <Route path='/oldprescription' component={OldPrescriptions} />
                <Route path='/oldpatient' component={OldPatientTab} /> */}
                    <Route path='/oldprescription' component={OldPrescriptions} />
                 
                    <Route path='/terms-condition' component={TermsAndConditions} />
                    <Route path='/privacy-policy' component={PrivacyPolicy} />
                    <Route path='/refund-policy' component={RefundPolicy} />
                    <Route path='/lab-test' component={LabTest} />
                    <Route path='/consultation' component={Consultation} />
                    <Route path='/review-order' component={ReviewOrder} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/place-order' component={PlaceOrderScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/plan/:id' component={PlanScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/prescription/:id' component={Prescription} />
                    <Route exact path='/reset' component={Reset} />
                    <Route path='/reset/:token' component={NewPassword} />
                    <Route path='/zoom' component={Zoom} />
                    <Route path='/transaction' component={Transaction} />
                    <Route path='/prescribetemplate' component={PrescriptionTemplate} />
                    <Route path='/Role' component={Role} />
                    <Route path='/appointmentlist' component={Appointment} />
                    <Route path='/banner' component={Banner} />
                    <Route path='/carosel' component={CarouselBanner} />
                    <Route path='/medicinecards' component={MedicineCards} />
                    <Route path='/seach' component={SearchSymptom} />
                    <Route path='/settings' component={Setting} />
                    <Route path='/visitingcard' component={VisitingCards} />
                    <Route path='/receptionist' component={PrescriptionData} />
                </Container>
            </main>
            <Footer />
        </Router>

    )
}

export default App
