import React from 'react';
import Patient from './Patient';



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
             <h1>Patient Page</h1>
            <div class ='row row-cols-1'>
                {person}
           </div>
        </div>

    )
}

export default PatientContainer