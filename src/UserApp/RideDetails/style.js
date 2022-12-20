import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    modalMainView: {
        width: '95%',
        height: '60%',
        margin: '2.5%',
        marginTop: '83%',
        backgroundColor: Colors.getLightColor('verticalLineColor'),
        alignSelf: 'baseline',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    modalChildView1: {
        width: '95%',
        margin: '2.5%',
        height: '80%',
    },
    whyCancelText: {
        alignSelf: 'center',
        fontSize: 25,
        marginVertical: '3%',
        fontFamily: 'Montserrat-Medium',
        color: Colors.getLightColor('primaryColor')
    },
    touchableFlatList: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        width: '100%',
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reasonsText: {
        padding: '3%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: Colors.getLightColor('primaryColor')
    },
    noCancelOpacity: {
        width: '95%',
        margin: '2.5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCancelText: {
        color: Colors.getLightColor('whiteColor'),
        padding: '3%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18
    },
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        flexGrow: 1,
    },
    tripText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    rideFoundParentView: {
        height: Dimensions.get('window').height * 0.35,
        justifyContent: 'center'
    },
    mapImageView: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: '2%',
        height: Dimensions.get('window').height * 0.40,
    },
    locationsView: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    IconsView: {
        width: '10%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    verticalLine: {
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 1,
        width: 1,
        height: Dimensions.get('window').height * 0.045
    },
    textualView: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '80%',
    },
    locationText: {
        alignSelf: 'center',
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'center',
        alignSelf: 'flex-start',
    },
    enjoyYourRideView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
        padding: '3%',
        borderRadius: 5,
        width: '90%',
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    cancelRideOpacity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
        padding: '3%',
        borderRadius: 5,
        width: '90%',
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    findingRideView: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    findingRideText: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: '5%',
        padding: '2%',
        borderRadius: 70,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: Colors.getLightColor('primaryColor')
    },
    awayText: {
        color: Colors.getLightColor('blackColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
    },
    userDetailsView: {
        width: '90%',
        marginHorizontal: '5%',
        height: '30%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    usernameText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    vehicleDetailsText: {
        color: Colors.getLightColor('whiteColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    callNowOpacity: {
        width: '35%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 10,
        paddingVertical: '2%'
    },
    ring: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: Colors.getLightColor('secondaryColor'),
        borderWidth: 10,
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