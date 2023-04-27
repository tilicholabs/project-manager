import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  projectsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginHorizontal: 10,
  },
  projectTitleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: appTheme.COLOR1,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default styles;
