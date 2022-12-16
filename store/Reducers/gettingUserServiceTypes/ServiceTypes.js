import { getServiceTypes , ServiceTypeSuccess, ServiceTypeFailure } from "../../Actions/ServiceTypes/actionTypes";
const ServiceTypesState = {
    runLoader: true,
    data: null,
    error: null
}

const CustomerServiceTypesReducer = (state = ServiceTypesState, action) => {
    switch (action.type) {
        case getServiceTypes:
            return {
                ...state,
                runLoader: action.payload.customerServiceTypes
            }
        case ServiceTypeSuccess:
            return {
                ...state,
                runLoader: action.payload.customerServiceTypes,
                data: action.payload.data,
                error: action.payload.error
            }
        case ServiceTypeFailure:
            return {
                ...state,
                runLoader: action.payload.customerServiceTypes,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default CustomerServiceTypesReducer;