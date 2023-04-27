import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from './context/user';

function NavBar() {
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
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to='/'>Logout</Link>
                    </>
                )}
            </div>
        </header>
    );

}

export default NavBar;
