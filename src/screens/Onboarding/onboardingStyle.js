import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  illustrationWrapper: {flex: 1, alignItems: 'center'},
  illustrationContent: {
    height: 300,
    width: 250,
    resizeMode: 'contain',
    marginTop: 100,
    marginBottom: 30,
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
  },
  smallText: {
    fontSize: 16,
    color: appTheme.INACTIVE_COLOR,
    fontWeight: '500',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  loginBtnWrapper: {
    borderColor: appTheme.INACTIVE_COLOR,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 7,
    marginBottom: 15,
  },
  loginBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  signUpBtnWrapper: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 7,
  },
  signUpBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});

export default styles;
