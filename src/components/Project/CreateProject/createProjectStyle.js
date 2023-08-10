import {StyleSheet} from 'react-native';
import appTheme from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';

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
    fontFamily: fonts.regular,
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
});

export default styles;
