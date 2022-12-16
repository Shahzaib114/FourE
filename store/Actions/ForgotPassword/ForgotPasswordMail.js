import ClientLayer from "../../../components/Layers/ClientLayer"
import { postForgotMail, ForgotMailSuccess, ForgotMailFailure } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const PostingForgotPassword = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().PostingForgotPassword(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: postForgotMail,
        payload: {forgotpass : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? ForgotMailSuccess : ForgotMailFailure,
        payload : {forgotpass : status, data: data, error : error}
    }
}