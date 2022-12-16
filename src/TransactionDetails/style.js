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
    secondViewContainer: {
        backgroundColor: '#E7E7E7',
        width: '90%',
        margin: '5%',
        height: Dimensions.get('window').height * 0.40,
        borderRadius: 5
    },
    namesecondParentView: {
        width: '95%',
        height: '22%',
        margin: '2.5%',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    nameThirdParentView: {
        width: '55%',
        flexDirection: 'row',
        margin: '1%',
    },
    dateSecondParentView: {
        width: '35%',
        justifyContent: 'space-between',
        margin: '2%',
    },
    calenderIcon: {
        flexDirection: 'row',
        marginRight: '10%',
        alignItems: 'center'
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
    totalText: {
        fontSize: 15,
        color: Colors.getLightColor('primaryColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium'
    },
    datedText: {
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    totalPriceText: {
        color: Colors.getLightColor('primaryColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    locationsView: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    IconsView: {
        width: '10%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fromLocation: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '80%',
        backgroundColor: 'yellow'
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
    verticalLinebeforeCash: {
        height: 1,
        backgroundColor: 'black',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '3%'
    },
    cashParentView: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
    },
    billHeader: {
        width: '90%',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '4%'
    },
    invoiceParentView: {
        height: Dimensions.get('window').height * 0.32,
        borderRadius: 10,
        backgroundColor: '#E7E7E7',
        width: '90%',
        marginHorizontal: '5%'
    },
    invoiceSecondParentView: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: Colors.getLightColor('primaryColor'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%'
    },
    descriptionparentView: {
        width: '90%',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '1%'
    },
})
export default styles;