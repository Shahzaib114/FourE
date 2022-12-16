import { rideStartedFromDriver, rideStartedFromDriverFailure, rideStartedFromDriverSuccess } from "../../Actions/DriverArrived/actionTypes"

const RideStartedState = {
    runLoader: false,
    data: null,
    error: null
}

const DriverPickedRiderReducer = (state = RideStartedState, action) => {
    switch (action.type) {
        case rideStartedFromDriver:
            return {
                ...state,
                runLoader: action.payload.pickedUpRide
            }
        case rideStartedFromDriverSuccess:
            return {
                ...state,
                runLoader: action.payload.pickedUpRide,
                data: action.payload.data,
                error: action.payload.error
            }
        case rideStartedFromDriverFailure:
            return {
                ...state,
                runLoader: action.payload.pickedUpRide,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default DriverPickedRiderReducer;