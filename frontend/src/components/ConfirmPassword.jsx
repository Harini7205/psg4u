import React from "react";
import './ConfirmPassword.css';
import {Link} from "react-router-dom";
import Footer from './Footer';
import { Button } from "./Button";

function ConfirmPassword(){
    return (
        <div className="confirmpassword">
            <div className="cpPage">
            <div class="leftSide">
            <nav className="confirmnav">
                <img src='/images/logo_psg4u.png' alt='psg4u logo' />
            </nav>
            <p class="tagline">FIND</p>
            <p class="tagline">CONNECT</p>
            <p class="tagline">SCHEDULE</p>
            </div>    
            <div className="cpForm">
                <h1>Confirm Password</h1>
                <form>
                    <div className="row">
                    <label>
                        User ID:
                    </label>
                    <input type="text" name="name" className="input" id="useridinput"/>
                    </div>

                    <div className="row">
                    <label>
                        Password:
                    </label>
                    <input type="password" name="password" className="input" id="passinput"/>
                    </div>

                    <div className="row">
                    <label>
                        Re-enter password:
                    </label>
                    <input type="password" name="password" className="input"/>
                    </div>
                    
                    <Link to={'/login'} class="link" id="link"><Button name="Confirm" /></Link>
                </form>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default ConfirmPassword