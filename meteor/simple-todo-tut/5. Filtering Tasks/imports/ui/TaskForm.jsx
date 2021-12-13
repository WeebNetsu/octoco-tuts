import React, { useState } from 'react';
import { TaskCollection } from "/imports/api/TaskCollection";

function TaskForm() {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (text.trim() === ""){
            return;
        }

        TaskCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        });

        setText("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter new task here" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm;