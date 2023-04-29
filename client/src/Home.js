import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminInfo from './AdminInfo';
import NewProcedure from './NewProcedure';
import NewPatient from './NewPatient';
import PatientEdit from './PatientEdit';
import PatientContainer from './PatientContainer';
import NavBar from './NavBar';


function Home() {

    const [patients, setPatients] = useState([]);
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        fetch('/patients')
            .then((r) => r.json())
            .then(setPatients)
    }, [])

    const addPatientState = (newPatientObj) => {
      setPatients([...patients, newPatientObj])
    }
  
    const addProcedureState = (newProcedureObj) => {
      setProcedures([newProcedureObj, ...procedures])
    }  

    const handlePatientDelete = (id) => {
      setPatients(patients.filter(person => {
        return person.id !== id
      }))
    }

    const handlePatientPatch = (updatedPatient) => {
      setPatients(patients.map(person => {
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
            <Route exact path ="/home">
                <div>
                    <h1>Welcome to SurgiCheck !</h1>
                    <p>Search Bar for Patients</p>
                    <p>Search Bar for Procedures</p>
                    <p>Search Bar for Surgeon</p>
                </div>
            </Route>
            <Route exact path="/home/admin">
                <AdminInfo />
                <NewProcedure addProcedure={addProcedureState} />
            </Route>
            <Route exact path="/home/patients">
                <PatientContainer patients={patients} />
            </Route>
            <Route exact path="/home/new_patient">
                <NewPatient addPatient={addPatientState}/>
            </Route>
            <Route exact path="/home/patient/:id">
                <PatientEdit handlePatientDelete={handlePatientDelete} handlePatientPatch={handlePatientPatch} />
            </Route>
        </Switch>
        </>
    )
}

export default Home;