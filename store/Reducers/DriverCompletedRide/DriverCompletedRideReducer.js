import { driverCompletedRide, driverCompletedRideFailure, driverCompletedRideSuccess } from "../../Actions/RideCompleted/actionTypes"

const driverLiveLocationState = {
    runLoader: false,
    data: null,
    error: null,
}

const DriverCompletedRideReducer = (state = driverLiveLocationState, action ) => {
    switch(action.type) {
        case driverCompletedRide:
            return {
                ...state,
                runLoader: action.payload.rideCompleted
            }
        case driverCompletedRideSuccess:
            return {
                ...state,
                runLoader: action.payload.rideCompleted,
                data: action.payload.data,
                error: action.payload.error
            }
        case driverCompletedRideFailure:
            return {
                ...state,
                runLoader: action.payload.rideCompleted,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default DriverCompletedRideReducer;