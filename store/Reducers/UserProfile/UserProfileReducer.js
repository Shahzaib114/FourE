import { authentication, authenticationSuccess, authenticationFailure } from "../../Actions/Login/actionTypes";
const authenticationState = {
    authentication: false,
    data: null,
    error: null
}

const authenticationReducerUserProfile = (state = authenticationState, action) => {
    switch (action.type) {
        case authentication:
            return {
                ...state,
                authentication: action.payload.authenticating
            }
        case authenticationSuccess:
            return {
                ...state,
                authentication: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
        case authenticationFailure:
            return {
                ...state,
                authentication: action.payload.authenticating,
                data: action.payload.authData,
                error: action.payload.authError
            }
        default:
            return state
    }
}

export default authenticationReducerUserProfile;