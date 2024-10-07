import React,{useState, useEffect} from "react";
import './Events.css';
import {Link} from "react-router-dom";

function CarouselGrid(){
    const monthly_events=[
        {
            title:'EVENT 1',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 2',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 3',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 4',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 5',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 6',
            date_time:'24 April 2024 04:30pm',
            image_src:"/images/event1.png",
        },
    ];    
    const [currIndex,setCurrIndex]=useState(0);
    function carouselGridScroll(){
        if (currIndex===monthly_events.length-1){
            return setCurrIndex(0);
        }
        return setCurrIndex(currIndex+1);
    }
    useEffect(()=>{
        const interval=setInterval(()=>{carouselGridScroll()},3000);
        return()=> clearInterval(interval)
    })
    return (
        <div className="carousel-grid">
            {monthly_events.map((item,index)=>{
                return (
                    <Link to={'/eventupdates'} className="anchor-ele">
                    <div className="event-monthly" key={index}>
                        <img src={item.image_src} alt="event1" />
                        <h4 className="event-name" key={index}>{item.title}</h4>
                        <p className="event-date-time" key={index}>{item.date_time}</p>
                    </div>
                    </Link>
                );    
            })}
        </div>
    )
}

export default CarouselGrid;