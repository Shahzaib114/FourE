import ClientLayer from "../../../components/Layers/ClientLayer";
import { confirmBooking, confirmBookingFailure, confirmBookingSuccess } from "./actionTypes";

export const onResetCurrentRide = () => {
    return(dispatch) => {
            dispatch(onFetchingResponse(false, null, null))
    }
}

export const ConfirmingCustomerBooking = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().ConfirmingCustomerBooking(payload,(data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }   
        )
    }
}

const fetching = (status) => {
    return {
        type : confirmBooking,
        payload : {confirmingBooking : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ?  confirmBookingSuccess : confirmBookingFailure,
        payload : {confirmingBooking : status, data: data, error : error}
    }
}