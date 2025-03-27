import React, { useState } from "react";
import axios from "axios";
import "./BuildStrategy.css";
import { Link } from 'react-router-dom';
import { Button } from './Button';

const subjects = ["Calculus", "Electronics", "Chemistry", "CT", "English"];

function BuildStrategy() {
    const [ca1Marks, setCa1Marks] = useState(new Array(subjects.length).fill(25));
    const [currentCgpa, setCurrentCgpa] = useState(7.0);
    const [expectedCgpa, setExpectedCgpa] = useState(8.0);
    const [result, setResult] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/cgpa/predict/", {
                ca1_marks: ca1Marks,
                current_cgpa: currentCgpa,
                expected_cgpa: expectedCgpa,
            });
            setResult(response.data);
        } catch (error) {
            console.error("Prediction failed:", error);
        }
    };

    return (
        <div className="build-strategy-container">
            {/* Navbar */}
            <nav className="raiseQueryBar">
                            <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                            <div className="nav-list-raise-query">
                                <div className="nav">
                                    <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                                    <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                                </div>
                                <div className="nav">
                                    <img src="/images/progress-check.png" className="logo-events" alt="trackstatuslogo" />
                                    <p><Link to={'/buildstrategy'} class="link">Build Strategy</Link></p>
                                </div>
                                <Link to={'/'} className="link" id="link"><Button name='Logout'/></Link>
                            </div>
                        </nav>
            <div className='navdown'>

            <div className="strategy-content">
                <div className="form-container">
                    {subjects.map((subject, index) => (
                        <div key={index} className="input-group">
                            <label>{subject} (CA1):</label>
                            <input 
                                type="number" 
                                value={ca1Marks[index]} 
                                onChange={(e) => {
                                    const newMarks = [...ca1Marks];
                                    newMarks[index] = Number(e.target.value);
                                    setCa1Marks(newMarks);
                                }} 
                                className="input-field"
                            />
                        </div>
                    ))}

                    <div className="cgpa-input-container">
                        <label>Current CGPA:</label>
                        <input 
                            type="number" 
                            value={currentCgpa} 
                            onChange={(e) => setCurrentCgpa(Number(e.target.value))}
                            className="input-field"
                        />
                        <label>Expected CGPA:</label>
                        <input 
                            type="number" 
                            value={expectedCgpa} 
                            onChange={(e) => setExpectedCgpa(Number(e.target.value))}
                            className="input-field"
                        />
                    </div>

                    <button onClick={handlePredict} className="predict-button">
                        Predict
                    </button>

                    {result && (
    <div className="result-container">
        <h2>CA2 Marks:</h2>
        <ul>
            {result.ca2_marks.map((mark, index) => (
                <li key={index}>{subjects[index]}: {mark}</li>
            ))}
        </ul>

        <h2>Semester Grades:</h2>
        <ul>
            {result.semester_grades.map((grade, index) => (
                <li key={index}>{subjects[index]}: {grade}</li>
            ))}
        </ul>
    </div>
)}

                </div>
            </div>
            </div>
        </div>
    );
}

export default BuildStrategy;
