import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory } from 'react-router-dom';
import {Button, Form, Container} from 'react-bootstrap';


function PatientEdit({handlePatientDelete, handlePatientPatch}){

    const {id} = useParams();
    const history = useHistory();
    const [patient, setPatient] = useState(null)
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleBack = () => {
        history.goBack();
    }

    const handleClose = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        fetch(`/patients/${id}`)
            .then(r => r.json())
            .then(data => setPatient(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you Sure you want to delete this Patient ?")) {
            handlePatientDelete(id)
            fetch(`/patients/${id}`, {
                method: "DELETE"
            })
            .then(() => {
                history.push('/home/patients');
            })
            .catch(error => console.log(error))
        }
    }

    const handlePatch = (e) => {
        e.preventDefault()
        let  newObj = {
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
            body: JSON.stringify(newObj)
        })
            .then(r => r.json())
            .then(handlePatientPatch)
        };

    return(
        <>
        <Button variant="secondary"><Link to='/home'>Home</Link></Button>
        <Button variant='secondary' onClick={handleBack}>Back</Button>
        <h1>Patient{id}</h1>
        {patient && (
            <div>
                <p> Name: {patient.name}</p>
                <p>DOB:{patient.dob}</p>
                <p>MRN:{patient.mrn}</p>
                <p>ADDRESS:{patient.address}</p>
                <p>PHONE:{patient.phone}</p> 
                <p>PCP: Dr.{patient.primary}</p>
        <Button variant='primary' onClick={handleDelete}>Delete</Button>
        <Button variant='primary' onClick={handleClose}>Edit Patient</Button>
        <Container>
        {isVisible && (
            <Form>
                <Form.Group>
                    <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                    type="text"
                    id='name'
                    name= "name"
                    placeholder = "Patient Name"
                    onChange={(e) => setPatientName(e.target.value)}
                /> 
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient DOB:</Form.Label>
                <Form.Control
                    type= "text"
                    id='dob'
                    name ="dob"
                    placeholder= "Y/M/D"
                    onChange={(e) => setPatientDOB(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient MRN:</Form.Label>
                <Form.Control
                    type= "text"
                    id="mrn"
                    name ="mrn"
                    placeholder= "Patient MRN"
                    onChange={(e) => setPatientMRN(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Address:</Form.Label>
                <Form.Control
                    type= "text"
                    id='address'
                    name ="address"
                    placeholder= "Address"
                    onChange={(e) => setPatientAddress(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Phone Number:</Form.Label>
                <Form.Control 
                    type= "text"
                    id='phone'
                    name ="phone"
                    placeholder= "Phone"
                    onChange={(e) => setPatientPhone(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient PCP:</Form.Label>
                <Form.Control
                    type= "num"
                    id="primary"
                    name ="primary"
                    placeholder= "Patient PCP"
                    onChange={(e) => setPatientPrimary(e.target.value)}
                />
                </Form.Group>
                <Button variant='primary' onClick={handlePatch}>Edit Patient Information</Button> 
            </Form>
        )}
        </Container>
        </div>
        )}
        </>
    )
}

export default PatientEdit