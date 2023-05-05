import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


function NewSurgeon({addProcedure}) {

    const [addName, setAddName] = useState('')
    const [addSurgeon, setAddSurgeon] = useState('')
    const [addService, setAddService] = useState('')
    const [addDuration, setAddDuration] = useState('')
    const [addLocation, setAddLocation] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState('')

    const history = useHistory()

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
        if (!addName || !addSurgeon || !addService){
            setError('Procedure must have a name, attednding surgeon, and a service line')
        } else {
        fetch('/procedures', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(procedureObj),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error('Unable to add Surgeon')
            }
                return response.json();
        })
        .then(newSurgeon => {
            addProcedure(newSurgeon);
            alert('Surgeon has been added');
            history.push('/home/admin')
        })
        .catch(error =>{
            setError(error.message);
        });
        }
    }

    return(

        <>
        <Button onClick={handleClose}>Add A New Surgeon</Button>

        <Container>
        {error && <div className='alert alert-danger'>{error}</div>}
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
                <Form.Select onChange={handleService}>
                    <option>Select a Service Lilne</option>
                    <option value='Vascular'>Vascular</option>
                    <option value='Thoracic'>Thoracic</option>
                    <option value='Plastic'>Plastics</option>
                    <option value='GYN'>GYN</option>
                    <option value='ENT'>ENT</option>
                    <option value='General'>General</option>
                    <option value='Urology'>Urology</option>
                    <option value='Orthopedics'>Orthopedics</option>
                    <option value='Neuro'>Neuro</option>
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
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
        )}
        </Container>

    </>
        
    )
}

export default NewSurgeon