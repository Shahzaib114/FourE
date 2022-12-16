import { setvehicleInformation, setvehicleInformationSuccess, setvehicleInformationFailure } from "../../Actions/vehicleInfo/actionTypes"

const VehicleInfoState = {
    runLoader: false,
    data: null,
    error: null,
}

const VehicleDetailsReducer = (state = VehicleInfoState, action ) => {
    switch(action.type) {
        case setvehicleInformation:
            return {
                ...state,
                runLoader: action.payload.vechiledetails
            }
        case setvehicleInformationSuccess:
            return {
                ...state,
                runLoader: action.payload.vechiledetails,
                data: action.payload.data,
                error: action.payload.error
            }
        case setvehicleInformationFailure:
            return {
                ...state,
                runLoader: action.payload.vechiledetails,
                data: action.payload.data,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default VehicleDetailsReducer;