import ClientLayer from '../../../components/Layers/ClientLayer';
import { acceptRejectCustomer, acceptRejectCustomerFailure, acceptRejectCustomerSuccess } from './actionTypes';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const ResponsetoCustomer = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().ResponsetoCustomer(payload, (data)=> {
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : acceptRejectCustomer,
        payload: {acceptingRejecting : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? acceptRejectCustomerSuccess : acceptRejectCustomerFailure, 
        payload: {acceptingRejecting : status, data : data, error : error}
    }
}