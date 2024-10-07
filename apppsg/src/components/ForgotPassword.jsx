import React from "react";
import './ForgotPassword.css';
import {Link} from "react-router-dom";
import Footer from "./Footer";
import { Button } from "./Button";

function ForgotPassword(){
    return (
        <div className="forgotpassword">
            <div className="fpPage">
            <div class="leftSide">
            <nav className="forgotnav">
                <img src='/images/logo_psg4u.png' alt='psg4u logo' />
            </nav>
            <p class="tagline">FIND</p>
            <p class="tagline">CONNECT</p>
            <p class="tagline">SCHEDULE</p>
            </div>    
            
            <div className="fpForm">
                <h1>Forgot Password</h1>
                <form>
                    <div className="row">
                    <label>
                        Email:
                    </label>
                    <input type="text" name="name" className="input"/>
                    </div>
                    <div className="row">
                    <label>
                        OTP:
                    </label>
                    <input type="password" name="password" className="input" id="otpinput"/>
                    </div>
                    <Link to={'/confirmpassword'} className="link" id="link"><Button name="Verify" /></Link>
                </form>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword