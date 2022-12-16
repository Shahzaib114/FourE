import ClientLayer from '../../../components/Layers/ClientLayer';
import { gettingCustomerProfile, gettingCustomerProfileFailure, gettingCustomerProfileSuccess } from './actionTypes';

export const onResetCustomerProfile = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const _CustomerProfile = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService()._CustomerProfile(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : gettingCustomerProfile,
        payload: {customerProfile : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? gettingCustomerProfileSuccess : gettingCustomerProfileFailure, 
        payload: {customerProfile : status, data : data, error : error}
    }
}