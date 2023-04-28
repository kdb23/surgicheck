import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminInfo from './AdminInfo';
import NewProcedure from './NewProcedure';
import NewPatient from './NewPatient';
import PatientEdit from './PatientEdit';
import PatientContainer from './PatientContainer';
import NavBar from './NavBar';


function Home() {

    const [patient, setPatient] = useState([]);
    const [procedure, setProcedure] = useState([])


    useEffect(() => {
        fetch('/patients')
            .then((r) => r.json())
            .then(setPatient)
    }, [])

    const addPatientState = (newPatientObj) => {
      setPatient([newPatientObj, ...patient])
    }
  
    const addProcedureState = (newProcedureObj) => {
      setProcedure([newProcedureObj, ...procedure])
    }  

    const handlePatientDelete = (id) => {
      setPatient(patient.filter(person => {
        return person.id !== id
      }))
    }

    const handlePatientPatch = (updatedPatient) => {
      setPatient(patient.map(person => {
        if (person.id === updatedPatient.id) {
          return {...updatedPatient};
        } else {
          return person
        }
      }))
    }

    

    return(
        <>
        <NavBar />
        <Switch>
            <Route exact path="/home/admin">
            <AdminInfo />
            <NewProcedure addProcedure={addProcedureState} />
          </Route>
          <Route exact path="/home/patients">
            <PatientContainer patient={patient} handlePatientPatch={handlePatientPatch} handlePatientDelete={handlePatientDelete} />
          </Route>
          <Route exact path="/home/new_patient">
            <NewPatient addPatient={addPatientState}/>
          </Route>
          <Route exact path="/patient_placeholder_page">
            <PatientEdit />
          </Route>
          </Switch>
        </>
    )
}

export default Home;