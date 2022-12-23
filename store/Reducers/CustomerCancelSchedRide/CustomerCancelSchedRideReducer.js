import { customerCancelBookRide, customerCancelBookRideFailure, customerCancelBookRideReset, customerCancelBookRideSuccess } from "../../Actions/customerCancelSchedRide/actionTypes"

const CanelingBookedRideState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerCancelSchedRideReducer = (state = CanelingBookedRideState, action) => {
    console.log('actions ', action)
    switch (action.type) {
        case customerCancelBookRide:
            return {
                ...state,
                runLoader: action.payload.cancelingBookRide
            }
        case customerCancelBookRideSuccess:
            return {
                ...state,
                runLoader: action.payload.cancelingBookRide,
                data: action.payload.data,
                error: action.payload.error
            }
        case customerCancelBookRideFailure:
            return {
                ...state,
                runLoader: action.payload.cancelingBookRide,
                data: action.payload.data,
                error: action.payload.error
            }
        case customerCancelBookRideReset:
            return {
                ...CanelingBookedRideState,
            }
        default:
            return state;
    }
}

export default CustomerCancelSchedRideReducer;