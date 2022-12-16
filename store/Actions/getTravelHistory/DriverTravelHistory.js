import ClientLayer from "../../../components/Layers/ClientLayer"
import { getTravelHistory, getTravelHistoryFailure, getTravelHistorySuccess } from "./actionTypes"

export const onResetTravelHistory = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchTravelHistory = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().fetchTravelHistory(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getTravelHistory,
        payload: {travelhistory : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getTravelHistorySuccess : getTravelHistoryFailure,
        payload : {travelhistory : status, data: data, error : error}
    }
}