import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    headerView: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    transactionView: {
        backgroundColor: '#E7E7E7',
        width: '90%',
        margin: '5%',
        height: Dimensions.get('window').height * 0.40,
        borderRadius: 5
    },
    innerViewTransaction: {
        width: '95%',
        height: '22%',
        margin: '2.5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    halfWidthView: {
        width: '55%',
        flexDirection: 'row',
        margin: '1%',
    },
    customerImage: {
        width: '25%',
        height: '80%',
        margin: '2%',
        borderRadius: 30,
        alignSelf: 'center',
        marginRight: '3%'
    },
    lastWidthView: {
        width: '35%',
        justifyContent: 'space-between',
        margin: '2%',
    },
    datedView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    calenderIcon: {
        flexDirection: 'row',
        marginRight: '10%',
        alignItems: 'center'
    },
    fromIconView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },
    horizontalLine: {
        height: 1,
        backgroundColor: 'black',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '3%'
    },
    paymentMainView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '4%'
    },
    horizontalLinesecond: {
        height: 1,
        backgroundColor: 'black',
        width: '90%',
        marginHorizontal: '5%'
    },
    billDateView: {
        width: '90%',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '4%'
    },
    invoiceView: {
        height: Dimensions.get('window').height * 0.30,
        borderRadius: 10,
        justifyContent: 'flex-end',
        width: '90%',
        marginHorizontal: '5%'
    },
    mainView: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    invoiceOpacity: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: Colors.getLightColor('primaryColor'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%'
    },
    HeaderViewStyle: {
        overflow: 'hidden',
        paddingBottom: '2%', marginTop: '5%',
        width: '70%',
        marginLeft: '5%',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderRadius: 10
    },
    userNameText: {
        lineHeight: 22,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18
    },
    InvoiceText: {
        fontSize: 15,
        color: Colors.getLightColor('secondaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium'
    },
    rideTypeText: {
        fontSize: 15,
        color: Colors.getLightColor('blackColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium'
    },
    datedText: {
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    locationsView: {
        height: '20%',
        marginLeft: '5%',
        width: '90%'
    },
    verticalLine: {
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 1,
        width: 1,
        height: '35%',
        marginLeft: '1.7%'
    },
    locationText: {
        alignSelf: 'center',
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'center',
        alignSelf: 'flex-start',
        marginLeft: '3%'
    },

});
export default styles;