import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap'

function NewPatient({addPatient}) {

    const [addName, setAddName] = useState('')
    const [addDOB, setAddDOB] = useState('')
    const [addMRN, setAddMRN] = useState('')
    const [addAddress, setAddAddress] = useState('')
    const [addPhone, setAddPhone] = useState('')
    const [addPrimary, setAddPrimary] = useState('')

    const handleName = e => setAddName(e.target.value)
    const handleDOB = e => setAddDOB(e.target.value)
    const handleMRN = e => setAddMRN(e.target.value)
    const handleAddress = e => setAddAddress(e.target.value)
    const handlePhone = e => setAddPhone(e.target.value)
    const handlePrimary = e => setAddPrimary(e.target.value)

    const history = useHistory();

    const patientObj = {
        name : addName,
        dob : addDOB,
        mrn : addMRN,
        address : addAddress,
        phone : addPhone,
        primary : addPrimary
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/patients', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(patientObj),
        })
            .then((r) => {
                if(r.ok) {
                    alert("Patient Has Been Added")
                    addPatient(patientObj)
                } else {
                    alert("Missing Information - Unable to Add Patient")
                }
            })
            .then(() => {
                history.push('/home/patients');
            })
    }


    return(
        <Container>
        <div>
        <Link to='/home'>Home</Link>
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
                <Button variant='secondary'>Submit</Button>
            </Form>
            </div>
        </Container>
    )
}

export default NewPatient