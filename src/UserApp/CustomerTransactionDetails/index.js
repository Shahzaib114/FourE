import { View, Text, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import CustomBackArrow from '../../CustomBackArrow';
import Colors from '../../../utility/colors/Colors';
import CustomeHeader from '../../customeHeader';
import { gettingTransactionDetails } from '../../../store/Actions/TransactionDetails/TransactionDetails';
import ClientLayer from '../../../components/Layers/ClientLayer';
import CustomerHeader from '../CustomerHeader';
import { ScrollView } from 'react-native-gesture-handler';
const CustomerTransactionDetails = ({ navigation, route }) => {
    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);
    const [isOnGoing, setIsOnGoing] = useState(false)
    const [rideStatus, setRideStatus] = useState('');

    const loading = useSelector((state) => state.transactionDetails.runLoader)
    const data = useSelector((state) => state.transactionDetails.data)
    const error = useSelector((state) => state.transactionDetails.error)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(gettingTransactionDetails({ job_id: route.params.paramJobId }))
        ClientLayer.getInstance().getDataManager().GetValueForKey('alreadyStarted', result => {
            let isStarted = JSON.parse(result)
            if (isStarted == 'jobAcceptance') {
                setRideStatus('OnGoing Ride')
            }
        })
    }, []);
    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            setTravelHistoryArray(data)
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])
    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.headerView}>
                    <CustomerHeader
                        label={"Transaction Details"}
                        leftIcon={
                            <CustomBackArrow />
                        }
                        userorDriverProfile={'CustomerProfileScreen'}
                        screen_icon={
                            <Octicons name='history' color={Colors.getLightColor('primayColor')} size={60}
                                style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                            >
                            </Octicons>
                        }
                        rideStatus={rideStatus}
                        book_id={`Booking Id: 4E22-3`}
                        screen_name={'Transaction Details'}
                        screen_info={`Here you can see the following details of your recent trips ${'\n'} 
                    1 : Your Name and Rating ${'\n'}
                    2 : Trip Trip details and Time ${'\n'}
                    3 : Trip Starting Location${'\n'}
                    4 : Payment Method${'\n'}
                    5 : Invoice of Your Transaction${'\n'}`
                        }




                    ></CustomerHeader>
                </View>
                <View style={styles.secondViewContainer}>
                    <View style={styles.namesecondParentView}>
                        <View style={styles.nameThirdParentView}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('whiteColor') }}>
                                    Usman Bhatti
                                </Text>
                                <Text style={{ fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('whiteColor') }}>
                                    5.0
                                </Text>
                            </View>
                        </View>
                        <View style={styles.dateSecondParentView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name='calendar-o' color={Colors.getLightColor('whiteColor')}
                                    style={styles.calenderIcon} />
                                <Text style={{ fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('whiteColor') }}>
                                    {travelHistoryArray.date}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name='time-outline' size={17} color={Colors.getLightColor('whiteColor')}
                                    style={{ marginRight: '10%', alignItems: 'center' }}
                                />
                                <Text style={{ fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('whiteColor') }}>
                                    {travelHistoryArray.time}
                                </Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='timer' size={17} color={Colors.getLightColor('whiteColor')}
                                style={{ marginRight: '10%', alignItems: 'center' }}
                            />
                            <Text style={{ fontFamily: 'Montserrat-Medium', color: Colors.getLightColor('whiteColor') }}>
                                Total Time
                            </Text>
                        </View> */}
                        </View>
                    </View>

                    <View style={styles.locationsView}>
                        <View style={styles.IconsView}>
                            <Octicons name='dot-fill' size={25} color="#0887FC"
                                style={styles.dotIcon}
                            />
                            <View style={styles.verticalLine} />
                            <Fontisto name='rectangle' size={15} color={Colors.getLightColor('blackColor')} style={styles.rectangleIcon}>
                            </Fontisto>
                        </View>
                        <View style={styles.textualView}>
                            <Text
                                style={styles.locationText}>
                                {travelHistoryArray.from}
                            </Text>
                            <Text
                                style={styles.locationText}>
                                {travelHistoryArray.to}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.verticalLinebeforeCash} />

                    <View style={styles.cashParentView}>
                        <MaterialIcons name='payment' color={Colors.getLightColor('primaryColor')} size={20} />
                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={styles.rideTypeText}>
                                Cash
                            </Text>
                            <Text style={styles.datedText}>
                                Default Payment Method
                            </Text>
                        </View>
                    </View>

                    <View style={styles.verticalLinebeforeCash} />

                    <View style={styles.billHeader}>
                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={styles.rideTypeText}>
                                Bill
                            </Text>
                            <Text style={styles.datedText}>
                                6750
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={styles.rideTypeText}>
                                Date
                            </Text>
                            <Text style={styles.datedText}>
                                {travelHistoryArray.date}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.invoiceParentView}>
                    <View style={styles.invoiceSecondParentView}>
                        <Text style={styles.InvoiceText}>
                            Invoice
                        </Text>
                    </View>
                    <View style={styles.descriptionparentView}>
                        <View >
                            <Text style={styles.rideTypeText}>
                                Description
                            </Text>
                            <Text style={styles.datedText}>
                                Booking ID
                            </Text>
                        </View>
                        <View >
                            <Text style={styles.rideTypeText}>
                                Details
                            </Text>
                            <Text style={styles.datedText}>
                                {travelHistoryArray.job_booking_id}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.verticalLinebeforeCash} />
                    <View style={styles.descriptionparentView}>
                        <Text style={styles.rideTypeText}>
                            Distance Traveled
                        </Text>
                        <Text style={styles.datedText}>
                            {travelHistoryArray.distance}KM
                        </Text>
                    </View>
                    <View style={styles.verticalLinebeforeCash} />
                    <View style={styles.descriptionparentView}>
                        <Text style={styles.rideTypeText}>
                            Time Taken
                        </Text>
                        <Text style={styles.datedText}>
                            1 Hour
                        </Text>
                    </View>
                    <View style={styles.verticalLinebeforeCash} />
                    <View style={styles.descriptionparentView}>
                        <Text style={styles.rideTypeText}>
                            Basic Fare
                        </Text>
                        <Text style={styles.datedText}>
                            PKR. {travelHistoryArray.price}
                        </Text>
                    </View>
                    <View style={styles.verticalLinebeforeCash} />
                    <View style={styles.descriptionparentView}>
                        <Text style={styles.totalText}>
                            Total
                        </Text>
                        <Text style={styles.totalPriceText}>
                            PKR. {travelHistoryArray.price}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
export default CustomerTransactionDetails