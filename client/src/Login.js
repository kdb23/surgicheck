import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './context/user';
import {Form, Button, Container, Badge, Modal} from 'react-bootstrap'
import SignUp from './SignUp';


function Login() {

    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [loginError, setLoginError] = useState('')
    
    const history = useHistory();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    

    function handleLogin(e) {
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
                setLoginError('Unable to Login. Please Check Username and/or Password')
            }
        });
        
    }

    return(
      
        <Container>
            <div className='d-flex align-items-center justify-content-center' style={{height : '100vh'}}>
            <Form onSubmit={handleLogin}>
            <h1><Badge bg = 'light' text='dark'>Login to Access</Badge></h1>
            {loginError && <div className='alert alert-danger'>{loginError}</div>}
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
            <Button className='button' type='submit'>Login</Button>
            <Button variant='primary' onClick={handleShowModal}>Sign Up</Button>
            </Form>
            <Modal className='color-nav' variant='light' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title >Sign Up for Access</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignUp  handleCloseModal={handleCloseModal} />
                </Modal.Body>
            </Modal>
            </div>
        </Container>

    );
}

export default Login