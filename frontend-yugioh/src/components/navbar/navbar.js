import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import YuGiOhTitle from '../assets/yugioh-logo.png';
import HomeLogo from '../assets/yugioh-home.png';          
import CardsLogo from '../assets/yugioh-cards.png'; 
import './navbar.css';

export default function ResponsiveAppBar() {
  return (
    <AppBar position="sticky">
      <Container className="bar" disableGutters maxWidth={false}>
        <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <IconButton
              component={Link}
              to="/"
              sx={{ p: 0 }}              
              aria-label="Home"
            >
              <img
                src={HomeLogo}
                alt="Home"
                className='homeLogo'
              />
            </IconButton>
          </Box>
          <Box sx={{ flex: 0 }}>
            <Link to="/">
              <img className="logo" src={YuGiOhTitle} alt="Yu-Gi-Oh Logo" />
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              component={Link}
              to="/cards"
              aria-label="Cards"
            >
              <img
                src={CardsLogo}
                alt="YuGiOh Cards"
                className='cardsLogo'
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
