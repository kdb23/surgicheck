import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap'

function NewPatient() {
    return(
        <Container>
        <div>
            <h1>Add A New Patient</h1>
            <Link to='/home'>Home</Link>
        </div>
        <div>
            <form>
                <div>
                <input
                    type="text"
                    name= "name"
                    placeholder = "Patient Name"
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="dob"
                    placeholder= "Patient DOB: YEAR/M/D"
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="surgeon"
                    placeholder= "Surgeon"
                    //dropdown//
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="service_line"
                    placeholder= "Service Line"
                    //dropdown//
                />
                </div>
                <div>
                <input 
                    type= "num"
                    name ="duration"
                    placeholder= "Procedure Duration"
                />
                </div>
                <div>
                <input 
                    type= "text"
                    name ="location"
                    placeholder= "Location (Main or SAG)"
                    //dropdown //
                />
                </div>
            </form>
        </div>
        </Container>
    )
}

export default NewPatient