import React, {useState} from 'react';
import Patient from './Patient';
import {Container, Form, Row} from 'react-bootstrap'


function PatientContainer({patients, handlePatientSearch}) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = e => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm);
    };

    const filteredPatients = patients.filter(patientObj => {
        return patientObj.name.toLowerCase().includes(searchTerm) || patientObj.mrn.includes(searchTerm);
    });

    const person = filteredPatients.map((pObj) => {
        const surgeries = pObj.surgeries?.map((surgery) => {
            return (
                <div key={surgery.id}>
                    <p>{surgery.name}</p>
                    <p>{surgery.surgeon}</p>
                </div>
            )
        })
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            handlePatientSearch = {handlePatientSearch}
            surgeries = {surgeries}
        />
    })
    return(
      
        <Container className="mt-5">
            <Row>
                <Form.Control
                    type='text'
                    id='search'
                    placeholder='Type Patient Name or MRN'
                    onChange={handleSearch}
                />
                    {person}
           </Row>
        </Container>
        

    )
}

export default PatientContainer