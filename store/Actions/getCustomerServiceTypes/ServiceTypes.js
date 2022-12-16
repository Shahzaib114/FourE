import ClientLayer from "../../../components/Layers/ClientLayer"
import { getServiceTypes , ServiceTypeSuccess, ServiceTypeFailure } from "../ServiceTypes/actionTypes"

export const onResetServiceTypes = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const getCustomerServiceTypes = () => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().getCustomerServiceTypes((data) => {
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
        payload: {customerServiceTypes : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? ServiceTypeSuccess : ServiceTypeFailure,
        payload : {customerServiceTypes : status, data: data, error : error}
    }
}