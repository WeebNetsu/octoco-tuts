import React, { useState } from 'react';
import gql from "graphql-tag"; // so we can create graphql queries
import { useMutation } from "@apollo/react-hooks"; // to use mutations

// we add a new mutation to add data to the db with graphql
// then retrieve the _id from it
const taskMutation = gql`
  mutation AddTask($text: String!) {
    addTask(text: $text) {
      _id
    }
  }
`

function TaskForm() {
    const [addTaskMutation] = useMutation(taskMutation);
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (text.trim() === "") {
            return;
        }

        // no longer need to use meteor call

        addTaskMutation({
            variables: {
                text,
            },
            // we use refetchQueries instead of refetch() now
            // the "Tasks" we are refering to are the query we made
            // in schemas/TaskSchema.js
            refetchQueries: () => ['Tasks']
        })
            .then(() => console.log('Task added with success'))
            .catch(e => console.error('Error trying to add task', e));

        setText("");

        // we no longer need refetch()
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter new task here" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm;