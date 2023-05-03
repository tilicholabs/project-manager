import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Modals} from '../../api/firebaseModal';
import styles from './projectListingStyle';
import appTheme from '../../constants/colors';
import {AppContext} from '../../context';

export const ProjectsListing = () => {
  const [projects, setProjects] = useState([]);
  const {selectedProject, setSelectedProject} = useContext(AppContext);
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
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor:
              project?.id === selectedProject?.id
                ? appTheme.INACTIVE_COLOR
                : 'white',
            margin: 5,
            padding: 5,
            borderRadius: 10,
            width: '30%',
          }}
          onPress={() => setSelectedProject(project)}>
          <View key={index} style={styles.projectTitleView}>
            <Text style={styles.projectTitle}>
              {project?.title?.[0].toUpperCase()}
            </Text>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
              }}
              numberOfLines={1}>
              {project?.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
