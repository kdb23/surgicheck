import React, {useState} from 'react'
import {Container, Form, Button} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';


function NewProcedure({addProcedure}) {

    const {id} = useParams();

    const history = useHistory();

    const [patientList, setPatientList] = useState([])
    const [addName, setAddName] = useState('')
    const [addSurgeon, setAddSurgeon] = useState('')
    const [addService, setAddService] = useState('')
    const [addDuration, setAddDuration] = useState('')
    const [addLocation, setAddLocation] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleName = e => setAddName(e.target.value)
    const handleSurgeon = e => setAddSurgeon(e.target.value)
    const handleService = e => setAddService(e.target.value)
    const handleDuration = e => setAddDuration(e.target.value)
    const handleLocation = e => setAddLocation(e.target.value)

    const handleClose = () => {
        setIsVisible(!isVisible);
    }

    const procedureObj = {
        name: addName,
        surgeon: addSurgeon,
        service_line: addService,
        duration: addDuration,
        location: addLocation
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/patients/${id}/procedures`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(procedureObj),
        })
            .then((r) => {
                if(r.ok) {
                    alert("Procedure addition successful")
                    history.push('/home/patients')
                    addProcedure(procedureObj)
                    fetch('/patients')
                        .then((r) => r.json())
                        .then((patientList) => setPatientList(patientList))
                } else {
                    r.json().then(data => {
                        alert(data.error)
                    })
                }
            })
        
    }

    return(

        <>
        <Button onClick={handleClose}>Add A Procedure</Button>

        <Container>
        {isVisible && (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Control
                    type="text"
                    name= "name"
                    placeholder = "Procedure Name"
                    onChange={handleName}
                />
                </Form.Group>
                <Form.Group>
                <Form.Control 
                    type= "text"
                    name ="name"
                    placeholder= "Surgeon Name"
                    onChange={handleSurgeon}
                />
                </Form.Group>
                <Form.Group>
                <Form.Select>
                    <option>Select a Service Lilne</option>
                    <option value='option1'>Vascular</option>
                    <option value='option2'>Thoracic</option>
                    <option value='option3'>Plastics</option>
                    <option value='option4'>GYN</option>
                    <option value='option5'>ENT</option>
                    <option value='option6'>General</option>
                    <option value='option7'>Urology</option>
                    <option value='option8'>Orthopedics</option>
                    <option value='option9'>Neuro</option>
                    onChange={handleService}
                </Form.Select>
                </Form.Group>
                <Form.Group>
                <Form.Control 
                    type= "num"
                    name ="duration"
                    placeholder= "Procedure Duration"
                    onChange={handleDuration}
                />
                </Form.Group>
                <Form.Group>
                <Form.Select onChange={handleLocation}>
                    <option>Select Location</option>
                    <option value='Main'>Main</option>
                    <option value='SAG'>SAG</option>
                </Form.Select>
                </Form.Group>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        )}
        </Container>


    </>
        
    )
}

export default NewProcedure
