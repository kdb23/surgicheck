import React from 'react';
import Patient from './Patient';
import {Link} from 'react-router-dom';



function PatientContainer({patients}) {
    const person = patients.map((pObj) => {
    
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
        />
    })
    return(
        <div>
            <Link to='/home'>Home</Link>
             <h1>Patient Page</h1>
            <div class ='row row-cols-3'>
                {person}
           </div>
        </div>

    )
}

export default PatientContainer