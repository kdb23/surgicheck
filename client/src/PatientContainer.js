import React from 'react';
import Patient from './Patient';
import {Link} from 'react-router-dom';
import PatientEdit from './PatientEdit'


function PatientContainer({patient, handlePatientPatch, handlePatientDelete}) {
    const person = patient.map((pObj) => {
        // const surgeries = pObj.surgeries.map((surgery) => {
        //     return (
        //         <div key={surgery.id}>
        //             <p>{surgery.name}</p>
        //             <p>{surgery.surgeon}</p>
        //             <p>{surgery.service_line}</p>
        //             <p>{surgery.duration}</p>
        //             <p>{surgery.location}</p>
        //         </div>
        //     );
        // });
        // const checklists = pObj.list.map((lists) => {
        //     return(
        //         <div key={lists.id}>
        //             <p>{lists.history}</p>
        //             <p>{lists.anesthesia_consent}</p>
        //             <p>{lists.surgical_consent}</p>
        //             <p>{lists.imaging}</p>
        //             <p>{lists.education}</p>
        //         </div>
        //     )
        // })
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            address = {pObj.address}
            phone = {pObj.phone}
            primary = {pObj.primary}
            handlePatientPatch = {handlePatientPatch}
            handlePatientDelete = {handlePatientDelete}
            // surgeries={surgeries}
            // checklists={checklists}
        />
    })
    return(
        <div>
            <Link to='/home'>Home</Link>
             <h1>Patient Page</h1>
            <div class ='row row-cols-3'>
                {person}
           </div>
        </div>

    )
}

export default PatientContainer