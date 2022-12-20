import React, { useRef, useState, useEffect } from "react";
import {
  AppState, StyleSheet, Text, View,
  NativeModules,
  Modal,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Button
} from "react-native";
import Colors from "../utility/colors/Colors";

import DatePicker from 'react-native-date-picker'
import moment from "moment";
const BackgroundLocation = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState('');

useEffect(()=>{
  console.log('LLL is', moment().calendar())
},[])

  const [isVisible, setIsVisible] = useState(false)

  return (
    <View>
      <Modal
        animationIn={'fadeIn'}
        animationInTiming={800}
        visible={isVisible}
        transparent={false}
        style={{ margin: 0 }}
      >
        <View >

          <View style={{ width: '100%' }}>

            <View >
              <Text >
                Please Turn On Your Wifi or Check Your Mobile Data !
              </Text>
              <TouchableOpacity
                onPress={() => { setIsVisible(false) }} >
                <Text>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Button title="Open" onPress={() => setOpen(true)} />
      <View>
        <DatePicker
          theme='light'
          style={{ width: 30 }}
          modal
          open={open}
          date={date}
          androidVariant='iosClone'
          dividerHeight={5}
          is24hourSource={'device'}
          fadeToColor={Colors.getLightColor('secondaryColor')}
          onConfirm={(date) => {
            setOpen(false)
            console.log('LLL is', moment(date).format('LLL'))
            setDate(date)
          }}
          title='Select Scheduled Ride Date and Time!'
          onCancel={() => {
            setOpen(false)
          }}
        />
        <Text style={{ color: 'black' }}> dat is :   {date.toDateString()}</Text>
        <Text style={{ color: 'black' }}> dat is :   {date.toLocaleTimeString()}</Text>
        <Text style={{ color: 'black' }}> dat is :   {date.toLocaleString()}</Text>


      </View>

    </View>
  );
};

export default BackgroundLocation