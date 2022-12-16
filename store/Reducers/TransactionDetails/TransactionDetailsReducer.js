import { TransactionDetails, TransactionDetailsFailure, TransactionDetailsSuccess } from "../../Actions/TransactionDetails/actionTypes"

const transactionDetailsState = {
    runLoader: false,
    data: null,
    error: null
}

const TransactionDetailsReducer = (state = transactionDetailsState, action) => {
    switch (action.type) {
        case TransactionDetails:
            return {
                ...state,
                runLoader: action.payload.transactionDetailsData
            }
        case TransactionDetailsSuccess:
            return {
                ...state,
                runLoader: action.payload.transactionDetailsData,
                data: action.payload.data,
                error: action.payload.error
            }
        case TransactionDetailsFailure:
            return {
                ...state,
                runLoader: action.payload.transactionDetailsData,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default TransactionDetailsReducer;