
import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'


function SignUp() {
        

    const {setUser} = useContext(UserContext);


    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    function handleSignup(e) {
        e.preventDefault();
        setError('')
        fetch("/users", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                username,
                password  
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.user) {
                setUser(data)
            } else {
                setError(data.message);
            }
        })
        .catch((error) => {
            setError(error.message)
        });
    }

    return (
       
            <Form onSubmit={handleSignup}>
                <h2> Sign Up for Access</h2>
                <label htmlFor='username'>Username:</label>
                <input
                    type='username'
                    id='username'
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password'
                        id='password'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value) }
                    />
                </div>
                <Button type='submit' variant='secondary'>Submit</Button>
            </Form>
    
    )
}


export default SignUp