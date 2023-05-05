import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Container, Col, Button} from 'react-bootstrap';


function ProcedureEdit({handleProcedureDelete}) {

    const [procedureInfo, setProcedureInfo] = useState([]);

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

 
    const handleDelete = async (id)  => {
        if (window.confirm("Are you sure you want to delete this Procedure ?"))
        try {
            const response = await fetch(`/procedures/${id}`, {
                method: "DELETE"
            });
            if (response.status === 204) {
                handleProcedureDelete(id)
                history.goBack()
            } else {
                return ('error, unable to delete to procedure')
            } 
            }  catch (error){
                console.error(error)
            } 
        }


    return(
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
                <Button variant='secondary' onClick={handleDelete}>Delete</Button>
            </div>
            </Col>
        </Container>
    )
}

export default ProcedureEdit