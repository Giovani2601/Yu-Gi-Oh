import React from 'react';
import { Box, Typography } from '@mui/material';
import Yugi from '../assets/yugioh-yugi.png';
import './Home.css';

export default function HomePage() {
    return (
        <Box className="homepage-container">
            <Box className="homepage-text-container">
                {/* o homepage-text-container é um box que contém o título e a descrição da página inicial */}
                <Typography variant="h2" color="white" gutterBottom fontFamily='serif'>
                    Bem-vindo ao Yu-Gi-Oh! Card Search
                </Typography>
                <Typography
                    variant="h6"
                    color="white"
                    fontFamily='serif'
                    fontSize='20px'>
                    Busque seus cards preferidos usando a Yu-Gi-Oh! API by YGOPRODeck.
                </Typography>
            </Box>
            {/* o homepage-image-container é um box que contém a imagem do Yugi */}
            <Box className="homepage-image-container">
                <Box
                    component="img"
                    src={Yugi}
                    alt="Yu-Gi-Oh! Cards"
                    className="homepage-image"
                />
            </Box>
        </Box>
    );
}