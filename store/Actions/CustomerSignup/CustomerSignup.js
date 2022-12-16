import ClientLayer from "../../../components/Layers/ClientLayer";
import { CustomerSIgningUp, CustomerSIgningUpFailure, CustomerSIgningUpSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const CustomerSignupDetails = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().CustomerSignupDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: CustomerSIgningUp,
        payload: {signupUser : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? CustomerSIgningUpSuccess : CustomerSIgningUpFailure,
        payload : {signupUser : status, data: data, error : error}
    }
}