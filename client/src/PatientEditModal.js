import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom'

function PatientEditModal({handlePatientPatch, patients, setPatients, procedures, setProcedures, patientInfo, setPatientInfo, handleCloseModal}) {

    const [patientName, setPatientName] = useState(patientInfo.name)
    const [patientDOB, setPatientDOB] = useState(patientInfo.dob)
    const [patientMRN, setPatientMRN] = useState(patientInfo.mrn)
    const [patientAddress, setPatientAddress] = useState(patientInfo.address)
    const [patientPhone, setPatientPhone] = useState(patientInfo.phone)
    const [patientPrimary, setPatientPrimary] = useState(patientInfo.primary)

    const {id} = useParams()

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
            .then(data => {
                setPatientInfo(data);
                handlePatientPatch(data);
                handleCloseModal();
        });

    }

    return(
        <Form>
            <Form.Group>
                <Form.Label>Patient Name:</Form.Label>
            <Form.Control
                type="text"
                id='name'
                name= "name"
                placeholder = "Patient Name"
                value={patientName}
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
                value={patientDOB}
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
                value={patientMRN}
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
                value={patientAddress}
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
                value={patientPhone}
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
                value={patientPrimary}
                onChange={(e) => setPatientPrimary(e.target.value)}
            />
            </Form.Group>
            <Button variant='primary' onClick={handlePatch}>Edit Patient Information</Button> 
    </Form>
    )
}

export default PatientEditModal