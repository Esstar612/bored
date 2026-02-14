import React, { useState } from 'react';
import CardMUI from "./Components/Cards";
import activities from './images/activities1.png';
import tour from './images/tour1.jpeg';
import concert from './images/concert.webp';
import food from './images/food1.jpeg';
import shopping from './images/shopping1.jpeg';
import attractions from './images/attractions1.jpeg';
import Chat from './Components/ContentBar';
import Navbar from './Components/Navbar';
import "./Outdoor.css";

const list = [
    {
        title: "ATTRACTIONS",
        description: "Explore must-see attractions around you, from natural wonders to iconic historic landmarks.",
        image: attractions // Make sure to define 'attractions' somewhere in your code.
    },
    {
        title: "TOURS",
        description: "Embark on engaging guided tours to discover the hidden secrets and rich stories of your city.",
        image: tour // Define 'tour' as well.
    },
    {
        title: "OUTDOOR ACTIVITIES",
        description: "Enjoy a variety of vibrant outdoor activities perfect for all ages and packed with excitement.",
        image: activities // Define 'activities'.
    },
    {
        title: "CONCERT & SHOWS",
        description: "Experience the thrill of live entertainment with open-air concerts and unforgettable shows.",
        image: concert // Define 'concert'.
    },
    {
        title: "FOOD & DRINK",
        description: "Savor the local cuisine and indulge in craft beverages at the best outdoor dining spots.",
        image: food // Define 'food'.
    },
    {
        title: "SHOPPING",
        description: "Discover outdoor markets and unique shopping districts for a perfect blend of leisure and retail.",
        image: shopping // Define 'shopping'.
    }
];

// data2
const Outdoor = () => {

    // data1
    const [messages, setMessages] = useState([{ai : "Ready to discover and plan your next adventure? Let's explore what the world has to offer!"}]);
    return (
        <div>
            <Navbar />

            <div className='split left'>
                <div className="centered">
                    <div className='list'>
                    <h3 className='text'>EXPLORE THE GREAT OUTDOORS!</h3>

                        <div className="grid-container">
                            {list.map((item, index) => (
                                <CardMUI key={index} title={item.title} description={item.description} image={item.image} 
                                setMessages = {setMessages}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <Chat messages = {messages} />
                </div>
            </div>
        </div>
    );
};

export default Outdoor;