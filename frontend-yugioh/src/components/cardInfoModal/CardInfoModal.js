import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LevelIcon from '../assets/yugioh-level.png';
import './CardInfoModal.css';

export default function CardInfoModal({ card, onClose }) {
  if (!card) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      {/* o stopPropagations impede que um clique dentro do modal 'vaze' para a camada mais externa */}
      <Box className="modal-content" onClick={e => e.stopPropagation()}>
        {/* o closeIcon é um X que fecha o modal quando clicado */}
        <CloseIcon onClick={onClose} className="close-icon" />
        {/* o cardMedia é a imagem da carta que foi clicada na tela principal, e aqui são exibidas as informações dela */}
        <CardMedia
          component="img"
          image={card.card_images[0].image_url}
          alt={card.name}
          className="card-image"
        />
        {/* o card-details é um box que contém as informações da carta, como nome, nível, ataque, defesa e descrição */}
        <Box className="card-details">
          <Typography variant="h4" gutterBottom className="card-name">
            {card.name}
          </Typography>
          {card.level != null && (
            <Typography variant="h6" className="card-info"><strong>Nível:</strong> {card.level}
              <img src={LevelIcon} alt="Level" className="level-icon" />
            </Typography>
          )}
          {card.atk != null && (
            <Typography className="card-info"variant="h6"><strong>Ataque:</strong> {card.atk}</Typography>
          )}
          {card.def != null && (
            <Typography className="card-info" variant="h6"><strong>Defesa:</strong> {card.def}</Typography>
          )}
          {card.type && (
            <Typography  className="card-info" variant="h6"><strong>Tipo:</strong> {card.type}</Typography>
          )}
          {card.desc && (
            <Typography className="card-description"><strong>Descrição: </strong> {card.desc}</Typography>
          )}
        </Box>
      </Box>
    </div>
  );

  // o ReactDOM.createPortal é o hook usado para renderizar o modal fora da hierarquia do DOM do componente pai, permitindo que ele seja exibido 'na frente' do componente principal
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
}