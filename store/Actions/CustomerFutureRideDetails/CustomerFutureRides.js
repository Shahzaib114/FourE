import ClientLayer from "../../../components/Layers/ClientLayer"
import { getCustomerFutureRideDetails, getCustomerFutureRideDetailsFailure, getCustomerFutureRideDetailsSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const GettingCustomerFutureRideDetails = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().GettingCustomerFutureRideDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getCustomerFutureRideDetails,
        payload: {customerScheduleInfo : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getCustomerFutureRideDetailsSuccess : getCustomerFutureRideDetailsFailure,
        payload : {customerScheduleInfo : status, data: data, error : error}
    }
}