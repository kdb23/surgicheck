import React from 'react';
import Patient from './Patient';
import {Container} from 'react-bootstrap';

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
        <Container>
             <h1>Patient Page</h1>
                {person}
        </Container>

    )
}

export default PatientContainer