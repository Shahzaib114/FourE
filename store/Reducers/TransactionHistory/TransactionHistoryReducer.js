import { TransactionHistory, TransactionHistoryFailure, TransactionHistorySuccess } from "../../Actions/TransactionHistory/actionTypes"

const transactionHistoryState = {
    runLoader: false,
    data: null,
    error: null
}

const TransactionHistoryReducer = (state = transactionHistoryState, action) => {
    switch (action.type) {
        case TransactionHistory:
            return {
                ...state,
                runLoader: action.payload.transactionHistoryData
            }
        case TransactionHistorySuccess:
            return {
                ...state,
                runLoader: action.payload.transactionHistoryData,
                data: action.payload.data,
                error: action.payload.error
            }
        case TransactionHistoryFailure:
            return {
                ...state,
                runLoader: action.payload.transactionHistoryData,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default TransactionHistoryReducer;