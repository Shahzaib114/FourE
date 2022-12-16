import ClientLayer from "../../../components/Layers/ClientLayer";
import { postingDriverLocation, postingDriverLocationFailure, postingDriverLocationSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const PostingDriverLiveLocation = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().PostingDriverLiveLocation(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        ) 
    }
    
}

const fetching = (status) => {
    return {
        type: postingDriverLocation,
        payload: {updatingDriverLocation : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? postingDriverLocationSuccess : postingDriverLocationFailure,
        payload : {updatingDriverLocation : status, data: data, error : error}
    }
}