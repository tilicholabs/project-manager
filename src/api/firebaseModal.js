import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../utils/DataFormatter';

export class FireBaseModal {
  constructor(path) {
    this.basePath = path;
  }

  get = async () => {
    const data = await firestore().collection(this.basePath).get();
    const formattedData = dataFormatter(data);
    return formattedData;
  };

  set = async data => {
    const ref = firestore().collection(this.basePath).doc();
    await ref.set({id: ref.id, ...data});
  };

  update = async (id, data) => {
    await firestore().collection(this.basePath).doc(id).update(data);
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
