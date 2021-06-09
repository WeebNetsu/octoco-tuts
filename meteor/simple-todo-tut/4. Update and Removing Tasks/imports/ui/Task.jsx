import React from 'react';

function Task({ task, onCheckboxClick, onDeleteClick }) {
    return (
        <li>
            <input type="checkbox" readOnly checked={!!task.isChecked} onClick={() => onCheckboxClick(task)} />
            <span>{task.text}</span>
            <button onClick={() => onDeleteClick(task)} >&times;</button>
        </li>
    )
}

export default Task;