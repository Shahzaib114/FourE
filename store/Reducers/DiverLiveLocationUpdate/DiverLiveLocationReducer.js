import { postingDriverLocation, postingDriverLocationFailure, postingDriverLocationSuccess } from "../../Actions/DriverUpdatedData/actionTypes"

const driverLiveLocationState = {
    runLoader: false,
    data: null,
    error: null,
}

const DriverLiveLocationReducer = (state = driverLiveLocationState, action ) => {
    switch(action.type) {
        case postingDriverLocation:
            return {
                ...state,
                runLoader: action.payload.updatingDriverLocation
            }
        case postingDriverLocationSuccess:
            return {
                ...state,
                runLoader: action.payload.updatingDriverLocation,
                data: action.payload.data,
                error: action.payload.error
            }
        case postingDriverLocationFailure:
            return {
                ...state,
                runLoader: action.payload.updatingDriverLocation,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default DriverLiveLocationReducer;