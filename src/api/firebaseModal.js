import firestore from '@react-native-firebase/firestore';
import {getTime} from '../utils/DataHelper';

export class FireBaseModal {
  constructor(path) {
    this.basePath = path;
  }

  registerUser = userData => {
    const ref = firestore().collection(this.basePath).doc();
    ref.set({id: ref.id, ...userData});
  };

  getMembers = async () => {
    const data = await firestore().collection(this.basePath).get();
    return data.docs;
  };

  deleteUser = async userId => {
    await firestore().collection(this.basePath).doc(userId).delete();
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
