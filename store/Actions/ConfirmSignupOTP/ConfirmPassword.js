import ClientLayer from "../../../components/Layers/ClientLayer";
import { postSignupOTP, postSignupOTPFailure, postSignupOTPSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const getConfirmationCode = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().postConfirmationCode(payload,(data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }   
        )
    }
}

const fetching  = (status) => {
    return {
        type : postSignupOTP,
        payload : {confirmSignupOTP : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ?  postSignupOTPSuccess : postSignupOTPFailure,
        payload : {confirmSignupOTP : status, data: data, error : error}
    }
}