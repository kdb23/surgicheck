import React from 'react';
import {Link} from 'react-router-dom';


function Home() {

    return(
        <>
            <h1>WELCOME TO SURGICHECK !</h1>
            <div>
            <Link to="/admin_info">Admin Info</Link>
            </div>
            <div>
            <Link to='/patient'>Patient List</Link>
            </div>
            <div>
            <Link to='/new_patient'>Add New Patient</Link>
            </div>
            <div>
            <Link to='/patient_placeholder_page'>Individual Patient Info</Link>
            </div>
        </>
    )
}

export default Home;