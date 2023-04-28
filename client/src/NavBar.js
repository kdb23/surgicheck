import React from 'react';
import {Link} from "react-router-dom";


function NavBar() {

    return (
        <nav>
        <header>
            <Link to="/home/admin">Admin Info</Link>
            <div>
            <Link to='/home/patients'>Patient List</Link>
            </div>
            <div>
            <Link to='/home/new_patient'>Add New Patient</Link>
            </div>
            <div>
            <Link to='/home/patient/:id'>Individual Patient Info</Link>     
            </div>
        </header>
        </nav>
    );

}

export default NavBar;
