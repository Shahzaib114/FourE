import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        flexGrow: 1,
    },
    mapImageView: {
        width: '90%',
        margin: '5%',
        height: Dimensions.get('window').height * 0.40,
    },
    locationsView: {
        height: '30%',
        flexDirection: 'row',
    },
    destinationView: {
        alignItems: 'flex-start',
        marginHorizontal: '6%',
        width: '88%',
        justifyContent: 'center',
    },
    destinationInnerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    startArriveView: {
        marginHorizontal: '5%',
        width: '90%',
        justifyContent: 'space-between'
    },
    startRideOpacity: {
        width: '100%',
        backgroundColor: Colors.getLightColor('greenColor'),
        padding: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    ArrivedOpacity: {
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        padding: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: '2%'
    },
    locationText: {
        color: Colors.getLightColor('primaryColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'flex-start',
    },
    fromMarker: {
        padding: '2%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 25
    },
    userProfileContainer: {
        height: Dimensions.get('window').height * 0.33,
        justifyContent: 'center',
    },
    userDetailsView: {
        width: '90%',
        marginHorizontal: '5%',
        height: '28%',
        flexDirection: 'row',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    priceText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: 'bold'
    },
    userdetailsText: {
        justifyContent: 'center',
        margin: '5%'
    },
    usernameText: {
        alignSelf: 'center',
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'center',
        alignSelf: 'flex-start'
    },
    ratingNumber: {
        width: '100%',
        flexDirection: 'row',
        lineHeight: 22,
        alignItems: 'baseline',
        height: '50%',
    },
    ridestartedText: {
        color: Colors.getLightColor('secondaryColor'),
        fontFamily: 'Montserrat-Medium',
    },
    acceptRejectText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
});
export default styles;