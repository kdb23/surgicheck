import React, {useState} from 'react';
import Patient from './Patient';



function PatientContainer({patients, handlePatientSearch}) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = e => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm);
        handlePatientSearch(newSearchTerm);
    };

    const filteredPatients = patients.filter(patientObj => {
        return patientObj.name.toLowerCase().includes(searchTerm);
    });

    const person = filteredPatients.map((pObj) => {
    
        return <Patient 
            key = {pObj.id}
            id = {pObj.id}
            name = {pObj.name}
            dob = {pObj.dob}
            mrn = {pObj.mrn}
            handlePatientSearch = {handlePatientSearch}
        />
    })
    return(
        <div className='text-center'>
             <div className='searchbar'>
                      <label htmlFor='Search Patients'></label>
                      <input
                        type='text'
                        id='search'
                        placeholder='Type Patient Name'
                        onChange={handleSearch}
                      />
                </div>
            <div class ='row row-cols-1'>
                {person}
           </div>
        </div>

    )
}

export default PatientContainer