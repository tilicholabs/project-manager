import {StyleSheet} from 'react-native';
import appTheme from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: 60,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    margin: 1,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  taskProgressIndicator: {marginRight: 10},
  taskMiddleColumn: {width: '50%', marginRight: 'auto'},
  taskTitle: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  taskProgressBar: {borderRadius: 7, height: 6},
  teamWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginRight: 10,
  },
  memberPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -10,
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
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
  },
  menuOptionsText: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default styles;
