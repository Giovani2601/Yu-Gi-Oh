import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import YuGiOhTitle from '../assets/yugioh-logo.png';
import HomeLogo from '../assets/yugioh-home.png';
import CardsLogo from '../assets/yugioh-cards.png';
import './navbar.css';

export default function ResponsiveAppBar() {
  return (
    <AppBar position="sticky" elevation={2} className="appBar">
      <Container className="bar" disableGutters maxWidth={false}>
        <Toolbar className="toolbar">
          { /* Contém a imagem da home, que leva para a página inicial */}
          <div className="navSection navSection-left">
            <IconButton
              component={Link}
              to="/"
              aria-label="Home"
              className="iconButton"
            >
              <img src={HomeLogo} alt="Home" className="homeLogo" />
            </IconButton>
          </div>

          { /* Contém o logo do Yu-Gi-Oh, que leva para a página inicial */}
          <div className="navSection navSection-center">
            <Link to="/">
              <img src={YuGiOhTitle} alt="Yu-Gi-Oh Logo" className="logo" />
            </Link>
          </div>

          { /* Contém a imagem do 'cards', que leva para a página de cards */}
          <div className="navSection navSection-right">
            <IconButton
              component={Link}
              to="/cards"
              aria-label="Cards"
              className="iconButton"
            >
              <img src={CardsLogo} alt="YuGiOh Cards" className="cardsLogo" />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
