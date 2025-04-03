import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./LevelUpLink.css";
import { Button } from "./Button";

function LevelUpLink() {
    const [semester, setSemester] = useState(""); // Stores selected semester
    const [query, setQuery] = useState(""); // Stores search query
    const [subjectResources, setSubjectResources] = useState({}); // Stores subject-resource mapping
    const [filteredSubjects, setFilteredSubjects] = useState([]); // Stores subjects to display

    useEffect(() => {
        if (semester) {
            fetch(`http://127.0.0.1:8000/api/cgpa/subjects/${semester}/`)
                .then((response) => response.json())
                .then((data) => {
                    setSubjectResources(data); // Store full subject-resource mapping
                    setFilteredSubjects(Object.keys(data)); // Initialize filtered subjects
                })
                .catch((error) => console.error("Error fetching subjects:", error));
        } else {
            setSubjectResources({});
            setFilteredSubjects([]);
        }
    }, [semester]);

    const handleSubjectSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = Object.keys(subjectResources).filter((subject) =>
                subject.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSubjects(filtered);
        } else {
            setFilteredSubjects(Object.keys(subjectResources));
        }
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

                {/* Dropdown for Semester Selection */}
                <select onChange={(e) => setSemester(e.target.value)} className="semester-dropdown">
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                {/* Search bar for subjects */}
                <div className="searchbar">
                    <div className="search-bar">
                        <div className="search-input">
                            <img src="/images/search_icon.png" alt="search" />
                            <input
                                type="text"
                                placeholder="SEARCH SUBJECT"
                                className="searchbar-input"
                                value={query}
                                onChange={handleSubjectSearch}
                            />
                        </div>
                    </div>
                </div>

                {/* Display Resources */}
                <div className="url-list" style={{width:800,margin:"auto"}}>
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject, index) => (
                            <div key={index}>
                                <h3>{subject}</h3>
                                {subjectResources[subject].map((link, linkIndex) => (
                                    <p key={linkIndex}>
                                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                    </p>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No subjects found</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default LevelUpLink;