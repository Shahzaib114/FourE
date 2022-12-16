import { cancelRideReason, cancelRideReasonFailure, cancelRideReasonSuccess } from "../../Actions/CancelReason/actionTypes"

const cancelReasonState = {
    runLoader: false,
    data: null,
    error: null,
}

const CancelRideReasonReducer = (state = cancelReasonState, action) => {
    switch (action.type) {
        case cancelRideReason:
            return {
                ...state,
                runLoader: action.payload.cancelingReason
            }
        case cancelRideReasonSuccess:
            return {
                ...state,
                runLoader: action.payload.cancelingReason,
                data: action.payload.data,
                error: action.payload.error
            }
        case cancelRideReasonFailure:
            return {
                ...state,
                runLoader: action.payload.cancelingReason,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default CancelRideReasonReducer;