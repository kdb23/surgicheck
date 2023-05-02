import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'
import SignUp from './SignUp';


function Login() {

    const {setUser} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')


    const history = useHistory();
    
    function handleLogin(e) {
        e.preventDefault();
        setError('');
        fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify({
                  username,
                  password,
              }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    setUser(data)
                    history.push('/home');
                } 
            })
            .catch((error) => {
                setError(error.message);
            }); 
    }




    return(
      
            <div>
            <Form onSubmit={handleLogin}>
            <h1>Login to Access Patient Information</h1>
             <label htmlFor='username'>Username</label>
                 <input
                     type='username'
                     id='username'
                     autoComplete='off'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                 />
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        autocomplete='off'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            <Button variant='secondary' type='submit'>Login</Button>
            </Form>
            <SignUp />
            </div>

    );
}

export default Login