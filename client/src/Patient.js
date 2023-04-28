import React, {useState} from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function Patient({id, name, dob, mrn, handlePatientPatch}) {
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')
    const [isVisible, setIsVisible] = useState(false)


    const handleClose = () => {
        setIsVisible(!isVisible);
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
        <div class='card text-center'>
                <div class='card-body'>
                    <p class='card-text'></p>
                <Link to ={`/home/patient/${id}`}>
                <p>NAME:{name}</p>
                </Link>
                <p>DOB:{dob}</p>
                <p>MRN:{mrn}</p>
                </div>
                <Button variant='primary' onClick={handleClose}>Edit Patient</Button>
                {isVisible && ( 
             <Container>
            <h1>Edit Patient Form </h1>
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
        </Container>
                )}
        </div>
    )
}

export default Patient