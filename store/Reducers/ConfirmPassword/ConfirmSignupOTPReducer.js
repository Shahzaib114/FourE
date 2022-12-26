import { postSignupOTP, postSignupOTPFailure, postSignupOTPReset, postSignupOTPSuccess } from "../../Actions/ConfirmSignupOTP/actionTypes"

const ConfirmPassState = {
    runLoader: false,
    data: null,
    error: null,
}

const ConfirmSignupOTPReducer = (state = ConfirmPassState, action) => {
    switch (action.type) {
        case postSignupOTP:
            return {
                ...state,
                runLoader: action.payload.confirmSignupOTP
            }
        case postSignupOTPSuccess:
            return {
                ...state,
                runLoader: action.payload.confirmSignupOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        case postSignupOTPFailure:
            return {
                ...state,
                runLoader: action.payload.confirmSignupOTP,
                data: action.payload.data,
                error: action.payload.error
            }    
        case postSignupOTPReset:
            return {
                ...ConfirmPassState,
            }
        default:
            return state;
    }
}

export default ConfirmSignupOTPReducer;