import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ConfirmPassword.css';
import Footer from './Footer';
import { Button } from "./Button";

function ConfirmPassword() {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/cgpa/reset_password/", {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,  // Send username instead of email
                    new_password: newPassword
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                setError(data.error || "Something went wrong!");
            }
        } catch (err) {
            setError("Server error! Please try again later.");
        }
    };

    return (
        <div className="confirmpassword">
            <div className="cpPage">
                <div className="leftSide">
                    <nav className="confirmnav">
                        <img src='/images/logo_psg4u.png' alt='psg4u logo' />
                    </nav>
                    <p className="tagline">FIND</p>
                    <p className="tagline">CONNECT</p>
                    <p className="tagline">SCHEDULE</p>
                </div>    
                <div className="cpForm">
                    <h1>Confirm Password</h1>
                    {error && <p className="error">{error}</p>}  
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="input"/>
                        </div>

                        <div className="row">
                            <label>New Password:</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="input"/>
                        </div>

                        <div className="row">
                            <label>Re-enter Password:</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input"/>
                        </div>

                        <Button name="Confirm" type="submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConfirmPassword;
