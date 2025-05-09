import React, { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../../contexts/CardsContext';
import { Box, Card, CardMedia, Alert, Pagination } from '@mui/material';
import Searchbar from '../searchbar/Searchbar';
import CardTypeSelect from '../cardTypeSelect/CardTypeSelect';
import CardInfoModal from '../cardInfoModal/CardInfoModal';
import './CardList.css';

export default function CardsList() {
  const { data: cards, error } = useContext(CardsContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(1);
  const cardsPerPage = 24;
  const pageCount = Math.ceil(cards.length / cardsPerPage);

  useEffect(() => {
    setPage(1);
  }, [cards]);

  const handleChange = (_, value) => setPage(value);
  const start = (page - 1) * cardsPerPage;
  const currentCards = cards.slice(start, start + cardsPerPage);

  return (
    <Box className="card-list-container">
      {/* o card-list-header é um box que contém o cardTypeSelect e o searchbar, os dois filtros que podem ser aplicados na lista de cartas */}
      <Box className="card-list-header">
        <CardTypeSelect />
        <Searchbar />
      </Box>

      {error && (
        <Alert severity={cards.length === 0 ? 'info' : 'error'} sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {cards.length > 0 && (
        <>
          { /* o card-grid é um box que contém as cartas, e o card-item é cada carta individual */}
          <Box className="card-grid">
            {currentCards.map((card) => (
              <Card
                key={card.id}
                className="card-item"
                onClick={() => setSelectedCard(card)}
              >
                <CardMedia
                  component="img"
                  image={card.card_images[0].image_url}
                  alt={card.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            { /* o Pagination é o componente que exibe a paginação, e o count é o número total de páginas */}
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'black',
                  fontWeight: 'bold',
                  backgroundColor: '#8B0000',
                  '&:hover': {
                    backgroundColor: '#a10000',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: 'red !important',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#cc0000',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
      { /* o cardInfoModal é o modal que exibe as informações da carta, e ele é exibido quando uma carta é clicada */}
      <CardInfoModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </Box>
  );
}