import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import SurgeonList from './SurgeonList'

function SurgeonListContainer({procedures}) {

    const [isVisible, setIsVisible] = useState(false)

    const handleClose = () => {
        setIsVisible(!isVisible);
    }

    const surgeryList = procedures.map((surgeryObj) => {
        const patients = surgeryObj.patients?.map((patient) => {
            return (
                <div key={patient.id}>
                    <p>{patient.name}</p>
                </div>
            )
        })
        return <SurgeonList
                key = {surgeryObj.id}
                name = {surgeryObj.name}
                surgeon = {surgeryObj.surgeon}
                service_line = {surgeryObj.service_line}
                duration = {surgeryObj.duration}
                location = {surgeryObj.location}
                patients = {patients}
                />
    })


    return(
        <div>
            <Button onClick={handleClose}>Surgeon List</Button>
            {isVisible && (
                <Container className='mt-5'>
                    {surgeryList}
                </Container>
            )}
        </div>
    )
}

export default SurgeonListContainer