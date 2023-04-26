export const getScreenParent = route => {
  let parent;
  let bottomTabStack = ['Dashboard', 'Projects', 'Members', 'Profile'];

  let singleStack = [
    'Onboarding',
    'Login',
    'SignUp',
    'Chat',
    'Reports',
    'Calendar',
    'Tasks',
    'CreateProject',
    'Project',
    'TaskView',
  ];

  if (bottomTabStack.includes(route)) {
    parent = 'BottomTabStack';
  } else if (singleStack.includes(route)) {
    parent = 'SingleStack';
  }
  return parent;
};
