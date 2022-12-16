import { getDriverProfileData, getDriverProfileDataFailure, getDriverProfileDataSuccess } from "../../Actions/getUserProfile/actionTypes"

const ProfileInformationState = {
    runLoader: true,
    data: null,
    error: null
}

const getUserProfileReducer = (state = ProfileInformationState, action) => {
    switch (action.type) {
        case getDriverProfileData:
            return {
                ...state,
                runLoader: action.payload.profileData
            }
        case getDriverProfileDataSuccess:
            return {
                ...state,
                runLoader: action.payload.profileData,
                data: action.payload.data,
                error: action.payload.error
            }
        case getDriverProfileDataFailure:
            return {
                ...state,
                runLoader: action.payload.profileData,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default getUserProfileReducer;