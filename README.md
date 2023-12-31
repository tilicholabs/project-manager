# Project Management Mobile App 
> Built with React Native
## About
This repo helps quickly build a project management tool on Android and iOS mobile apps by taking out the hassle of developing the obvious components.

## Features

- Create and manage projects.
- Add and assign tasks to team members.
- Track task status (Not Started, In Progress, Completed).
- Add Sub-Tasks to tasks.
- Real-time collaboration with team members.
- User authentication and access control.

## Create and manage projects

You can create a project by adding `Title` and `Description`.You can add multiple `team members` to the project. Created projects are listed on the `Projects` screen. You can find all tasks related to the project on the `Project details` page. You can change the status of a particular task. You can Add team members as well on this screen.

| Create Project                            | Projects Listing                        |
| ----------------------------------------- | --------------------------------------- |
| ![Imgur](https://i.imgur.com/YTE3tEh.jpg) | ![app](https://i.imgur.com/HLpWsXP.jpg) |

| Project Details                         | Project Status                          |
| --------------------------------------- | --------------------------------------- |
| ![app](https://i.imgur.com/4a4wnFe.jpg) | ![app](https://i.imgur.com/puzBcgn.jpg) |

## Task creation

You can create a task by adding `Title`, `Description` and `Due date`. All tasks related to signed user will listed in the `Dashboard`. You can create a task from the particular `Project details` screen as well.

| Create Task                             | Dashboard                               |
| --------------------------------------- | --------------------------------------- |
| ![app](https://i.imgur.com/KhikPXu.jpg) | ![app](https://i.imgur.com/kze36WZ.jpg) |

## Task status

Tasks are listed in `Dashboard` screen. You can change the status of task from there or tasks are listed at `Project details` screen as well. You can change status of task from this screen also.

| Task Status                             | Project Status                          |
| --------------------------------------- | --------------------------------------- |
| ![app](https://i.imgur.com/zbOMVRa.jpg) | ![app](https://i.imgur.com/puzBcgn.jpg) |

## Sub-Tasks creation

You can create a `sub-tasks` for particular task. When you tap on particular task , it will go to `Task details` screen. The `Sub-tasks` related to that particular task are listed in that screen. You can create a new `sub-task` from there. The sub-tasks are also have the status, you can change it from there only.

| Sub-task creation                       | Task-Details                            |
| --------------------------------------- | --------------------------------------- |
| ![app](https://i.imgur.com/dv5HxMK.jpg) | ![app](https://i.imgur.com/9WdPouH.jpg) |

## Real-time collaboration with team members

The "Real-time Collaboration with Team Members" feature is at the heart of this project management app. It empowers teams to work together seamlessly, fostering communication, transparency, and productivity throughout the project's lifecycle.

### Key Benefits

- `Instant Communication:`
  Team members can communicate instantly, eliminating the need for lengthy email chains or delayed responses. Whether it's discussing project details, sharing updates, or asking questions, real-time chat makes it effortless.

- `Task Coordination:` Collaborators can coordinate on tasks efficiently. When a task's status changes or a comment is added, all relevant team members are notified immediately, ensuring everyone is on the same page.

- `Enhanced Transparency:` Real-time updates provide complete transparency into project progress. Team members can view task changes, project milestones, and new comments as they occur, enabling them to respond promptly.

## User authentication and access control

The project management app has both login and signup flow. Users have a specific set of access controls over `CRUD` operations. These accessess are controlled over the `admin` level.

| Login                                   | Sign-up                                 |
| --------------------------------------- | --------------------------------------- |
| ![app](https://i.imgur.com/5SMLlLS.jpg) | ![app](https://i.imgur.com/Xz5kWYV.jpg) |

## Credits

We've built many features and fixing broken functionality on top of the very useful [this repo](https://github.com/PrincewillIroka/project_management_mobile_app) by 👤 _Princewill Iroka_
