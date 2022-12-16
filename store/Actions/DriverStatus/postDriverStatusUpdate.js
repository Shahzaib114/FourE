import ClientLayer from "../../../components/Layers/ClientLayer";
import { DriverStatusUpdate, DriverStatusUpdateFailure, DriverStatusUpdateSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const postingActivityStatus = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().postingActivityStatus(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: DriverStatusUpdate,
        payload: {updateDriverOnlineStatus : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? DriverStatusUpdateSuccess : DriverStatusUpdateFailure,
        payload : {updateDriverOnlineStatus : status, data: data, error : error}
    }
}