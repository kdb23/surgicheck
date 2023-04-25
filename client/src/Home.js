import React from 'react';
import {Link} from 'react-router-dom';


function Home() {

    return(
        <>
            <h1>WELCOME TO SURGICHECK !</h1>
            <Link to="/admin_info">Admin Info</Link>
            <Link to='/patient'>Patient List</Link>
        </>
    )
}

export default Home;