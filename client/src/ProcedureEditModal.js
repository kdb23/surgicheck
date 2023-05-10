import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap'

function ProcedureEditModal({handleProcedurePatch, setPatients, patients, setProcedures, procedures, handleCloseProcedure, procedureInfo, setProcedureInfo}) {

    const [addProcedureName, setProcedureName] = useState(procedureInfo.name)
    const [addProcedureSurgeon, setProcedureSurgeon] = useState(procedureInfo.surgeon)
    const [addProcedureService, setProcedureService] = useState(procedureInfo.service)
    const [addProcedureDuration, setProcedureDuration] = useState(procedureInfo.duration)
    const [addProcedureLocation, setProcedureLocation] = useState(procedureInfo.location)

    const handleProcedureName = e => setProcedureName(e.target.value)
    const handleProcedureSurgeon = e => setProcedureSurgeon(e.target.value)
    const handleProcedureService = e => setProcedureService(e.target.value)
    const handleProcedureDuration = e => setProcedureDuration(e.target.value)
    const handleProcedureLocation = e => setProcedureLocation(e.target.value)

    const {id} = useParams();
    const history = useHistory();

    const handleProcedureUpdate = (e) => {
    e.preventDefault();
    let updatedProcedure = {
        name: addProcedureName,
        surgeon: addProcedureSurgeon,
        service_line: addProcedureService,
        duration: addProcedureDuration,
        location: addProcedureLocation
    };
    fetch(`/procedures/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProcedure),
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Failed to edit procedure.");
            }
            return r.json();
        })
        .then((data) => {
            handleProcedurePatch(data);
            return Promise.all([
            fetch('/patients').then((r) => r.json()),
            fetch('/procedures').then((r) => r.json()),
        ]);
            })
            .then(([patients, procedures]) => {
                setPatients(patients);
                setProcedures(procedures);
                alert('Procedure successfully Updated.')
                handleCloseProcedure()
                history.goBack()
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to add procedure to patient. Please try again later.");
            });
    };

    return(
        <Container>
           <Form onSubmit={handleProcedureUpdate}>
             <Form.Group>
               <Form.Control
                 type='text'
                 name='name'
                 placeholder='Procedure Name'
                 value={addProcedureName}
                 onChange={handleProcedureName}
             />
             </Form.Group>
             <Form.Group>
             <Form.Control 
                   type= "text"
                   name ="name"
                   placeholder= "Surgeon Name"
                   value={addProcedureSurgeon}
                   onChange={handleProcedureSurgeon}
               />
               </Form.Group>
             <Form.Group>
               <Form.Select onChange={handleProcedureService}>
                   <option>Select a Service Line</option>
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
                   value={addProcedureDuration}
                   onChange={handleProcedureDuration}
               />
               </Form.Group>
               <Form.Group>
               <Form.Select onChange={handleProcedureLocation}>
                   <option>Select Location</option>
                   <option value='Main'>Main</option>
                   <option value='SAG'>SAG</option>
               </Form.Select>
               </Form.Group>
               <Button type='submit' onSubmit={handleProcedureUpdate}>Submit</Button>
           </Form>
       </Container>

    )
}

export default ProcedureEditModal