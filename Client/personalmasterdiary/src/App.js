import React,{useState} from 'react';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  history
} from "react-router-dom";
import Main from './Components/Main';

function App() {

  const [ user, setUser ] = useState('');

  const updateUser = ( user ) => {

    setUser( user );
  };

  const match = {
    url: '/Main'
  };

  return (
    <div >
      <Router>
        <Switch>
          <Route exact path = '/' component = { () => <Login user = { user } updateUser = { updateUser } /> } />
          <Route path = '/SignUp' component = { () => <SignUp user = { user } updateUser = { updateUser }/> } />
          <Route path = '/Main' component = { () => <Main user = { user } match = {match} updateUser = { updateUser } /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
