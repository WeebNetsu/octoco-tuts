import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";

function LoginForm() {
    function submit(e) {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={submit} className="login-form">
            <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" required onChange={e => setUsername(e.target.value)} placeholder="Username" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" required onChange={e => setPassword(e.target.value)} placeholder="Password" />

            <button type="submit">Log In</button>
            </div>
            
        </form>
    )
}

export default LoginForm;