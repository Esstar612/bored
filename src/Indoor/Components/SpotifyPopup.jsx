import axios from "axios";
import React from "react";
import Button from '@mui/material/Button';
import SpotifyCard from "./SpotifyCard";

export default function SpotifyPopup({ Show, SetShow, Authenticated, SetAuthenticated }) {
  const [reccs, setReccs] = React.useState([]);

  const authenticateSpotify = async () => {
    if (!Authenticated) {
      window.open('http://localhost:8080/api/spotify/auth', '_blank');
      setTimeout(() => {
        SetAuthenticated(true);
      }, 1500);
    }
  }

  const fetchReccomendations = () => {
    if (Authenticated) {
      axios.get('http://localhost:8080/api/spotify/recommendations')
        .then((r) => {
          setReccs(r.data.tracks);
        });
    }
  }

  React.useEffect(() => {
    fetchReccomendations();
  }, [Authenticated, setReccs]);


  return (
    <div className={`modal ${Show ? 'show' : ''}`} id='spotifyModal' style={Show ? {display: 'block', zIndex: 9990} : {}}>
    <div className='modal-dialog modal-xl' role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id='spotifyModalLabel'>Spotify</h5>
          <button type="button" className="close" aria-label="Close" onClick={() => SetShow(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                { Authenticated ?
                  <Button size="large" variant="contained" 
                    onClick={fetchReccomendations}
                    sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}
                  >
                    Refresh
                  </Button> 
                : null }
              </div>
            </div>
          </div>

          {Authenticated ? 
            <div className="col-12">
              <div className="grid-container">
                {reccs.map((r) => (
                  <SpotifyCard key={r.id} songID={r.id} songTitle={r.name} songArtist={r.artists[0].name} songCover={r.album.images[0].url} songURI={r.uri} />
                ))}
              </div>
            </div>

          : <div className="d-flex justify-content-center">
              <br />
              <Button size="large" variant="contained" 
                onClick={authenticateSpotify}
                sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}
              >
                Authenticate with Spotify
              </Button> 
            </div>
          }
        </div>
      </div>
    </div>
  </div>
  );
};