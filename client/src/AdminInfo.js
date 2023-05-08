import React from 'react';
import NewSurgeon from './NewSurgeon';
import SurgeonListContainer from './SurgeonListContainer';
import {Container} from 'react-bootstrap'


function AdminInfo({addProcedure, procedures}) {
    return(

        <div>
             <div className='d-flex align-items-center justify-content-center'>
                <div className='text-center'></div>
                    <h1>Procedure Information</h1>
                </div>
                <Container>
                    <NewSurgeon addProcedure={addProcedure} />
                </Container>
                <Container>
                    <SurgeonListContainer procedures={procedures} />   
                </Container>
            </div>
    )
}

export default AdminInfo