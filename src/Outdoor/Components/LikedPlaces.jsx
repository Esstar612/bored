import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';

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

const LikedPlaces = () => {

    const [getPlaces, setgetPlaces] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/outdoor/getPlaces");
            setgetPlaces(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>

            <div className="message user" key={`ai}`} style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
                <div className="avatar" />
                <p>Your favorites list is where the magic happens! Not sure where to start? We'll help you create an itinerary that brings your ideal day out to life.</p>
              </div>

        {
            getPlaces.map((place) => (
              <div key={place.fsq_id} className="message ai">
                <GradientCover
                  imageUrl={place.image}
                  title={place.title}
                  location={place.location}
                />
              </div>
            ))
          }
        </div>

     );
}

export default LikedPlaces;