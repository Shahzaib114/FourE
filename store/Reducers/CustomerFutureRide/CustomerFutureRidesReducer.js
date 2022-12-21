import { getCustomerFutureRides, getCustomerFutureRidesFailure, getCustomerFutureRidesSuccess } from "../../Actions/CustomerFutureRides/actionTypes"

const GettingCustomerRidesState = {
    runLoader: false,
    data: null,
    error: null
}

const CustomerFutureRidesReducer = (state = GettingCustomerRidesState, action) => {
    switch (action.type) {
        case getCustomerFutureRides:
            return {
                ...state,
                runLoader: action.payload.customerScheduling
            }
        case getCustomerFutureRidesSuccess:
            return {
                ...state,
                runLoader: action.payload.customerScheduling,
                data: action.payload.data,
                error: action.payload.error
            }
        case getCustomerFutureRidesFailure:
            return {
                ...state,
                runLoader: action.payload.customerScheduling,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerFutureRidesReducer;