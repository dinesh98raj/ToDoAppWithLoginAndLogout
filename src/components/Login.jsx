import React, { useState } from 'react';
import { getAuthenticationToken } from '../services/ListOfTaskService';
import LoginImg from './todoLogin.png';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
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
        toast.info(`Welcome ${username}`,{autoClose:2000,closeOnClick:true});
      })
      .catch(err => {
        if (err.response.status === 403) {
          toast.error('Invalid credentials', {position:"top-center",hideProgressBar:true,autoClose:1000,closeOnClick:true});
        }
      });
    //console.log(token);
    //props.setToken(token.data.jwt);
  }

  return (
    <section>
      <div className="imgbx">
        <img src={LoginImg}></img>
      </div>
      <div className="loginbx">
        <div className="formbx">
          <h4>Login</h4>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="inputbx">
              <lable><span>Username</span>
              <input name="username"
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter Username"
              className="form-control" required></input>
              </lable>
            </div>
            <div className="inputbx">
              <lable><span>Password</span>
              <input name="password"
              id="password"
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              placeholder="Enter Password"
              className="form-control" required></input>
              </lable>
            </div>
            <div className="inputbx">
              <input type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}