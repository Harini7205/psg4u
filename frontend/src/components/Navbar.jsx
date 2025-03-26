import React from "react";
import './Navbar.css';
import {Link} from "react-router-dom";
import { Button } from "./Button";

function Navbar() {
    return <nav className="eventsBar">
        <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
        <div className="nav-list-events">
            <div className="nav">
                <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
            </div>
            <Link to={'/'} class="link"><Button name="Logout"/></Link>
        </div>
    </nav>
}

export default Navbar;