import ClientLayer from '../../../components/Layers/ClientLayer';
import { postResetPassword, ResetPasswordSuccess, ResetPasswordFailure } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const updatingResetPassword = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().updatingResetPassword(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : postResetPassword,
        payload: {Resetpass : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? ResetPasswordSuccess : ResetPasswordFailure, 
        payload: {Resetpass : status, data : data, error : error}
    }
}