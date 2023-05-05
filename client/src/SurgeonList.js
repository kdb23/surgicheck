import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function SurgeonList({id, name, surgeon, service_line}) {

    return(
        <Row className='my-2 border'>
            <Col><Link to={`/home/admin/procedure/${id}`}>{name}</Link></Col>
            <Col>{surgeon}</Col>
            <Col>{service_line}</Col>
        </Row>
    )
}

export default SurgeonList