import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks"; // import use query
import Task from "./Task";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "/imports/db/TaskCollection";
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';
import gql from 'graphql-tag'; // new import
import { useMutation } from "@apollo/react-hooks"; // to use mutations

// allow for tasks query
const tasksQuery = gql`
  query Tasks {
    tasks { # use tasks schema
      _id # return id
      text # return text
    }
  }
`;

// allow for tasks query
const updateTasksMutation = gql`
  mutation updateTask($isChecked: Boolean, $taskId: ID!) {
    updateTask(isChecked: $isChecked, taskId: $taskId) {
      _id
    }
  }
`;

// allow for tasks query
const deleteTasksMutation = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
    }
  }
`;

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  // we can remove refetch once all mutations have been added
  const { data, loading } = useQuery(tasksQuery);
  const [updateTaskMutation] = useMutation(updateTasksMutation);
  const [deleteTaskMutation] = useMutation(deleteTasksMutation);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  function toggleChecked({ _id, isChecked }) {
    updateTaskMutation({
      variables: {
        taskId: _id,
        isChecked
      },
      refetchQueries: () => ['Tasks']
    })
      .then(() => console.log('Task updated with success'))
      .catch(e => console.error('Error trying to update task', e));
  }

  // move this to inside of App()
  function deleteTask({ _id }) {
    deleteTaskMutation({
      variables: {
        taskId: _id,
      },
      refetchQueries: () => ['Tasks']
    })
      .then(() => console.log('Task deleted with success'))
      .catch(e => console.error('Error trying to delete task', e));
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
    const task = tasksStatus.find(task => task?._id === _id);
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

            {/* remove refetch, since we don't need it in there anymore */}
            <TaskForm />
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
