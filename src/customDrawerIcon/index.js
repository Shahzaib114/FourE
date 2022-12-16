import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utility/colors/Colors';
const CustomeDrawerIcon = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainView}>
            <Entypo onPress={() => navigation.openDrawer()}
                name='menu' size={30} color={Colors.getLightColor('whiteColor')}
                style={styles.DrawerIcon}
            />
        </View>
    )
};
export default CustomeDrawerIcon;