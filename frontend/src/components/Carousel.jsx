import React,{useState, useEffect} from "react";
import './Events.css';

function Carousel(){
    const events=[
        {
            title:'EVENT 1',
            text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis dignissimos saepe hic corporis officia itaque deleniti suscipit eos explicabo quas, quod molestiae quos nihil minus tenetur, consectetur, iure ducimus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis dignissimos saepe hic corporis officia itaque deleniti suscipit eos explicabo quas, quod molestiae quos nihil minus tenetur, consectetur, iure ducimus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis dignissimos saepe hic corporis officia itaque deleniti suscipit eos explicabo quas, quod molestiae quos nihil minus tenetur, consectetur, iure ducimus.',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 2',
            text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo autem obcaecati praesentium ad iure officia, id, eveniet mollitia ea vero explicabo neque earum inventore possimus aut, maxime hic tempora dolore.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo autem obcaecati praesentium ad iure officia, id, eveniet mollitia ea vero explicabo neque earum inventore possimus aut, maxime hic tempora dolore.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo autem obcaecati praesentium ad iure officia, id, eveniet mollitia ea vero explicabo neque earum inventore possimus aut, maxime hic tempora dolore.',
            image_src:"/images/event1.png",
        },
        {
            title:'EVENT 3',
            text:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe minima accusamus non, praesentium voluptas aperiam eius molestiae facere vero dolorum iusto cupiditate. Amet vel odio temporibus ullam exercitationem voluptate totam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo autem obcaecati praesentium ad iure officia, id, eveniet mollitia ea vero explicabo neque earum inventore possimus aut, maxime hic tempora dolore.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo autem obcaecati praesentium ad iure officia, id, eveniet mollitia ea vero explicabo neque earum inventore possimus aut, maxime hic tempora dolore.',
            image_src:"/images/event1.png",
        }
    ];    
    const [currentIndex,setCurrentIndex]=useState(0);
    function carouselScroll(){
        if (currentIndex===events.length-1){
            return setCurrentIndex(0);
        }
        return setCurrentIndex(currentIndex+1);
    }
    useEffect(()=>{
        const interval=setInterval(()=>{carouselScroll()},3000);
        return()=> clearInterval(interval)
    })
    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === events.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="carousel">
            {events.map((item,index)=>{
                return (
                    <div className="event" key={index} style={{transform:`translate(-${currentIndex*100}%)`}}>
                        <div className="half1">
                            <img src={item.image_src} alt="event1" />
                        </div>
                        <div className="half2">
                            <h4 className="event-title" key={index}>{item.title}</h4>
                            <p className="event-summary" key={index}>{item.text}</p>
                        </div>
                    </div>
                );    
            })}
            <button className="prev-button" onClick={goToPrevious}>&#8592;</button>
            <button className="next-button" onClick={goToNext}>&#8594;</button>
        </div>
    )
}

export default Carousel;