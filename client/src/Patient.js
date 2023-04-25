import React from 'react';
import {Link} from 'react-router-dom';

function Patient() {
    return(
        <div>
            <h1>Patient & Procedure List Page</h1>
            <Link to='/home'>Home</Link>
        </div>
    )
}

export default Patient