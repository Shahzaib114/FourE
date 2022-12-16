import ClientLayer from "../../../components/Layers/ClientLayer"
import { getRider, getRiderFailure, getRiderSuccess } from "./actionTypes"

export const onResetRiderDetails = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const gettingRiderDetails = (payload) => {
    console.log(payload)
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().gettingRiderDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getRider,
        payload: {gettingRider : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getRiderSuccess : getRiderFailure,
        payload : {gettingRider : status, data: data, error : error}
    }
}