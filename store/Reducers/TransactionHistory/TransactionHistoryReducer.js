import { TransactionHistory, TransactionHistoryFailure, TransactionHistoryReset, TransactionHistorySuccess } from "../../Actions/TransactionHistory/actionTypes"

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
        case TransactionHistoryReset:
            return {
                ...transactionHistoryState,
            }
        default:
            return state
    }
}

export default TransactionHistoryReducer;