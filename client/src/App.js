import React, {useEffect, useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import NavButton from './NavButton';
import Logout from './Logout'
import Home from './Home';
import {UserContext} from './context/user'

function App() {
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    fetch('/check_session').then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        console.log(r);
      }
    });
  }, [setUser]);


  return (
    <>
     <Logout />
     <main>
        <Switch>
        <Route exact path="/" component={Login } />
        <Route path='/home' component={Home} />
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