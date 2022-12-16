import ClientLayer from "../../../components/Layers/ClientLayer";
import { postCustomerSignupOTP, postCustomerSignupOTPFailure, postCustomerSignupOTPSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const postCustomerConfirmationCode = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().postCustomerConfirmationCode(payload,(data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }   
        )
    }
}

const fetching  = (status) => {
    return {
        type : postCustomerSignupOTP,
        payload : {confirmCustomerSignupOTP : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ?  postCustomerSignupOTPSuccess : postCustomerSignupOTPFailure,
        payload : {confirmCustomerSignupOTP : status, data: data, error : error}
    }
}