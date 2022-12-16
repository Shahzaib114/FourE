import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../utility/colors/Colors';
const styles = StyleSheet.create({
    secondaryView: {
        marginTop: '10%',
        height: '30%',
        marginBottom: '10%',
    },
    imageView: {
        width: '90%',
        height: '55%',
        margin: '5%',
        alignItems: 'center'
    },
    ImageStyling: {
        width: Dimensions.get('window').width*0.3,
        height: Dimensions.get('window').width*0.3,
        // marginLeft: '10%',
        alignItems: 'flex-end'
    },
    userEditIcon: {
        marginRight: '20%',
        margin: '5%',
        padding: '1%',
        backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 5
    },
    ProfileName: {
        fontSize: 18,
        marginHorizontal: 10,
        marginBottom: 4,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    ProfileNumber: {
        fontSize: 12,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    LogoutButtonText: {
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        lineHeight: 18,
        margin: '13%'
    },
    DrawerItemsStyling: {
        backgroundColor: Colors.getLightColor('whiteColor'),
        marginHorizontal: '5%',
    },
    ModalIcon: {
        position: 'absolute',
        right: 10,
    },
    ratingNumber: {
        width: '100%',
        lineHeight: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingText: {
        color: Colors.getLightColor('blackColor'),
        textAlign: 'center',
        fontSize: 18,
        padding: '1%',
    },
    horizontalLineView: {
        height: 1,
        backgroundColor: Colors.getLightColor('darkgreyColor'),
        marginHorizontal: '10%',
        marginVertical: '10%'
    },
    bottomTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomImageView: {
        width: '100%',
        height: '25%',
    },
    contactUsOpacity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        backgroundColor: Colors.getLightColor('secondaryColor'),
        borderRadius: 10
    },
    contactUsText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        marginVertical: '10%',
        alignContent: 'center',
        alignSelf: 'center',
        color: Colors.getLightColor('primaryColor'),
        marginHorizontal: '3%'
    },
    bottomImage: {
        width: '100%',
        height: Dimensions.get('window').height * 0.2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
})
export default styles