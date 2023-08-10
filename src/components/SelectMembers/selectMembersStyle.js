import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  teamWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  activeTeamWrapper: {
    backgroundColor: appTheme.INACTIVE_COLOR,
  },
  memberWrapper: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  memberPhoto: {height: 50, width: 50, borderRadius: 50},
  memberName: {
    textAlign: 'center',
    color: '#000',
    fontSize: 13,

    fontFamily: fonts.regular,
  },
  activeMemberName: {color: '#fff'},
  btnWrapper: {
    marginTop: 'auto',
    height: 45,
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default styles;
