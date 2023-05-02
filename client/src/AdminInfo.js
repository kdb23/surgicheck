import React from 'react';
import NewSurgeon from './NewSurgeon'
import AdminUser from './AdminUser'

function AdminInfo({addProcedure}) {
    return(

        <div>
            <h1>Admin Login Info Page</h1>
            <NewSurgeon addProcedure={addProcedure} />
            <AdminUser />
        </div>
    )
}

export default AdminInfo