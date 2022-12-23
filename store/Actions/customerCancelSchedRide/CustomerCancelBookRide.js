import ClientLayer from "../../../components/Layers/ClientLayer";
import { customerCancelBookRide, customerCancelBookRideFailure, customerCancelBookRideReset, customerCancelBookRideSuccess } from "./actionTypes";

export const onResetCustomerCancelingBookedRide = () => {
    return (dispatch) => {
        dispatch(fetching(false))
        dispatch(onFetchingResponse())
    }
}

export const CustomerCancelingBookedRide = (payload) => {
    return (dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().CustomerCancelingBookedRide(payload, (data) => {
            dispatch(onFetchingResponse(false, data, null))
        }, (error) => {
            dispatch(onFetchingResponse(false, null, error))
        }
        )
    }
}

const fetching = (status) => {
    return {
        type: customerCancelBookRide,
        payload: { cancelingBookRide: status }
    }
}

export const resetReducer = () => {
    return {
        type: customerCancelBookRideReset
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? customerCancelBookRideSuccess : customerCancelBookRideFailure,
        payload: { cancelingBookRide: status, data: data, error: error }
    }
}