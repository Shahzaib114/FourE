import { DriverStatusUpdate, DriverStatusUpdateFailure, DriverStatusUpdateReset, DriverStatusUpdateSuccess } from "../../Actions/DriverStatus/actionTypes"

const UpdatingDriverOnlineActivityState = {
    runLoader: false,
    data: null,
    error: null,
}

const UpdateDriverActivityReducer = (state = UpdatingDriverOnlineActivityState, action ) => {
    switch(action.type) {
        case DriverStatusUpdate:
            return {
                ...state,
                runLoader: action.payload.updateDriverOnlineStatus
            }
        case DriverStatusUpdateSuccess:
            return {
                ...state,
                runLoader: action.payload.updateDriverOnlineStatus,
                data: action.payload.data,
                error: action.payload.error
            }
        case DriverStatusUpdateFailure:
            return {
                ...state,
                runLoader: action.payload.updateDriverOnlineStatus,
                data: action.payload.data,
                error: action.payload.error
            }
        case DriverStatusUpdateReset:
            return {
                ...UpdatingDriverOnlineActivityState,
            }
        default:
            return state
    }
}

export default UpdateDriverActivityReducer;