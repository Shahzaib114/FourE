import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utility/colors/Colors";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewStyle: {
    backgroundColor: Colors.getLightColor('primaryColor'),
    flexGrow: 1
  },
  contentContainer: {
    justifyContent: 'center',
  },
  fourEImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.20
  },
  conditionContainer: {
    margin: '5%',
  },
  sendText: {
    backgroundColor: Colors.getLightColor('primaryColor'),
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    padding: '10%',
    borderRadius: 5,
    marginTop: '15%',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  FourDigitTetx: {
    margin: '5%',
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Montserrat-Medium',
  },
  dontRecieveHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RetryText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('whiteColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Montserrat-Medium',
    margin: '3%',
    marginTop: '8%'
  },
  resendText: {
    fontSize: 18,
    color: Colors.getLightColor('secondaryColor'),
    fontWeight: 'bold'
  },
  changeNumberText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.getLightColor('primaryColor'),
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'Montserrat-Medium',
  },
  codeInput: {
    width: '95%',
    backgroundColor: '#F1F5F9',
    padding: 10,
    color: Colors.getLightColor('blackColor'),
    margin: '2.5%',
    borderRadius: 10
  },
  touchableView: {
    width: '90%',
    backgroundColor: Colors.getLightColor('secondaryColor'),
    margin: '5%',
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
  netContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.getLightColor('primaryColor')
  },
  netParentView: {
    backgroundColor: Colors.getLightColor('secondaryColor'),
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingVertical: '10%'
  },
  netNoInternetText: {
    color: Colors.getLightColor('primaryColor'),
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
  },
  netSecondMainView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: '5%',
    alignContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  netTurnOnWifiText: {
    color: Colors.getLightColor('primaryColor'),
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  },
  netOkOpacity: {
    width: '80%',
    backgroundColor: Colors.getLightColor('secondaryColor'),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:'3%',
    marginVertical: '5%'
  },
  netOkText: {
    color: Colors.getLightColor('primaryColor'),
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
  },
});
export default styles;