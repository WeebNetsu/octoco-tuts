import React from 'react';

function Task({ task }) {
    return (
        <li>{task.text}</li>
    )
}

export default Task;