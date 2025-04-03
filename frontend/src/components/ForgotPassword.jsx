import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Button } from "./Button";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            try {
                const response = await fetch("http://localhost:8000/api/cgpa/send_otp/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    setShowOtpInput(true);
                    setMessage("OTP sent to your email.");
                } else {
                    setMessage(data.error || "Failed to send OTP. Try again.");
                }
            } catch (error) {
                setMessage("Error sending OTP. Please try again later.");
            }
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        if (otp) {
            try {
                const response = await fetch("http://localhost:8000/api/cgpa/verify_otp/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, otp }),
                });

                const data = await response.json();

                if (response.ok) {
                    navigate("/confirmpassword", { state: { email } });
                } else {
                    setMessage(data.error || "Invalid OTP. Please try again.");
                }
            } catch (error) {
                setMessage("Error verifying OTP. Please try again later.");
            }
        }
    };

    return (
        <div className="forgotpassword">
            <div className="fpPage">
                <div className="leftSide">
                    <nav className="forgotnav">
                        <img src="/images/logo_psg4u.png" alt="psg4u logo" />
                    </nav>
                    <p className="tagline">FIND</p>
                    <p className="tagline">CONNECT</p>
                    <p className="tagline">SCHEDULE</p>
                </div>

                <div className="fpForm">
                    <h1>Forgot Password</h1>
                    {message && <p className="message">{message}</p>}
                    <form onSubmit={!showOtpInput ? handleEmailSubmit : handleOtpVerification}>
                        {!showOtpInput ? (
                            <>
                                <div className="row">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit">
                                    Enter
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    <label>OTP:</label>
                                    <input
                                        type="password"
                                        name="otp"
                                        className="input"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button name="Verify" type="submit" />
                            </>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ForgotPassword;
