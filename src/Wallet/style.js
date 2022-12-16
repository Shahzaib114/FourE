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
    headerView: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
    },
    barView: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.06,
        borderRadius: 5,
    },
    userProfileImageView: {
        width: '15%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageStyle: {
        width: '75%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
    },
    carImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    carImageStyle: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.13,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    balancescndMainView: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around'
    },
    mainPriceText: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
    },
    addBalanceText: {
        color: Colors.getLightColor('whiteColor'),
        backgroundColor: Colors.getLightColor('secondaryColor'),
        padding: '4%',
        paddingHorizontal: '8%',
        borderRadius: 5,
        fontFamily: 'Montserrat-Medium',
    },
    mainView: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    connectionHeaderView: {
        width: '90%',
        margin: '5%',
        height: Dimensions.get('window').height * 0.62,
        overflow: 'hidden',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    creditCardText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        padding: '2%'
    },
    connectionOpacity: {
        width: '95%',
        marginHorizontal: '2.5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        paddingVertical: '3%',
        borderRadius: 10,
        padding: '4%',
        marginVertical: '2%'
    },
    touchableView: {
        width: '90%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        marginHorizontal: '5%',
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
    },
    bottomMainContainer: {
        height: Dimensions.get('window').height * 0.10,
        justifyContent: 'flex-start'
    },
});
export default styles;