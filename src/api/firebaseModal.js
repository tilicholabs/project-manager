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

  delete = async id => {
    await firestore().collection(this.basePath).doc(id).delete();
  };

  createProject = async data => {
    const doc = await firestore().collection(this.basePath).doc();
    await doc.set({...data, id: doc.id, status: 'ongoing'});
  };

  createTask = async task => {
    await firestore().collection(this.basePath).add(task);
  };

  getMembers = async () => {
    const members = await firestore().collection('users').get();
    return members;
  };

  getUserProjects = async id => {
    const data = await firestore()
      .collection(this.basePath)
      .where('selectedMembers', 'array-contains', id)
      .get();
    return dataFormatter(data);
  };

  getProjects = async () => {
    const projects = await firestore().collection('projects').orderBy().get();
    return projects;
  };

  registerUser = async (id, data) => {
    await firestore().collection(this.basePath).doc(id).set(data);
  };

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
      .where('status', '==', 'completed')
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

export const Modals = {
  users: new FireBaseModal('users'),
  projects: new FireBaseModal('projects'),
  tasks: new FireBaseModal('tasks'),
  subTasks: new FireBaseModal('sub_tasks'),
  comments: new FireBaseModal('comments'),
  teams: new FireBaseModal('teams'),
};
