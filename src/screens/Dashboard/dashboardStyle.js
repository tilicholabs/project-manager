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
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 30,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  statisticsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statisticsContent: {
    width: '45%',
    borderRadius: 15,
    height: 100,
    padding: 15,
    marginBottom: 15,
  },
  statisticsIcon: {
    marginLeft: 'auto',
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
  },
  statisticsTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
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
    marginBottom: 30,
  },
});

export default styles;
