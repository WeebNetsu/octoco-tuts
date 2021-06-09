import React, { useState } from 'react';
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/api/TaskCollection";
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';

function toggleChecked({ _id, isChecked }) {
  TaskCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

function deleteTask({ _id }) {
  TaskCollection.remove(_id);
}

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TaskCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, { sort: { createdAt: -1 } }).fetch()
  });

  const pendingTasksCount = useTracker(() => !user ? 0 : TaskCollection.find(pendingOnlyFilter).count());
  const pendingTasksTitle = `${pendingTasksCount > 0 ? `(${pendingTasksCount})` : ""}`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>My Todo App! {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <>
            <div className="user" onClick={() => Meteor.logout()} title="Logout">
              {user.username}
            </div>

            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>{hideCompleted ? "Show All" : "Hide Completed"}</button>
            </div>

            <ul className="tasks">
              {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
            </ul>
          </>
        ) : (<LoginForm />)}

      </div>

    </div>
  )
};
