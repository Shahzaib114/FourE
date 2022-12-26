import { driverCompletedRide, driverCompletedRideFailure, driverCompletedRideReset, driverCompletedRideSuccess } from "../../Actions/RideCompleted/actionTypes"

const driverCompletedRideState = {
    runLoader: false,
    data: null,
    error: null,
}

const DriverCompletedRideReducer = (state = driverCompletedRideState, action) => {
    switch (action.type) {
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
        case driverCompletedRideReset:
            return {
                ...driverCompletedRideState,
            }
        default:
            return state
    }
}

export default DriverCompletedRideReducer;