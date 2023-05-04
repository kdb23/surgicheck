import React, {useState, useContext} from 'react';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'


function SignUp({handleCloseModal}) {
        

    const {setUser} = useContext(UserContext);


    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  

   

    const history = useHistory()

    function handleSignup(e) {
        e.preventDefault();
        setError('');
        fetch("/users/list")
            .then(response => response.json())
            .then(users => {
                console.log(username)
                const usernames = users.map(user => user.username);
                if (usernames.includes(username)){
                    window.alert("Username is already taken");
                } else if (password.length < 8) {
                    window.alert('Password must be at least 8 characters');
                }
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
                        setUser(data);
                        handleCloseModal()
                        history.push('/home')
                })
                .catch((error) => {
                    setError(error.message);
                });
            })
            .catch((error) => {
                setError(error.message);
            });
    }


    return (
        
        <div>
            <Form onSubmit={handleSignup}>
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
            {error && <p>{error}</p>}
            </div>
    
    )
}


export default SignUp