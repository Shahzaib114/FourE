import { getPickandDropDetails, getPickandDropDetailsFailure, getPickandDropDetailsSuccess } from "../../Actions/getPickandDropLocations/actionTypes"

const PickandDropDetailsState = {
    runLoader: true,
    data: null,
    error: null
}

const PickandDropDetailsReducer = (state = PickandDropDetailsState, action) => {
    switch (action.type) {
        case getPickandDropDetails:
            return {
                ...state,
                runLoader: action.payload.locationDetails
            }
        case getPickandDropDetailsSuccess:
            return {
                ...state,
                runLoader: action.payload.locationDetails,
                data: action.payload.data,
                error: action.payload.error
            }
        case getPickandDropDetailsFailure:
            return {
                ...state,
                runLoader: action.payload.locationDetails,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default PickandDropDetailsReducer;