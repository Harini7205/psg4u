import React, { useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./LevelUpLink.css";
import { Button } from "./Button";

const linksData = [
    { category: "Physics-1", links: ["https://byjus.com/physics/electromagnetic-radiation/", "https://www.electronicshub.org/led-light-emitting-diode/"] },
    { category: "COA", links: ["https://www.geeksforgeeks.org/computer-organization-von-neumann-architecture/", "https://www.javatpoint.com/types-of-register-in-computer-organization"] },
    { category: "OS", links: ["https://www.tutorialspoint.com/producer-consumer-problem-in-c", "https://in.video.search.yahoo.com/search/video?fr=crmas&ei=UTF-8&p=round+robin&vm=r#id=1&vid=ba180da704796ffce0f4f4fcc6abbe62&action=click"] },
    { category: "DBMS", links: ["https://www.geeksforgeeks.org/dbms/", "https://www.w3schools.in/dbms/relational-algebra"] }
];

const categoryColors = {
    "Physics-1": "one",
    "COA": "two",
    "OS": "three",
    "DBMS": "four"
};

function LevelUpLink() {
    const [query, setQuery] = useState("");
    const [filteredLinks, setFilteredLinks] = useState(linksData);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = linksData
                .filter((item) =>
                    item.category.toLowerCase().includes(value.toLowerCase())
                )
                .map((item) => item.category);
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        const results = linksData.filter((item) =>
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions([]);
        setFilteredLinks(results);
    };

    return (
        <div className="level-up-link-page">
            <nav className="suggestFormBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-suggest-form">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <Link to={'/main'} className='link'>Home</Link>
                    </div>
                    <div className="nav">
                        <img src="/images/suggestlogo.png" className="logo-events" alt="suggestlogo" />
                        <Link to={'/suggest'} className='link'>Suggest</Link>
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
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="searchbar-input"
                                value={query}
                                onChange={handleInputChange}
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => setQuery(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button onClick={handleSearch}className="search-button">Search</button>
                    </div>
                </div>

                {filteredLinks.map((item, index) => (
                    <div className={`link-rectangle ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                        <div className={`circle1 ${categoryColors[item.category] || 'one'}`}>{item.category}</div>
                        <div className={`circle2 ${categoryColors[item.category] || 'one'}`}></div>
                        {item.links.map((link, idx) => (
                            <p key={idx}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
                        ))}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default LevelUpLink;