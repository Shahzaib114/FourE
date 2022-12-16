import ClientLayer from "../../../components/Layers/ClientLayer"
import { postCustomerResendRequest, postCustomerResendRequestFailure, postCustomerResendRequestSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const ResendCustomerOTPRequest = (payload) => {
    return (dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().ResendCustomerOTPRequest(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: postCustomerResendRequest,
        payload: { resendCustomerOtp: status }
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? postCustomerResendRequestSuccess : postCustomerResendRequestFailure,
        payload: { resendCustomerOtp: status, data: data, error: error }
    }
}