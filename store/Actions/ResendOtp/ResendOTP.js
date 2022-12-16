import ClientLayer from "../../../components/Layers/ClientLayer"
import { postResendRequest, postResendRequestFailure, postResendRequestSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const ResendOTPRequest = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().ResendOTPRequest(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: postResendRequest,
        payload: { resendOtp: status }
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? postResendRequestSuccess : postResendRequestFailure,
        payload: { resendOtp: status, data: data, error: error }
    }
}