import React from 'react';
import {useState} from 'react';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: "POST",
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if(r.ok) {
                r.json().then((user) => setUsername(user));
            }
        });
    }

    return(
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    autoComplete='off'
                    onChange={(e)=> setUsername(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    id='password'
                    autoComplete='off'
                    onChange={(e)=> setPassword(e.target.value)}
                />
                </div>
                <button type='submit'>Login</button>
            </form>
        </>

    )
}

export default Login