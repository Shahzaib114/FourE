import { postCustomerForgotMail, postCustomerForgotMailFailure, postCustomerForgotMailSuccess } from "../../Actions/CustomerForgotPass/actionTypes"

const ForgotCustomerPassState = {
    runLoader: false,
    data: null,
    error: null
}

const CustomerForgotPassReducer = (state = ForgotCustomerPassState, action) => {
    switch (action.type) {
        case postCustomerForgotMail:
            return {
                ...state,
                runLoader: action.payload.customerforgotpass
            }
        case postCustomerForgotMailSuccess:
            return {
                ...state,
                runLoader: action.payload.customerforgotpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case postCustomerForgotMailFailure:
            return {
                ...state,
                runLoader: action.payload.customerforgotpass,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerForgotPassReducer;