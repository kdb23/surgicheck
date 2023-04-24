import {Route, Switch} from 'react-router-dom';
import Login from './Login'
import NavButton from './NavButton';



function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <h1>SurgiCheck</h1>
          <Login />
        </Route>
        <Route path='*'>
          <h1>404 Not Found</h1>
          <NavButton />
        </Route>
      </Switch>
    </div>
  );
}

export default App;