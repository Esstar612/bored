import React, { useState } from 'react';
import '../css/interestpage.css';

function InterestPage() {
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleInterestClick = (category) => {
        if (selectedInterests.includes(category)) {
            setSelectedInterests(selectedInterests.filter(interest => interest !== category));
        } else {
            setSelectedInterests([...selectedInterests, category]);
        }
    };

    return (
        <div className="container">
            <h1>Select Your Interests</h1>
            <p>Choose the categories you're interested in:</p>
            <div className="interests">
                <button
                    className={`interest-btn ${selectedInterests.includes("outdoors") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("outdoors")}
                >
                    Outdoors
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("indoors") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("indoors")}
                >
                    Indoors
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("cooking") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("cooking")}
                >
                    Cooking
                </button>
                {/* Add more category buttons with onClick handlers */}
                <button
                    className={`interest-btn ${selectedInterests.includes("adventurous") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("adventurous")}
                >
                    Adventurous
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("technology") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("technology")}
                >
                    Technology
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("shopping") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("shopping")}
                >
                    Shopping
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("running") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("running")}
                >
                    Running
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("healthysnacks") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("healthysnacks")}
                >
                    Healthy Snacks
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("drawings") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("drawings")}
                >
                    Drawings
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("diy") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("diy")}
                >
                    DIY
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("travel") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("travel")}
                >
                    Travel
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("recipes") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("recipes")}
                >
                    Recipes
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("gardening") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("gardening")}
                >
                    Gardening
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("fitness") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("fitness")}
                >
                    Fitness
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("foodanddrink") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("foodanddrink")}
                >
                    Food & Drink
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("beauty") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("beauty")}
                >
                    Beauty
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("art") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("art")}
                >
                    Art
                </button>
                <button
                    className={`interest-btn ${selectedInterests.includes("animals") ? "selected" : ""}`}
                    onClick={() => handleInterestClick("animals")}
                >
                    Animals
                </button>
            </div>
            <div className="continue-container">
                <button id="continue-btn">Continue</button>
            </div>
        </div>
    );
}

export default InterestPage;

