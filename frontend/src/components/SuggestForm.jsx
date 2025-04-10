import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./SuggestForm.css";
import { Button } from "./Button";

function SuggestForm() {
    return (
        <div className="suggest-form-page">
            <nav className="suggestFormBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-suggest-form">
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
            <div className="suggestform">
                <h1 class="title-page">LEVEL-UP-LINKS</h1>
                <form className="queryform">
                    <div className="inputelement">
                        <label for="category">
                            SUBJECT
                        </label>
                        <input type="text" className="type-text" id="resourceinput"></input>

                    </div>
                    <div className="inputelement">
                        <label for="category">
                            RESOURCE
                        </label>
                        <input type="text" className="type-text" id="resourceinput"></input>
                    </div>
                

                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SuggestForm;