import React, { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../../contexts/CardsContext';
import { Box, Card, CardMedia, Alert, Pagination } from '@mui/material';
import SearchBar from '../searchbar/Searchbar';
import CardTypeSelect from '../cardTypeSelect/CardTypeSelect';

export default function CardsList() {
  const { data: cards, error } = useContext(CardsContext);
  const [page, setPage] = useState(1);
  const cardsPerPage = 20;
  const pageCount = Math.ceil(cards.length / cardsPerPage);

  useEffect(() => {
    setPage(1);
  }, [cards]);

  const handleChange = (_, value) => setPage(value);
  const start = (page - 1) * cardsPerPage;
  const currentCards = cards.slice(start, start + cardsPerPage);

  return (
    <Box sx={{ p: 15, pb: 2, pt: 4, background: 'black', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'black',
          pb: 2,
          px: 2,
        }}
      >
        <CardTypeSelect />
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
              gap: 2,
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
                    height: { xs: 140, sm: 160, md: 200, lg: 240 },
                    objectFit: 'contain',
                  }}
                />
              </Card>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'black',
                  fontWeight: 'bold',
                  backgroundColor: '#8B0000',
                },
                '& .Mui-selected': {
                  backgroundColor: 'red',
                  color: 'black',
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
