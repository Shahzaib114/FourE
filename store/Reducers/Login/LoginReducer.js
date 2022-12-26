import { authentication, authenticationSuccess, authenticationFailure, authenticationReset } from "../../Actions/Login/actionTypes";
const authenticationState = {
    runLoader: false,
    data: null,
    error: null
}

const loginReducer = (state = authenticationState, action) => {
    switch (action.type) {
        case authentication:
            return {
                ...state,
                runLoader: action.payload.authenticating
            }
        case authenticationSuccess:
            return {
                ...state,
                runLoader: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
        case authenticationFailure:
            return {
                ...state,
                runLoader: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
            case authenticationReset:
                return {
                    ...authenticationState,
                   
                }
            
        default:
            return state
    }
}

export default loginReducer;