import { StyleSheet } from "react-native";
import Colors from "../../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainView: {
        width: '90%',
        margin: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0.9
    },
    HeaderViewStyle: {
        overflow: 'hidden',
        paddingBottom: '2%',
        marginTop: '2%',
        marginLeft: '2%',
        paddingLeft: '1%',
        paddingRight: '1%',
        borderRadius: 10
    },
    OpacityStyle: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
    },
    ArrowIconStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: '3%',
        paddingVertical: '4%'
    },
    historyText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    mappingOuterView: {
        width: '95%',
        margin: '2.5%',
        flex: 9,
        overflow: 'hidden',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    mappingInnerView: {
        width: '100%',
        backgroundColor: Colors.getLightColor('primaryColor'), borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 10, padding: '4%',
        marginVertical: '2%', flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconStyle: {
        width: "10%",
        flexDirection: 'row',
        alignItems: 'center'
    },
    priceText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        lineHeight: 20,
        marginBottom: '1%',
    },
    tripText: {
        color: Colors.getLightColor('lightGreyColor'),
        fontWeight: '500',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        lineHeight: 15,
    },
});
export default styles;