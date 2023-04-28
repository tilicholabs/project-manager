import appTheme from './colors';

export const dashboardDetails = [
  {
    icon: 'refresh',
    status: 'All Tasks',
    count: '35',
    bg: appTheme.PRIMARY_COLOR,
  },
  {
    icon: 'clock-outline',
    status: 'In Progress',
    count: '35',
    bg: 'orange',
  },
  {
    icon: 'file-check-outline',
    status: 'Completed',
    count: '35',
    bg: 'green',
  },
  {
    icon: 'heart-outline',
    status: 'Not started',
    count: '35',
    bg: appTheme?.INACTIVE_COLOR,
  },
];
