# Project Management mobile app built with ReactNative

## Features

- Create and manage projects.
- Add and assign tasks to team members.
- Track task status (Not Started, In Progress, Completed).
- Add Sub-Tasks to tasks.
- Real-time collaboration with team members.
- User authentication and access control.

## Create and manage projects

You can create a project by adding `Title` and `Description`.You can add multiple `team members` into the project. Created projects are listed at `Projects` screen. You can find all tasks related to the project in the `Project details` page. You can change the status of particular task. You can Add team members as well in this screen.

| Create Project                         | Projects Listing                         |
| -------------------------------------- | ---------------------------------------- |
| ![app](/src/assets/createProject.jpeg) | ![app](/src/assets/projectsListing.jpeg) |

| Project Details                         | Project Status                         |
| --------------------------------------- | -------------------------------------- |
| ![app](/src/assets/projectDetails.jpeg) | ![app](/src/assets/projectStatus.jpeg) |

## Task creation

You can create a task by adding `Title`, `Description` and `Due date`. All tasks related to signed user will listed in the `Dashboard`. You can create task from the particular `Project details` screen as well.

| Create Task                         | Dashboard                     |
| ----------------------------------- | ----------------------------- |
| ![app](/src/assets/createTask.jpeg) | ![app](/src/assets/home.jpeg) |

## Task status

Tasks are listed in `Dashboard` screen. You can change the status of task from there or tasks are listed at `Project details` screen as well. You can change status of task from this screen also.

| Task Status                        | Project Status                         |
| ---------------------------------- | -------------------------------------- |
| ![app](src/assets/taskStatus.jpeg) | ![app](/src/assets/projectStatus.jpeg) |

## Sub-Tasks creation

You can create a `sub-tasks` for particular task. When you tap on particular task , it will go to `Task details` screen. The `Sub-tasks` related to that particular task are listed in that screen. You can create a new `sub-task` from there. The sub-tasks are also have the status, you can change it from there only.

| Sub-task creation                        | Task Details                         |
| ---------------------------------------- | ------------------------------------ |
| ![app](/src/assets/subTaskCreation.jpeg) | ![app](/src/assets/taskDetails.jpeg) |

## Real-time collaboration with team members

The "Real-time Collaboration with Team Members" feature is at the heart of our project management app. It empowers teams to work together seamlessly, fostering communication, transparency, and productivity throughout the project's lifecycle.

## Key Benefits:

- `Instant Communication :`
  Team members can communicate instantly, eliminating the need for lengthy email chains or delayed responses. Whether it's discussing project details, sharing updates, or asking questions, real-time chat makes it effortless.

- `Task Coordination :` Collaborators can coordinate on tasks efficiently. When a task's status changes or a comment is added, all relevant team members are notified immediately, ensuring everyone is on the same page.

- `Enhanced Transparency :` Real-time updates provide complete transparency into project progress. Team members can view task changes, project milestones, and new comments as they occur, enabling them to respond promptly.

## User authentication and access control

The project management app has both login and signup flow. Users have an specific set of access controls over `CRUD` operations. This accessess are controlled over `admin` level.

| Login                          | Sign-up                         |
| ------------------------------ | ------------------------------- |
| ![app](/src/assets/login.jpeg) | ![app](/src/assets/signUp.jpeg) |

## Credits

👤 _Princewill Iroka_

- Twitter: [@PrincewillIroka](https://twitter.com/PrincewillIroka)
