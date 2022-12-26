import { postCustomerSignupOTP, postCustomerSignupOTPFailure, postCustomerSignupOTPReset, postCustomerSignupOTPSuccess } from "../../Actions/ValidateCustomerSignupOTP/actionTypes"

const ConfirmCustomerPassState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerSignupOTPReducer = (state = ConfirmCustomerPassState, action) => {
    switch (action.type) {
        case postCustomerSignupOTP:
            return {
                ...state,
                runLoader: action.payload.confirmCustomerSignupOTP
            }
        case postCustomerSignupOTPSuccess:
            return {
                ...state,
                runLoader: action.payload.confirmCustomerSignupOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        case postCustomerSignupOTPFailure:
            return {
                ...state,
                runLoader: action.payload.confirmCustomerSignupOTP,
                data: action.payload.data,
                error: action.payload.error
            }
        case postCustomerSignupOTPReset:
            return {
                ...ConfirmCustomerPassState,
            }
        default:
            return state;
    }
}

export default CustomerSignupOTPReducer;