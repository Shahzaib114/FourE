import { postingDriverLocation, postingDriverLocationFailure, postingDriverLocationReset, postingDriverLocationSuccess } from "../../Actions/DriverLiveLocation/actionTypes"

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
        case postingDriverLocationReset:
            return {
                ...driverLiveLocationState,
            }
        default:
            return state
    }
}

export default DriverLiveLocationReducer;