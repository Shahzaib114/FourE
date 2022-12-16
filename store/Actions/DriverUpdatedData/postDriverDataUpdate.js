import ClientLayer from "../../../components/Layers/ClientLayer";
import { DriverDataUpdate, DriverDataUpdateFailure, DriverDataUpdateSuccess } from "./actionTypes";

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const PostDriverUpdatedProfile = (payload) => {
    return(dispatch) => {
        dispatch(
            fetching(true)
        )
        ClientLayer.getInstance().getDataService().PostDriverUpdatedProfile(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: DriverDataUpdate,
        payload: {updateDriverProfile : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? DriverDataUpdateSuccess : DriverDataUpdateFailure,
        payload : {updateDriverProfile : status, data: data, error : error}
    }
}