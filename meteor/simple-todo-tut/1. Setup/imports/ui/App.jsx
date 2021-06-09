import React from 'react';
import Task from "./Task";

const tasks = [
  {
    _id: 1,
    text: "Task 1"
  },
  {
    _id: 2,
    text: "Task 2"
  },
  {
    _id: 3,
    text: "Task 3"
  },
]

export const App = () => (
  <div>
    <ul>
      {tasks.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
);
