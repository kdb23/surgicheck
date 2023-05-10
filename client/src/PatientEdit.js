import React, {useState, useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import {Button, Form, Container, Row, Col, Modal} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NewProcedure from './NewProcedure';
import Photo from './Photo';
import PatientEditModal from './PatientEditModal';


function PatientEdit({handlePatientPatch, handlePatientDelete, patients, setPatients, procedures, setProcedures}){

    const history = useHistory();
    const [patientInfo, setPatientInfo] = useState([])
    const [proceduresList, setProceduresList] = useState([])
    const [checklistInfo, setChecklistInfo] = useState([])
    const [listHistory, setListHistory] = useState(false)
    const [listAnesthesia, setListAnesthesia] = useState(false)
    const [listSurgical, setListSurgical] = useState(false)
    const [listImage, setListImage] = useState(false)
    const [listEducation, setListEducation] = useState(false)
    const [checklistUpdated, setChecklistUpdated] = useState(false)
    const [showProcedure, setShowProcedure] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const {id} = useParams();

    useEffect(() => {
        fetch(`/patients/${id}`)
            .then((r) => r.json())
            .then(setPatientInfo)
    }, [id])

    useEffect(() => {
        fetch(`/patients/${id}/procedures`)
            .then((r) => r.json())
            .then(setProceduresList)
    }, [id])

    useEffect(() => {
        fetch(`/patients/${id}/checklists`)
            .then((r) => r.json())
            .then(setChecklistInfo)
    }, [id])

    const handleBack = () => {
        history.goBack();
    }

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleProcedureDisplay = (procedure) => {
        setShowProcedure(showProcedure && showProcedure.id === procedure.id ? null : procedure);
    }

    const handleChecklistPatch = (updatedChecklist) => {
        setChecklistInfo(checklistInfo.map(checklist => {
          if (checklist.id === updatedChecklist.id) {
            return {...updatedChecklist};
          } else {
            return checklist
          }
        }));
      }

    const handleListPatch = (e) => {
        e.preventDefault()
        let updatedChecklist = {
            history : listHistory,
            anesthesia_consent : listAnesthesia,
            surgical_consent : listSurgical,
            imaging : listImage,
            education : listEducation
        };
        fetch(`/patients/${id}/checklists`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(updatedChecklist)
        })
            .then(r => r.json())
            .then(data => {
                handleChecklistPatch(data);
                setChecklistUpdated(true)
        })
        .catch((error) => {
            console.error('Error updating checklist:', error);
        });
        setChecklistUpdated(true);
    };


    const handleDelete = async (id)  => {
        if (window.confirm("Are you sure you want to delete this Patient ?"))
        try {
            const response = await fetch(`/patients/${id}`, {
                method: "DELETE"
            });
            if (response.status === 204) {
                handlePatientDelete(id)
                history.goBack()
            } else {
                return ('error, unable to delete')
            } 
            }  catch (error){
                console.error(error)
            } 
        }

    return(
        <>
        <Container>
            <Row style={{ padding: '10px'}}>
            <h1 className='text-center'>{patientInfo.name}</h1>
        <div className='d-flex justify-content-end'>
        <Button variant='secondary' onClick={handleBack}>Back</Button>
        </div>  
        <Row>   
        <Col>
            <div className="row">
                    <Photo />
            </div>
        </Col>
        <Col>
        {patientInfo && (
            <div>
                <p> Name: {patientInfo.name}</p>
                <p>DOB:{patientInfo.dob}</p>
                <p>MRN:{patientInfo.mrn}</p>
                <p>ADDRESS:{patientInfo.address}</p>
                <p>PHONE:{patientInfo.phone}</p> 
                <p>PCP: Dr.{patientInfo.primary}</p>
        <Button variant='danger' onClick={() => handleDelete(patientInfo.id)}>Delete Patient</Button>
        <Button variant='primary' onClick={handleOpenModal}>Edit Patient</Button>
        </div>
        )}
        </Col>
        <Container> <Modal className='color-nav' variant='light' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Patient Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <PatientEditModal handlePatientPatch={handlePatientPatch} patients={patients} setPatients={setPatients} procedures={procedures} setProcedures={setProcedures} patientInfo={patientInfo} setPatientInfo={setPatientInfo} handleCloseModal={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </Container>
        </Row>
        <Row style={{ padding: '10px'}}>
        <Col>
        <h2>----Procedures----</h2>
        {proceduresList.length > 0 && (
        <div className='form-check'>
            <ul>
                {proceduresList.map((procedure) => {
                    return <div key = {procedure.id}>
                        {procedure.name} - Dr. {procedure.surgeon} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className='form-check-label'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            checked={showProcedure && showProcedure.id === procedure.id}
                            onChange={() => handleProcedureDisplay(procedure)}
                        />
                         </label>
                    </div>
                })}
            </ul>
        </div>
        )}
        {showProcedure && (
            <div>
               <div><b>Procedure Name:</b> {showProcedure.name}</div>
               <div><b>Attending Surgeon:</b> {showProcedure.surgeon}</div>
               <div><b>Service Line:</b> {showProcedure.service_line}</div>
               <div><b>Duration:</b> {showProcedure.duration} minutes</div>
               <div><b>Location:</b> {showProcedure.location}</div> 
               <div>
               </div>
            </div> 
        )}
        <NewProcedure patients={patients} setPatients={setPatients} procedures={procedures} setProcedures={setProcedures} />
        </Col>
        <Col>
        <h2 className='text-center'>----Checklist----</h2>
        {checklistInfo && (
            <div>
                <ul>
                    {Array.isArray(checklistInfo) && checklistInfo.map((checklist) => {
                        return <div key = {checklist.id}>
                            <Table stripped bordered hover size="sm">
                                <tbody>
                                <tr>
                                    <td>Patient History:</td>
                                    <td>{checklist.history ? "Complete" : "Incomplete"}</td>
                                    <td>
                                    <Form.Check
                                        type='checkbox'
                                        checked={listHistory}
                                        onChange={(e) => {
                                            setListHistory(e.target.checked);
                                            checklist.history = e.target.checked;
                                        }}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Anesthesia Consent:</td>
                                    <td>{checklist.anesthesia_consent ? "Complete" : "Incomplete"}</td>
                                    <td>
                                    <Form.Check
                                        type='checkbox'
                                        checked={listAnesthesia}
                                        onChange={(e) => {
                                            setListAnesthesia(e.target.checked)
                                            checklist.anesthesia_consent = e.target.checked;
                                        }}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Surgical Consent:</td>
                                    <td>{checklist.surgical_consent ? "Complete" : "Incomplete"}</td>
                                    <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={listSurgical}
                                        onChange={(e) => {
                                            setListSurgical(e.target.checked)
                                            checklist.surgical_consent = e.target.checked;
                                        }}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Imaging:</td>
                                    <td>{checklist.imaging ? "Complete" : "Incomplete"}</td>
                                    <td>
                                    <Form.Check
                                        type='checkbox'
                                        checked={listImage}
                                        onChange={(e) => {
                                            setListImage(e.target.checked)
                                            checklist.imaging = e.target.checked;
                                        }}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Education:</td>
                                    <td>{checklist.education ? "Complete" : "Incomplete"}</td>
                                    <td>
                                    <Form.Check
                                        type='checkbox'
                                        checked={listEducation}
                                        onChange={(e) => {
                                            setListEducation(e.target.checked)
                                            checklist.education = e.target.checked;
                                        }}
                                    />
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <Button onClick={(e) => handleListPatch(e, checklist.id)}>Update Checklist</Button>
                        </div>
                    })}
                </ul>
            </div>
        )}
        </Col>
        </Row>
            </Row> 
        </Container>
        </>
    )
}

export default PatientEdit