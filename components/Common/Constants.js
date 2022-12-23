//responsible for Managing EndPoints

const BASE_URL = "https://fore.seoconsultant.com/api/";
const PUSHER_INSTANCE_ID = '2f848913-ed9e-4c5b-9fc0-5db12dbc0c5b';
module.exports = {

    PUSHER_INSTANCE_ID,

    LOGIN_API: BASE_URL +  "sessions",
    DRIVERDATA_API: BASE_URL + 'driver-signup',
    VEHICLEINFO_API: BASE_URL + 'vehicles',
    SERVICETYPES_API: BASE_URL + 'serviceTypes',
    FORGOTPASSMAIL: BASE_URL + 'sendResetLink',
    FORGOTPASSOTP: BASE_URL + 'validate-opt',
    RESETPASSAPI: BASE_URL + 'resetPassword',
    RESEND_OTP_API: BASE_URL + 'resend-mail-opt',
    PICK_DROP_DETAILS_API: BASE_URL + 'get-current-job',
    GET_TRAVEL_HISTORY_API: BASE_URL + 'driver-job-history',
    GET_TRAVEL_HISTORY_DETAILS: BASE_URL + 'driver-trip-detail',
    DRIVER_ACTIVE_STATUS : BASE_URL + 'driver-is-online',
    GET_TRANSACTION_HISTORY : BASE_URL + 'driver-transaction-history',
    GET_TRANSACTION_DETAILS : BASE_URL + 'driver-transaction-detail',
    ACCEPT_REJECT_RESPONSE: BASE_URL + 'change-job-status',
    GET_DRIVER_PROFILE: BASE_URL + 'show-driver-profile',
    UPDATE_DRIVER_PROFILE: BASE_URL + 'driver-profile-update',
    CUSTOMER_SIGNUP: BASE_URL + 'customer-signup',
    CUSTOMER_LOGIN: BASE_URL + 'customer-sign-in',
    CUSTOMER_RESEND_SIGNUP_OTP : BASE_URL + 'customer-resend-mail-opt',
    CUSTOMET_FORGOT_PASS : BASE_URL + 'customer-forget-pass',
    CUSTOMER_VERIFY_OTP : BASE_URL + 'customer-validate-opt',
    CUSTOMER_RESET_PASSWORD : BASE_URL + 'customer-reset-password',
    CUSTOMER_FROM_AND_TO_FARES : BASE_URL + 'calculate-price',
    CONFIRMING_CUSTOMER_TRAVEL : BASE_URL + 'customer-create-job',
    UPDATING_DRIVER_LIVE_LOCATION : BASE_URL + 'track-location',
    GETTING_DRIVER_LIVE_LOCATION : BASE_URL + 'driver-live-location',
    DIVER_ARRIVED_AT_RIDER : BASE_URL + 'driver-start-job',
    DRIVER_COMPLETED_RIDE : BASE_URL + 'driver-complete-job',
    CUSTOMER_CANCEL_RIDE : BASE_URL + 'job-cancel-reason',
    CUSTOMER_CANCEL_RIDE_RESAON : BASE_URL + 'job-cancel',
    CUSTOMER_NOTIFICATIONS : BASE_URL + 'notifications',
    CUSTOMER_FEEDBACK_TO_DRIVER : BASE_URL + 'customerFeedBack',
    CUSTOMER_PROFILE : BASE_URL + 'customer-show-profile',
    CUSTOMER_PROFILE_UPDATE :  BASE_URL+ 'customer-update-profile',
    CUSTOMER_FUTURE_JOBS : BASE_URL + 'feature-jobs',
    CUSTOMER_FUTURE_JOBS_DETAILS : BASE_URL + 'edit-feature-job'
};
