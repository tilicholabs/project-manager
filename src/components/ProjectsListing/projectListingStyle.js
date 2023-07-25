import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  projectsView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTitleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: 'rgba(100, 76, 188,0.5)',
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: fonts.regular,
    color: '#fff',
  },
});

export default styles;
