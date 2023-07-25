import initialState from '../state';

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggleBottomModel': {
      const bottomModel = action.payload.bottomModel;
      return {
        ...state,
        bottomModel,
      };
    }
    case 'viewTask': {
      const selectedTask = action.payload.selectedTask;
      return {
        ...state,
        selectedTask,
      };
    }
    case 'members': {
      const member = action.payload.memberDetails;
      return {
        ...state,
        members: [...state?.members, member],
      };
    }
    case 'updateMembers': {
      const members = action.payload.membersList;
      return {
        ...state,
        members: members,
      };
    }
    case 'setMembers': {
      return {...state, members: action.payload};
    }
    default:
      return state;
  }
};
