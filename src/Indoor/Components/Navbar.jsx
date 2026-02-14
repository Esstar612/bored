import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router';
// import logo from "../logo.png"

const Navbar = () => {

  const navigate = useNavigate();
  const goToHomepage = () => navigate('/homepage');
  const goToIndoorActivities = () => navigate('/indoor');
  const goToOutdoorActivities = () => navigate('/outdoor');
  const goToSettings = () => navigate('/settings');

    return (
      <div>
        <nav className="navbar" style={{
          height: '50px',
          display: 'flex', // Enable flexbox
          justifyContent: 'center', // Center items horizontally
          alignItems: 'center', // Center items vertically
          gap: '10px' // Add gap between items
        }}>
  
          <Button onClick={goToHomepage} size="md">HOMEPAGE 🏠</Button>
          <Button onClick={goToIndoorActivities} size="md">INDOOR ACTIVITIES 🎲</Button>
          <Button onClick={goToOutdoorActivities} size="md">OUTDOOR ACTIVITIES 🚵</Button>
          <Button onClick={goToSettings} size="md">PROFILE SETTINGS ⚙️</Button>
        </nav>
      </div>
    );
};
 
export default Navbar;