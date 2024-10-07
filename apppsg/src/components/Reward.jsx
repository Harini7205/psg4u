import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./Reward.css";
import { Button } from "./Button";

function Reward() {
    return (
        <div className="reward-page">
            <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/suggestlogo.png" className="logo-events" alt="suggestlogo" />
                        <a href="#home"><Link to={'/suggest'} class='link'>Suggest</Link></a>
                    </div>
                    <Link to={'/'} className="link" id="link"><Button name="Logout" /></Link>
                </div>
            </nav>
            <div className="reward">
                <h1 class="title-page">LEVEL-UP-LINKS</h1>
                <div className="rectangle-reward">
                    <img src="/images/close.png" alt="close" className="close-img"/>
                    <p>Hurray!! You have earned a point</p>
                    <p>Thank you, your submission is so helpful!</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reward;