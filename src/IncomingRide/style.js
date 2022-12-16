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
    noMoreJObView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noMoreJObChildView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.75,
    },
    tripText: {
        color: Colors.getLightColor('primaryColor'),
        fontSize: 24,
        fontFamily: 'Montserrat-Medium',
        alignSelf:'center',
    },
    mapImageView: {
        width: '95%',
        marginHorizontal: '2.5%',
        flex:1.5,
        overflow:'hidden',
        borderRadius:5,
    },
    locationsView: {
        flexDirection: 'row',
        flex:1,
    },
    IconsView: {
        width: '8%',
        marginLeft: '5%',
        height:'50%'
    },
    dotIcon: {
        alignSelf: 'baseline',
        alignItems: 'flex-end',
        textAlignVertical: 'bottom',
        marginLeft: '25%'
    },
    profileVerticalLine: {
        borderWidth: 0.5,
        borderColor: Colors.getLightColor('whiteColor'),
        borderRadius: 1,
        width: 1,
        height: '60%',
        marginHorizontal: '3%',
        alignSelf: 'center'
    },
    verticalLine: {
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 1,
        width: 1,
        height: '95%',
        marginLeft: '43%',
    },
    rectangleIcon: {
        marginLeft: '25%',
        marginTop: '15%'
    },
    textualView: {
        alignItems: 'flex-start',
        width: '80%',
        justifyContent: 'space-between',
    },
    locationText: {
        color: Colors.getLightColor('blackColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'flex-start',
    },
    userDetailsView: {
        flex:0.8,
        width: '95%',
        margin:'2%',
        flexDirection: 'row',
        backgroundColor: Colors.getLightColor('primaryColor'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    userdetailsText: {
        justifyContent: 'center',
        margin: '5%',
    },
    usernameText: {
        alignSelf: 'center',
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        alignSelf: 'center',
        alignSelf: 'flex-start'
    },
    ratingNumber: {
        width: '100%',
        flexDirection: 'row',
        lineHeight: 22,
        alignItems: 'baseline',
        height: '50%',
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'),
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
    },
    acceptRejectText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: '400',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    bottomMainView: {
        flex:1,
        justifyContent: 'center'
    },
    priceText: {
        color: Colors.getLightColor('whiteColor'),
        fontWeight: 'bold'
    },
    acceptRejectView: {
        width: '100%',
        flex:0.5,
        justifyContent:'center',
    },
    loaderView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptRejectInnerView: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        width: '90%',
        justifyContent: 'space-between'
    },
    rejectOpacity: {
        width: '45%',
        backgroundColor: Colors.getLightColor('mustardColor'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: '4%',
    },
    acceptOpacity: {
        width: '90%',
        marginLeft: '5%',
        backgroundColor: Colors.getLightColor('greenColor'),
        padding: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});
export default styles;