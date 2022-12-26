import { cancelCurrentRide, cancelCurrentRideFailure, cancelCurrentRideReset, cancelCurrentRideSuccess } from "../../Actions/CancelRide/actionTypes"

const cancelingRideState = {
    runLoader: false,
    data: null,
    error: null,
}

const CancelCurrentRideReducer = (state = cancelingRideState, action) => {
    switch (action.type) {
        case cancelCurrentRide:
            return {
                ...state,
                runLoader: action.payload.cancelingRide
            }
        case cancelCurrentRideSuccess:
            return {
                ...state,
                runLoader: action.payload.cancelingRide,
                data: action.payload.data,
                error: action.payload.error
            }
        case cancelCurrentRideFailure:
            return {
                ...state,
                runLoader: action.payload.cancelingRide,
                data: action.payload.data,
                error: action.payload.error
            }
        case cancelCurrentRideReset:
                return {
                    ...cancelingRideState,
                }
        default:
            return state;
    }
}

export default CancelCurrentRideReducer;