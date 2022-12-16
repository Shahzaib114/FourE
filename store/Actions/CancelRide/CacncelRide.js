import ClientLayer from '../../../components/Layers/ClientLayer';
import { cancelCurrentRide, cancelCurrentRideFailure, cancelCurrentRideSuccess } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const _CancelRide = () => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().CancelRide((data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : cancelCurrentRide,
        payload: {cancelingRide : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? cancelCurrentRideSuccess : cancelCurrentRideFailure, 
        payload: {cancelingRide : status, data : data, error : error}
    }
}