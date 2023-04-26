import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modals} from '../../api/firebaseModal';
import styles from './projectListingStyle';

export const ProjectsListing = () => {
  const [projects, setProjects] = useState([]);
  const getAllProjects = async () => {
    const data = await Modals.projects.get();
    setProjects(data);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <View style={styles.projectsView}>
      {projects?.map((project, index) => (
        <TouchableOpacity key={index} style={styles.projectTitleView}>
          <Text style={styles.projectTitle}>{project?.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
