import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from "./Footer";
import { Button } from "./Button";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/cgpa/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate('/login'); // Redirect to login page after successful registration
    } else {
      alert('Username already exists');
    }
  };

  return (
    <div className="login">
      <div className="loginPage">
        <div className="leftSide">
          <nav className="loginnav">
            <img src='images/logo_psg4u.png' alt='psg pencil sketch' />
          </nav>
          <p className="tagline">FIND</p>
          <p className="tagline">CONNECT</p>
          <p className="tagline">SCHEDULE</p>
        </div>

        <div className="loginForm">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label>Username:</label>
              <div className="textbox">
                <img src='/images/person.png' alt='user-icon' className='icon' />
                <input type="text" name="name" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <label>Password:</label>
              <div className="textbox">
                <img src='/images/password.png' alt='password-icon' className='icon' />
                <input type="password" name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button name="Submit" />
            <a href="/login" className="link">Already a user? Signin</a>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
