import ClientLayer from "../../../components/Layers/ClientLayer"
import { TransactionDetails, TransactionDetailsFailure, TransactionDetailsSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const gettingTransactionDetails = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().gettingTransactionDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: TransactionDetails,
        payload: {transactionDetailsData : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? TransactionDetailsSuccess : TransactionDetailsFailure,
        payload : {transactionDetailsData : status, data: data, error : error}
    }
}