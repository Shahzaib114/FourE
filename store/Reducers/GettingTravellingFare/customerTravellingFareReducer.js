import { getTravelfare, getTravelfareFailure, getTravelfareSuccess } from "../../Actions/getPickandDropFare/actionTypes"

const customerTravellingFareState = {
    runLoader: false,
    data: null,
    error: null
}

const customerTravellingFareReducer = (state = customerTravellingFareState, action) => {
    switch (action.type) {
        case getTravelfare:
            return {
                ...state,
                runLoader: action.payload.travelingFare
            }
        case getTravelfareSuccess:
            return {
                ...state,
                runLoader: action.payload.travelingFare,
                data: action.payload.data,
                error: action.payload.error
            }
        case getTravelfareFailure:
            return {
                ...state,
                runLoader: action.payload.travelingFare,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default customerTravellingFareReducer;