import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component, useState, useEffect, Alert } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utility/colors/Colors';
const CustomBackArrow = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.HeaderViewStyle}>
            <TouchableOpacity style={{ justifyContent: 'center' }}>
                <Ionicons onPress={() => navigation.goBack()}
                    name='arrow-back' size={30} color={Colors.getLightColor('whiteColor')}
                    style={styles.ArrowIconStyle}
                />
            </TouchableOpacity>
        </View>
    )
};
export default CustomBackArrow;