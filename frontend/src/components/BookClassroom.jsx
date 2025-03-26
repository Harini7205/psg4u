import React from "react";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import "./BookClassRoom.css";
import { Button } from "./Button";

function BookClassroom() {
    return (
        <div className="book-classroom-page">
            <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/trackstatuslogo.png" className="logo-events" alt="trackstatuslogo" />
                        <a href="#home"><Link to={'/bookclassroomtrackstatus'} class='link'>Track Status</Link></a>
                    </div>
                    <Link to={'/'} className="link" id="link"><Button name="Logout" /></Link>
                </div>
            </nav>
            <div className="raisequeryform">
                <h1 class="title-page">HALL FOR PREWORKS</h1>
                <form className="queryform">
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                BLOCK
                            </label>
                            <select name="category" className="select-option" id="floorinput"> 
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                        </div>
                        <div className="inputelement">
                            <label for="category">
                                DATE
                            </label>
                            <select name="category" className="select-option" id="dateinput">
                                <option>Monday</option>
                            </select>
                        </div>
                    </div>
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                FLOOR
                            </label>
                            <select name="category" className="select-option" id="floorinput">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="inputelement">
                            <label for="category">
                                TIME
                            </label>
                            <select name="category" className="select-option" id="timeinput">
                                <option>Morning</option>
                            </select>
                        </div>
                    </div>
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                CAPACITY
                            </label>
                            <input type="text" className="type-text" id="capacityinput"></input>
                        </div>
                        <div className="inputelement">
                            <label for="category">
                                ACKNOWLEDGEMENT
                            </label>
                            <input type="text" className="type-text" id="ackinput"></input>
                        </div>
                    </div>
                    <div className="rowinput">
                    <div className="inputelement">
                            <label for="category">
                                EVENT NAME
                            </label>
                            <input type="text" className="type-text" id="eventinput"></input>
                        </div>
                    </div>
                    <Button name="Book" />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default BookClassroom;