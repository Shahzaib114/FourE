import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    HeaderViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: Dimensions.get('window').height * 0.22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    barViewStyle: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.06,
        borderRadius: 5,
    },
    headerImageOpacity: {
        width: '15%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImageStyle: {
        width: '75%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
    },
    featureRideView: {
        flexDirection: "row",
        width: '100%',
        marginVertical: '2%',
        justifyContent: 'space-around',
    },
    historyText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    imageStyling: {
        width: '16%',
        height: '75%',
        borderRadius: 32,
        borderWidth: 2,
        borderColor: Colors.getLightColor('lightGreyColor'),
        marginLeft: '5%',
        alignSelf: 'center'
    },
    carImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationsText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Light',
        fontSize: 20,
        lineHeight: 13,
        paddingTop: '3%',
        margin: '2%'
    },
    noHistoryText: {
        color: Colors.getLightColor('primaryColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        lineHeight: 13,
        paddingTop: '3%',
        margin: '2%'
    },
    notificationIcon: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 25,
        padding: '2%'
    },
    catContainer: {
        borderRadius: 12,
        backgroundColor: Colors.getLightColor('lightBlueColor'),
        fontSize: 15,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%'
    },
    allitemsView: {
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 10,
        marginVertical: '2%',
        // justifyContent:'space-evenly'
        // flexDirection: 'row',
    },
    imageStyling: {
        width: '16%',
        height: '75%',
        borderRadius: 32,
        borderWidth: 2,
        borderColor: Colors.getLightColor('lightGreyColor'),
        marginLeft: '5%',
        alignSelf: 'center'
    },
    textualMainView: {
        // marginVertical: '3%',
        marginHorizontal: '5%',
        width: '90%',
        // backgroundColor:'red',
        flexDirection: 'row',

    },
    userNameText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        top: 2
    },
    pickUpText: {
        color: Colors.getLightColor('secondaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        width: '100%',
    },
    dropText: {
        color: Colors.getLightColor('secondaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        width: '100%',
    },
    rideTypeText: {
        // marginTop: '3%',
        fontSize: 10,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium'
    },
    locationtypeText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        // marginVertical:'3%'
    },
    datedView: {
        // marginTop: '4%',
        marginRight: '4%'
    },
    DateText: {
        color: Colors.getLightColor('secondaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        alignSelf: 'flex-end'
    },

    datedText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    nothingShowView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.75
    },
    flatlistParentView: {
        width: '100%',
        overflow: 'hidden',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        // height: Dimensions.get('window').height * 0.71,
    },
    netContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    netParentView: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        paddingVertical: '10%'
    },
    netNoInternetText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 25,
        fontFamily: 'Montserrat-Medium',
    },
    netSecondMainView: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '100%',
        paddingVertical: '5%',
        alignContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    netTurnOnWifiText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center'
    },
    netOkOpacity: {
        width: '80%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // padding:'3%',
        marginVertical: '5%'
    },
    netOkText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 25,
        fontFamily: 'Montserrat-Medium',
    },
    IconsView: {
        width: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    verticalLine: {
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 1,
        width: 1,
        borderColor: Colors.getLightColor('secondaryColor'),
        height: Dimensions.get('window').height * 0.040,
        bottom: 5,
    },
});
export default styles;