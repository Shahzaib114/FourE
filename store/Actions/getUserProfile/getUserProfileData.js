import ClientLayer from "../../../components/Layers/ClientLayer"
import { getDriverProfileData, getDriverProfileDataFailure, getDriverProfileDataSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchDriverProfileDetails = (payload) => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().fetchDriverProfileDetails(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getDriverProfileData,
        payload: {profileData : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getDriverProfileDataSuccess : getDriverProfileDataFailure,
        payload : {profileData : status, data: data, error : error}
    }
}