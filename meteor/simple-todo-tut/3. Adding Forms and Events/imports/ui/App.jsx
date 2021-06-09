import React from 'react';
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/api/TaskCollection";
import TaskForm from './TaskForm';

export const App = () => {
  const tasks = useTracker(() => TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div>
      <TaskForm />

      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
    </div>
  )
};
