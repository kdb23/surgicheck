
import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'


function SignUp() {
        

    const {setUser} = useContext(UserContext);


    const [error, setError] = useState('')
    const [new_user, setnew_user] = useState('')
    const [new_password, setnew_password] = useState('')

    const history = useHistory();

    function handleSignup(e) {
        e.preventDefault();
        setError('')
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                new_user,
                new_password  
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.user) {
                setUser(data)
            } 
        })
        .catch((error) => {
            setError(error.message)
        });
    }

    return (
       
            <Form onSubmit={handleSignup}>
                <h2> Sign Up for Access</h2>
                <label htmlFor='new_user'>Username:</label>
                <input
                    type='username'
                    id='username'
                    autoComplete='off'
                    onChange={(e) => setnew_user(e.target.value)}
                />
                <div>
                    <label htmlFor='new_password'>Password:</label>
                    <input 
                        type='password'
                        id='password'
                        autoComplete='off'
                        onChange={(e) => setnew_password(e.target.value) }
                    />
                </div>
                <Button type='submit' variant='secondary'>Submit</Button>
            </Form>
    
    )
}


export default SignUp