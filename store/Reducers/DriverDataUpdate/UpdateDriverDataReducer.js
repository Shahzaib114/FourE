import { DriverDataUpdate, DriverDataUpdateFailure, DriverDataUpdateSuccess } from "../../Actions/DriverUpdatedData/actionTypes"

const UpdatingDriverProfileState = {
    runLoader: false,
    data: null,
    error: null,
}

const UpdateDriverDataReducer = (state = UpdatingDriverProfileState, action ) => {
    switch(action.type) {
        case DriverDataUpdate:
            return {
                ...state,
                runLoader: action.payload.updateDriverProfile
            }
        case DriverDataUpdateSuccess:
            return {
                ...state,
                runLoader: action.payload.updateDriverProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        case DriverDataUpdateFailure:
            return {
                ...state,
                runLoader: action.payload.updateDriverProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default UpdateDriverDataReducer;