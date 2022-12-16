import { veriftyCustomerForgotOtp, veriftyCustomerForgotOtpFailure, veriftyCustomerForgotOtpSuccess } from "../../Actions/CustomerForgotOTP/actionTypes"

const CustomerForgotPassOTPState = {
    runLoader: false,
    data: null,
    error: null
}

const CustomerForgotOTPReducer = (state = CustomerForgotPassOTPState, action) => {
    switch (action.type) {
        case veriftyCustomerForgotOtp:
            return {
                ...state,
                runLoader: action.payload.forgotCustomerOTP
            }
        case veriftyCustomerForgotOtpSuccess:
            return {
                ...state,
                runLoader: action.payload.forgotCustomerOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        case veriftyCustomerForgotOtpFailure:
            return {
                ...state,
                runLoader: action.payload.forgotCustomerOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerForgotOTPReducer;