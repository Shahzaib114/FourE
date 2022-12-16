import ClientLayer from "../../../components/Layers/ClientLayer"
import { TransactionHistory, TransactionHistoryFailure, TransactionHistorySuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const TransactionHistoyDetails = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().TransactionHistoyDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: TransactionHistory,
        payload: {transactionHistoryData : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? TransactionHistorySuccess : TransactionHistoryFailure,
        payload : {transactionHistoryData : status, data: data, error : error}
    }
}