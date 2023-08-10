import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  dueDateText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: fonts.regular,
  },
  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: fonts.regular,
  },
  menuOptionsText: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
  },
  taskProgressWrapper: {},
  taskProgress: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  taskTeamText: {fontWeight: 'bold', marginBottom: 7, fontSize: 17},
  taskMembersWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 20,
    fontFamily: fonts.regular,
  },
  taskMemberPhoto: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginLeft: -10,
  },
  scheduleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scheduleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {color: appTheme.INACTIVE_COLOR, marginLeft: 5},
  longText: {
    fontSize: 16,
    lineHeight: 22,
    color: appTheme.INACTIVE_COLOR,
    fontFamily: fonts.regular,
  },
  subTaskView: {
    display: 'flex',
    flexDirection: 'row',
  },
  subTaskText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 17,
    fontFamily: fonts.regular,
    marginBottom: 10,
  },
  subTasksStyle: {
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkBoxOuterView: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
  },
  checkBoxInnerView: {
    height: 17,
    width: 17,
    borderRadius: 17,
  },
  bottomWrapper: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    marginLeft: 10,
    color: appTheme.INACTIVE_COLOR,
    fontFamily: fonts.regular,
  },
});

export default styles;
