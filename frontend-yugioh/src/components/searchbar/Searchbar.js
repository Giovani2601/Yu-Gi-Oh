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
    if (input.trim()) {
      searchCards(input);
    } else {
      fetchAll();
    }
  };

  const handleClear = () => {
    setInput('');
    fetchAll();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2, mr: 2}}>
      <TextField
        placeholder="Buscar cartas"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          width: '20%',
          backgroundColor: 'black',
          borderRadius: 10,
          '& .MuiInputBase-input': {
            color: 'white',
            fontWeight: 'normal',
            '&::placeholder': {
              color: 'white',
              opacity: 0.5,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: '#8B0000',
              borderWidth: 2,
            },
            '&.Mui-focused fieldset': {
              borderColor: 'red',
            },
          },
          '& .MuiSvgIcon-root.search': {
            color: 'red',
          },
        }}
        InputProps={{
          sx: {
            '& .MuiSvgIcon-root.clear': {
              color: 'red',
            },
          },
          endAdornment: (
            <InputAdornment position="end">
                {loading
                ? <CircularProgress size={24} sx={{ mr: 1, color: 'red' }} />
                : <>
                    {input && (
                      <Tooltip title="Limpar busca">
                        <IconButton onClick={handleClear} edge="end" sx={{ p: 0.5, mr: 1, color: 'white' }}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Buscar carta">
                      <IconButton onClick={handleSearch} edge="end" sx={{ p: 0.5, mr: 1, color: 'white' }}>
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </>
              }
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
