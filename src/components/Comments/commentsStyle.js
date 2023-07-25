import {StyleSheet} from 'react-native';
import {fonts} from '../../constants/fonts';

const styles = StyleSheet.create({
  commentsContainer: {
    position: 'relative',
    flex: 1,
  },
  commentsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
    fontFamily: fonts.regular,
  },
  displayComments: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 17,
    borderColor: 'gray',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personNameText: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  timeText: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  comment: {
    paddingTop: 10,
    fontFamily: fonts.regular,
  },
  enterCommentView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 17,
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: 'gray',
    width: '90%',
  },
});

export default styles;
