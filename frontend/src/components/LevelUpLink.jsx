import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./LevelUpLink.css";
import { Button } from "./Button";

function LevelUpLink() {
    return (
        <div className="level-up-link-page">
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
            <div className="level-up-link img">
                <p className="title">LEVEL-UP LINKS</p>
                <div className="searchbar">
                    <div className="search-bar">
                        <div className="search-input">
                            <img src="/images/search_icon.png" alt="search" />
                            <input type="text" placeholder="SEARCH" className="searchbar-input"></input>
                        </div>                        
                        <div className="filter-input">
                            <img src="/images/filter_icon.png" alt="filter" />
                            <input type="text" placeholder="Filter" className="filterbar-input"></input>
                        </div>
                    </div>
                </div>
                <div className="link-rectangle left">
                    <div className="circle1 one">Physics-1</div>
                    <div className="circle2 one"></div>
                    <p>https://byjus.com/physics/electromagnetic-radiation/</p>
                    <p>https://www.electronicshub.org/led-light-emitting-diode/</p>
                </div>
                <div className="link-rectangle right">
                    <div className="circle1 two">COA</div>
                    <div className="circle2 two"></div>
                    <p>https://www.geeksforgeeks.org/computer-organization-von-neumann-architecture/</p>
                    <p>https://www.javatpoint.com/types-of-register-in-computer-organization</p>
                </div>
                <div className="link-rectangle left">
                    <div className="circle1 three">OS</div>
                    <div className="circle2 three"></div>
                    <p>https://www.tutorialspoint.com/producer-consumer-problem-in-c</p>
                    <p>https://in.video.search.yahoo.com/search/video?fr=crmas&ei=UTF-8&p=round+robin&vm=r#id=1&vid=ba180da704796ffce0f4f4fcc6abbe62&action=click</p>
                </div>
                <div className="link-rectangle right">
                    <div className="circle1 four">DBMS</div>
                    <div className="circle2 four"></div>
                    <p>https://www.geeksforgeeks.org/dbms/</p>
                    <p>https://www.w3schools.in/dbms/relational-algebra</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LevelUpLink;