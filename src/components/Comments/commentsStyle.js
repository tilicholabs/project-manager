import {StyleSheet} from 'react-native';

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
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  comment: {
    paddingTop: 10,
    fontFamily: 'Montserrat-Regular',
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
