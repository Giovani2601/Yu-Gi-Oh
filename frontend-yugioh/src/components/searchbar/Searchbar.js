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
import './SearchBar.css';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const { searchCards, fetchAll, loading } = useContext(CardsContext);

  // Busca as cartas na API, e o fetchAll é uma função que busca todas as cartas na API
  const handleSearch = () => {
    const term = input.trim();
    if (term) {
      searchCards(term);
    } else {
      fetchAll();
    }
  };

  // Limpa o campo de busca e busca todas as cartas na API
  const handleClear = () => {
    setInput('');
    fetchAll();
  };

  // Faz com que a busca seja feita ao pressionar a tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box className="search-bar-container">
      {/* o search-field é um campo de texto que contém o ícone de busca e o ícone de limpar */}
      <TextField
        className="search-field"
        placeholder="Buscar cartas"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  {input && (
                    <Tooltip title="Limpar busca">
                      <IconButton onClick={handleClear} edge="end">
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Buscar carta">
                    <IconButton onClick={handleSearch} edge="end">
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