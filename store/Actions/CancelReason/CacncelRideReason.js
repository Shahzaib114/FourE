import ClientLayer from '../../../components/Layers/ClientLayer';
import { cancelRideReason, cancelRideReasonFailure, cancelRideReasonSuccess } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const _CancelReason = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().CancelReason(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : cancelRideReason,
        payload: {cancelingReason : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? cancelRideReasonSuccess : cancelRideReasonFailure, 
        payload: {cancelingReason : status, data : data, error : error}
    }
}