import React, {useState, useContext} from 'react';
import {UserContext} from './context/user';
import {Form, Button} from 'react-bootstrap'


function AdminUser() {

    const {setUser} = useContext(UserContext);

    const [newUsername, setNewUsername] = useState('')
    const [tempPassword, setTempPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token')
        fetch('/home/admin', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username: newUsername, password: tempPassword}),
        }).then((r) => {
            if(r.ok) {
                r.json().then((user) => {
                    setUser(user);
                });
            } else {
                alert('Unable to create new user. Please try again later')
            }
        });
    }

    return(
        <Form onSubmit={handleSubmit}>
            <div>
            <label>
                Username:
                <Form.Control
                    type='text'
                    id='username'
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </label>
            </div>
            <div>
            <label>
                Password:
                <Form.Control
                    type='password'
                    id='password'
                    onChange={(e) => setTempPassword(e.target.value)}
                />
            </label>
            </div>
            <Button type='submit' variant='secondary'>Create New User</Button>
        </Form>

    )
}

export default AdminUser