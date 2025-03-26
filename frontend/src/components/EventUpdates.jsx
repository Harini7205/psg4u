import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./EventUpdates.css";

function EventUpdates() {
    return (
        <div className="event-updates-page">
            <Navbar />
            <hr></hr>
            <div>
                <h1 class="title-page">EVENT UPDATES</h1>
                <div className="eventupdatesform">  
                <div className="event-updates">
                    <div className="left-half">
                        <img src="/images/event1.png" alt="event-img" />
                        <div className="link-container">
                            <p>For more details and registration,</p>
                            <p className="link">https://kriya.psgtech.in</p>
                        </div>
                    </div>
                    <div className="design">
                        <div className="cir1"></div>
                        <div className="cir2"></div>
                        <div className="cir3"></div>
                        <div className="line"></div>
                    </div>
                    <div className="right-half">
                        <h3>Kriya 2024</h3>
                        <p>Registration starts: 28 March</p>
                        <p>Registration closes: 5 April</p>
                        <p>Event: 9 April - 12 April</p>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EventUpdates;