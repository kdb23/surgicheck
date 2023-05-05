import React, {useState, useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import NewProcedure from './NewProcedure';


function PatientEdit({handlePatientPatch, handlePatientDelete, patients, setPatients}){

    const history = useHistory();
    const [patientInfo, setPatientInfo] = useState([])
    const [proceduresList, setProceduresList] = useState([])
    const [checklistInfo, setChecklistInfo] = useState([])
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientMRN, setPatientMRN] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [patientPrimary, setPatientPrimary] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [listHistory, setListHistory] = useState('')
    const [listAnesthesia, setListAnesthesia] = useState('')
    const [listSurgical, setListSurgical] = useState('')
    const [listImage, setListImage] = useState('')
    const [listEducation, setListEducation] = useState('')
    const [checklistUpdated, setChecklistUpdated] = useState(false)

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

    const handleClose = () => {
        setIsVisible(!isVisible);
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
            .then(data => {
                setPatientInfo(data);
                handlePatientPatch(data);
        });

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
            <Row>
            <h1 className='text-center'>{patientInfo.name}</h1>
        <div className='d-flex justify-content-end'>
        <Button variant='secondary' onClick={handleBack}>Back</Button>
        </div>
        <Col>
        {patientInfo && (
            <div>
                <p> Name: {patientInfo.name}</p>
                <p>DOB:{patientInfo.dob}</p>
                <p>MRN:{patientInfo.mrn}</p>
                <p>ADDRESS:{patientInfo.address}</p>
                <p>PHONE:{patientInfo.phone}</p> 
                <p>PCP: Dr.{patientInfo.primary}</p>
        <Button variant='primary' onClick={() => handleDelete(patientInfo.id)}>Delete</Button>
        <Button variant='primary' onClick={handleClose}>Edit Patient</Button>
        </div>
        )}
        </Col>
        <Col>
        <h2>Procedures</h2>
        {proceduresList.length > 0 && (
        <div>
            <ul>
                {proceduresList.map((procedure) => {
                    return <li key = {procedure.id}>{procedure.name}</li>
                })}
            </ul>
        </div>
        )}
        <NewProcedure patients={patients} setPatients={setPatients} />
        </Col>
        <Col>
        <h2>Checklist</h2>
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
        <Container>
        {isVisible && (
            <Form>
                <Form.Group>
                    <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                    type="text"
                    id='name'
                    name= "name"
                    placeholder = "Patient Name"
                    onChange={(e) => setPatientName(e.target.value)}
                /> 
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient DOB:</Form.Label>
                <Form.Control
                    type= "text"
                    id='dob'
                    name ="dob"
                    placeholder= "Y/M/D"
                    onChange={(e) => setPatientDOB(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient MRN:</Form.Label>
                <Form.Control
                    type= "text"
                    id="mrn"
                    name ="mrn"
                    placeholder= "Patient MRN"
                    onChange={(e) => setPatientMRN(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Address:</Form.Label>
                <Form.Control
                    type= "text"
                    id='address'
                    name ="address"
                    placeholder= "Address"
                    onChange={(e) => setPatientAddress(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient Phone Number:</Form.Label>
                <Form.Control 
                    type= "text"
                    id='phone'
                    name ="phone"
                    placeholder= "Phone"
                    onChange={(e) => setPatientPhone(e.target.value)}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label>Patient PCP:</Form.Label>
                <Form.Control
                    type= "num"
                    id="primary"
                    name ="primary"
                    placeholder= "Patient PCP"
                    onChange={(e) => setPatientPrimary(e.target.value)}
                />
                </Form.Group>
                <Button variant='primary' onClick={handlePatch}>Edit Patient Information</Button> 
            </Form>
        )}
        </Container>
            </Row>
        </Container>
        </>
    )
}

export default PatientEdit