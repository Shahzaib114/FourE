import ClientLayer from '../../../components/Layers/ClientLayer';
import { customerAuthentication, customerAuthenticationFailure, customerAuthenticationSuccess } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const CustomerValidation = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
            
        ClientLayer.getInstance().getDataService().CustomerValidation(payload, (data)=> {
            {data.data == 'error' ?(
                null
            )
            :
            (
                ClientLayer.getInstance().getDataManager().SaveValueForKey('customer_id', JSON.stringify(data.data.customer_id))   // console.log('not error')
            )
            }
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : customerAuthentication,
        payload: {authenticatingcustomer : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? customerAuthenticationSuccess : customerAuthenticationFailure, 
        payload: {authenticatingcustomer : status, authData : data, authError : error}
    }
}