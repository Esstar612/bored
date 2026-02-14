import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios';

const addToDB = async (imageUrl, title, location ) => {
    try {
        await axios.post("http://localhost:8080/api/outdoor/addPlaces", {_title : title, _location : location, _image : imageUrl });
    } catch (error) {
        console.log(error);
    }
}

const GradientCover = ({ imageUrl, title, location }) => {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={imageUrl}
            srcSet= {imageUrl}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          onClick={() => {addToDB(imageUrl,title,location)}}
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link overlay underline="none">
            {title}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link>{location}</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
      </CardOverflow>
    </Card>
  );
};

const Explore = ({ messages }) => {
    return (

      <div style={{ flexWrap: 'wrap' }}>

        {messages.map((item, index) => {
          if (item.ai) {
            return (
              <div className="message user" key={`ai-${index}`} style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                <div className="avatar" />
                <p>{item.ai}</p>
              </div>
            );
          }

          // If the current item is a list, iterate over it
          else if (Array.isArray(item)) {
            return item.map((i, j) => {
              if (i.fsq_id) {

                return (
                  <div key={i.fsq_id} className="message ai">
                    <GradientCover
                      imageUrl={i.image}
                      title={i.name}
                      location={i.address}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="message ai" key={`ai-${j}`} style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                    <div className="avatar" />
                    <p>{i.ai}</p>
                  </div>
                );
              }
            });
          }
          return null;
        })}
      </div>
    );
};

export default Explore;