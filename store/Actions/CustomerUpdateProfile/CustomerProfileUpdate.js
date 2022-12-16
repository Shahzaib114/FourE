import ClientLayer from "../../../components/Layers/ClientLayer";
import { customerUpdatingProfile, customerUpdatingProfileFailure, customerUpdatingProfileSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const _CustomerProfileUpdate = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().CustomerProfileUpdate(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        ) 
    }
    
}

const fetching = (status) => {
    return {
        type: customerUpdatingProfile,
        payload: {updateProfile : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? customerUpdatingProfileSuccess : customerUpdatingProfileFailure,
        payload : {updateProfile : status, data: data, error : error}
    }
}