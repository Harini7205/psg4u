import React from 'react';
import './Home.css';
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Home = () => {
  const logout = async () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('user'); // Adjust this key based on your app

    // Optionally, you can make an API call to invalidate the session on the server
    await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        credentials: 'include', // Include cookies for session-based auth
    });

    // Redirect to home or login page after logout
    window.location.href = '/'; // Change this path as necessary
};

  return (
    <div className='wholepage'>
      <section className="homebody">
        <nav>
          <img src="/images/logo_psg4u.png" alt="PSG4U Logo" className="homelogo"/>

          <ul>
            <ScrollLink to="home" smooth={true} duration={500}><li>Home |</li></ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500}><li>About us |</li></ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={500}><li>Contact |</li></ScrollLink>
          </ul>
        </nav>
      
        <div id="home" className="home">
          <h1>THE STUDENT'S SPACE</h1>
          <i>Where all the needs are met</i>
        </div>
      
        <button className="loginbutton">
          <RouterLink to={'/login'}><span>Login</span></RouterLink>
        </button>
      </section>
      
      <div id="about" className='content'>
        <i><h1>About PSG4U</h1></i>
        <i>An intra-college application developed to facilitate your life in the campus<pre></pre>Use it for :</i>
        <ul>
          <img src="/images/img1.jpeg" alt="User Icon" className='img1' style={{ display: 'inline' }} /> <i>Academic Assistance</i><pre></pre>
          <img src="/images/img2progress.jpeg" alt="Location Icon" className='img2' style={{ display: 'inline' }} /> <i>Event Updates</i><pre></pre>
          <img src="/images/img3update.jpeg" alt="Music Icon" className='img3' style={{ display: 'inline' }} /> <i>Getting notified of lost-and-found</i><pre></pre>
          <img src="/images/img4home.jpeg" alt="Sphere Icon" className='img4' style={{ display: 'inline' }} /> <i>Viewing the canteen menu</i><pre></pre>
        </ul>
      </div>

      <div id="contact" className="foot">
        <div className="left_side_content">
          <img src="/images/location.jpeg" alt=" " className='foot_img' style={{ display: 'inline' }} />Coimbatore, TamilNadu<pre></pre>
          <img src="/images/language.jpeg" alt="" className='foot_img' style={{ display: 'inline' }} />English (United States)
        </div>

        <div className="center_content">
          <p>&#169; PSG College of Technology</p>
          <p className="help">Help & Support @contact_details</p>
        </div>

        <div className="right_side_content">
          <ul>
            <li className="right_list">psg4u@psgtech.gmail.com</li>
            <li className="right_list">linkedin/psg4U</li>
            <li className="right_list">medium/psg4u</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Home;
