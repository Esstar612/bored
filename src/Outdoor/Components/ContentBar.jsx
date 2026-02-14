import React, { useState , useEffect } from 'react';
import Display from './Explore';
import LikedPlaces from './LikedPlaces';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import './Chat.css';

import CreatePlan from './CreatePlan';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ContentBar = ({ messages }) => {
  const [selection, setSelection] = useState('general');
  const [showModal, setShowModal] = useState(false);

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

  const onSelect = (input) => {
    setSelection(input);
    if (input === 'createPlan') {
      setShowModal(true);
    }
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  return (
    <div className="chatbotContainer">
      <nav className="navbar navbar-light bg-light" style={{ height: '40px' }}>
        <div className="container-fluid">
          <Button
            sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}
            onClick={() => onSelect('general')}
            size="md"
          >GENERAL 🌐</Button>
          <Button
            sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}
            onClick={() => onSelect('createPlan')}
            size="md"
          >CREATE A PLAN 📝</Button>
          <Button
            sx={{ bgcolor: 'tomato', '&:hover': { bgcolor: '#FF6347' } }}
            onClick={() => onSelect('placesLiked')}
            size="md"
          >LIKED PLACES 📍</Button>
        </div>
      </nav>

      <div className="messagesContainer">
        {
          selection === 'general' && <Display messages={messages} />
        }
        {
          selection === 'placesLiked' && <LikedPlaces />
        }
        
        <Modal
          open={showModal}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ ...style, display: 'flex', flexDirection: 'column', backgroundColor: '#e0f2fe' }}>

          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '25px', fontWeight: 'bold', margin: '15px 0' }}>Discover New Favorites!</h1>
            <p style={{ fontSize: '20px', margin: '15px 0' }}>
              Let's find your next adventure based on your favorite places! 
              Explore two exciting destinations handpicked just for you.
            </p>
          </div>

            {data && <CreatePlan data={data}/>}

          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ContentBar;