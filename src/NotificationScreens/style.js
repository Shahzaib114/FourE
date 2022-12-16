import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.getLightColor('whiteColor'),
    },
    HeaderViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
    },
    prifileImageView: {
        width: '15%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageStyle: {
        width: '75%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
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
    backArroeStyle: {
        alignSelf: 'center',
        backgroundColor: Colors.getLightColor('primaryColor'),
        padding: '2%',
        marginLeft: '4%',
        borderRadius: 30
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
    notificationAPIIcon: {
        flexDirection: 'row',
        backgroundColor: '#E7E7E7',
        width: '90%',
        marginHorizontal: '5%',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        padding: '2%',
        top: 10,
    },
    verticalLine: {
        borderWidth: 0.5,
        borderRadius: 1,
        width: 1,
        height: '65%',
        margin: '3%'
    },
    mainTextStyle: {
        color: Colors.getLightColor('primaryColor'),
        fontFamily: 'Montserrat-Medium',
        fontWeight: '700',
        fontSize: 15, lineHeight: 13,
        paddingTop: '1%'
    },
    subTextStyle: {
        color: Colors.getLightColor('silverColor'),
        fontFamily: 'Montserrat-Medium',
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 17,
    }
});
export default styles;