import ClientLayer from "../../../components/Layers/ClientLayer"
import { postCustomerForgotMail, postCustomerForgotMailFailure, postCustomerForgotMailSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const PostingCustomerForgotPassword = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().PostingCustomerForgotPassword(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: postCustomerForgotMail,
        payload: {customerforgotpass : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? postCustomerForgotMailSuccess : postCustomerForgotMailFailure,
        payload : {customerforgotpass : status, data: data, error : error}
    }
}