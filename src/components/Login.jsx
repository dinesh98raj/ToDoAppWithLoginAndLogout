import React, { useState } from 'react';
import { getAuthenticationToken } from '../services/ListOfTaskService';

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let UserDetails = {
      username: username,
      password: password
    };
    await getAuthenticationToken(UserDetails)
      .then(res => {
        sessionStorage.setItem("token", JSON.stringify(res.data.jwt));
        props.setToken(res.data.jwt)
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("bad credentials");
        }
      });
    //console.log(token);
    //props.setToken(token.data.jwt);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h4>Please Login to continue!</h4>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <lable>Username
              <input name="username"
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Enter UserName"
                className="form-control" required></input>
            </lable>
          </div>
          <div className="form-group">
            <lable>Password
              <input name="password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
                className="form-control" required></input>
            </lable>
          </div>
          <button className="btn btn-primary">
            Login | <i className="fas fa-sign-in-alt"></i>
          </button>
        </form>
      </div>
    </div>
  )
}