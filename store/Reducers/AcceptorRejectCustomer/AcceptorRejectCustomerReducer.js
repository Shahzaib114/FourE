import { acceptRejectCustomer, acceptRejectCustomerFailure, acceptRejectCustomerReset, acceptRejectCustomerSuccess } from "../../Actions/AcceptorRejectCustomer/actionTypes"

const acceptingRejectingState = {
    runLoader: false,
    data: null,
    error: null,
}

const AcceptorRejectCustomerReducer = (state = acceptingRejectingState, action) => {
    switch (action.type) {
        case acceptRejectCustomer:
            return {
                ...state,
                runLoader: action.payload.acceptingRejecting
            }
        case acceptRejectCustomerSuccess:
            return {
                ...state,
                runLoader: action.payload.acceptingRejecting,
                data: action.payload.data,
                error: action.payload.error
            }
        case acceptRejectCustomerFailure:
            return {
                ...state,
                runLoader: action.payload.acceptingRejecting,
                data: action.payload.data,
                error: action.payload.error
            }
        case acceptRejectCustomerReset:
            return {
                ...acceptingRejectingState,
            }
        default:
            return state;
    }
}

export default AcceptorRejectCustomerReducer;