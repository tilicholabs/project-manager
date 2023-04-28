import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderRadius: 5,
    borderColor: appTheme.INACTIVE_COLOR,
    borderWidth: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
});

export default styles;
