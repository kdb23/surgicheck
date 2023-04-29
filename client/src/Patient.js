import React from 'react';
import {Link} from 'react-router-dom';


function Patient({id, name, dob, mrn}) {

    return(
        <div class='card text-center'>
                <div class='card-body'>
                    <p class='card-text'></p>
                <Link to ={`/home/patient/${id}`}>
                Name:{name}
                </Link> DOB:{dob}, MRN:{mrn}
                </div>
         </div>
    )
}

export default Patient

  