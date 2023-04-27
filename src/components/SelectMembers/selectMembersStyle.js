import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  teamWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeTeamWrapper: {
    backgroundColor: appTheme.INACTIVE_COLOR,
  },
  memberWrapper: {
    width: '23%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  memberPhoto: {height: 40, width: 40, borderRadius: 50},
  memberName: {
    width: 60,
    textAlign: 'center',
    color: '#000',
    fontSize: 13,
    paddingTop: 10,
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
  },
});

export default styles;
