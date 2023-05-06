import React, {useState} from 'react'
import {Container, Form, Button} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';


function NewProcedure({patients, setPatients, procedures, setProcedures}) {

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

    const addProcedure = (procedureObj) => {
        return fetch(`/patients/${id}/procedures`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(procedureObj),
        })
        .then((r) => {
          if (!r.ok) {
            throw new Error("Failed to add procedure to patient.");
          }
          return Promise.all([
            fetch('/patients').then((r) => r.json()),
            fetch('/procedures').then((r) => r.json()),
          ]);
        })
        .then(([patients, procedures]) => {
          setPatients(patients);
          setProcedures(procedures);
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to add procedure to patient. Please try again later.");
        });
    }; 
       
      const handleSubmit = (e) => {
        e.preventDefault();
        addProcedure(procedureObj)
            .then(() => {
            alert("Procedure addition successful");
            history.push('/home/patients');
            })
            .catch((error) => {
            alert(error.message);
            });
      };


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
                <Form.Select onChange={handleService}>
                    <option>Select a Service Lilne</option>
                    <option value='Vascular'>Vascular</option>
                    <option value='Thoracic'>Thoracic</option>
                    <option value='Plastics'>Plastics</option>
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
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        )}
        </Container>


    </>
        
    )
}

export default NewProcedure
