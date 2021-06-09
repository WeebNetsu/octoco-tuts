import React from 'react';
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/api/TaskCollection";

export const App = () => {
  const tasks = useTracker(() => TaskCollection.find({}).fetch());

  return (
    <div>
      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
    </div>
  )
};
