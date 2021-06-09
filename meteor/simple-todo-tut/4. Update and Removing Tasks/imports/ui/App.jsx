import React from 'react';
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
  const tasks = useTracker(() => TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>My Todo App!</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
        </ul>
      </div>

    </div>
  )
};
