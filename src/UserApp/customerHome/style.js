import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    scrollViewStyle:
    {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer:
    {
        flexGrow: 1,
    },
    ring:
    {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: Colors.getLightColor('secondaryColor'),
        borderWidth: 10,
    },
    iconandImageView:
    {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        backgroundColor: '#e4e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.06,
        borderRadius: 5,
    },
    pressedOnRideOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%',
        borderRadius: 5,
        flexDirection: 'row'

    },
    rideStatusText: {
        color: 'black',
        fontSize: 15,
        paddingHorizontal: '4%',
        fontFamily: 'Montserrat-Medium',
    },
    firstView: {
        height: Dimensions.get('window').height * 0.20,
        width: '90%',
        borderRadius: 10,
        backgroundColor: 'grey',
        margin: '5%',
    },
    imageOpacity: {
        width: '15%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    swiperDor: {
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: '1%',
    },
    swiperFirstView: {
        height: Dimensions.get('window').height * 0.20,
        flexDirection: 'row',
        borderRadius: 10,
    },
    swiperChildView: {
        width: '65%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        padding: '5%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    swiperHeaderText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-Medium',
    },
    rideWith4EText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        marginVertical: '3%'
    },
    letsGoOpacity: {
        marginVertical: '3%',
        flexDirection: 'row',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        borderRadius: 5
    },
    letsGoText: {
        color: 'white',
        paddingVertical: '4%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    swiperImageView: {
        width: '35%',
        backgroundColor: 'brown',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    swiperImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    imageStyle: {
        width: '75%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
    },
    secondView: {
        height: Dimensions.get('window').height * 0.17,
        marginHorizontal: '5%',
        width: '90%',
        borderRadius: 5,
        backgroundColor: 'red'
    },
    bookRideOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: '100%',
    },
    bookRideImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bookRideText: {
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
    bookRideIcon: {
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Light',
        fontSize: 17
    },
    thirdView: {
        height: Dimensions.get('window').height * 0.47,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        marginVertical: '2%'
    },
    sendParcelOpacity: {
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#EEF3F9',
        margin: '2%',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    sendParcelText: {
        padding: '2%',
        width: '60%',
        margin: '4%',
        color: Colors.getLightColor('primaryColor'),
        fontFamily: 'Montserrat-Medium',
        fontSize:18,
    },
    gidtImage: {
        alignSelf: 'center',
        borderRadius: 10,
        height: Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width * 0.15,
        marginRight:10,
    },
    verticleLine: {
        height: '90%',
        alignSelf: 'center',
        width: 2,
        marginHorizontal: '2%',
        backgroundColor: Colors.getLightColor('verticalLineColor'),
    },
    foodImage: {
        alignSelf: 'center',
        borderRadius: 10,
        padding: '4%',
        height: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').width * 0.1
    },
    featuedTrip: {
        marginVertical: '1%',
        color: Colors.getLightColor('primaryColor'),
        fontFamily: 'Montserrat-Medium',
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
})
export default styles;