import { View, Text, Image, TouchableOpacity, ImageBackground, } from 'react-native'
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomeDrawerIcon from '../customDrawerIcon';
import Colors from '../../utility/colors/Colors';
import CustomeHeader from '../customeHeader';

const Invoice = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <CustomeHeader
                    label={"Transaction Details"}
                    leftIcon={
                        <CustomeDrawerIcon />
                    }
                ></CustomeHeader>
                <View style={styles.imageView}>
                    <ImageBackground source={require('../../assets/Images/carImage.png')}
                        style={styles.imageStyle}
                    >
                        <Text style={styles.userNameText}>
                            Transaction Details
                        </Text>
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.transactionView}>
                <View style={styles.innerViewTransaction}>
                    <View style={styles.halfWidthView}>
                        <Image source={require('../../assets/Images/imgTwo.jpg')}
                            style={styles.customerImage}>
                        </Image>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                Transaction Details
                            </Text>
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                5.0
                            </Text>
                        </View>
                    </View>

                    <View style={styles.lastWidthView}>
                        <View style={styles.datedView}>
                            <FontAwesome name='calendar-o' color={Colors.getLightColor('whiteColor')}
                                style={styles.calenderIcon} />
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                27 Aug,2022
                            </Text>
                        </View>
                        <View style={styles.datedView}>
                            <FontAwesome name='calendar-o' color={Colors.getLightColor('whiteColor')}
                                style={styles.calenderIcon} />
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                3:04 PM
                            </Text>
                        </View>
                        <View style={styles.datedView}>
                            <FontAwesome name='calendar-o' color={Colors.getLightColor('whiteColor')}
                                style={styles.calenderIcon}
                            />
                            <Text style={{ color: Colors.getLightColor('whiteColor') }}>
                                Total Time
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.locationsView}>
                    <View style={styles.fromIconView}>
                        <Octicons name='dot-fill' size={25} color="#0887FC"
                        />
                        <Text
                            style={styles.locationText}>
                            Islamabad
                        </Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.fromIconView}>
                        <Fontisto name='rectangle' color={Colors.getLightColor('blackColor')} >
                        </Fontisto>
                        <Text
                            style={styles.locationText}>
                            Peshawar
                        </Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.paymentMainView}>
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
                <View style={styles.horizontalLinesecond} />
                <View style={styles.billDateView}>
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
                            07/22
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.invoiceView}>
                <TouchableOpacity style={styles.invoiceOpacity}>
                    <Text style={styles.InvoiceText}>
                        Invoice
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default Invoice;