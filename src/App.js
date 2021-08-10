import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home'
import Civilization from './components/Civilization';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <div>
          <Link to="/" className="btn btn-dark">
            Home
          </Link>
        </div>
        <hr />
        <Switch>
          <Route path="/:id">
            <Civilization />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
