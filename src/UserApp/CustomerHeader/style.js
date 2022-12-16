import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../utility/colors/Colors';
const styles = StyleSheet.create({
    headerView: {
        backgroundColor: Colors.getLightColor('primaryColor'),
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.22,
    },
    modalStyle: {
        margin: 0,
        backgroundColor: Colors.getLightColor('primaryColor')
    },
    childDataHeader: {
        backgroundColor: Colors.getLightColor('greyColor'),
        justifyContent: 'space-between',
        width: '90%',
        height: '60%',
        margin: '5%',
        borderRadius: 10,
        alignItems: 'center'
    },
    screenNameText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        color: Colors.getLightColor('primaryColor'),
        width: '90%'
    },
    screenInfoText: {
        textAlign: 'justify',
        alignItems: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: Colors.getLightColor('primaryColor'),
        width: '90%'
    },
    hideOpacity: {
        backgroundColor: Colors.getLightColor('secondaryColor'),
        alignSelf: 'flex-end',
        width: '95%',
        margin: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    hideText: {
        padding: '4%',
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
    },
    iconandImageView: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.06,
        borderRadius: 5,
    },
    imageOpacity: {
        width: '15%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: '75%',
        height: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: '3%'
    },
    carImageStyle: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    createtext: {
        fontSize: 35,
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '600',
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center'
    },
    labeltext: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '8%'
    },
    bookingIdParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '3%'
    },
    bookingIdText: {
        color: 'white',
        alignSelf: 'center',
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
    },
    excalamtionOpacity: {
        color: 'white',
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        padding: '3%',
        backgroundColor: 'orange',
        borderRadius: 15
    },
    ring: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor:Colors.getLightColor('secondaryColor'),
        borderWidth: 10,
        },
})
export default styles