import React, { useState } from 'react';
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/api/TaskCollection";
import TaskForm from './TaskForm';

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

  const hideCompletedFilter = { isChecked: {$ne: true} };
  const tasks = useTracker(() => TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());

  const pendingTasksCount = useTracker(() => TaskCollection.find(hideCompletedFilter).count());
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
        <TaskForm />

        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>{hideCompleted ? "Show All" : "Hide Completed"}</button>
        </div>

        <ul className="tasks">
          {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
        </ul>
      </div>

    </div>
  )
};
