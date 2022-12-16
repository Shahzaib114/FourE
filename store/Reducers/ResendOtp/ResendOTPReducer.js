import { postResendRequest, postResendRequestFailure, postResendRequestSuccess } from "../../Actions/ResendOtp/actionTypes"

const ResendOTPState = {
    runLoader: false,
    data: null,
    error: null
}

const ResendOTPReducer = (state = ResendOTPState, action) => {
    switch (action.type) {
        case postResendRequest:
            return {
                ...state,
                runLoader: action.payload.resendOtp
            }
        case postResendRequestSuccess:
            return {
                ...state,
                runLoader: action.payload.resendOtp,
                data: action.payload.data,
                error: action.payload.error
            }
        case postResendRequestFailure:
            return {
                ...state,
                runLoader: action.payload.resendOtp,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default ResendOTPReducer;