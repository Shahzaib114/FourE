import { getRider, getRiderFailure, getRiderReset, getRiderSuccess } from "../../Actions/gettingRider/actionTypes"

const GettingDetailsState = {
    runLoader: false,
    data: null,
    error: null
}

const GettingRiderDetailsReducer = (state = GettingDetailsState, action) => {
    switch (action.type) {
        case getRider:
            return {
                ...state,
                runLoader: action.payload.gettingRider
            }
        case getRiderSuccess:
            return {
                ...state,
                runLoader: action.payload.gettingRider,
                data: action.payload.data,
                error: action.payload.error
            }
        case getRiderFailure:
            return {
                ...state,
                runLoader: action.payload.gettingRider,
                data: action.payload.data,
                error: action.payload.error
            }
        case getRiderReset:
            return {
                ...GettingDetailsState,
            }
        default:
            return state
    }
}

export default GettingRiderDetailsReducer;