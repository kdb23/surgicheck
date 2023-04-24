import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
        <h1>SurgiCheck</h1>
        </Route>
        <Route exact path='*'>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  
  );
}

export default App;