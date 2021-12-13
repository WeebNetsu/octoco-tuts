import React, { useState } from 'react';

function TaskForm({ refetch }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (text.trim() === ""){
            return;
        }

        Meteor.call("tasks.insert", text)

        setText("");

        refetch();
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter new task here" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm;