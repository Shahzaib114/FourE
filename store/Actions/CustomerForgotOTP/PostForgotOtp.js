import ClientLayer from "../../../components/Layers/ClientLayer";
import { veriftyCustomerForgotOtp, veriftyCustomerForgotOtpFailure, veriftyCustomerForgotOtpSuccess } from "./actionTypes";


export const onResetVerifyingCustomerForgotOTP = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const verifyingCustomerForgotOTP = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().verifyingCustomerForgotOTP(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: veriftyCustomerForgotOtp,
        payload: { forgotCustomerOTP: status }
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? veriftyCustomerForgotOtpSuccess : veriftyCustomerForgotOtpFailure,
        payload: { forgotCustomerOTP: status, data: data, error: error }
    }
}