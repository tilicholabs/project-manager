import {StyleSheet} from 'react-native';
import appTheme from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: appTheme.INACTIVE_COLOR,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  teamTextWrapper: {width: '100%', marginBottom: 20},
  teamText: {
    fontSize: 16,
    color: 'gray',
  },
  btnWrapper: {
    marginTop: 'auto',
    height: 45,
    backgroundColor: appTheme.PRIMARY_COLOR,
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  teamSection: {height: 200, width: '100%', flex: 1, paddingHorizontal: 16},
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
  memberName: {width: 60, textAlign: 'center', color: '#000', fontSize: 13},
  activeMemberName: {color: '#fff'},
});

export default styles;
