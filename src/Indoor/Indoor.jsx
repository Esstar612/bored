import React from "react";
import Cookies from "js-cookie";
import CardMUI from "./Components/Cards";
import Navbar from "./Components/Navbar";
import movieImage from "./images/movie.jpg";
import tvImage from "./images/tv.png";
import triviaImage from "./images/trivia.jpg";
import gamesImage from "./images/games.jpg";
import spotifyImage from "./images/spotify.jpg";
import randomImage from "./images/random.png";

import "./Indoor.css";
import SpotifyPopup from "./Components/SpotifyPopup";

// data2
const Indoor = () => {
  const indoorActivities = [
    {
      title: "MOVIES",
      description: "Find your next movie.",
      image: movieImage,
    },
    {
      title: "TV",
      description: "Find your next TV show.",
      image: tvImage,
    },
    {
      title: "TRIVIA",
      description: "Play a fun game of trivia.",
      image: triviaImage,
    },
    {
      title: "GAMES",
      description: "Play a fun game.",
      image: gamesImage,
    },
    {
      title: "SPOTIFY",
      description: "Discover new music.",
      image: spotifyImage,
      onExploreClick: () => setShowSpotify(true),
    },
    {
      title: "RANDOM",
      description: "RANDOM ACTIVITY",
      image: randomImage,
    },
  ];

  console.log(Cookies.get('spotify_access_token'))

  const [showSpotify, setShowSpotify] = React.useState(false);
  const [authSpotify, setAuthSpotify] = React.useState(Cookies.get('spotify_access_token') !== undefined);

  return (
    <div>
      <Navbar />
      <div id="indoor-cont">
        <div className="col-12">
          <div className="centered">
            <div className="list">
              <h3 className="text">CHILL OUT WITH FUN INDOOR ACTIVITIES!</h3>

              <div className="grid-container">
                {indoorActivities.map((item, index) => (
                  <CardMUI
                    key={index}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    onExploreClick={item.onExploreClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpotifyPopup Show={showSpotify} SetShow={setShowSpotify} Authenticated={authSpotify} SetAuthenticated={setAuthSpotify} />
    </div>
  );
};

export default Indoor;
