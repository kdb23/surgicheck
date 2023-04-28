import React, {useEffect, useState} from 'react';
import {Link, useParams } from 'react-router-dom'


function PatientEdit(){

    const {id} = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        fetch(`/patients/${id}`)
            .then(r => r.json())
            .then(data => setPatient(data))
            .catch(error => console.error(error));
    }, [id]);

    return(
        <>
        <Link to='/home'>Home</Link>
        <h1>Patient{id}</h1>
        {patient && (
            <div>
                <p> Name: {patient.name}</p>
            </div>
        )}
        </>
    )
}

export default PatientEdit