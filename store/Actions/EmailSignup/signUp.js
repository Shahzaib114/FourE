import ClientLayer from "../../../components/Layers/ClientLayer"
import { signup, signupSuccess, signupFailure } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const registerUser = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().userRegisteration(payload, (data) => {
            console.log('inside data')
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: signup,
        payload: {authenticating : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? signupSuccess : signupFailure,
        payload : {authenticating : status, authData: data, authError : error}
    }
}