import ClientLayer from '../../../components/Layers/ClientLayer';
import { getTravelingDetails, getTravelingDetailsFailure, getTravelingDetailsSuccess } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const gettingTravelingDetails = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().gettingTravelingDetails(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : getTravelingDetails,
        payload: {gettingDetails : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getTravelingDetailsSuccess : getTravelingDetailsFailure, 
        payload: {gettingDetails : status, data : data, error : error}
    }
}