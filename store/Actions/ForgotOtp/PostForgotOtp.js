import ClientLayer from "../../../components/Layers/ClientLayer";
import { postForgotOtp, postForgotOtpSuccess, postForgotOtpFailure } from "./actionTypes";


export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const PostingForgotPasswordOTP = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().PostingForgotPasswordOTP(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: postForgotOtp,
        payload: { forgotOTP: status }
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? postForgotOtpSuccess : postForgotOtpFailure,
        payload: { forgotOTP: status, data: data, error: error }
    }
}