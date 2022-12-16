import { signup, signupSuccess, signupFailure } from "../../Actions/EmailSignup/actionTypes";

const signUpState = {
    runLoader: false,
    data: null,
    error: null,
}

const SignUpReducer = (state = signUpState, action ) => {
    switch(action.type) {
        case signup:
            return {
                ...state,
                runLoader: action.payload.authenticating
            }
        case signupSuccess:
            return {
                ...state,
                runLoader: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
        case signupFailure:
            return {
                ...state,
                runLoader: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
        default:
            return state
    }
}

export default SignUpReducer;