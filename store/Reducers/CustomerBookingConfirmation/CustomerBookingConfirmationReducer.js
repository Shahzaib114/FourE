import { confirmBooking, confirmBookingFailure, confirmBookingSuccess } from "../../Actions/CustomerBookingConfirmation/actionTypes"

const ConfirmBookingState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerBookingConfirmationReducer = (state = ConfirmBookingState, action) => {
    switch (action.type) {
        case confirmBooking:
            return {
                ...state,
                runLoader: action.payload.confirmingBooking
            }
        case confirmBookingSuccess:
            return {
                ...state,
                runLoader: action.payload.confirmingBooking,
                data: action.payload.data,
                error: action.payload.error
            }
        case confirmBookingFailure:
            return {
                ...state,
                runLoader: action.payload.confirmingBooking,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default CustomerBookingConfirmationReducer;