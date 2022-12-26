import { getNotifications, getNotificationsFailure, getNotificationsReset, getNotificationsSuccess } from "../../Actions/CustomerNotifications/actionTypes"

const notificationDataState = {
    runLoader: true,
    data: null,
    error: null
}

const NotificationDataReducer = (state = notificationDataState, action) => {
    switch (action.type) {
        case getNotifications:
            return {
                ...state,
                runLoader: action.payload.gettingNotification
            }
        case getNotificationsSuccess:
            return {
                ...state,
                runLoader: action.payload.gettingNotification,
                data: action.payload.data,
                error: action.payload.error
            }
        case getNotificationsFailure:
            return {
                ...state,
                runLoader: action.payload.gettingNotification,
                data: action.payload.data,
                error: action.payload.error
            }
        case getNotificationsReset:
            return {
                ...notificationDataState,
            }
        default:
            return state
    }
}

export default NotificationDataReducer;