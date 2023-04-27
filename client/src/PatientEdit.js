import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap'

function PatientEdit({id, handlePatientPatch}){

    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')

    const handlePatch = (e) => {
        e.preventDefault()
        let  newPatientObj = {
            name : patientName,
            dob: patientDOB,
            mrn : patientMRN,
            address: patientAddress,
            phone : patientPhone,
            primary : patientPrimary
        }

        fetch(`/patients/${id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newPatientObj)
        })
            .then(r => r.json())
            .then(handlePatientPatch)
    }
    

    return(
        <>
        <div>
            <h1>Edit Individual Patients Placeholder Page</h1>
            <Link to='/home'>Home</Link>
        </div>
        <div>
             <Container>
            <h1>Edit Existing Patient Form : Modal vs Popup </h1>
        <div>
            <Form onSubmit={handlePatch}>
                <div>
                <input
                    type="text"
                    id='name'
                    name= "name"
                    placeholder = "Patient Name"
                    onChange={(e) => setPatientName(e.target.value)}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    id='dob'
                    name ="dob"
                    placeholder= "Patient DOB: YEAR/M/D"
                    onChange={(e) => setPatientDOB(e.target.value)}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    id="mrn"
                    name ="mrn"
                    placeholder= "Patient MRN"
                    onChange={(e) => setPatientMRN(e.target.value)}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    id='address'
                    name ="address"
                    placeholder= "Address"
                    onChange={(e) => setPatientAddress(e.target.value)}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    id='phone'
                    name ="phone"
                    placeholder= "Phone"
                    onChange={(e) => setPatientPhone(e.target.value)}
                />
                </div>
                <div>
                <input 
                    type= "num"
                    id="primary"
                    name ="primary"
                    placeholder= "Patient PCP"
                    onChange={(e) => setPatientPrimary(e.target.value)}
                />
                </div>
                <button onClick={handlePatch}>Edit Patient Information</button>
            </Form>
        </div>
        </Container>
        </div>
        </>
    )
}

export default PatientEdit