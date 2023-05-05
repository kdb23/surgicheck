import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Container, Col, Button} from 'react-bootstrap';


function ProcedureEdit() {

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

    return(
        <Container>
            <div className='d-flex justify-content-end'>
                <Button variant='secondary' onClick={handleBack}>Back</Button>
            </div>
            <Col>
            <h1>Procedure Name</h1>
        {procedureInfo && (
            <div>
                <p>Procedure Name:{procedureInfo.name}</p>
                <p>Attending Surgeon:{procedureInfo.surgeon}</p>
                <p>Service Line:{procedureInfo.service_line}</p>
                <p>Duration:{procedureInfo.duration}</p>
                <p>Location:{procedureInfo.location}</p> 
        </div>
        )}
            </Col>
        </Container>
    )
}

export default ProcedureEdit