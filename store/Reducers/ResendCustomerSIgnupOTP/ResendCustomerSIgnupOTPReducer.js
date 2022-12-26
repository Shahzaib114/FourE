import { postCustomerResendRequest, postCustomerResendRequestFailure, postCustomerResendRequestReset, postCustomerResendRequestSuccess } from "../../Actions/ResendCustomerSignupOTP/actionTypes"

const ResendOTPState = {
    runLoader: false,
    data: null,
    error: null
}

const ResendCustomerSIgnupOTPReducer = (state = ResendOTPState, action) => {
    switch (action.type) {
        case postCustomerResendRequest:
            return {
                ...state,
                runLoader: action.payload.resendOtp
            }
        case postCustomerResendRequestSuccess:
            return {
                ...state,
                runLoader: action.payload.resendOtp,
                data: action.payload.data,
                error: action.payload.error
            }
        case postCustomerResendRequestFailure:
            return {
                ...state,
                runLoader: action.payload.resendOtp,
                data: action.payload.data,
                error: action.payload.error
            }
        case postCustomerResendRequestReset:
            return {
                ...ResendOTPState,
            }
        default:
            return state
    }
}

export default ResendCustomerSIgnupOTPReducer;