import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminInfo from './AdminInfo';
import NewPatient from './NewPatient';
import PatientEdit from './PatientEdit';
import PatientContainer from './PatientContainer';
import NavigationBar from './NavigationBar';
import ProcedureEdit from './ProcedureEdit'
import {Badge} from 'react-bootstrap';



function Home() {

    const [patients, setPatients] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDoctor, setSearchDoctor] = useState('')

    useEffect(() => {
        fetch('/patients')
            .then((r) => r.json())
            .then(setPatients)
    }, [])

    useEffect(() => {
      fetch('/procedures')
        .then((r) => r.json())
        .then(setProcedures)
    }, [])

    const addPatientState = (newPatientObj) => {
      setPatients([...patients, newPatientObj])
    }
  
    const addProcedureState = (newProcedureObj) => {
      setProcedures([newProcedureObj, ...procedures])
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


    const handlePatientDelete = (id) => {
      setPatients(patients.filter(patient => {
        return patient.id !== id
      }))
    }

    const handleProcedureDelete = (id) => {
      setProcedures(procedures.filter(procedure => {
        return procedure.id !== id
      }))
    }

    const handlePatientSearch = newString => setSearchTerm(newString.toLowerCase())

    const handleSurgeonSearch = newString => setSearchDoctor(newString.toLowerCase())


    return(
        <>
        <NavigationBar />
        <Switch>
            <Route exact path ="/home">
              <div className='d-flex align-items-center justify-content-center' style={{height : '100vh'}}>
                <div className='text-center'>
                    <h1><Badge bg='light' text='dark'>Welcome to SurgiCheck !</Badge></h1>
                </div>
              </div>
            </Route>
            <Route exact path="/home/admin">
                <AdminInfo addProcedure={addProcedureState} procedures={procedures} handleSurgeonSearch={handleSurgeonSearch} />
            </Route>
            <Route exact path="/home/admin/procedure/:id">
                <ProcedureEdit handleProcedureDelete={handleProcedureDelete} />
            </Route>
            <Route exact path="/home/patients">
                <PatientContainer patients={patients} handlePatientSearch={handlePatientSearch} />
            </Route>
            <Route exact path="/home/new_patient">
                <NewPatient addPatient={addPatientState}/>
            </Route>
            <Route exact path="/home/patient/:id">
                <PatientEdit handlePatientPatch={handlePatientPatch} handlePatientDelete={handlePatientDelete} addProcedure={addProcedureState} />
            </Route>
        </Switch>
        </>
    )
}

export default Home;