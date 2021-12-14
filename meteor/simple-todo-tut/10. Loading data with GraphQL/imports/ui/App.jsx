import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks"; // import use query
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/db/TaskCollection";
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';
import gql from 'graphql-tag'; // new import

// allow for tasks query
const tasksQuery = gql`
  query Tasks {
    tasks { # use tasks schema
      _id # return id
      text # return text
    }
  }
`;

// same here
function toggleChecked({ _id, isChecked }) {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);
}

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  // below will use the tasksQuery to get data
  const { data, loading, refetch } = useQuery(tasksQuery);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  // move this to inside of App()
  function deleteTask({ _id }) {
    Meteor.call("tasks.remove", _id);
    refetch(); // to refech data once change is made
  }

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  // we now get tasksStatus from this use tracker instead of tasks
  const { tasksStatus, pendingTasksCount, isLoading } = useTracker(() => {
    // change variable to tasksStatus (from tasks)
    const noDataAvailable = { tasksStatus: [], pendingTasksCount: 0 };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready() || loading) { // add loading status
      return { ...noDataAvailable, isLoading: true }
    }

    // update change
    const tasksStatus = TaskCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 }
    }).fetch()

    const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count();

    // update change
    return { tasksStatus, pendingTasksCount }
  });
  
  const tasksData = data?.tasks || [] // get task data
  const tasks = tasksData.map(({ _id, ...rest }) => { // get tasks
    // this will fix hiding the checkboxes not working
    const task = tasksStatus.find(task => task?._id === _id );
    if (!!task) {
      return {
        _id,
        ...rest,
        isChecked: task.isChecked
      }
    }
  })

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

            {/* pass in refetch here call it when new item is added */}
            <TaskForm refetch={refetch} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>{hideCompleted ? "Show All" : "Hide Completed"}</button>
            </div>

            {isLoading && (<div className="loading">Loading...</div>)}

            <ul className="tasks">
              {/* make sure to check that task exists in the map */}
              {tasks.map(task => task && <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
            </ul>
          </>
        ) : (<LoginForm />)}

      </div>

    </div>
  )
};
