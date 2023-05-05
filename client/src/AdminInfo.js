import React from 'react';
import NewSurgeon from './NewSurgeon';
import SurgeonListContainer from './SurgeonListContainer';


function AdminInfo({addProcedure, procedures}) {
    return(

        <div>
            <h1>Admin Login Info Page</h1>
            <NewSurgeon addProcedure={addProcedure} />
            <SurgeonListContainer procedures={procedures} />
        </div>
    )
}

export default AdminInfo