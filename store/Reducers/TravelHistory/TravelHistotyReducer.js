import { getTravelHistory, getTravelHistoryFailure, getTravelHistoryReset, getTravelHistorySuccess } from "../../Actions/getTravelHistory/actionTypes"

const PickandDropDetailsState = {
    runLoader: true,
    data: null,
    error: null
}

const TravelHistotyReducer = (state = PickandDropDetailsState, action) => {
    switch (action.type) {
        case getTravelHistory:
            return {
                ...state,
                runLoader: action.payload.travelhistory
            }
        case getTravelHistorySuccess:
            return {
                ...state,
                runLoader: action.payload.travelhistory,
                data: action.payload.data,
                error: action.payload.error
            }
        case getTravelHistoryFailure:
            return {
                ...state,
                runLoader: action.payload.travelhistory,
                data: action.payload.data,
                error: action.payload.error
            }
        case getTravelHistoryReset:
            return {
                ...PickandDropDetailsState,
            }
        default:
            return state
    }
}

export default TravelHistotyReducer;