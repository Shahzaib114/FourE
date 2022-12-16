import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
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
        lignItems: 'center'
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
    Imagestyle: {
        width: '11%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
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
    notificationIcon: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 25,
        padding: '2%'
    },
    catContainer: {
        borderRadius: 12,
        backgroundColor: Colors.getLightColor('silverColor'),
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
        flexDirection: 'row',
    },
    textualMainView: {
        marginVertical: '3%',
        marginLeft: '5%',
        width: '50%',
    },
    userNameText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    rideTypeText: {
        marginTop: '3%',
        fontSize: 10,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium'
    },
    locationtypeText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 10
    },
    datedView: {
        marginTop: '4%',
        marginLeft: '1%'
    },
    datedText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
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
        height: Dimensions.get('window').height * 0.71,
    },
});
export default styles;