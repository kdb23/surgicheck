import React from 'react';
import {Link} from 'react-router-dom'

function Patient({name, dob, mrn, address, phone, primary}) {
    return(
        <> 
        <Link to='/home'>Home</Link>
            <div>
                <p>{name}</p>
                <p>{dob}</p>
                <p>{mrn}</p>
                <p>{address}</p>
                <p>{phone}</p>
                <p>{primary}</p>
            </div>
        </>
    )
}

export default Patient