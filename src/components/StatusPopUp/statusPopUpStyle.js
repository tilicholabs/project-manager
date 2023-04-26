import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
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
