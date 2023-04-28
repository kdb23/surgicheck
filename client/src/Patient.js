import React from 'react';
import {Link} from 'react-router-dom';


function Patient({id, name, dob, mrn}) {

    return(
        <div class='card text-center'>
                <div class='card-body'>
                    <p class='card-text'></p>
                <Link to ={`/home/patient/${id}`}>
                <p>NAME:{name}</p>
                </Link>
                <p>DOB:{dob}</p>
                <p>MRN:{mrn}</p>
                </div>
         </div>
    )
}

export default Patient

  