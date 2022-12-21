import ClientLayer from "../../../components/Layers/ClientLayer"
import { getCustomerFutureRides, getCustomerFutureRidesFailure, getCustomerFutureRidesSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const GettingCustomerScheduling = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().GettingCustomerScheduling(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getCustomerFutureRides,
        payload: {customerScheduling : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getCustomerFutureRidesSuccess : getCustomerFutureRidesFailure,
        payload : {customerScheduling : status, data: data, error : error}
    }
}