import { gettingCustomerProfile, gettingCustomerProfileFailure, gettingCustomerProfileSuccess } from "../../Actions/CustomerProfile/actionTypes"

const CustomerDataState = {
    runLoader: true,
    data: null,
    error: null
}

const CustomerProfileReducer = (state = CustomerDataState, action) => {
    switch (action.type) {
        case gettingCustomerProfile:
            return {
                ...state,
                runLoader: action.payload.customerProfile
            }
        case gettingCustomerProfileSuccess:
            return {
                ...state,
                runLoader: action.payload.customerProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        case gettingCustomerProfileFailure:
            return {
                ...state,
                runLoader: action.payload.customerProfile,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerProfileReducer;