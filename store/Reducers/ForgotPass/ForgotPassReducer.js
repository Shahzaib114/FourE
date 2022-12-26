import { postForgotMail, ForgotMailSuccess, ForgotMailFailure, postForgotMailReset } from "../../Actions/ForgotPassword/actionTypes"

const ForgotPassState = {
    runLoader: false,
    data: null,
    error: null
}

const ForgotPasswordReducer = (state = ForgotPassState, action) => {
    switch (action.type) {
        case postForgotMail:
            return {
                ...state,
                runLoader: action.payload.forgotpass
            }
        case ForgotMailSuccess:
            return {
                ...state,
                runLoader: action.payload.forgotpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case ForgotMailFailure:
            return {
                ...state,
                runLoader: action.payload.forgotpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case postForgotMailReset:
                return {
                    ...ForgotPassState,
                }
        default:
            return state
    }
}

export default ForgotPasswordReducer;