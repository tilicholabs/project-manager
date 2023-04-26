const schema = {
  // Users Schema
  users: {
    id: String,
    name: String,
    profile_image: String,
    designation: String,
    email: String,
    phone_number: String,
    location: String,
    department: String,
    role: String,
    created_at: 'mille seconds',
    permissions: {
      users: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
      projects: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
      tasks: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
    },
  },

  // Projects Schema
  projects: {
    id: String,
    name: String,
    description: String,
    team_id: String,
    created_at: 'mille seconds',
    status: String,
  },

  // Tasks Schema
  tasks: {
    id: String,
    project_id: 'project id',
    description: String,
    title: String,
    team: 'team id',
    // sub_tasks: ["Array of sub task id's"],
    // comments: ["Array of comment Id's"],
    status: String,
    due_date: 'mille seconds',
    created_at: 'mille seconds',
  },

  // Sub tasks Schema
  sub_tasks: {
    id: String,
    parent_task_id: 'task id',
    title: String,
    team: 'user id',
    status: String,
    created_at: 'mille seconds',
  },

  // Comments Schema
  comments: {
    id: String,
    title: String,
    task_id: 'task id',
    commenter_id: 'user id',
    created_at: 'mille seconds',
  },

  // Teams Schema
  teams: {
    id: String,
    team_members: ["Array of user id's"],
    team_name: String,
    created_at: 'mille seconds',
  },
};
