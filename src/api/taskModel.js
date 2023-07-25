import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../utils/DataFormatter';
export class FireBaseModel {
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
export const taskModel = new FireBaseModel('tasks');

export const Models = {
  users: new FireBaseModel('users'),
  projects: new FireBaseModel('projects'),
  tasks: new FireBaseModel('tasks'),
  subTasks: new FireBaseModel('sub_tasks'),
  comments: new FireBaseModel('comments'),
  teams: new FireBaseModel('teams'),
};
