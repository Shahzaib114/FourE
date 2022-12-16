import ClientLayer from "../../../components/Layers/ClientLayer";
import { customerFeedbackAdding, customerFeedbackAddingFailure, customerFeedbackAddingSuccess } from "./actionTypes";

export const onResetCustomerFeedback = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const CustomerFeedback = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().CustomerFeedback(payload,(data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }   
        )
    }
}

const fetching  = (status) => {
    return {
        type : customerFeedbackAdding,
        payload : {addingFeedback : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ?  customerFeedbackAddingSuccess : customerFeedbackAddingFailure,
        payload : {addingFeedback : status, data: data, error : error}
    }
}