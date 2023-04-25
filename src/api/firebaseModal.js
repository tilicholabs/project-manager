import firestore from '@react-native-firebase/firestore';
import {getTime} from '../utils/DataHelper';

export class FireBaseModal {
  constructor(path) {
    this.basePath = path;
  }

  registerUser = async (userId, userData) => {
    await firestore()
      .collection(this.basePath)
      .doc(userId)
      .set({
        id: userId || '',
        email: userData?.email || '',
        phone_number: userData?.phoneNumber || '',
        designation: userData?.designation || '',
        created_at: getTime(),
      });
  };
}

export const Modals = {
  users: new FireBaseModal('users'),
  projects: new FireBaseModal('projects'),
  tasks: new FireBaseModal('tasks'),
  subTasks: new FireBaseModal('sub_tasks'),
  comments: new FireBaseModal('comments'),
  teams: new FireBaseModal('teams'),
};
