import React, { useEffect, useState } from 'react';
import GradientCover from './GradientCover';
import Google from './Google';
import axios from 'axios';
import "./Weather.css"

const CreatePlan = ({ data }) => {
  const [distanceInfo, setDistanceInfo] = useState([]);

  useEffect(() => {
    const origin = 'RPI, Troy, NY';

    const destinations = Object.values(data).map(items => items[0].location);

    axios.get(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destinations.join('|')}&key=AIzaSyAGQeJGCW-4BPUqNDSlVcK88Eb5JGIYUSs`)
      .then(response => {
        const results = response.data.rows[0].elements;
        setDistanceInfo(results);
        console.log(results);
      })
      .catch(error => {
        console.error('Error fetching distance information:', error);
      });

  }, [data]);

  return (

    <div className='fix'>

    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {Object.entries(data).map(([category, items]) => (
          <div key={category} className="category">
            {/* <p className="category-title">{category}</p> */}
            <div className="items-container">
              {items.map((item, index) => (
                <div key={index} className="item">
                  <p className="item-reason">{item.reason}</p>
                  <GradientCover
                    imageUrl={item.image}
                    title={item.title}
                    location={item.location}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Second half: Display distance information */}
      <div style={{  fontSize: '25px', flex: 1, textAlign: 'center' }}>
        <h3 style={{  fontSize: '25px', flex: 1, textAlign: 'center' }}>Explore Your Journey</h3>
        <Google data = {data} style={{ flex: 1, textAlign: 'center', marginTop: "60px" }}/>

        <h3 style={{ fontSize: '25px', flex: 1, textAlign: 'center', marginTop: "50px"}}>Your Route Overview</h3>
        <div style={{ fontSize: '25px', display: 'flex', flexDirection: 'row' }}>
            {distanceInfo.map((distance, index) => (
            <div key={index} className="destination-card">
                <p>Destination: {Object.keys(data)[index]} 📍</p>
                <p>Distance: {distance.distance.text} 🚗</p>
                <p>Duration: {distance.duration.text} ⏱️</p>
            </div>
            ))}
        </div>
        </div>
    </div>

    </div>
  );
}

export default CreatePlan;