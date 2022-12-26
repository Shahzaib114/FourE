import { CustomerResetPassword, CustomerResetPasswordFailure, CustomerResetPasswordReset, CustomerResetPasswordSuccess } from "../../Actions/CustomerResetPass/actionTypes"

const ResetCustomerPassState = {
    runLoader: false,
    data: null,
    error: null
}

const ResetCustomerPassReducer = (state = ResetCustomerPassState, action) => {
    switch (action.type) {
        case CustomerResetPassword:
            return {
                ...state,
                runLoader: action.payload.customerresetpass
            }
        case CustomerResetPasswordSuccess:
            return {
                ...state,
                runLoader: action.payload.customerresetpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case CustomerResetPasswordFailure:
            return {
                ...state,
                runLoader: action.payload.customerresetpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case CustomerResetPasswordReset:
            return {
                ...ResetCustomerPassState,
            }
        default:
            return state
    }
}

export default ResetCustomerPassReducer;