import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap'


function PatientEdit(){

    const {id} = useParams();

    const [patient, setPatient] = useState(null);

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    useEffect(() => {
        fetch(`/patients/${id}`)
            .then(r => r.json())
            .then(data => setPatient(data))
            .catch(error => console.error(error));
    }, [id]);

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
            </div>
        )}
        </>
    )
}

export default PatientEdit