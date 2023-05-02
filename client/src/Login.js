import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'


function Login() {

    const {setUser} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify({
                  action: isLogin? 'login' : 'signup',
                  email,
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
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <Form onSubmit={handleSubmit}>
            <h1>Login to Access Patient Information</h1>
            {!isLogin && (
                <div>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                        type='email'
                        id='email'
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                 )}
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
            <Button variant='secondary' type='submit'>{isLogin ? 'Login' : 'Sign Up'}</Button>
            </Form>
                {error && <p>{error}</p>}
                    <Button onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? 'Sign Up' : 'Login'}</Button>
        </div>
    );
}

export default Login