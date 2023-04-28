import React from 'react';
import Patient from './Patient';
import {Link} from 'react-router-dom';



function PatientContainer({patient, handlePatientPatch}) {
    const person = patient.map((pObj) => {
    
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            handlePatientPatch = {handlePatientPatch}
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