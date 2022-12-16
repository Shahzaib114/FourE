import ClientLayer from "../../../components/Layers/ClientLayer";
import { driverCompletedRide, driverCompletedRideFailure, driverCompletedRideSuccess } from "./actionTypes";

export const onResetRideCompleted = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const RideCompleted = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().RideCompleted(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        ) 
    }
    
}

const fetching = (status) => {
    return {
        type: driverCompletedRide,
        payload: {rideCompleted : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? driverCompletedRideSuccess : driverCompletedRideFailure,
        payload : {rideCompleted : status, data: data, error : error}
    }
}