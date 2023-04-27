import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap'

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
    }


    return(
        <Container>
        <div>
            <h1>Add A New Patient</h1>
            <Link to='/home'>Home</Link>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                <input
                    type="text"
                    name= "name"
                    placeholder = "Patient Name"
                    onChange={handleName}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="dob"
                    placeholder= "Patient DOB: YEAR/M/D"
                    onChange={handleDOB}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="mrn"
                    placeholder= "Patient MRN"
                    onChange={handleMRN}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="address"
                    placeholder= "Address"
                    onChange={handleAddress}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="phone"
                    placeholder= "Phone"
                    onChange={handlePhone}
                />
                </div>
                <div>
                <input 
                    type= "num"
                    name ="primary"
                    placeholder= "Patient PCP"
                    onChange={handlePrimary}
                />
                </div>
                <button>Submit</button>
            </Form>
        </div>
        </Container>
    )
}

export default NewPatient