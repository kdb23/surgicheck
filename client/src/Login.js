import React from 'react';
import {useState} from 'react';

function Login() {

    const [login, setLogin] = useState( {} )
    
    const updateLogin = ({target: {name, value}}) => {
        setLogin( login => ({ ...login, [name]: value}))
    }

    const attemptLogin = e => {
        e.preventDefault()
        const body = JSON.stringify(login)
        console.log('working???', body)
    }

    return(
        <>
            <h1>Login Page</h1>
            <form onSubmit={attemptLogin}>
                <div>
                    username:<input onChange={updateLogin} name='username'/>
                </div>
                <div>
                    password:<input onChange={updateLogin} name='password'/>
                </div>
                <input type='submit' />
            </form>
        </>

    )
}

export default Login