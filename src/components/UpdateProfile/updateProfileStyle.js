import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  addButtonStyle: {
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  addTextStyle: {
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
});

export default styles;
