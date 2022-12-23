import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import AcceptorRejectCustomerReducer from './Reducers/AcceptorRejectCustomer/AcceptorRejectCustomerReducer'
import CancelCurrentRideReducer from './Reducers/CancelCurrentRide/CancelCurrentRideReducer'
import CancelRideReasonReducer from './Reducers/CancelRideReason/CancelRideReasonReducer'
import ConfirmSignupOTPReducer from './Reducers/ConfirmPassword/ConfirmSignupOTPReducer'
import CustomerBookingConfirmationReducer from './Reducers/CustomerBookingConfirmation/CustomerBookingConfirmationReducer'
import CustomerFeedbackReducer from './Reducers/CustomerFeedbacktoDriver/CustomerBookingConfirmationReducer'
import CustomerForgotOTPReducer from './Reducers/CustomerForgotOTPRequest/CustomerForgotOTPReducer'
import CustomerForgotPassReducer from './Reducers/CustomerForgotPass/ForgotPassReducer'
import CustomerFutureRidesReducer from './Reducers/CustomerFutureRide/CustomerFutureRidesReducer'
import CustomerLoginReducer from './Reducers/CustomerLogin/CustomerLoginReducer'
import NotificationDataReducer from './Reducers/CustomerNotifications/NotificationData'
import CustomerProfileReducer from './Reducers/CustomerProfileData/CustomerProfile'
import CustomerProfileUpdateReducer from './Reducers/CustomerProfileUpdate/CustomerProfileUpdateReducer'
import CustomerSchedRideDetailsReducer from './Reducers/CustomerSchedRideDetails/CustomerSchedRideDetailsReducer'
import CustomerSignUpReducer from './Reducers/CustomerSignup/CustomerSignUpReducer'
import DriverLiveLocationReducer from './Reducers/DiverLiveLocationUpdate/DiverLiveLocationReducer'
import DriverCompletedRideReducer from './Reducers/DriverCompletedRide/DriverCompletedRideReducer'
import UpdateDriverDataReducer from './Reducers/DriverDataUpdate/UpdateDriverDataReducer'
import UpdateDriverActivityReducer from './Reducers/DriverOnlineStatus/UpdateDriverActivityReducer'
// Reducers
import SignUpReducer from './Reducers/EmailSignup/SignUpReducer'
import ForgotPasswordReducer from './Reducers/ForgotPass/ForgotPassReducer'
import ForgotPasswordOTPReducer from './Reducers/ForgotPassOTP/ForgotPasswordOTP'
import customerTravellingFareReducer from './Reducers/GettingTravellingFare/customerTravellingFareReducer'
import CustomerServiceTypesReducer from './Reducers/gettingUserServiceTypes/ServiceTypes'
import getUserProfileReducer from './Reducers/getUserProfileData/getUserProfileReducer'
import loginReducer from './Reducers/Login/LoginReducer'
import PickandDropDetailsReducer from './Reducers/PickandDropDetails/PickandDropDetailsReducer'
import ResendCustomerSIgnupOTPReducer from './Reducers/ResendCustomerSIgnupOTP/ResendCustomerSIgnupOTPReducer'
import ResendOTPReducer from './Reducers/ResendOtp/ResendOTPReducer'
import ResetCustomerPassReducer from './Reducers/ResetCustomerPass/ResetCustomerPassReducer'
import ResetPassWordReducer from './Reducers/ResetPass/ResetPassReducer'
import DriverPickedRiderReducer from './Reducers/RidePickedUp/GettingRiderDetailsReducer'
import GettingRiderDetailsReducer from './Reducers/RiderDetails/GettingRiderDetailsReducer'
import ServiceTypesReducer from './Reducers/ServiceTypes/ServiceTypes'
import TransactionDetailsReducer from './Reducers/TransactionDetails/TransactionDetailsReducer'
import TransactionHistoryReducer from './Reducers/TransactionHistory/TransactionHistoryReducer'
import TravelHistotyReducer from './Reducers/TravelHistory/TravelHistotyReducer'
import TravelingHistoryDetailsReducer from './Reducers/TravelingHistoryDetails/TravelingHistoryDetailsReducer'
import CustomerSignupOTPReducer from './Reducers/ValidateCustomerSignupOTP/CustomerSignupOTPReducer'
import VehicleDetailsReducer from './Reducers/VehicleDetails/UploadVehicleDetails'

const appReducers = combineReducers ({
    
    login: loginReducer,
    emailSignup: SignUpReducer,
    serviceTypes: ServiceTypesReducer,
    vehicleDetals: VehicleDetailsReducer,
    confirmSignupOTP: ConfirmSignupOTPReducer,
    ForgotPass: ForgotPasswordReducer,
    ForgotPassOTP: ForgotPasswordOTPReducer,
    ResetPass: ResetPassWordReducer,
    ResendOTPRequest: ResendOTPReducer,
    pickDropDetails: PickandDropDetailsReducer,
    travelHistory: TravelHistotyReducer,
    travelHistoryDetails: TravelingHistoryDetailsReducer,
    acceptOrReject: AcceptorRejectCustomerReducer,
    driverProfile: getUserProfileReducer,
    driverProfileUpdate: UpdateDriverDataReducer,
    transactionHistory: TransactionHistoryReducer,
    transactionDetails: TransactionDetailsReducer,
    //Customer App Data Starting
    customerSignup: CustomerSignUpReducer,
    customerValidateOTP: CustomerSignupOTPReducer,
    customerResendSignupOTP: ResendCustomerSIgnupOTPReducer,
    customerLogin: CustomerLoginReducer,
    customerForgotPass: CustomerForgotPassReducer,
    VerifycustomerForgotOTP: CustomerForgotOTPReducer,
    customerResetPass: ResetCustomerPassReducer,
    customerServices: CustomerServiceTypesReducer,
    fromandToFare: customerTravellingFareReducer,
    confirmBooking: CustomerBookingConfirmationReducer,
    riderDetails: GettingRiderDetailsReducer,
    driverLocation: DriverLiveLocationReducer,
    rideStarted : DriverPickedRiderReducer,
    rideCompleted: DriverCompletedRideReducer,
    cancelRide: CancelCurrentRideReducer,
    cancelRideReason: CancelRideReasonReducer,
    customernotifications: NotificationDataReducer,
    addingFeedbacktoDriver: CustomerFeedbackReducer,
    profileData: CustomerProfileReducer,
    CustProfileUpdate: CustomerProfileUpdateReducer,
    driverStatus: UpdateDriverActivityReducer,
    customerScheduleRide: CustomerFutureRidesReducer,
    customerSchedRideDetails: CustomerSchedRideDetailsReducer,
})

const rootReducer = (state, action) => {
    return appReducers (state, action)
}

const middlewares = applyMiddleware(thunk)

const store = createStore(rootReducer, {}, middlewares)

export default store