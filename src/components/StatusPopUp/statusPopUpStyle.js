import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  checkBoxOuterView: {
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
  },
  checkBoxInnerView: {
    height: 21,
    width: 21,
    borderRadius: 21,
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
    fontFamily: fonts.regular,
  },
});

export default styles;
