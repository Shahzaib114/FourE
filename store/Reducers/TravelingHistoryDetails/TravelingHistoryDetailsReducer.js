import { getTravelingDetails, getTravelingDetailsFailure, getTravelingDetailsSuccess } from "../../Actions/getTravelingDetails/actionTypes"

const travelHistoryDetailsState = {
    runLoader: false,
    data: null,
    error: null
}

const TravelingHistoryDetailsReducer = (state = travelHistoryDetailsState, action) => {
    switch (action.type) {
        case getTravelingDetails:
            return {
                ...state,
                runLoader: action.payload.gettingDetails
            }
        case getTravelingDetailsSuccess:
            return {
                ...state,
                runLoader: action.payload.gettingDetails,
                data: action.payload.data,
                error: action.payload.error
            }
        case getTravelingDetailsFailure:
            return {
                ...state,
                runLoader: action.payload.gettingDetails,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default TravelingHistoryDetailsReducer;