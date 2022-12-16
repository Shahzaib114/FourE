import ClientLayer from "../../../components/Layers/ClientLayer"
import { getPickandDropDetails, getPickandDropDetailsFailure, getPickandDropDetailsSuccess } from "./actionTypes"

export const onResetIncomingRide = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const getPickandDropLocations = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().getPickandDropLocations(payload,(data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getPickandDropDetails,
        payload: {locationDetails : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getPickandDropDetailsSuccess : getPickandDropDetailsFailure,
        payload : {locationDetails : status, data: data, error : error}
    }
}