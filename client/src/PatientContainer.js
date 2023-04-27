import React from 'react';
import Patient from './Patient';



function PatientContainer({patient, handlePatientPatch, handlePatientDelete}) {
    const person = patient.map((pObj) => {
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            address = {pObj.address}
            phone = {pObj.phone}
            primary = {pObj.primary}
            handlePatientPatch = {handlePatientPatch}
            handlePatientDelete = {handlePatientDelete}
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