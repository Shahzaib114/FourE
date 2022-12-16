import { customerAuthentication, customerAuthenticationFailure, customerAuthenticationSuccess } from "../../Actions/CustomerLogin/actionTypes"

const customerAuthenticationState = {
    runLoader: false,
    data: null,
    error: null
}

const CustomerLoginReducer = (state = customerAuthenticationState, action) => {
    switch (action.type) {
        case customerAuthentication:
            return {
                ...state,
                runLoader: action.payload.authenticatingcustomer
            }
        case customerAuthenticationSuccess:
            return {
                ...state,
                runLoader: action.payload.authenticatingcustomer,
                data: action.payload.authData,
                error: action.payload.authError
            }
        case customerAuthenticationFailure:
            return {
                ...state,
                runLoader: action.payload.authenticatingcustomer,
                data: action.payload.authData,
                error: action.payload.authError
            }
        default:
            return state
    }
}

export default CustomerLoginReducer;