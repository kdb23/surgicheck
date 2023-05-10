import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Container, Col, Button, Modal} from 'react-bootstrap';
import ProcedureEditModal from './ProcedureEditModal';


function ProcedureEdit({handleProcedureDelete, procedures, setProcedures, patients, setPatients, handleProcedurePatch}) {

    const [procedureInfo, setProcedureInfo] = useState([]);
    const [isHidden, setIsHidden] = useState(false)


    const {id} = useParams();

    const history = useHistory();

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
    const handleOpenProcedure = () => setIsHidden(true);
    const handleCloseProcedure = () => setIsHidden(false)

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
                <Button variant='secondary' onClick={handleOpenProcedure}>Edit Procedure</Button>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </div>
            </Col>
        </Container>
        <Container>
            <Modal className='color-nav' variant='light' show={isHidden} onHide={handleCloseProcedure}>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Procedure Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ProcedureEditModal handleProcedurePatch={handleProcedurePatch} patients={patients} setPatients={setPatients} procedures={procedures} setProcedures={setProcedures} handleCloseProcedure={handleCloseProcedure} procedureInfo={procedureInfo} setProcedureInfo={setProcedureInfo} />
                </Modal.Body>
            </Modal>
        </Container>
       </>
        
    )
}

export default ProcedureEdit