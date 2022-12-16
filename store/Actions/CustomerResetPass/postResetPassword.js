import ClientLayer from '../../../components/Layers/ClientLayer';
import { CustomerResetPassword, CustomerResetPasswordFailure, CustomerResetPasswordSuccess } from './actionTypes';

export const onResetCustomerResetPassword = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const updatingCustomerResetPassword = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().updatingCustomerResetPassword(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : CustomerResetPassword,
        payload: {customerresetpass : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? CustomerResetPasswordSuccess : CustomerResetPasswordFailure, 
        payload: {customerresetpass : status, data : data, error : error}
    }
}