import React from 'react'
import {Row, Col} from 'react-bootstrap'

function SurgeonList({name, surgeon, service_line, duration, location, patients}) {

    return(
        <Row className='my-2 border'>
            <Col>{name}</Col>
            <Col>{surgeon}</Col>
            <Col>{patients}</Col>
            <Col>{service_line}</Col>
            <Col>{duration}</Col>
            <Col>{location}</Col>
        </Row>
    )
}

export default SurgeonList