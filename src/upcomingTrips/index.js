import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../customDrawerIcon';
import Colors from '../../utility/colors/Colors';
const UpComingTrips = ({ navigation }) => {
    const [showDate, setShowDate] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [ServiceTypes, setServiceTypes] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.day}</Text>
            <Text style={[styles.title, textColor]}>{item.date}</Text>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? Colors.getLightColor('secondaryColor') : Colors.getLightColor('primaryColor');
        const color = item.id === selectedId ? Colors.getLightColor('whiteColor') : Colors.getLightColor('whiteColor');
        return (
            <View >
                <Item
                    item={item}
                    onPress={() => {
                        setSelectedId(item.id)
                        console.log(item.id)
                    }
                    }
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </View>
        );
    };
    const CartItems = [
        {
            id: '1', name: "Russ Hant", ItemNum: '3 Items x ', date: '24 june, 12:30', status: "Cancelled  ",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$20.10', colortext: 'orange', color: "red", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '2', name: "Alexa", ItemNum: '4 Items x ', date: '25 june, 12:20', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$16.40', colortext: 'green', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '3', name: "Shahzaib", ItemNum: '2 Items x ', date: '25 june, 1:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$13.20', colortext: 'purple', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '4', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '5', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '6', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '7', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '8', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
        {
            id: '9', name: "Russ Hant", ItemNum: '5 Items x ', date: '26 june, 11:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$15.50', colortext: 'green', color: "#37a514", order: "Order Now",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,
        },
    ]
    const CartItems1 = [
        {
            id: '1', name: "Russ Hant", ItemNum: '3 Items x ', date: '24 june, 12:30', status: "Cancelled  ",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$20.10', colortext: 'orange', color: "red", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '2', name: "Alexa", ItemNum: '4 Items x ', date: '25 june, 12:20', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$16.40', colortext: 'green', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
        {
            id: '3', name: "Shahzaib", ItemNum: '2 Items x ', date: '25 june, 1:30', status: "Completed",
            detail: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur lorem ipsum. ',
            rating: '4.3', price: '$13.20', colortext: 'purple', color: "#37a514", order: "Re-Order",
            icons: <AntDesign name="clockcircleo" size={20} color="orange" style={styles.ClockLogo} ></AntDesign>,
            icons1: <Ionicons name="people-outline" size={25} color="orange" style={styles.PeopleLogo} ></Ionicons>,

        },
    ]
    const [displayView, setDisplayView] = useState(false);
    const [travelHistoryArray, setTravelHistoryArray] = useState([]);
    const [selectCategory, setSelectCategory] = useState();

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

    const SelectCategory = (param) => {
        switch (param) {
            case 'Upcoming':
                if (CartItems == 0) {
                    return (
                        <View style={styles.nothingShowView}>
                            <Text style={styles.historyText}>
                                Nothing to Show here
                            </Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.flatlistParentView}>
                            <FlatList
                                keyExtractor={(item, index) => {
                                    return index.toString();
                                }}
                                horizontal={false}
                                data={CartItems}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.allitemsView}>
                                        <Image source={require('../../assets/Images/imgOne.jpg')} style={styles.imageStyling}>
                                        </Image>
                                        <View style={styles.textualMainView}>
                                            <Text style={styles.userNameText}>
                                                {item.to}Lahore
                                            </Text>
                                            <Text style={styles.rideTypeText}>
                                                {item.name} Usman Shinwari
                                            </Text>
                                            <Text style={styles.locationtypeText}>
                                                {item.from}Rahim Yar khan
                                            </Text>
                                        </View>
                                        <View style={styles.datedView}>
                                            <Text style={styles.datedText}>
                                                {item.date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            >
                            </FlatList>
                        </View>
                    )
                }
            case 'History':
                if (CartItems1 == 0) {
                    return (
                        <View style={styles.nothingShowView}>
                            <Text style={styles.historyText}>
                                Nothing to Show here
                            </Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.flatlistParentView}>
                            <FlatList
                                keyExtractor={(item, index) => {
                                    return index.toString();
                                }}
                                horizontal={false}
                                data={CartItems1}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.allitemsView}>
                                        <Image source={require('../../assets/Images/imgOne.jpg')} style={styles.imageStyling}>
                                        </Image>
                                        <View style={styles.textualMainView}>
                                            <Text style={styles.userNameText}>
                                                {item.to}Peshawar
                                            </Text>
                                            <Text style={styles.rideTypeText}>
                                                {item.name} Usman
                                            </Text>
                                            <Text style={styles.locationtypeText}>
                                                {item.from} Islamabad
                                            </Text>
                                        </View>
                                        <View style={styles.datedView}>
                                            <Text style={styles.datedText}>
                                                {item.date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            >
                            </FlatList>
                        </View>
                    )
                }
            default:
                return (
                    <View style={styles.flatlistParentView}>
                        <FlatList
                            keyExtractor={(item, index) => {
                                return index.toString();
                            }}
                            horizontal={false}
                            data={CartItems}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.allitemsView}>
                                    <Image source={require('../../assets/Images/imgOne.jpg')} style={styles.imageStyling}>
                                    </Image>
                                    <View style={styles.textualMainView}>
                                        <Text style={styles.userNameText}>
                                            {item.to}Lahore
                                        </Text>
                                        <Text style={styles.rideTypeText}>
                                            {item.name} Usman Shinwari
                                        </Text>
                                        <Text style={styles.locationtypeText}>
                                            {item.from}Rahim Yar khan
                                        </Text>
                                    </View>
                                    <View style={styles.datedView}>
                                        <Text style={styles.datedText}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        >
                        </FlatList>
                    </View>
                )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.HeaderViewStyle}>
                <View style={styles.HeaderViewStyle}>
                    <View style={styles.barViewStyle}>
                        <CustomeDrawerIcon />
                        <TouchableOpacity style={styles.headerImageOpacity}
                            onPress={() => navigation.navigate('ProfileScreen')}>
                            <Image source={require('../../assets/Images/imgTwo.jpg')}
                                style={styles.headerImageStyle}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.carImageView}>
                        <Text style={styles.notificationsText}>
                            UpComing Trips
                        </Text>
                        <MaterialCommunityIcons style={styles.notificationIcon}
                            name='layers-triple-outline' size={30}
                            color={Colors.getLightColor('primaryColor')}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.78 }}>
                <View style={styles.featureRideView}>
                    <TouchableOpacity style={[styles.catContainer, selectCategory === 'Upcoming' && { backgroundColor: Colors.getLightColor('primaryColor') }]}
                        onPress={() => setSelectCategory('Upcoming')}>
                        <Text style={styles.userNameText}>Feature Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.catContainer, selectCategory === 'History' && { backgroundColor: Colors.getLightColor('primaryColor') }]}
                        onPress={() => setSelectCategory('History')}>
                        <Text style={styles.userNameText}>Accepted</Text>
                    </TouchableOpacity>
                </View>
                {SelectCategory(selectCategory)}
            </View>
        </View>
    )
};
export default UpComingTrips;
