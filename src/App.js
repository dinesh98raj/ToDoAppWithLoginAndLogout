import React, { useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/ToDo';
import Login from './components/Login';

function App() {

  const [token, setToken] = useState();

  useEffect(()=>{
    let tempstr = sessionStorage.getItem("token");
    let temp = JSON.parse(tempstr);
    console.log(temp);
    setToken(temp);
  }, []);

    return (
      <React.Fragment>
          { token ? <ToDo authtoken={token} handleToken={()=>setToken()}/> : <Login setToken={setToken} />}
      </React.Fragment>
    );
  }

export default App;
