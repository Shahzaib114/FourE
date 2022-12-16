import { View, Text, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../customDrawerIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTravelHistory } from '../../store/Actions/getTravelHistory/DriverTravelHistory';
import CustomBackArrow from '../CustomBackArrow';
import Colors from '../../utility/colors/Colors';

const NotificationScreen = ({ navigation }) => {
    const data = [
        {
            id: '1', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '2', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('mustardColor')} size={20} />,
            title: 'Special Trip', description: 'Rahim Yar Khan',
        },
        {
            id: '3', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Lahore',
        },
        {
            id: '4', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '5', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Special Trip', description: 'Sawat',
        },
        {
            id: '6', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '7', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Special Trip', description: 'Karachi',
        },
        {
            id: '8', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '9', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '10', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '11', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '12', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '13', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro',
        },
        {
            id: '14', imgOrIcon: <Fontisto name='origin' color={Colors.getLightColor('greenColor')} size={20} />,
            title: 'Get 10% Discount to Multan', description: 'Powered by Metro last',
        },
    ]

    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);

    // const loading = useSelector((state) => state.travelHistory.runLoader)
    // const data = useSelector((state) => state.travelHistory.data)
    // const error = useSelector((state) => state.travelHistory.error)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchTravelHistory())
    // }, []);

    // useEffect(() => {
    //     // console.log('loader: ', loading)
    //     setDisplayView(loading)
    //     if (!loading && data != null) {
    //         // navigation.navigate('EmailSignup')
    //         // set(data)
    //         console.log(data)
    //         setTravelHistoryArray(data)

    //     }
    //     else if (!loading && error != null) {
    //         //code for error message display 
    //         alert('Credentials are Wrong')

    //     }
    // }, [loading])


    return (
        <View style={styles.container}>
            <View style={styles.HeaderViewStyle}>
                <View style={styles.barViewStyle}>
                    <CustomeDrawerIcon />

                    <TouchableOpacity style={styles.prifileImageView}
                        onPress={() => navigation.navigate('ProfileScreen')}>
                        <Image source={require('../../assets/Images/imgTwo.jpg')}
                            style={styles.profileImageStyle}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.carImageView}>

                    <Text style={styles.notificationsText}>
                        Notifications
                    </Text>
                    <Ionicons style={styles.notificationIcon}
                        name='notifications' size={30}
                        color={Colors.getLightColor('primaryColor')}
                    />
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.75 }}>
                <FlatList
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.notificationAPIIcon}>
                            <Text >
                                {item.imgOrIcon}
                            </Text>
                            <View style={styles.verticalLine} />
                            <View>
                                <Text style={styles.mainTextStyle}>

                                    {item.title}
                                </Text>
                                <Text style={styles.subTextStyle}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )}
                >
                </FlatList>
            </View>
        </View>
    )
};
export default NotificationScreen;