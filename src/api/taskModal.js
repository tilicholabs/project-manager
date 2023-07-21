import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../utils/DataFormatter';
export class FireBaseModal {
  constructor(path) {
    this.basePath = path;
  }
  getProjectTasks = async projectId => {
    return await firestore()
      .collection('tasks')
      // Filter results
      .where('project_id', '==', projectId)
      .get();
  };

  getCompletedTasks = async projectId => {
    return await firestore()
      .collection('tasks')
      // Filter results
      .where('status', '==', 'Completed')
      .where('project_id', '==', projectId)
      .get();
  };

  getUserTasks = async id => {
    const data = await firestore()
      .collection(this.basePath)
      .where('team', 'array-contains', id)
      .get();
    return dataFormatter(data);
  };
}
export const taskModal = new FireBaseModal('tasks');

export const Modals = {
  users: new FireBaseModal('users'),
  projects: new FireBaseModal('projects'),
  tasks: new FireBaseModal('tasks'),
  subTasks: new FireBaseModal('sub_tasks'),
  comments: new FireBaseModal('comments'),
  teams: new FireBaseModal('teams'),
};
