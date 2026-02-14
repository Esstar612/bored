import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';

const CreatePlan = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/outdoor/createPlan");
                setData(response.data);
                setError('');  // Clear any previous errors on successful fetch
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    return (
        <div style={{ flexWrap: 'wrap' }}>

            {data && Object.keys(data).map((key, index) => (
            <div key={index.reason}>
                <p>{key}</p>
                {data[key].map((item, subIndex) => (
                    
                    <div key={subIndex}>
                        <p>{item.reason}</p>
                        <GradientCover
                            imageUrl={item.image}
                            title={item.title}
                            location={item.location}
                        />
                    </div>
                ))}
            </div>
    ))}
            
        </div>
    );
}


export const GradientCover = ({ imageUrl, title, location }) => {
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
          onClick={() => {}}
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

export default GradientCover;
