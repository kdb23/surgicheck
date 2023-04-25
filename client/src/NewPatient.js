import React from 'react';
import {Link} from 'react-router-dom';

function NewPatient() {
    return(
        <div>
            <h1>Add A New Patient</h1>
            <Link to='/home'>Home</Link>
        </div>
    )
}

export default NewPatient