import ClientLayer from "../../../components/Layers/ClientLayer"
import { getTravelfare, getTravelfareFailure, getTravelfareSuccess } from "./actionTypes"

export const onResetPickandDropFares = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const gettingPickandDropFares = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().gettingPickandDropFares(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getTravelfare,
        payload: {travelingFare : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getTravelfareSuccess : getTravelfareFailure,
        payload : {travelingFare : status, data: data, error : error}
    }
}