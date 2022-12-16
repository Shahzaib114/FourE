import ClientLayer from "../../../components/Layers/ClientLayer";
import { setvehicleInformation, setvehicleInformationSuccess, setvehicleInformationFailure } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const DriverVehicleDetails = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().UserVehicleDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: setvehicleInformation,
        payload: {vechiledetails : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? setvehicleInformationSuccess : setvehicleInformationFailure,
        payload : {vechiledetails : status, data: data, error : error}
    }
}