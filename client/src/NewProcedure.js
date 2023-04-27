import React, {useState} from 'react'
import {Container, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function NewProcedure({addProcedure}) {

    const [addName, setAddName] = useState('')
    const [addSurgeon, setAddSurgeon] = useState('')
    const [addService, setAddService] = useState('')
    const [addDuration, setAddDuration] = useState('')
    const [addLocation, setAddLocation] = useState('')

    const handleName = e => setAddName(e.target.value)
    const handleSurgeon = e => setAddSurgeon(e.target.value)
    const handleService = e => setAddService(e.target.value)
    const handleDuration = e => setAddDuration(e.target.value)
    const handleLocation = e => setAddLocation(e.target.value)

    const procedureObj = {
        name: addName,
        surgeon: addSurgeon,
        service_line: addService,
        duration: addDuration,
        location: addLocation
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/surgeons', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(procedureObj),
        })
            .then((r) => {
                if(r.ok) {
                    alert("Surgeon and Procedure addition successful")
                    addProcedure(procedureObj)
                } else {
                    alert("Missing Information - Unable to Add New Procedure")
                }
            })
    }

    return(

        <Container>
        <div>
            <h1>Add A New Procedure</h1>
            <Link to='/home'>Home</Link>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                <input
                    type="text"
                    name= "name"
                    placeholder = "Procedure Name"
                    onChange={handleName}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="surgeon"
                    placeholder= "Surgeon"
                    //dropdown//
                    onChange={handleSurgeon}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="service_line"
                    placeholder= "Service Line"
                    //dropdown//
                    onChange={handleService}
                />
                </div>
                <div>
                <input 
                    type= "num"
                    name ="duration"
                    placeholder= "Procedure Duration"
                    onChange={handleDuration}
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="location"
                    placeholder= "Location (Main or SAG)"
                    //dropdown //
                    onChange={handleLocation}
                />
                </div>
                <button>Submit</button>
            </Form>
        </div>
        </Container>
    )
}

export default NewProcedure