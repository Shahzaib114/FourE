import { postForgotOtp, postForgotOtpSuccess, postForgotOtpFailure } from "../../Actions/ForgotOtp/actionTypes"

const ForgotPassOTPState = {
    runLoader: false,
    data: null,
    error: null
}

const ForgotPasswordOTPReducer = (state = ForgotPassOTPState, action) => {
    switch (action.type) {
        case postForgotOtp:
            return {
                ...state,
                runLoader: action.payload.forgotOTP
            }
        case postForgotOtpSuccess:
            return {
                ...state,
                runLoader: action.payload.forgotOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        case postForgotOtpFailure:
            return {
                ...state,
                runLoader: action.payload.forgotOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default ForgotPasswordOTPReducer;