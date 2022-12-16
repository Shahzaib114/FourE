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
    fromMarker: {
        padding: '2%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 25
    },
    allowGPSOpacity: {
        width: '100%',
        height: Dimensions.get('window').height * 0.40,
        justifyContent: 'center', alignItems: 'center'
    },
    tripText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    mapImageView: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: '2%',
        height: Dimensions.get('window').height * 0.40,
    },
    dateCashView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
    },
    dateCashText: {
        alignSelf: 'center',
        color: Colors.getLightColor('blackColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    locationsView: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center'
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
    userDetailsView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
    },
    userdetailsText: {
        flexDirection: 'row',
        padding: '5%',
        justifyContent: 'space-between'
    },
    usernameText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    ratingNumber: {
        flexDirection: 'row',
        lineHeight: 22,
        alignItems: 'baseline',
    },
    contactCustomerOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default styles;