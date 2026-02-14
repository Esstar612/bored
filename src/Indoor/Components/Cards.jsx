import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "../Indoor.css"

const CardMUI = ({ title, description, image, onExploreClick }) => {

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
            onClick={onExploreClick}
            sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}

          >
            Explore
          </Button>
        </CardActions>
    </Card>
  );
};

export default CardMUI;