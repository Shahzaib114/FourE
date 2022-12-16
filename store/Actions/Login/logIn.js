import ClientLayer from '../../../components/Layers/ClientLayer';
import { authentication, authenticationSuccess, authenticationFailure } from "../../Actions/Login/actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const authenticate = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
            )
        ClientLayer.getInstance().getDataService().authenticateUser(payload, (data)=> {
            ClientLayer.getInstance().getDataManager().SaveValueForKey('driver_id', JSON.stringify(data.data.user.driver_id));
            dispatch(onFetchingResponse(false, data, null))
        }, (error)=> {
            dispatch(onFetchingResponse(false, null, error))
        })
    }
}

const fetching = (status) => {
    return {
        type : authentication,
        payload: {authenticating : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? authenticationSuccess : authenticationFailure, 
        payload: {authenticating : status, authData : data, authError : error}
    }
}