import React, { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../../contexts/CardsContext';
import {
  Box,
  Card,
  CardMedia, Alert,
  Pagination
} from '@mui/material';
import SearchBar from '../searchbar/Searchbar';

export default function CardsList() {
  const { data: cards, error } = useContext(CardsContext);
  const [page, setPage] = useState(1);
  const cardsPerPage = 20;
  const pageCount = Math.ceil(cards.length / cardsPerPage);

  useEffect(() => {
    setPage(1);
  }, [cards]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  return (
    <Box sx={{ p: 15, pb: 2, pt: 4, background: 'black', minHeight: '100vh' }}>
      <Box sx={{ position: 'static', top: 0, zIndex: 1, bgcolor: 'black', pb: 2 }}>
        <SearchBar />
      </Box>
      {error && (
        <Alert severity={cards.length === 0 ? 'info' : 'error'} sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {cards.length > 0 && (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
              gap: 3,
            }}
          >
            {currentCards.map((card) => (
              <Card
                key={card.id}
                sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
              >
                <CardMedia
                  component="img"
                  image={card.card_images[0].image_url}
                  alt={card.name}
                  sx={{
                    width: '100%',
                    height: { xs: 180, sm: 200, md: 240, lg: 400 },
                    objectFit: 'contain',
                  }}
                />
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              sx={{
                '& .MuiPaginationItem-root': { 
                  color: 'black', 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem', 
                  backgroundColor: '#8B0000' 
                },
                '& .MuiPaginationItem-root.Mui-selected': { 
                  color: 'black', 
                  backgroundColor: 'red' 
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}