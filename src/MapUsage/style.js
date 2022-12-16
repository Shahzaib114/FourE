import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollViewStyle: {
        backgroundColor: Colors.getLightColor('whiteColor'),
    },
    contentContainer: {
        justifyContent: 'center', flexGrow: 1
    },
    touchableDrawer: {
        borderRadius: 10, 
        margin:'4%',
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        paddingVertical: '3%', backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 10, padding: '2%',
        alignSelf: 'flex-start'
    },

    container: {
        // justifyContent:'center',
        // alignItems:'center'
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get("screen").width * 1,
        height: Dimensions.get("screen").height * 0.95,
        marginTop:'5%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {

        width: Dimensions.get("screen").width * 1,
        height: Dimensions.get("screen").height * 0.95,
        // alignItems:'flex-end',
        // justifyContent:'flex-end',
        // paddingt:'60%'
        // marginTop:'6%'
      },
     
    mainHeader: {
        width: '90%', margin: '5%',  justifyContent: 'center',
        alignItems: 'center',backgroundColor:'white', height:'65%'
    },
    HeaderViewStyle: {
        overflow: 'hidden', paddingBottom: '2%', marginTop: '2%',
        marginLeft: '2%', paddingLeft: '1%', paddingRight: '1%', borderRadius: 10
    },
    OpacityStyle: {
        backgroundColor: '#fff',
        // width: '10%',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
        // paddingVertical: '2.5%'
    },
    ArrowIconStyle: {
        alignItems: 'center', alignSelf: 'center',padding:'3%', paddingVertical:'4%'
    },

    drawerTouchable: {
        overflow: 'hidden', borderRadius: 10, paddingBottom: 10, paddingLeft: 10,
        paddingRight: 10
    },
    DrawerIcon: {
        elevation: 5,
        shadowColor: Colors.getLightColor('blackColor'),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        paddingVertical: '3%', backgroundColor: Colors.getLightColor('whiteColor'),
        borderRadius: 10, padding: '2%',
        alignSelf: 'center',
    },
    tripText: {
        color: Colors.getLightColor('primaryColor'), fontSize: 20, fontFamily: 'Montserrat-Medium'
    },
    mapImageView: {
        width: '90%', margin: '5%', height: '40%',
    },
    imageStyling: {
        width: '100%', height: '90%',
        backgroundColor: Colors.getLightColor('lightGreyColor'), justifyContent: 'center', borderRadius: 10
    },
    islamabadCarView: {
        borderRadius: 10, width: '80%', backgroundColor: Colors.getLightColor('greyColor'),
        height: '12%', marginHorizontal: '10%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    islamabadText: {
        alignSelf: 'center', color: Colors.getLightColor('blackColor'),
        fontWeight: '600', fontFamily: 'Montserrat-Medium', fontSize: 16,
    },
    carImageStyling: {
        width: '50%', height: '100%',
    },
    dateCashView: {
        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%',
        width:'90%'
    },
    dateCashText: {
        alignSelf: 'center', color: Colors.getLightColor('blackColor'),
        fontWeight: '600', fontFamily: 'Montserrat-Medium', fontSize: 16,
    },
    horizontalLine: {
        height: 2, backgroundColor: Colors.getLightColor('darkgreyColor'),
        marginHorizontal: '5%', marginVertical: '3%'
    },
    locationsView: {
        height: '13%', flexDirection: 'row',
    },
    IconsView: {
        width: '8%', marginLeft: '5%', height: '35%',
    },
    dotIcon: {
        alignSelf: 'baseline', alignItems: 'flex-end',
        textAlignVertical: 'bottom', marginLeft: '25%'
    },
    verticalLine: {
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 1, width: 1, height: '95%', marginLeft: '43%',
    },
    rectangleIcon: {
        marginLeft: '25%', marginTop: '15%'
    },
    textualView: {
        height: '100%', justifyContent: 'space-between',
        width:'80%',
    },
    locationText: {
        alignSelf: 'center', color: Colors.getLightColor('blackColor'),
        fontWeight: '400', fontFamily: 'Montserrat-Medium', fontSize: 14,
        alignSelf: 'center', alignSelf: 'flex-start',
    },
    userDetailsView: {
        width: '60%', marginHorizontal: '5%', height: '10%', flexDirection: 'row'
    },
    userImage: {
        height: '70%', width: '25%', borderRadius: 32, marginLeft: '5%', alignSelf: 'center'
    },
    userdetailsText: {
        justifyContent: 'center', margin: '5%'
    },
    usernameText: {
        alignSelf: 'center', color: Colors.getLightColor('blackColor'),
        fontWeight: '400', fontFamily: 'Montserrat-Medium', fontSize: 14,
        alignSelf: 'center', alignSelf: 'flex-start'
    },
    ratingNumber: {
        width: '100%', flexDirection: 'row', lineHeight: 22, alignItems: 'baseline'
    },
    touchableView: {
        width: '90%',
        backgroundColor: Colors.getLightColor('primaryColor'), marginHorizontal: '5%', borderRadius: 5,
        alignContent: 'center', alignItems: 'center', paddingVertical: '5%',
    },
    emailtext: {
        color: Colors.getLightColor('whiteColor'), fontSize: 14, fontFamily: 'Montserrat-Medium',
    },
});
export default styles;