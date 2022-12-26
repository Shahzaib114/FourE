import { CustomerSIgningUp, CustomerSIgningUpFailure, CustomerSIgningUpReset, CustomerSIgningUpSuccess } from "../../Actions/CustomerSignup/actionTypes"

const CustomerSignupState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerSignUpReducer = (state = CustomerSignupState, action ) => {
    switch(action.type) {
        case CustomerSIgningUp:
            return {
                ...state,
                runLoader: action.payload.signupUser
            }
        case CustomerSIgningUpSuccess:
            return {
                ...state,
                runLoader: action.payload.signupUser,
                data: action.payload.data,
                error: action.payload.error
            }
        case CustomerSIgningUpFailure:
            return {
                ...state,
                runLoader: action.payload.signupUser,
                data: action.payload.data,
                error: action.payload.error
            }
        case CustomerSIgningUpReset:
            return {
                ...CustomerSignupState,
            }
        default:
            return state
    }
}

export default CustomerSignUpReducer;