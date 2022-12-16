import { StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('primaryColor'), flex: 1
    },

    contentContainer: {
        justifyContent: 'center',
    },
    signuptext: {
        fontSize: 35, marginTop: '3%', marginLeft: '5%',
        color: Colors.getLightColor('blackColor'), lineHeight: 42, fontWeight: '600', fontFamily: 'Montserrat-Medium',
    },

    touchableView: {
        backgroundColor: Colors.getLightColor('mustardColor'), margin: '5%', borderRadius: 5,
        alignContent: 'center', alignItems: 'center', flexDirection: 'row', paddingVertical: '5%',
    },
    emailView: {
        flexDirection: 'row', width: '65%', justifyContent: 'space-between', marginLeft: '5%'
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'), textAlign: 'center', alignSelf: 'center', fontSize: 14, fontFamily: 'Montserrat-Medium',
    },
    lineStyle: {
        width: '40%',
        height: 2,
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    lineView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        width: '90%',
        justifyContent: 'center',

    },
    andText:
    {
        fontSize: 14,
        width: 50,
        textAlign: 'center',
        color: Colors.getLightColor('blackColor'),
        backgroundColor: Colors.getLightColor('whiteColor'),
        padding: '2%',
        borderRadius: 10,
        fontFamily: 'Montserrat-Medium',
    },
    touchableViewgoogle: {
        backgroundColor: Colors.getLightColor('greyColor'), margin: '5%', borderRadius: 5, alignContent: 'center', alignItems: 'center', flexDirection: 'row', paddingVertical: '4%',
    },
    googletext: {
        color: Colors.getLightColor('blackColor'), textAlign: 'center', alignSelf: 'center', fontSize: 14, fontFamily: 'Montserrat-Medium',
    },
    BottomLineView: {
        flexDirection: 'row', marginTop: "40%", margin: '5%', justifyContent: 'center', alignItems: 'center',
    },
    creatAccount: {
        color: Colors.getLightColor('whiteColor'), fontFamily: 'Montserrat-Medium',
    },
    LoginTouch: {
        marginLeft: 5, color: Colors.getLightColor('secondaryColor'), fontFamily: 'Montserrat-Medium',
    }

})
export default styles;