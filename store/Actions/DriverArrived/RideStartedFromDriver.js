import ClientLayer from "../../../components/Layers/ClientLayer";
import { rideStartedFromDriver, rideStartedFromDriverFailure, rideStartedFromDriverSuccess } from "./actionTypes";

export const onResetRideStarted = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const RideStarted = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().RideStarted(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        ) 
    }
    
}

const fetching = (status) => {
    return {
        type: rideStartedFromDriver,
        payload: {pickedUpRide : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? rideStartedFromDriverSuccess : rideStartedFromDriverFailure,
        payload : {pickedUpRide : status, data: data, error : error}
    }
}