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
            }
        });
    }
    return (
        <header>
            <div>
                {user ? (
                    <Button onClick={handleLogout}>Logout</Button>
                ) : (
                    <>
                        <Link to='/'>Logout</Link>
                    </>
                )}
            </div>
        </header>
    );

}

export default Logout;