import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


function Login({setUser}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if(r.ok) {
                r.json().then((user) => {
                    setUser(user);
                    history.push('/home')
                });
            } else {
                alert('Unable to login. Please Check Your Username and Password.')
            }
        });
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
                <div>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    autoComplete='off'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    id='password'
                    autoComplete='off'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login