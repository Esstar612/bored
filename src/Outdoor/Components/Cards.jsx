import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import "../Outdoor.css"

const CardMUI = ({ title, description, image, setMessages }) => {

  const explore = async (title) => {

    // stores the conversation
    setMessages(messages => [...messages, { ai: `Great choice! Here's a couple of ${title} for you to explore. Add the places you like directly to your favorites.` }]);

    try {
      const response = await axios.post("http://localhost:8080/api/outdoor/get", {option : title});
      setMessages(message => [...message, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 275,
        fontFamily: "'Poppins', sans-serif",
        variant: 'outlined',
        color: 'primary',
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image}
      />

      {/* <CardContent> */}
      {/* </CardContent> */}

      <Typography variant="h6" component="div" sx={{ fontFamily: "'Poppins', sans-serif" , textAlign: "center"}}>
          {title}
      </Typography>


        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Poppins', sans-serif", textAlign: "center" }}>
          {description}
        </Typography>


        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Button
            size="small" variant="contained"
            sx={{ fontFamily: "'Poppins', sans-serif", margin: '0 8px' }}
          >
            Add to plan
          </Button> */}

          <Button size="small" variant="contained"
            // sx={{ fontFamily: "'Poppins', sans-serif", margin: '0 8px' }}
            onClick={() => {explore(title)}}
            sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}

          >
            Explore
          </Button>
        </CardActions>
    </Card>
  );
};

export default CardMUI;