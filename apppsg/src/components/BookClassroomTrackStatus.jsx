import React from "react";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import "./TrackStatus.css";
import { Button } from "./Button";

function BookClassroomTrackStatus() {
    return (
        <div className="track-status-page">
            <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/trackstatuslogo.png" className="logo-events" alt="trackstatuslogo" />
                        <a href="#home">Track Status</a>
                    </div>
                    <Link to={'/'} class="link" id="link"><Button name="Logout" /></Link>
                </div>
            </nav>
            <div className="trackstatusform">
                <h1 class="title-page">HALL FOR PREWORKS</h1>
                <div class="rectangle">
                    <img src="/images/close.png" class="close-img" alt="img-close"/>
                    <p>Your request is being processed</p>
                    <ul>
                        <div class="list-element">
                            <img src="/images/done-logo-green.png" alt="done"/>
                            <p>Request submitted</p>
                        </div>
                        <div class="list-element">
                            <img src="/images/done-logo-green.png" alt="done"/>
                            <p>Details reviewed</p>
                        </div>
                        <div class="list-element">
                            <img src="/images/done-logo-grey.png" alt="done"/>
                            <p>Processing...</p>
                        </div>
                        <div class="list-element">
                            <img src="/images/done-logo-grey.png" alt="done"/>
                            <p>Waiting for confirmation</p>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookClassroomTrackStatus;