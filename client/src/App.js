import React, {useEffect, useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import NavButton from './NavButton';
import NavBar from './NavBar';
import Home from './Home';
import AdminInfo from './AdminInfo';
import Patient from './Patient';
import NewPatient from './NewPatient';
import PatientEdit from './PatientEdit';
import {UserContext} from './context/user'


function App() {
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  },);

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
          <Switch>
          <Route exact path="/admin_info">
            <AdminInfo />
          </Route>
          <Route exact path="/patient">
            <Patient />
          </Route>
          <Route exact path="/new_patient">
            <NewPatient />
          </Route>
          <Route exact path="/patient_placeholder_page">
            <PatientEdit />
          </Route>
        </Switch>
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