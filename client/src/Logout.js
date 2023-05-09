import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from './context/user';
import {Button} from 'react-bootstrap'

function Logout() {
    const {user, setUser} = useContext(UserContext);
    function handleLogout() {
        fetch('/logout', {method: "DELETE"}).then((r)=>{
            if(r.ok) {
                setUser(null);
                window.location.href = '/';
            }
        });
    }
    return (
        <header>
            <div>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </header>
    );

}

export default Logout;