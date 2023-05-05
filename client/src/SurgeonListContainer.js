import React, {useState} from 'react'
import {Button, Container, Form, Row} from 'react-bootstrap'
import SurgeonList from './SurgeonList'

function SurgeonListContainer({procedures, handleSurgeonSearch}) {

    const [isVisible, setIsVisible] = useState(false)
    const [searchDoctor, setSearchDoctor] = useState('');

    const handleSearch = (e) => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchDoctor(newSearchTerm);
    };

    const filteredSurgeons = procedures.filter(surgeryObj => {
        return surgeryObj.surgeon.toLowerCase().includes(searchDoctor) || surgeryObj.service_line.toLowerCase().includes(searchDoctor);
    });

    
    const handleClose = () => {
        setIsVisible(!isVisible);
    }

    const surgeryList = filteredSurgeons.map((surgeryObj) => {
        return <SurgeonList
                key = {surgeryObj.id}
                id = {surgeryObj.id}
                name = {surgeryObj.name}
                surgeon = {surgeryObj.surgeon}
                service_line = {surgeryObj.service_line}
                duration = {surgeryObj.duration}
                location = {surgeryObj.location}
                handleSurgeonSearch = {handleSurgeonSearch}
                />
    })


    return(
        <div>
            <Button onClick={handleClose}>Surgeon List</Button>
            {isVisible && (
                <Container className='mt-5'>
                    <Row>
                        <Form.Control
                            type='text'
                            id='search'
                            placeholder='Type Surgeons Name OR Service Line'
                            onChange={handleSearch}
                        />
                        {surgeryList}
                    </Row>
                </Container>
            )}
        </div>
    )
}

export default SurgeonListContainer