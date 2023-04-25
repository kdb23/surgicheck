import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import NavButton from './NavButton';
import NavBar from './NavBar';



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session').then((r) => {
      console.log(r);
      if(r.ok) {
        r.json().then((user) => setUser(user));
        console.log(user)
      }
    });
  }, []);

  return (
    <>
     <NavBar user={user} setUser={setUser} />
     <main>
        <Switch>
          <Route exact path="/">
            <h1>SurgiCheck</h1>
            <Login setUser={setUser} />
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