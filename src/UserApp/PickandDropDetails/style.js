import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalChildView: {
        backgroundColor: Colors.getLightColor('greyColor'),
        flexDirection: 'row',
        width: '95%',
        marginHorizontal: '2.5%',
        borderRadius: 10,
        marginVertical: '4%',
        justifyContent: 'space-between',
        paddingRight: '3%'
    },
    useCurrentOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignSelf: 'flex-end',
        width: '90%',
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    useCurrentText: {
        padding: '5%',
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
        color: Colors.getLightColor('whiteColor')
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        flexGrow: 1, justifyContent:'space-between'
    },
    item: {
        marginVertical: 8,
        left: 10,
        right: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium'
    },
    allowGps: {
        width: '100%',
        height: Dimensions.get('window').height * 0.35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tripText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    locationsTextMainView: {
        height: Dimensions.get('window').height * 0.40,
        justifyContent: 'space-around',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingBottom:5,
        bottom:5,
        backgroundColor:Colors.getLightColor('verticalLineColor')
    },
    currentLocationParentView: {
        width: '90%',
        backgroundColor: Colors.getLightColor('greyColor'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '5%',
        alignItems: 'center',
        height: '15%',
        borderRadius: 10
    },
    currentMarkerIcon: {
        alignSelf: 'center',
        width: '10%',
        textAlign: 'center',
    },
    currentLocText: {
        width: '85%',
        color: Colors.getLightColor('blackColor'),
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
    },
    destinationLocParentView: {
        width: '90%',
        backgroundColor: Colors.getLightColor('greyColor'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: '5%',
        alignItems: 'center',
        height: '15%',
        borderRadius: 10,
        marginTop: '1%'
    },
    destinationMarkerIcon: {
        alignSelf: 'center',
        width: '10%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    destinationParentText: {
        width: '85%',
        color: Colors.getLightColor('blackColor'),
        justifyContent: 'center',
    },
    destinationChildText: {
        width: '85%',
        color: Colors.getLightColor('blackColor'),
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
    },
    rideTypesMainView: {
        width: '95%',
        marginHorizontal: '2.5%',
        justifyContent: 'center'
    },
    indicator: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '1%'
    },
    fareMainView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1%',
        backgroundColor: Colors.getLightColor('greyColor'),
        borderRadius: 5
    },
    fareText: {
        color: Colors.getLightColor('blackColor'),
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        padding: '2%',
        width: '70%'
    },
    distanceText: {
        color: Colors.getLightColor('blackColor'),
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        padding: '2%',
        width: '30%',
    },
    confrimBookingOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confrimBookingText: {
        padding: '4%',
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    },
    mapImageView: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: '2%',
        height: Dimensions.get('window').height * 0.35,
    },
    currentPosMarker: {
        padding: '1.5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 25,
        alignSelf: 'center',
        textAlign: 'center'
    },
    carImageStyling: {
        width: '50%',
        height: '100%',
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
});
export default styles;