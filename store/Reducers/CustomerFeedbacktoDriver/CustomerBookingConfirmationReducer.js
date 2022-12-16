import { customerFeedbackAdding, customerFeedbackAddingFailure, customerFeedbackAddingSuccess } from "../../Actions/CustomerFeedback/actionTypes"

const CustomerFeedbackState = {
    runLoader: false,
    data: null,
    error: null,
}

const CustomerFeedbackReducer = (state = CustomerFeedbackState, action) => {
    switch (action.type) {
        case customerFeedbackAdding:
            return {
                ...state,
                runLoader: action.payload.addingFeedback
            }
        case customerFeedbackAddingSuccess:
            return {
                ...state,
                runLoader: action.payload.addingFeedback,
                data: action.payload.data,
                error: action.payload.error
            }
        case customerFeedbackAddingFailure:
            return {
                ...state,
                runLoader: action.payload.addingFeedback,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default CustomerFeedbackReducer;