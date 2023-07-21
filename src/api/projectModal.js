import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../utils/DataFormatter';

export class FireBaseModal {
  constructor(path) {
    this.basePath = path;
  }

  createProject = async data => {
    const doc = await firestore().collection(this.basePath).doc();
    await doc.set({...data, id: doc.id, status: 'Not Started'});
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
}

export const projectModal = new FireBaseModal('projects');
