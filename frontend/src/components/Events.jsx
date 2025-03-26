import React from "react";
import './Events.css';
import Carousel from './Carousel';
import CarouselGrid from './CarouselGrid';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Events(){
    return (
        <div className="events-page">
            <Navbar />
            <hr />
            <div className="eventUpdates">
                <h1>EVENT UPDATES</h1>
                <div className="eventdetails">
                    <h3 className="detail-title">UPCOMING EVENTS:</h3>
                    <Carousel />
                    <h3 className="detail-title">RECENT EVENTS:</h3>
                    <Carousel />
                    <h3 className="detail-title">MONTH-APRIL</h3>
                    <CarouselGrid />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Events;