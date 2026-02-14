import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';

export default function SpotifyCard({ songID, songTitle, songArtist, songCover, songURI }) {
  const theme = useTheme();
  const [playing, setPlaying] = React.useState(false)

 const saveSong = () => {
  axios.put(`http://localhost:8080/api/spotify/favorite/${songID}`)
    .then(() => alert('Song saved!'))
    .catch(console.error);
 }

 const playSong = () => {
  if (!playing) {
    axios.put('http://localhost:8080/api/spotify/play', { songURI, play: playing })
    .catch(console.error);
  } else {
    axios.put('http://localhost:8080/api/spotify/pause')
    .catch(console.error);
  }

    setPlaying(!playing);
 }

  return (
    <Card sx={{ display: 'flex', backgroundColor: '#dfffe7' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {songTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {songArtist}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause" onClick={playSong}>
            {playing ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="fav" onClick={saveSong}>
            <Favorite sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={songCover}
        alt={`${songTitle} cover`}
      />
    </Card>
  );
}