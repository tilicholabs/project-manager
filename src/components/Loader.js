import React from 'react';
import {ActivityIndicator} from 'react-native';

export const Loader = ({size = 'large', color = '#644CBC', props}) => {
  return <ActivityIndicator {...{size, color, ...props}} />;
};
