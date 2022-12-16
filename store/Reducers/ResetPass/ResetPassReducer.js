import { postResetPassword, ResetPasswordSuccess, ResetPasswordFailure } from "../../Actions/ResetPassword/actionTypes"

const ResetPassState = {
    runLoader: false,
    data: null,
    error: null
}

const ResetPassWordReducer = (state = ResetPassState, action) => {
    switch (action.type) {
        case postResetPassword:
            return {
                ...state,
                runLoader: action.payload.Resetpass
            }
        case ResetPasswordSuccess:
            return {
                ...state,
                runLoader: action.payload.Resetpass,
                data: action.payload.data,
                error: action.payload.error
            }
        case ResetPasswordFailure:
            return {
                ...state,
                runLoader: action.payload.Resetpass,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default ResetPassWordReducer;