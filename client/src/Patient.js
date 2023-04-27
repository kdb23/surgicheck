import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {Form, Container} from 'react-bootstrap'

function Patient({id, name, dob, mrn, address, phone, primary, handlePatientPatch, handlePatientDelete}) {
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')

    const handleDelete = () => {
        if (window.confirm("Are you Sure you want to delete this Patient ?")) {
            handlePatientDelete(id)
            fetch(`/patient/${id}`, {
                method: "DELETE"
            })
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
        <Link to='/home'>Home</Link>
            <div>
                <p>NAME:{name}</p>
                <p>DOB:{dob}</p>
                <p>MRN:{mrn}</p>
                <p>ADDRESS:{address}</p>
                <p>PHONE:{phone}</p>
                <p>PCP: Dr.{primary}</p>
                <button>Edit Patient</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        <div>
             <Container>
            <h1>Edit Existing Patient Form : Modal vs Popup </h1>
        <div>
            <Form>
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

export default Patient