import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  leftHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  profileDetailsSection: {
    paddingTop: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  profileInfoSection: {
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    marginBottom: 20,
  },
  profilePhoto: {
    height: 110,
    width: 110,
    borderRadius: 110,
    marginBottom: 20,
  },
  statisticsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
  },
  statisticsText: {
    color: appTheme.PRIMARY_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
  },
  statisticsTitle: {
    fontSize: 13,
    color: appTheme.INACTIVE_COLOR,
  },
  profileCenterSection: {
    display: 'flex',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: fonts.regular,
  },
  designationText: {
    fontSize: 12,
    color: appTheme.INACTIVE_COLOR,
    marginBottom: 20,

    fontFamily: fonts.regular,
  },
  editProfileWrapper: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    paddingHorizontal: 25,
    borderRadius: 5,
    paddingVertical: 10,
  },
  editProfileText: {
    color: '#fff',
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  exploreHeader: {
    fontWeight: 'bold',
    marginBottom: 30,
    fontSize: 14,
  },
  exploreContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  singleExplore: {
    height: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: '#fff',
    margin: 1,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  exploreText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: appTheme.PRIMARY_COLOR,
    height: 25,
    marginLeft: 8,
    fontFamily: fonts.regular,
  },
  inputContainer: {
    marginTop: 25,
    marginHorizontal: 15,
    width: 300,
    height: 200,
  },
  labels: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: 'regular',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 1,
    fontSize: 18,
    height: 35,
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: '30%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default styles;
