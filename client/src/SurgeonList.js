import React from 'react'
import {Row, Col} from 'react-bootstrap'

function SurgeonList({name, surgeon, service_line}) {

    return(
        <Row className='my-2 border'>
            <Col>{service_line}</Col>
            <Col>{surgeon}</Col>
            <Col>{name}</Col>
        </Row>
    )
}

export default SurgeonList