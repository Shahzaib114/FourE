import ClientLayer from "../../../components/Layers/ClientLayer"
import { getServiceTypes , ServiceTypeSuccess, ServiceTypeFailure } from "../ServiceTypes/actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchServiceTypes = () => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().fetchServiceTypes((data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getServiceTypes,
        payload: {serviceTypes : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? ServiceTypeSuccess : ServiceTypeFailure,
        payload : {serviceTypes : status, data: data, error : error}
    }
}