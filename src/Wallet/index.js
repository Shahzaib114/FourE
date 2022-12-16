import React, {Component} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';
import Colors from '../../utility/colors/Colors';
import CustomeDrawerIcon from '../customDrawerIcon';
import { useNavigation } from '@react-navigation/native';
const DriverWalletScreen = () => {
    const navigation= useNavigation();
    return (
        // <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerView}>
                    <View style={styles.barView}>
                        <CustomeDrawerIcon></CustomeDrawerIcon>
                        <TouchableOpacity style={styles.userProfileImageView}
                            onPress={() => navigation.navigate('ProfileScreen')}>
                            <Image source={require('../../assets/Images/imgTwo.jpg')}
                                style={styles.userImageStyle}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.carImageView}>
                        <ImageBackground source={require('../../assets/Images/carImage.png')}
                            style={styles.carImageStyle}>
                            <View style={styles.balancescndMainView}>
                                <View>
                                    <Text style={styles.mainPriceText}>
                                        Rs. 32,796
                                    </Text>
                                    <Text style={{ color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium', }}>
                                        Your Current Balance
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.addBalanceText}>
                                        Add Balance
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.connectionHeaderView}>
                    <TouchableOpacity style={styles.connectionOpacity}>
                        <Text style={styles.creditCardText}>
                            Connect Credit Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.connectionOpacity}>
                        <Text style={styles.creditCardText}>
                            Connect Easypaisa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.connectionOpacity}>
                        <Text style={styles.creditCardText}>
                            Connect JazzCash
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomMainContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CustomerTransactionHistory')}
                        style={styles.touchableView}>
                        <Text style={styles.emailtext}>
                            TRANSACTION HISTORY
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        // </View>
    )
};
export default DriverWalletScreen;
