import React, {useEffect, useContext, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import NavButton from './NavButton';
import NavBar from './NavBar';
import Home from './Home';
import AdminInfo from './AdminInfo';
import NewProcedure from './NewProcedure';
import NewPatient from './NewPatient';
import PatientEdit from './PatientEdit';
import {UserContext} from './context/user'
import PatientContainer from './PatientContainer';



function App() {
  const {setUser} = useContext(UserContext);

  const [patient, setPatient] = useState([]);
  const [procedure, setProcedure] = useState([])

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        console.log(r);
      }
    });
  }, [setUser]);

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

  return (
    <>
     <NavBar />
     <main>
        <Switch>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/admin_info">
            <AdminInfo />
            <NewProcedure addProcedure={addProcedureState} />
          </Route>
          <Route exact path="/patients">
            <PatientContainer patient={patient} handlePatientPatch={handlePatientPatch} handlePatientDelete={handlePatientDelete} />
          </Route>
          <Route exact path="/new_patient">
            <NewPatient addPatient={addPatientState}/>
          </Route>
          <Route exact path="/patient_placeholder_page">
            <PatientEdit />
          </Route>
          <Route path='*'>
            <h1>404 Not Found</h1>
            <NavButton />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;


//   useEffect(() => {
//  fetch('/check_session')
//  .then((r) => {
//    if(r.ok) {
//      return r.json();
//    } else {
//      throw new Error('Network response was not ok');
//    }
//  })
//  .then((user) => setUser(user))
//  .catch((error => console.log('Error:', error.message)));