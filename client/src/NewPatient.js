import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap'

function NewPatient({addPatient}) {

    const [addName, setAddName] = useState('')
    const [addDOB, setAddDOB] = useState('')
    const [addMRN, setAddMRN] = useState('')
    const [addAddress, setAddAddress] = useState('')
    const [addPhone, setAddPhone] = useState('')
    const [addPrimary, setAddPrimary] = useState('')
    const [addProcedure, setAddProcedure] = useState('')
    const [addSurgeon, setAddSurgeon] = useState('')
    const [addService, setAddService] = useState('')
    const [addDuration, setAddDuration] = useState('')
    const [addLocation, setAddLocation] = useState('')

    const handleName = e => setAddName(e.target.value)
    const handleDOB = e => setAddDOB(e.target.value)
    const handleMRN = e => setAddMRN(e.target.value)
    const handleAddress = e => setAddAddress(e.target.value)
    const handlePhone = e => setAddPhone(e.target.value)
    const handlePrimary = e => setAddPrimary(e.target.value)
    const handleProcedure = e => setAddProcedure(e.target.value)
    const handleSurgeon = e => setAddSurgeon(e.target.value)
    const handleService = e => setAddService(e.target.value)
    const handleDuration = e => setAddDuration(e.target.value)
    const handleLocation = e => setAddLocation(e.target.value)


    const history = useHistory();

    const patientObj = {
        name : addName,
        dob : addDOB,
        mrn : addMRN,
        address : addAddress,
        phone : addPhone,
        primary : addPrimary,
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/patients', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(patientObj)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to add patient');
            }
            return response.json();
            })
        .then(newPatient => {
            addPatient(newPatient);
            alert('Patient has been added');
            history.push('/home/patients');
        })
    }


    return(
        <Container>
        <div>
            <h1>Add A New Patient</h1>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                    type="text"
                    name= "name"
                    placeholder = "Patient Name"
                    onChange={handleName}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient DOB:</Form.Label>
                <Form.Control
                    type= "text"
                    name ="dob"
                    placeholder= "Y/M/D"
                    onChange={handleDOB}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient MRN:</Form.Label>
                <Form.Control
                    type= "text"
                    name ="mrn"
                    placeholder= "Patient MRN"
                    onChange={handleMRN}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Address:</Form.Label>
                <Form.Control
                    type= "text"
                    name ="address"
                    placeholder= "Patient Address"
                    onChange={handleAddress}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Phone Number:</Form.Label>
                <Form.Control 
                    type= "text"
                    name ="phone"
                    placeholder= "Patient Phone Number"
                    onChange={handlePhone}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient PCP:</Form.Label>
                <Form.Control
                    type= "num"
                    name ="primary"
                    placeholder= "Patient Primary Care"
                    onChange={handlePrimary}
                />
                </Form.Group>
                <Button variant='secondary' onClick={handleSubmit}>Submit</Button>
            </Form>
            </div>
        </Container>
    )
}

export default NewPatient

