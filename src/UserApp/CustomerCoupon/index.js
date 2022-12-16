import { View, Text, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native-gesture-handler';
import CustomeDrawerIcon from '../../customDrawerIcon';
import Colors from '../../../utility/colors/Colors';
import CustomeHeader from '../../customeHeader';
import CustomerHeader from '../CustomerHeader';

const CustomerCouponScreen = ({ navigation }) => {

    const couponsArray = [
        {
            id: '1', description: 'The coupons code is Applied By Bukhari Group Welcome Discount!',
            dated: 'Valid until Feb 20, 2021'
        },
        {
            id: '2', description: 'The coupons code is Applied By Shahzaib Group Welcome Discount!',
            dated: 'Valid until Mar 27, 2027'
        },
        {
            id: '3', description: 'The coupons code is Applied By Adnan Group Welcome Discount!',
            dated: 'Valid until Jan 20, 2023'
        },
        {
            id: '4', description: 'The coupons code is Applied By Shehzad Group Welcome Discount!',
            dated: 'Valid until Dec 12, 2002'
        },
        {
            id: '5', description: 'The coupons code is Applied By Ahmad Group Welcome Discount!',
            dated: 'Valid until Dec 25, 2024'
        },

    ]

    return (
        <View style={styles.container}>
            <View style={styles.HeaderViewStyle}>
                <CustomerHeader
                label={"Coupons"}
                leftIcon={
                    <CustomeDrawerIcon />
                }
                userorDriverProfile={'CustomerProfileScreen'}
                screen_icon={
                    <FontAwesome5 name='car-side' color={Colors.getLightColor('primayColor')} size={60}
                        style={{ marginTop: '3%', color: Colors.getLightColor('primaryColor') }}
                    />
                }
                screen_name={'Coupon Details'}
                screen_info={`Here you can see the following details of Coupons${'\n'} 
                1 : Coupon Details${'\n'}
                2 : Which Company Offering Coupons${'\n'}
                3 : Discounted Offers${'\n'}
                4 : Coupons Validations ${'\n'}`
                }
                >
                </CustomerHeader>
            </View>

            <View style={styles.seconMainView}>
                <View style={styles.applyCouponView}>
                    <TextInput
                        placeholder='Enter Cooupon Code'
                        style={styles.couponInput}
                        placeholderTextColor={Colors.getLightColor('blackColor')}
                    >
                    </TextInput>
                    <TouchableOpacity style={{ backgroundColor: Colors.getLightColor('primaryColor'), borderRadius: 5 }}>
                        <Text style={styles.applyCouponText}>
                            Apply Coupon
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: Dimensions.get('window').height * 0.58, padding: '5%', }}>
                <FlatList
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    data={couponsArray}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.flatListMainView}>
                            <Text style={styles.saleText}>
                                PKR {' '}
                                90%{'  '}
                                OFF
                            </Text>
                            <Text style={styles.couponCodeText}>
                                The coupons code is Applied By Bukhari
                                Group Welcome Discount!
                            </Text>
                            <Text style={styles.validityText}>
                                Valid until Dec 20, 2022
                            </Text>
                        </View>
                    )}
                >
                </FlatList>
            </View>
        </View>
    )
};
export default CustomerCouponScreen;