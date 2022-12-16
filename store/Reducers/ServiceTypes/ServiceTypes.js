import { getServiceTypes , ServiceTypeSuccess, ServiceTypeFailure } from "../../Actions/ServiceTypes/actionTypes";
const ServiceTypesState = {
    runLoader: true,
    data: null,
    error: null
}

const ServiceTypesReducer = (state = ServiceTypesState, action) => {
    switch (action.type) {
        case getServiceTypes:
            return {
                ...state,
                runLoader: action.payload.serviceTypes
            }
        case ServiceTypeSuccess:
            return {
                ...state,
                runLoader: action.payload.serviceTypes,
                data: action.payload.data,
                error: action.payload.error
            }
        case ServiceTypeFailure:
            return {
                ...state,
                runLoader: action.payload.serviceTypes,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default ServiceTypesReducer;