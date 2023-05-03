import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'

function SurgeonList({procedures}) {

    const [isVisible, setIsVisible] = useState(false)

    const handleClose = () => {
        setIsVisible(!isVisible);
    }

    const surgeryList = procedures.map((surgeryObj => {
        return <div key={surgeryObj.id}>
                    <p>{surgeryObj.name}</p>
                    <p>{surgeryObj.surgeon}</p>
                    <p>{surgeryObj.service_line}</p>
                    <p>{surgeryObj.duration}</p>
                    <p>{surgeryObj.location}</p>
                </div>
    }))


    return(
        <div>
            <Button onClick={handleClose}>Surgeon List</Button>
            {isVisible && (
                <Container>{surgeryList}</Container>
            )}
        </div>
    )
}

export default SurgeonList