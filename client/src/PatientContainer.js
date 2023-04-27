import React from 'react';
import Patient from './Patient';
import PatientEdit from './PatientEdit';


function PatientContainer({patient}) {
    const person = patient.map((pObj) => {
        return <Patient 
            key = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            address = {pObj.address}
            phone = {pObj.phone}
            primary = {pObj.primary}
        />
    })
    return(
        <div>
             <h1>Patient & Procedure List Page</h1>
           {person}
        </div>
    )
}

export default PatientContainer