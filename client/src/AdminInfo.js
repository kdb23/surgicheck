import React from 'react';
import NewSurgeon from './NewSurgeon';
import SurgeonList from './SurgeonList';

function AdminInfo({addProcedure, procedures}) {
    return(

        <div>
            <h1>Admin Login Info Page</h1>
            <NewSurgeon addProcedure={addProcedure} />
            <SurgeonList procedures={procedures} />
        </div>
    )
}

export default AdminInfo