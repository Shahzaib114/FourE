import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, Alert } from 'react';
import styles from './style';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../../customDrawerIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTravelHistory } from '../../../store/Actions/getTravelHistory/DriverTravelHistory';
import Colors from '../../../utility/colors/Colors';
import { gettingTravelingDetails } from '../../../store/Actions/getTravelingDetails/TravelingDetails';
import CustomeHeader from '../../customeHeader';
import ClientLayer from '../../../components/Layers/ClientLayer';

const CustomerTravelHistory = ({ navigation, route }) => {
    const data1 = [
        {
            id: '1', txt: 'firsrt', img: require('../../../assets/Images/imgOne.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 27 2022',
        },
        {
            id: '2', txt: 'firsrt', img: require('../../../assets/Images/imgTwo.jpg'),
            rideType: 'Special Trip', userlocation: 'Rahim Yar Khan', username: 'Usama Bhatti', dated: 'Aug, 20 2022',
        },
        {
            id: '3', txt: 'firsrt', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Lahore', username: 'Adil', dated: 'Aug, 5 2022',
        },
        {
            id: '4', img: require('../../../assets/Images/imgTwo.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Ali Hassan', dated: 'Aug, 27 2022',
        },
        {
            id: '5', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Special Trip', userlocation: 'Sawat', username: 'Shahzaib', dated: 'Aug, 5 2022',
        },
        {
            id: '6', img: require('../../../assets/Images/imgTwo.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Zohaib', dated: 'Aug, 27 2022',
        },
        {
            id: '7', img: require('../../../assets/Images/imgOne.jpg'),
            rideType: 'Special Trip', userlocation: 'Karachi', username: 'Shahzaib', dated: 'Aug, 5 2022',
        },
        {
            id: '8', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 27 2022',
        },
        {
            id: '9', img: require('../../../assets/Images/imgOne.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 5 2022',
        },
        {
            id: '10', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 27 2022',
        },
        {
            id: '11', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 5 2022',
        },
        {
            id: '12', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 5 2022',
        },
        {
            id: '13', img: require('../../../assets/Images/imgFour.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib', dated: 'Aug, 27 2022',
        },
        {
            id: '14', img: require('../../../assets/Images/imgOne.jpg'),
            rideType: 'Casual Ride', userlocation: 'Islamabad', username: 'Shahzaib 14', dated: 'Aug, 5 2022',
        },
    ]
    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);
    const [travelHistoryResponse, setTravelHistoryResponse] = useState(false);


    const loading = useSelector((state) => state.travelHistory.runLoader)
    const data = useSelector((state) => state.travelHistory.data)
    const error = useSelector((state) => state.travelHistory.error)
    const dispatch = useDispatch();

    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('customer_id', result => {
            console.log('customer_id is', result)
            dispatch(fetchTravelHistory({ driver_id: JSON.parse(result) }))
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

    const gettingDetails = (id) => {
        detailsDispatch(gettingTravelingDetails({ job_id: id }))
    }

    const detailsLoading = useSelector((state) => state.travelHistoryDetails.runLoader)
    const detailsData = useSelector((state) => state.travelHistoryDetails.data)
    const detailsError = useSelector((state) => state.travelHistoryDetails.error)
    const detailsDispatch = useDispatch();

    useEffect(() => {
        setTravelHistoryResponse(detailsLoading)
        if (!detailsLoading && detailsData != null) {
            navigation.navigate('TripDetails', { paramData: detailsData })
        }
        else if (!detailsLoading && detailsError != null) {
            alert('Credentials are Wrong')
        }
    }, [detailsLoading])

    return (
        <View style={styles.container}>
            <CustomeHeader
                label={"History"}
                leftIcon={
                    <CustomeDrawerIcon />
                }
                userorDriverProfile={'CustomerProfileScreen'}
                screen_icon={
                    <Octicons name='history' color={Colors.getLightColor('primayColor')} size={60}
                        style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                    >
                    </Octicons>
                }
                screen_name={'Travel History'}
                screen_info={`Here you can see the following details of your recent trips ${'\n'} 
                1 : Trip Starting Lcoation${'\n'}
                2 : Trip Ending Location${'\n'}
                3 : Total Distance Traveled${'\n'}
                4 : Total Amount of Trip${'\n'}
                5 : Trip Date${'\n'}
                6 : Trip Accepted/Rejected${'\n'}
                7 : Booking Ids of your Trips`
                }
            ></CustomeHeader>

            {displayView || travelHistoryResponse ?
                (
                    <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size={'large'} color='black'></ActivityIndicator>
                    </View>
                )
                :
                (
                    <View>
                        <View style={styles.mappingOuterView}>
                            {data === 'error' ?
                                (
                                    <View style={styles.emptyOuterView}>
                                        <Text style={styles.emptyText}>
                                            No Job History
                                        </Text>
                                    </View>
                                )
                                :
                                (
                                    <FlatList
                                        keyExtractor={(item, index) => {
                                            return index.toString();
                                        }}
                                        data={travelHistoryArray}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => {
                                                {
                                                    gettingDetails(item.job_id)
                                                }
                                            }}
                                                style={styles.allitemsView}>

                                                <View style={styles.textualMainView}>

                                                    <Text style={styles.userNameText}>
                                                        {item.from}
                                                    </Text>
                                                    <Text style={styles.locationtypeText}>
                                                        {item.to}
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        {item.distance}KM
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        {item.price}Pkr
                                                    </Text>
                                                </View>
                                                <View style={styles.datedView}>
                                                    <Text style={styles.datedText}>
                                                        {item.date}
                                                    </Text>
                                                    <Text style={{
                                                        fontFamily: 'Montserrat-Medium', fontSize: 13, margin: '2%', borderRadius: 10
                                                    }}>
                                                        {item.status == '4' ?
                                                            (
                                                                <Text style={{ color: Colors.getLightColor('greenColor'), borderRadius: 10 }}>
                                                                    Completed
                                                                </Text>
                                                            )
                                                            :
                                                            (
                                                                <Text style={{ color: Colors.getLightColor('mustardColor'), borderRadius: 10 }}>
                                                                    Rejected
                                                                </Text>
                                                            )}
                                                    </Text>
                                                    <Text style={styles.datedText}>
                                                        Booking id: {item.job_booking_id}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    >
                                    </FlatList>
                                )
                            }
                        </View>
                    </View>
                )
            }
        </View>
    )
};
export default CustomerTravelHistory;