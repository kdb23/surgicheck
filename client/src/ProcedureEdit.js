import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Container, Col, Button, Form} from 'react-bootstrap';


function ProcedureEdit({handleProcedureDelete, procedures, setProcedures, patients, setPatients, handleProcedurePatch}) {

    const [procedureInfo, setProcedureInfo] = useState([]);
    const [isHidden, setIsHidden] = useState(false)
    const [addProcedureName, setProcedureName] = useState('')
    const [addProcedureSurgeon, setProcedureSurgeon] = useState('')
    const [addProcedureService, setProcedureService] = useState('')
    const [addProcedureDuration, setProcedureDuration] = useState('')
    const [addProcedureLocation, setProcedureLocation] = useState('')

    const {id} = useParams();

    const history = useHistory();

    const handleProcedureName = e => setProcedureName(e.target.value)
    const handleProcedureSurgeon = e => setProcedureSurgeon(e.target.value)
    const handleProcedureService = e => setProcedureService(e.target.value)
    const handleProcedureDuration = e => setProcedureDuration(e.target.value)
    const handleProcedureLocation = e => setProcedureLocation(e.target.value)

    useEffect(() => {
        console.log('id:',id)
        fetch(`/procedures/${id}`)
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                setProcedureInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching procedure info:', error )
            })
    }, [id])

    const handleBack = () => {
        history.goBack();
    }

    const handlePatchHide = () => {
        setIsHidden(!isHidden);
    }

    const handleDelete = (e) => {
        window.alert('Are you sure you want to delete this procedure ?');
        handleProcedureDelete(id);
        fetch(`/procedures/${id}`, {
          method: "DELETE"
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Failed to delete procedure.");
            }
            return Promise.all([
                fetch('/procedures').then((r) => r.json()),
                fetch('/patients').then((r) => r.json()),
            ]);
        })
        .then(([procedures, patients]) => {
            setProcedures(procedures);
            setPatients(patients);
        })
        .then(() => {
            alert('Procedure successfully deleted.')
            history.goBack()
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to delete procedure. Please try again later');
        });
    };

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
              .then(r => r.json())
              .then(data => {
                handleProcedurePatch(data);
              })
      }
 
    return(
        <>
        <Container>
            <div className='d-flex justify-content-end'>
                <Button variant='secondary' onClick={handleBack}>Back</Button>
            </div>
            <Col>
            <h1 className='text-center'>{procedureInfo.name}</h1>
        {procedureInfo && (
            <div>
                <h5><b>Procedure Name:</b> {procedureInfo.name}</h5>
                <h5><b>Attending Surgeon:</b> {procedureInfo.surgeon}</h5>
                <h5><b>Service Line:</b> {procedureInfo.service_line}</h5>
                <h5><b>Duration:</b> {procedureInfo.duration} minutes</h5>
                <h5><b>Location:</b> {procedureInfo.location}</h5> 
        </div>
        )}
            </Col>
            <Col>
            <div className='d-flex justify-content-end'>
                <Button variant='secondary' onClick={handlePatchHide}>Edit Procedure</Button>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </div>
            </Col>
        </Container>
         <Container>
         {isHidden && (
           <Form onSubmit={handleProcedureUpdate}>
             <Form.Group>
               <Form.Control
                 type='text'
                 name='name'
                 placeholder='Procedure Name'
                 onChange={handleProcedureName}
             />
             </Form.Group>
             <Form.Group>
             <Form.Control 
                   type= "text"
                   name ="name"
                   placeholder= "Surgeon Name"
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
         )}
       </Container>
       </>
        
    )
}

export default ProcedureEdit