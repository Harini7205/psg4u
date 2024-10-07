import React, { useState } from 'react'
import './Main.css';
import {Link} from "react-router-dom";
import Footer from "./Footer";
import { Button } from './Button';

export const Main = () => {

  const[show,setshow] = useState(false);
  
  const myacc =()=>{
    if(show === true){}
    else{   
      setshow(true)
      document.getElementById('sect').style.opacity = 0.3      
    }
  }
  const close =()=>{
    if(show === true){setshow(false)
      document.getElementById('sect').style.opacity = 1  }
    else{   
          
    }
  }

  return (
    <div className='main' id='main'>
      <nav className="raiseQueryBar">
                <img src="/images/logo_psg4u.png" alt="psg4u logo" className="logo-events-page" />
                <div className="nav-list-raise-query">
                    <div className="nav">
                        <img src="/images/homelogo.png" className="logo-events" alt="homelogo" />
                        <a href="#home"><Link to={'/main'} class='link'>Home</Link></a>
                    </div>
                    <div className="nav">
                        <img src="/images/person.png" className="logo-events" alt="trackstatuslogo" />
                        <a href="#strategy" onClick={myacc}>My account</a>
                    </div>
                    <Link to={'/'} className="link" id="link"><Button name='Logout'/></Link>
                </div>
            </nav>
      <section id='sect'>
        <div className='studies'>
            <img src="/images/clip.png" className='clip' alt='clip'/>
            <div className='title'>Studies</div>
            

            <img src="/images/emoji.png" className='emoji1' alt='emoji1'/>
            <p><Link to={'/calculategpa'} class="link">Calculate GPA</Link></p>
            <img src="/images/emoji.png" className='emoji2' alt='emoji2'/>
            <p><Link to={'/leveluplink'} class="link">Level-up Links</Link></p>
            <img src="/images/emoji.png" className='emoji3' alt='emoji3'/>
            <p><Link to={'/bookclassroom'} class="link">Book a classroom for pre-works</Link></p>
            <img src="/images/emoji.png" className='emoji4' alt='emoji4'/>
            <p><Link to={'/events'} class="link">Event updates</Link></p>      
        </div>

        <div className='studies' id='query'>
            <img src="/images/clip_red.png" className='rclip' alt='clip'/>
            <div className='title'>Raise query</div>
            

            <img src="/images/emoji.png" className='emoji1' alt='emoji1'/>
            <p><Link to={'/raisequery'} class="link">Raise Query about components</Link></p>
            <img src="/images/emoji.png" className='emoji2' alt='emoji2'/>
            <p><Link to={'/lostandfound'} class='link'>Lost and found</Link></p>
                
        </div>

        <div className='studies' id='canteen'>
            <img src="/images/clip_green.png" className='gclip' alt='clip'/>
            <div className='title'>Canteen</div>
            

            <img src="/images/emoji.png" className='emoji1' alt='emoji1'/>
            <p><Link to={'/morningmenu'} class="link">Morning menu</Link></p>
            <img src="/images/emoji.png" className='emoji2' alt='emoji2'/>
            <p><Link to={'/afternoonmenu'} class="link">Afternoon menu</Link></p>    
        </div>
        <Footer />
        </section>
        
        {
          show?<div className='Myaccount'>
          <img src="/images/close.png" className='closeimg' onClick={close} alt='closeimg'/>
          <img src="/images/person.png" className='personaccount' alt='personimg'/>
          <p className='myaccname'>Name</p>
          <p className='myaccp'>Roll no : 22n2yy</p>
          <p className='myaccp'>Email : 22n2yy@psgtech.ac.in</p>
          <img src="/images/coin.png" className='coin' alt='coinimg'/>
          <p className='points'>20 points</p>
          <img src="/images/editicon.png" className='editicon' alt='editimg'/>
          <p className='editdetails'>Edit_details</p>
        </div>:null
        }
        
    </div>
  )
}
