import ClientLayer from "../../../components/Layers/ClientLayer"
import { getNotifications, getNotificationsFailure, getNotificationsSuccess } from "./actionTypes"

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const NotificationData = () => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().NotificationData((data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error ))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: getNotifications,
        payload: {gettingNotification : status}
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type : error == null ? getNotificationsSuccess : getNotificationsFailure,
        payload : {gettingNotification : status, data: data, error : error}
    }
}