import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    color: '#000',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  statisticsSection: {
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  statisticsContent: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',

    marginBottom: 6,
    minWidth: '49%',
    textAlign: 'center',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticsIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  statisticsCounter: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  statisticsValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  statisticsTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  tasksSection: {
    paddingBottom: 40,
  },
  tasksHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tasksRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksLeftText: {
    marginRight: 7,
    fontWeight: 'bold',
    fontSize: 15,
  },
  plusBtnContainer: {
    backgroundColor: appTheme.COLOR1,
    height: 25,
    width: 25,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksRightText: {
    marginRight: 7,
    fontWeight: 'bold',
    fontSize: 15,
    color: appTheme.INACTIVE_COLOR,
  },
  tasksList: {
    marginBottom: 55,
  },
});

export default styles;
