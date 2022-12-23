import ClientLayer from "../../../components/Layers/ClientLayer";
import { confirmBooking, confirmBookingFailure, confirmBookingReset, confirmBookingSuccess } from "./actionTypes";

export const onResetCurrentRide = () => {
    console.log('inside reset onResetCurrentRide')
    return (dispatch) => {
        dispatch(fetching(false))
        goingToReset()
        // dispatch(onFetchingResponse())
        // dispatch(goingToReset(false))
    }
}

export const ConfirmingCustomerBooking = (payload) => {
    return (dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().ConfirmingCustomerBooking(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    console.log('inside fetching')
    return {
        type: confirmBooking,
        payload: { confirmingBooking: status }
    }
}

// export const resetReducer = () => {
//     console.log('resetting')
//     return (dispatch) => {
//         dispatch(goingToReset())
//     }
// }
const goingToReset = () => {
    console.log('inside goingToReset')
    return {
        type: confirmBookingReset,
        // payload: { confirmingBooking: status }
    }

}

const onFetchingResponse = (status, data = null, error = null) => {
    console.log('inside fetching response')
    return {
        type: error == null ? confirmBookingSuccess : confirmBookingFailure,
        payload: { confirmingBooking: status, data: data, error: error }
    }
}