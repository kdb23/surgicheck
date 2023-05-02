import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';



function Patient({id, name, dob, mrn, surgeries}) {


    return(
        <Row className='my-2 border'>
            <Col>
            <Link to ={`/home/patient/${id}`}>Name:{name}</Link>
            </Col> 
            <Col>DOB:{dob}</Col>
            <Col>MRN:{mrn}</Col>
            <Col>{surgeries}</Col>
        </Row>
    )
}

export default Patient

  