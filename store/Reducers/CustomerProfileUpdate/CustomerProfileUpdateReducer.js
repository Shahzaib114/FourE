import { customerUpdatingProfile, customerUpdatingProfileFailure, customerUpdatingProfileReset, customerUpdatingProfileSuccess } from "../../Actions/CustomerUpdateProfile/actionTypes"

const updatingProfileState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerProfileUpdateReducer = (state = updatingProfileState, action) => {
    switch (action.type) {
        case customerUpdatingProfile:
            return {
                ...state,
                runLoader: action.payload.updateProfile
            }
        case customerUpdatingProfileSuccess:
            return {
                ...state,
                runLoader: action.payload.updateProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        case customerUpdatingProfileFailure:
            return {
                ...state,
                runLoader: action.payload.updateProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        case customerUpdatingProfileReset:
            return {
                ...updatingProfileState,
            }
        default:
            return state;
    }
}

export default CustomerProfileUpdateReducer;