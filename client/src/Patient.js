import React from 'react';
import {Link} from 'react-router-dom'

function Patient({name, dob, mrn, address, phone, primary}) {
    return(
        <> 
        <Link to='/home'>Home</Link>
            <div>
                <p>NAME:{name}</p>
                <p>DOB:{dob}</p>
                <p>MRN:{mrn}</p>
                <p>ADDRESS:{address}</p>
                <p>PHONE:{phone}</p>
                <p>PCP: Dr.{primary}</p>
            </div>
        </>
    )
}

export default Patient