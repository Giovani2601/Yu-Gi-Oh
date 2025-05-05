import React, { useState, useContext } from 'react';
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { CardsContext } from '../../contexts/CardsContext';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const { searchCards, fetchAll, loading } = useContext(CardsContext);

  const handleSearch = () => {
    const term = input.trim();
    if (term) {
      searchCards(term);
    } else {
      fetchAll();
    }
  };

  const handleClear = () => {
    setInput('');
    fetchAll();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mr: 2 }}>
      <TextField
        placeholder="Buscar cartas"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          width: '100%',
          backgroundColor: 'black',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            color: 'white',
            '&::placeholder': { color: 'white', opacity: 0.5 },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'red' },
            '&:hover fieldset': { borderColor: '#8B0000', borderWidth: 2 },
            '&.Mui-focused fieldset': { borderColor: 'red' },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'red' }} />
              ) : (
                <>
                  {input && (
                    <Tooltip title="Limpar busca">
                      <IconButton onClick={handleClear} edge="end" sx={{ color: 'white' }}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Buscar carta">
                    <IconButton onClick={handleSearch} edge="end" sx={{ color: 'white' }}>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}
