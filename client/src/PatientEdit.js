import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams } from 'react-router-dom';
import {Button, Form, Container} from 'react-bootstrap';


function PatientEdit({handlePatientPatch, handlePatientDelete}){

    const history = useHistory();
    const [patientInfo, setPatientInfo] = useState([])
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const {id} = useParams();

    useEffect(() => {
        fetch(`/patients/${id}`)
            .then((r) => r.json())
            .then(setPatientInfo)
    }, [id])

    const handleBack = () => {
        history.goBack();
    }

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
            .then(data => {
                setPatientInfo(data);
                handlePatientPatch(data);
        });

    }

    const handleDelete = async (id)  => {
        if (window.confirm("Are you sure you want to delete this Patient ?"))
        try {
            const response = await fetch(`/patients/${id}`, {
                method: "DELETE"
            });
            if (response.status === 204) {
                handlePatientDelete(id)
                history.goBack()
            } else {
                return ('error, unable to delete')
            } 
            }  catch (error){
                console.error(error)
            } 
        }

    return(
        <>
        <Button variant="secondary"><Link to='/home'>Home</Link></Button>
        <Button variant='secondary' onClick={handleBack}>Back</Button>
        <h1>Patient{id}</h1>
        {patientInfo && (
            <div>
                <p> Name: {patientInfo.name}</p>
                <p>DOB:{patientInfo.dob}</p>
                <p>MRN:{patientInfo.mrn}</p>
                <p>ADDRESS:{patientInfo.address}</p>
                <p>PHONE:{patientInfo.phone}</p> 
                <p>PCP: Dr.{patientInfo.primary}</p>
        <Button variant='primary' onClick={() => handleDelete(patientInfo.id)}>Delete</Button>
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