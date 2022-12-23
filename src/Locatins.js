import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList, Linking, PermissionsAndroid, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import PushNotification from "react-native-push-notification";

const Locations = ({ route }) => {
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
    );
    const [selectedId, setSelectedId] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === '2' ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === '2' ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    console.log(item.id)
                    setVisibility(true)
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const _renderItemAfter = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    console.log(item.id)
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const navigation = useNavigation()
    const DATA = [
        {
            id: "1",
            title: "First Item",
        },
        {
            id: "2",
            title: "Second Item",
        },
        {
            id: "3",
            title: "Third Item",
        },
    ];
    useEffect(()=> {
        getPermissions()
        // PushNotification.checkPermissions(function(permissions) {  console.log(permissions)});
    },[])
    // const getPermissions = async () => {
    //     // if (Platform.OS === 'ios') {
    //     //     const status = await Permissions.check()
    //     //     if (status === PermissionsStatus.AUTHORIZED) {
    //     //       return true
    //     //     } else {
    //     //       return false
    //     //     }
    //     //   } else {
    //     //     // This is where I am using the library
    //     //     const status = await NotificationManager.areNotificationsEnabled()
    //     //     return status
    //     //   }
    //     // }
    //     // const grant = await PERMISSIONS.ANDROID.POST_NOTIFICATIONS
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.NOTIFICATION,
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("You can use the notification");
    //             // getBackgroundDone()
    //         } else {
    //             console.log("notification permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }

    // };
    const getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
              {
                title: "FourE Permission",
                message:
                  "FourE App needs access to your notifications " +
                  "so you can recieve notifications.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the notifications");
            } else {
              console.log("notifications permission denied")
              alert('Please Allow notification permission from setting')
              Linking.openSettings()
            }
          } catch (err) {
            console.warn(err);
          }

    };
    // POST_NOTIFICATION

    return (
        <View>
            <Text>
                cjkdskc 
            </Text>
            {/* <FlatList
                data={DATA}
                renderItem={visibility === true ? _renderItemAfter : renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default Locations