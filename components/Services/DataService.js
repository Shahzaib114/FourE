//Responsible for Managing Network Calls

// const axios = require('axios')
import { ACCEPT_REJECT_RESPONSE, CONFIRMING_CUSTOMER_TRAVEL, CUSTOMER_CANCEL_RIDE, CUSTOMER_CANCEL_RIDE_RESAON, CUSTOMER_FEEDBACK_TO_DRIVER, CUSTOMER_FROM_AND_TO_FARES, CUSTOMER_FUTURE_JOBS, CUSTOMER_LOGIN, CUSTOMER_NOTIFICATIONS, CUSTOMER_PROFILE, CUSTOMER_PROFILE_UPDATE, CUSTOMER_RESEND_SIGNUP_OTP, CUSTOMER_RESET_PASSWORD, CUSTOMER_SIGNUP, CUSTOMER_VERIFY_OTP, CUSTOMET_FORGOT_PASS, DIVER_ARRIVED_AT_RIDER, DRIVERDATA_API, DRIVER_ACTIVE_STATUS, DRIVER_COMPLETED_RIDE, FORGOTPASSMAIL, ForgotPassMail, FORGOTPASSOTP, GETTING_DRIVER_LIVE_LOCATION, GET_DRIVER_PROFILE, GET_TRANSACTION_DETAILS, GET_TRANSACTION_HISTORY, GET_TRAVEL_HISTORY_API, GET_TRAVEL_HISTORY_DETAILS, LOGIN_API, PICK_DROP_DETAILS_API, RESEND_OTP_API, RESETPASSAPI, SERVICETYPES_API, UPDATE_DRIVER_PROFILE, UPDATING_DRIVER_LIVE_LOCATION, VEHICLEINFO_API } from '../Common/Constants';
import axios from 'axios';
class DataService {

    //post user login
    authenticateUser(payload, successCallBack, errorCallBack) {
        axios.post(LOGIN_API,
            {
                email: payload.email,
                password: payload.password,
                status: payload.status,
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data)
            }
            else if (!response.data.success) {
                successCallBack(response.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //post registering new Driver
    userRegisteration(payload, successCallBack, errorCallBack) {
        axios.post(DRIVERDATA_API,
            {
                username: payload.username,
                full_name: payload.full_name,
                email: payload.email,
                phone: payload.phone,
                cnic: payload.cnic,
                license_number: payload.license_number,
                license_expiry: payload.license_expiry,
                password: payload.password,
                c_password: payload.c_password

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data.data.id)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                console.log(error)
                errorCallBack("Network Error", error)
            })
    }

    //get Signup Vehicle Services
    fetchServiceTypes(successCallBack, errorCallBack) {
        axios.get(SERVICETYPES_API)
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post driver vehicle details
    UserVehicleDetails(payload, successCallBack, errorCallBack) {

        const formData = new FormData();
        formData.append('service_type', payload.service_type);
        formData.append('vehicle_number', payload.vehicle_number);
        formData.append('vehicle_model', payload.vehicle_model);
        formData.append('vehicle_color', payload.vehicle_color);
        formData.append('vehicle_make', payload.vehicle_make);
        formData.append('token_tax', payload.token_tax);
        formData.append('driver_id', payload.driver_id);

        payload.interior_pic_path.forEach(file => {
            formData.append("interior_pic[]", file.path);
        });

        payload.exterior_pic_path.forEach(file => {
            formData.append("exterior_pic[]", file.path);
        });

        formData.append('cnic_front', {
            uri: payload.cnic_front, //Your Image File Path,
            type: 'image/jpeg',
            name: `cnic_front_${Date.now()}.jpg`,
        });

        formData.append('cnic_back', {
            uri: payload.cnic_back, //Your Image File Path,
            type: 'image/jpeg',
            name: `cnic_back_${Date.now()}.jpg`,
        });
        formData.append('license_front', {
            uri: payload.license_front, //Your Image File Path,
            type: 'image/jpeg',
            name: `license_front_${Date.now()}.jpg`,
        });
        formData.append('license_back', {
            uri: payload.license_back, //Your Image File Path,
            type: 'image/jpeg',
            name: `license_back_${Date.now()}.jpg`,
        });
        formData.append('profile_pic', {
            uri: payload.profile_pic, //Your Image File Path,
            type: 'image/jpeg',
            name: `profile_pic_${Date.now()}.jpg`,
        });


        axios({
            url: VEHICLEINFO_API,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack('Network Error')
            })
    }

    //post forgot password Mail
    PostingForgotPassword(payload, successCallBack, errorCallBack) {
        axios.post(FORGOTPASSMAIL,
            {
                email: payload.email,
            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post Forgot Password OTP
    PostingForgotPasswordOTP(payload, successCallBack, errorCallBack) {
        axios.post(FORGOTPASSOTP,
            {
                opt: payload.opt,
            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post Reset Password
    updatingResetPassword(payload, successCallBack, errorCallBack) {
        axios.post(RESETPASSAPI,
            {
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post Confirmation Password OTP
    postConfirmationCode(payload, successCallBack, errorCallBack) {
        axios.post(FORGOTPASSOTP,
            {
                opt: payload.opt,
            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post Resend OTP request
    ResendOTPRequest(payload, successCallBack, errorCallBack) {
        axios.post(RESEND_OTP_API,
            {
                email: payload.email,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Tracking Driver Live Location
    PostingDriverLiveLocation(payload, successCallBack, errorCallBack) {
        axios.post(UPDATING_DRIVER_LIVE_LOCATION,
            {
                driver_id: payload.driver_id,
                latitude: payload.latitude,
                longitude: payload.longitude,
                job_id: payload.job_id,
                location: 'Islamabad',
                direction: payload.direction

            }).then(function (response) {
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //get pick and drop details
    getPickandDropLocations(payload, successCallBack, errorCallBack) {
        axios.post(PICK_DROP_DETAILS_API,
            {
                job_id: payload.job_id

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Start Ride
    RideStarted(payload, successCallBack, errorCallBack) {
        axios.post(DIVER_ARRIVED_AT_RIDER,
            {
                driver_id: payload.driver_id,
                job_id: payload.job_id,
                status: payload.status,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Completed Ride
    RideCompleted(payload, successCallBack, errorCallBack) {
        axios.post(DRIVER_COMPLETED_RIDE,
            {
                driver_id: payload.driver_id,
                job_id: payload.job_id,
                status: payload.status,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //get Driver Travel History
    fetchTravelHistory(payload, successCallBack, errorCallBack) {
        axios.post(GET_TRAVEL_HISTORY_API,
            {
                driver_id: payload.driver_id
            })
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //active and Inactive status for driver
    postingActivityStatus(payload, successCallBack, errorCallBack) {
        axios.post(DRIVER_ACTIVE_STATUS,
            {
                is_online: payload.is_online,
                driver_id: payload.id,
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //post id of Travel History Detail
    gettingTravelingDetails(payload, successCallBack, errorCallBack) {
        axios.post(GET_TRAVEL_HISTORY_DETAILS,
            {
                job_id: payload.job_id
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //posting Driver_id to get WalletHistory
    TransactionHistoyDetails(payload, successCallBack, errorCallBack) {
        axios.post(GET_TRANSACTION_HISTORY,
            {
                driver_id: payload.driver_id
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    gettingTransactionDetails(payload, successCallBack, errorCallBack) {
        axios.post(GET_TRANSACTION_DETAILS,
            {
                job_id: payload.job_id
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //get Driver Profile Data
    fetchDriverProfileDetails(payload, successCallBack, errorCallBack) {
        axios.post(GET_DRIVER_PROFILE,
            {
                driver_id: payload.driver_id
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //post Driver Profile Updated Data
    PostDriverUpdatedProfile(payload, successCallBack, errorCallBack) {
        const formData = new FormData();
        formData.append('full_name', payload.full_name);
        formData.append('email_id', payload.email_id);
        formData.append('phone', payload.phone);
        formData.append('password', payload.password);
        formData.append('id', payload.id);

        if (payload.profile_pic == null) {
            console.log('profile pic not updated')
        }
        else {
            formData.append('profile_pic', {
                uri: payload.profile_pic, //Your Image File Path,
                type: 'image/jpeg',
                name: `profile_pic_${Date.now()}.jpg`,
            });
        }

        axios({
            url: UPDATE_DRIVER_PROFILE,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(function (response) {
                console.log('response is', response.data)
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack('Network Error')
            })
    }

    //Accept or Reject Customer
    ResponsetoCustomer(payload, successCallBack, errorCallBack) {
        axios.post(ACCEPT_REJECT_RESPONSE,
            {
                job_id: payload.job_id,
                status: payload.status,
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //Customer Signup Details
    CustomerSignupDetails(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_SIGNUP,
            {
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                phone: payload.phone,
                password: payload.password,
                c_password: payload.c_password,
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data)
            } else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //Customer Login
    CustomerValidation(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_LOGIN,
            {
                email: payload.email,
                password: payload.password,
                status: payload.status,
            }
        ).then(function (response) {
            if (response.data.success) {
                successCallBack(response.data)
            }
            else {
                errorCallBack(response.data.message)
            }
        }).catch(function (error) {
            errorCallBack("Network Error")
        })
    }

    //Customer Signup OTP Confirmation
    postCustomerConfirmationCode(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_VERIFY_OTP,
            {
                opt: payload.opt,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Resend Customer Signup OTP
    ResendCustomerOTPRequest(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_RESEND_SIGNUP_OTP,
            {
                email: payload.email,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post forgot password Mail
    PostingCustomerForgotPassword(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMET_FORGOT_PASS,
            {
                email: payload.email,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //post Confirmation OTP of Customer
    verifyingCustomerForgotOTP(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_VERIFY_OTP,
            {
                opt: payload.opt,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Updating Customer Reset Password
    updatingCustomerResetPassword(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_RESET_PASSWORD,
            {
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //getting Customer Services
    getCustomerServiceTypes(successCallBack, errorCallBack) {
        axios.get(SERVICETYPES_API)
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //getting Fare and Price of Customer Locations
    gettingPickandDropFares(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_FROM_AND_TO_FARES,
            {
                addressFrom: payload.addressFrom,
                addressTo: payload.addressTo,
                service_id: payload.service_id,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Confirm Customer Travel Booking
    ConfirmingCustomerBooking(payload, successCallBack, errorCallBack) {
        console.log(payload)
        if (payload.feature_date === null) {
            axios.post(CONFIRMING_CUSTOMER_TRAVEL,
                {
                    addressFrom: payload.addressFrom,
                    addressTo: payload.addressTo,
                    customer_id: payload.customer_id,
                    service_id: payload.service_id,

                }).then(function (response) {
                    console.log('response is', response.data)
                    if (response.data.success) {
                        successCallBack(response.data)
                    } else {
                        errorCallBack(response.data.message)
                    }
                }).catch(function (error) {
                    errorCallBack("Network Error")
                })
        } else {
            axios.post(CONFIRMING_CUSTOMER_TRAVEL,
                {
                    addressFrom: payload.addressFrom,
                    addressTo: payload.addressTo,
                    customer_id: payload.customer_id,
                    service_id: payload.service_id,
                    feature_date: payload.feature_date

                }).then(function (response) {
                    console.log('response is', response.data)
                    if (response.data.success) {
                        successCallBack(response.data)
                    } else {
                        errorCallBack(response.data.message)
                    }
                }).catch(function (error) {
                    errorCallBack("Network Error")
                })
        }

    }

    //Getting Rider Live Location
    gettingRiderDetails(payload, successCallBack, errorCallBack) {
        axios.post(GETTING_DRIVER_LIVE_LOCATION,
            {
                driver_id: payload.driver_id,
                job_id: payload.job_id,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack("Network Error", error)
            })
    }

    //Cancel Current Ride
    CancelRide(successCallBack, errorCallBack) {
        axios.get(CUSTOMER_CANCEL_RIDE)
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Cancel Reason of Current Ride
    CancelReason(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_CANCEL_RIDE_RESAON,
            {
                driver_id: payload.driver_id,
                job_id: payload.job_id,
            })
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Notifications data of customer side
    NotificationData(successCallBack, errorCallBack) {
        axios.get(CUSTOMER_NOTIFICATIONS)
            .then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data)
                }
            }).catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    //Getting Rider Live Location
    CustomerFeedback(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_FEEDBACK_TO_DRIVER,
            {
                driver_id: payload.driver_id,
                comments: payload.comments,
                star_rating: payload.star_rating

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                console.log(error)
                errorCallBack(error)
            })
    }

    //Getting Customer Profile
    _CustomerProfile(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_PROFILE,
            {
                customer_id: payload.customer_id,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack(error)
            })
    }

    //Updating Customer Profile
    CustomerProfileUpdate(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_PROFILE_UPDATE,
            {
                customer_id: payload.customer_id,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack(error)
            })
    }

    //Customer Future Jobs
    GettingCustomerScheduling(payload, successCallBack, errorCallBack) {
        axios.post(CUSTOMER_FUTURE_JOBS,
            {
                customer_id: payload.customer_id,

            }).then(function (response) {
                if (response.data.success) {
                    successCallBack(response.data)
                } else {
                    errorCallBack(response.data.message)
                }
            }).catch(function (error) {
                errorCallBack(error)
            })
    }
}

export default DataService;