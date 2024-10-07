import React from "react";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import "./RaiseQuery.css";
import { Button } from "./Button";

function RaiseQuery() {
    return (
        <div className="raise-query-page">
            <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/trackstatuslogo.png" className="logo-events" alt="trackstatuslogo" />
                        <a href="#home"><Link to={'/trackstatus'} class='link'>Track Status</Link></a>
                    </div>
                    <Link to={'/'} className="link"><Button name="Logout"/></Link>
                </div>
            </nav>
            <div className="raisequeryform">
                <h1 class="title-page">RAISE A QUERY</h1>
                <form className="queryform">
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                CATEGORY
                            </label>
                            <select name="category" className="select-option" id="cateinput">
                                <option>Lab</option>
                            </select>
                        </div>
                        <div className="inputelement">
                            <label for="category">
                                COMPLAINT
                            </label>
                            <select name="category" className="select-option" id="complaintinput">
                                <option>Lab</option>
                            </select>
                        </div>
                    </div>
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                FLOOR
                            </label>
                            <input type="text" className="type-text" id="flinput"></input>
                        </div>
                        <div className="inputelement">
                            <label for="category" id="anycommentlabel">
                                ANY COMMENTS
                            </label>
                            <input type="text" className="type-text" id="anycommentinput"></input>
                        </div>
                    </div>
                    <div className="rowinput">
                        <div className="inputelement">
                            <label for="category">
                                HALL NUMBER
                            </label>
                            <input type="text" className="type-text"></input>
                        </div>
                    </div>
                    <Button name="Register"/>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default RaiseQuery;