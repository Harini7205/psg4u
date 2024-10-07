import React, { useState, useEffect } from 'react';
import './CalculateGPA.css';
import axios from 'axios';
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const CalculateGPA = () => {
        const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [calculatedGPA, setCalculatedGPA] = useState(null);

  // Fetch semester grades from the API
  const fetchSemesterGrades = async (semesterNumber) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cgpa/semester/${semesterNumber}/`);
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setSubjects([]); // Reset subjects on error
    }
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10); // Convert to integer
    setSemester(selectedSemester);
    fetchSemesterGrades(selectedSemester);
  };

  const handleGradeChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = parseFloat(value); // Ensure the value is a number
    setSubjects(updatedSubjects);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    subjects.forEach((subject) => {
      const grade = parseFloat(subject.grade);
      const credits = parseFloat(subject.credits);

      if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
        weightedSum += grade * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const gpa = weightedSum / totalCredits;
      setCalculatedGPA(gpa.toFixed(2)); // Limit to 2 decimal places
    } else {
      setCalculatedGPA('N/A'); // Handle case where no valid GPA can be calculated
    }
  };

  useEffect(() => {
    fetchSemesterGrades(semester);
  }, [semester]);
  const handleBuildStrategy = () => {
    // Redirect to the Streamlit app URL
    window.location.href = 'http://localhost:8501'; // Update this URL with the actual Streamlit app URL
  };
  return (
    <div className='calculategpa'>
        <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/progress-check.png" className="logo-events" alt="trackstatuslogo" />
                        <a href="#strategy" onClick={handleBuildStrategy}>Build Strategy</a>
                    </div>
                    <Link to={'/'} className="link" id="link"><Button name='Logout'/></Link>
                </div>
            </nav>
            <div className='navdown'>
          <div className="selectsem">
            <label htmlFor="category">SELECT SEMESTER</label>
            <select name="category" onChange={handleSemesterChange} value={semester}>
              {[...Array(5)].map((_, index) => ( // Adjusted to 5 semesters
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>

          {subjects.map((subject, index) => (
            <div key={index} className="sub1">
              <label htmlFor={`subject${index}`}>
                {`${subject.subject_name}`}
              </label>
              <input
                type="number"
                className='sub1input'
                value={subject.grade || 0}  // Default value of 0 if no grade
                onChange={(e) => handleGradeChange(index, e.target.value)}
                min="5" max="10"
              />
              <input
                type="range"
                min="5"  // Adjusted range min to 5
                max="10"
                value={subject.grade || 0}  // Default slider to 0 if no grade
                className="slider"
                onChange={(e) => handleGradeChange(index, e.target.value)}
              />
              <p className='dottedline'>| | | | | |</p>
              <p className='dotnumber'><span>5 6 7 8 9</span>&#160;&#160;&#160;&#160;&#160;10</p>
            </div>
          ))}

          <div style={{display:"flex",justifyContent:"center",gap:20}}>
          <p className='calculatebutton' onClick={calculateGPA}>Calculate</p>
          </div>
          <div className='gparesult'>
        <label htmlFor="resultinput">RESULT:</label>
        <input type="text" className='sub1input' id='resultinput' value={calculatedGPA || ''} readOnly />
      </div>
        </div> 
        
        <Footer />   
            
        </div>
  )
}
