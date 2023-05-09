import React from 'react';
import NewSurgeon from './NewSurgeon';
import SurgeonListContainer from './SurgeonListContainer';

function AdminInfo({addProcedure, procedures}) {


        return(
            <div>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='text-center'>
                        <h1>Procedure Information</h1>
                    </div>
                </div>
                <div>
                        <NewSurgeon addProcedure={addProcedure} />
                </div>
                <SurgeonListContainer procedures={procedures} />   
            </div>
        )
}

export default AdminInfo