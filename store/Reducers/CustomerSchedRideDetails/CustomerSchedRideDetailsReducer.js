import { getCustomerFutureRideDetails, getCustomerFutureRideDetailsFailure, getCustomerFutureRideDetailsSuccess } from "../../Actions/CustomerFutureRideDetails/actionTypes"

const CustomerSchedRideDetailState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerSchedRideDetailsReducer = (state = CustomerSchedRideDetailState, action ) => {
    switch(action.type) {
        case getCustomerFutureRideDetails:
            return {
                ...state,
                runLoader: action.payload.customerScheduleInfo
            }
        case getCustomerFutureRideDetailsSuccess:
            return {
                ...state,
                runLoader: action.payload.customerScheduleInfo,
                data: action.payload.data,
                error: action.payload.error
            }
        case getCustomerFutureRideDetailsFailure:
            return {
                ...state,
                runLoader: action.payload.customerScheduleInfo,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerSchedRideDetailsReducer;