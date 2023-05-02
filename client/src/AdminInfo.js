import React from 'react';
import NewSurgeon from './NewSurgeon'

function AdminInfo({addProcedure}) {
    return(

        <div>
            <h1>Admin Login Info Page</h1>
            <NewSurgeon addProcedure={addProcedure} />
        </div>
    )
}

export default AdminInfo